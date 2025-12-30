# WordPress Plugin Builder Instructions

> **For:** Plugin Developer building WooASM WordPress Plugin
> **API Base URL:** `https://api.wooasm.com/api/v1`
> **Reference:** See `API_SPECIFICATION.md` for complete endpoint details

---

## Overview

You are building the WooASM WordPress plugin that connects to the API backend. The plugin should:
1. Validate license keys against the API
2. Proxy AI requests through the API (users don't need OpenAI keys)
3. Track usage and respect plan limits
4. Send analytics events

---

## API Base URL

```php
define('WOOASM_API_URL', 'https://api.wooasm.com/api/v1');
```

---

## Authentication

Plugin requests use two headers:
- `X-License-Key`: The user's license key (WASM-XXXX-XXXX-XXXX)
- `X-Site-Id`: MD5 hash of the site URL

```php
<?php
function wooasm_get_auth_headers() {
    return [
        'Content-Type'  => 'application/json',
        'X-License-Key' => get_option('wooasm_license_key'),
        'X-Site-Id'     => md5(get_site_url())
    ];
}
```

---

## License Validation

### On Plugin Activation / Settings Save

```php
<?php
function wooasm_validate_license($license_key) {
    $response = wp_remote_post(WOOASM_API_URL . '/license/validate', [
        'headers' => ['Content-Type' => 'application/json'],
        'body'    => json_encode([
            'license_key'         => $license_key,
            'site_url'            => get_site_url(),
            'site_id'             => md5(get_site_url()),
            'plugin_version'      => WOOASM_VERSION,
            'wordpress_version'   => get_bloginfo('version'),
            'woocommerce_version' => defined('WC_VERSION') ? WC_VERSION : null
        ]),
        'timeout' => 30
    ]);

    if (is_wp_error($response)) {
        return [
            'valid'   => false,
            'error'   => 'connection_error',
            'message' => 'Could not connect to license server'
        ];
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if ($body['valid']) {
        // Store license data
        update_option('wooasm_license_valid', true);
        update_option('wooasm_plan', $body['plan']);
        update_option('wooasm_features', $body['features']);
        update_option('wooasm_limits', $body['limits']);
        update_option('wooasm_usage', $body['usage']);
        update_option('wooasm_subscription_ends', $body['subscription_ends_at']);
        
        return $body;
    }

    // Handle errors
    update_option('wooasm_license_valid', false);
    return $body;
}
```

### License Validation Response

**Valid License:**
```json
{
  "valid": true,
  "plan": "starter",
  "features": ["full_assistant", "full_chatbot", "content_generation", "basic_insights"],
  "limits": {
    "assistant_actions": 500,
    "content_generations": 100,
    "chatbot_messages": 500,
    "insights_refreshes": 4,
    "weighted_cap": 8000
  },
  "usage": {
    "assistant_actions": 45,
    "content_generations": 12,
    "chatbot_messages": 156,
    "insights_refreshes": 2,
    "weighted_total": 269
  },
  "user_name": "John Doe",
  "subscription_ends_at": "2025-01-01T00:00:00.000Z"
}
```

**Invalid License:**
```json
{
  "valid": false,
  "error": "invalid_license",
  "message": "Invalid license key"
}
```

**Error Codes:**
- `invalid_license` - License key doesn't exist
- `expired` - Subscription has expired
- `suspended` - License suspended by admin
- `site_limit_reached` - User has activated max sites

---

## AI Requests

### Assistant Chat

```php
<?php
function wooasm_ai_chat($messages, $options = []) {
    // Check if license is valid
    if (!get_option('wooasm_license_valid')) {
        return new WP_Error('invalid_license', 'Please activate your license');
    }

    // Check usage limits
    $usage = get_option('wooasm_usage', []);
    $limits = get_option('wooasm_limits', []);
    
    if ($usage['assistant_actions'] >= $limits['assistant_actions']) {
        return new WP_Error('limit_exceeded', 'Monthly assistant actions limit reached');
    }

    $response = wp_remote_post(WOOASM_API_URL . '/ai/chat', [
        'headers' => wooasm_get_auth_headers(),
        'body'    => json_encode([
            'messages'    => $messages,
            'model'       => $options['model'] ?? 'gpt-4o',
            'temperature' => $options['temperature'] ?? 0.7,
            'max_tokens'  => $options['max_tokens'] ?? 2000
        ]),
        'timeout' => 60
    ]);

    if (is_wp_error($response)) {
        return $response;
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if ($body['success']) {
        // Update local usage cache
        $usage['assistant_actions']++;
        update_option('wooasm_usage', $usage);
        
        return $body['data'];
    }

    return new WP_Error($body['error'] ?? 'api_error', $body['message']);
}
```

### Content Generation

```php
<?php
function wooasm_generate_content($prompt, $content_type, $options = []) {
    $response = wp_remote_post(WOOASM_API_URL . '/ai/content', [
        'headers' => wooasm_get_auth_headers(),
        'body'    => json_encode([
            'prompt'       => $prompt,
            'content_type' => $content_type, // product_description, blog_post, email_campaign, social_media, seo_content
            'model'        => $options['model'] ?? 'gpt-4o',
            'temperature'  => $options['temperature'] ?? 0.8
        ]),
        'timeout' => 90
    ]);

    // ... handle response
}
```

### Chatbot Messages

```php
<?php
function wooasm_chatbot_message($message, $conversation_id = null, $context = []) {
    $response = wp_remote_post(WOOASM_API_URL . '/ai/chatbot', [
        'headers' => wooasm_get_auth_headers(),
        'body'    => json_encode([
            'message'         => $message,
            'conversation_id' => $conversation_id,
            'context'         => $context
        ]),
        'timeout' => 30
    ]);

    // ... handle response
}
```

---

## Usage Tracking

### Manual Usage Tracking

For actions not automatically tracked:

```php
<?php
function wooasm_track_usage($action_type, $count = 1) {
    $response = wp_remote_post(WOOASM_API_URL . '/usage/track', [
        'headers' => wooasm_get_auth_headers(),
        'body'    => json_encode([
            'action_type' => $action_type,
            'count'       => $count
        ]),
        'timeout' => 10
    ]);

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if ($body['success']) {
        // Update local cache
        return [
            'success'   => true,
            'usage'     => $body['data']['usage'],
            'remaining' => $body['data']['remaining']
        ];
    }

    if ($body['error'] === 'limit_exceeded') {
        // Show upgrade message
        return [
            'success'     => false,
            'error'       => 'limit_exceeded',
            'upgrade_url' => 'https://wooasm.com/pricing'
        ];
    }

    return ['success' => false, 'error' => $body['error']];
}
```

### Action Types

| Action Type | Weight | Description |
|-------------|--------|-------------|
| `assistant_action` | 1 | Store assistant queries |
| `content_generation` | 4 | Content generation requests |
| `chatbot_message` | 1 | Customer chatbot messages |
| `insights_refresh` | 10 | Store insights refresh |

### Get Usage Summary

```php
<?php
function wooasm_get_usage_summary() {
    $response = wp_remote_get(WOOASM_API_URL . '/usage/summary', [
        'headers' => wooasm_get_auth_headers(),
        'timeout' => 10
    ]);

    return json_decode(wp_remote_retrieve_body($response), true);
}
```

---

## Event Tracking (Analytics)

### Track Single Event

```php
<?php
function wooasm_track_event($event_type, $event_name, $event_data = []) {
    // Fire and forget - don't wait for response
    wp_remote_post(WOOASM_API_URL . '/events/track', [
        'headers'  => ['Content-Type' => 'application/json'],
        'body'     => json_encode([
            'license_key'    => get_option('wooasm_license_key'),
            'site_id'        => md5(get_site_url()),
            'event_type'     => $event_type,
            'event_name'     => $event_name,
            'event_data'     => $event_data,
            'plugin_version' => WOOASM_VERSION
        ]),
        'timeout'  => 5,
        'blocking' => false
    ]);
}

// Usage examples:
wooasm_track_event('lifecycle', 'plugin_activated', ['version' => WOOASM_VERSION]);
wooasm_track_event('feature_used', 'product_description_generated', ['product_id' => 123]);
wooasm_track_event('error', 'api_timeout', ['endpoint' => '/ai/chat']);
```

### Event Types

- `lifecycle` - Plugin activation, deactivation, updates
- `feature_used` - Feature usage tracking
- `error` - Error tracking
- `api_call` - API call tracking

---

## Plan Limits Reference

| Feature | Free | Starter | Professional |
|---------|------|---------|-------------|
| Assistant Actions/mo | 300 | 500 | 2,000 |
| Content Generations/mo | 10 | 100 | 1,000 |
| Chatbot Messages/mo | 50 | 500 | 10,000 |
| Insights Refreshes/mo | 1 | 4 | Unlimited |
| Max Sites | 1 | 1 | 5 |
| Weighted Cap | 500 | 8,000 | 30,000 |

**Weighted Usage Formula:**
```
weighted = assistant_actions + chatbot_messages + (content_generations × 4) + (insights_refreshes × 10)
```

---

## Feature Flags

Check available features based on plan:

```php
<?php
function wooasm_has_feature($feature) {
    $features = get_option('wooasm_features', []);
    return in_array($feature, $features);
}

// Usage:
if (wooasm_has_feature('content_generation')) {
    // Show content generation UI
}
```

### Feature List by Plan

| Feature | Free | Starter | Professional |
|---------|------|---------|-------------|
| `basic_assistant` | ✓ | | |
| `limited_chatbot` | ✓ | | |
| `full_assistant` | | ✓ | ✓ |
| `full_chatbot` | | ✓ | ✓ |
| `content_generation` | | ✓ | ✓ |
| `basic_insights` | | ✓ | |
| `advanced_insights` | | | ✓ |
| `priority_support` | | | ✓ |
| `custom_training` | | | ✓ |

---

## Error Handling

```php
<?php
function wooasm_handle_api_error($error_code, $message) {
    switch ($error_code) {
        case 'invalid_license':
            // Prompt user to check license key
            add_action('admin_notices', function() {
                echo '<div class="notice notice-error"><p>WooASM: Invalid license key. Please check your settings.</p></div>';
            });
            break;
            
        case 'expired':
            // Prompt user to renew
            add_action('admin_notices', function() {
                echo '<div class="notice notice-warning"><p>WooASM: Your subscription has expired. <a href="https://wooasm.com/pricing">Renew now</a></p></div>';
            });
            break;
            
        case 'limit_exceeded':
            // Show upgrade message
            add_action('admin_notices', function() {
                echo '<div class="notice notice-warning"><p>WooASM: Usage limit reached. <a href="https://wooasm.com/pricing">Upgrade your plan</a></p></div>';
            });
            break;
            
        case 'site_limit_reached':
            // Prompt to deactivate other sites or upgrade
            break;
    }
}
```

---

## Caching Recommendations

```php
<?php
// Cache license validation for 1 hour
function wooasm_validate_license_cached($license_key) {
    $cache_key = 'wooasm_license_' . md5($license_key);
    $cached = get_transient($cache_key);
    
    if ($cached !== false) {
        return $cached;
    }
    
    $result = wooasm_validate_license($license_key);
    
    if ($result['valid']) {
        set_transient($cache_key, $result, HOUR_IN_SECONDS);
    }
    
    return $result;
}

// Clear cache on settings change
function wooasm_clear_license_cache() {
    $license_key = get_option('wooasm_license_key');
    delete_transient('wooasm_license_' . md5($license_key));
}
```

---

## Settings Page

```php
<?php
function wooasm_settings_page() {
    ?>
    <div class="wrap">
        <h1>WooASM Settings</h1>
        
        <form method="post" action="options.php">
            <?php settings_fields('wooasm_settings'); ?>
            
            <table class="form-table">
                <tr>
                    <th>License Key</th>
                    <td>
                        <input type="text" 
                               name="wooasm_license_key" 
                               value="<?php echo esc_attr(get_option('wooasm_license_key')); ?>" 
                               class="regular-text"
                               placeholder="WASM-XXXX-XXXX-XXXX">
                        <?php if (get_option('wooasm_license_valid')): ?>
                            <span class="dashicons dashicons-yes" style="color: green;"></span>
                            <span style="color: green;">Valid - <?php echo ucfirst(get_option('wooasm_plan')); ?> Plan</span>
                        <?php endif; ?>
                    </td>
                </tr>
            </table>
            
            <?php submit_button('Save & Validate'); ?>
        </form>
        
        <?php if (get_option('wooasm_license_valid')): ?>
        <h2>Usage This Month</h2>
        <?php
            $usage = get_option('wooasm_usage', []);
            $limits = get_option('wooasm_limits', []);
        ?>
        <table class="widefat">
            <tr>
                <td>Assistant Actions</td>
                <td><?php echo $usage['assistant_actions'] ?? 0; ?> / <?php echo $limits['assistant_actions']; ?></td>
            </tr>
            <tr>
                <td>Content Generations</td>
                <td><?php echo $usage['content_generations'] ?? 0; ?> / <?php echo $limits['content_generations']; ?></td>
            </tr>
            <tr>
                <td>Chatbot Messages</td>
                <td><?php echo $usage['chatbot_messages'] ?? 0; ?> / <?php echo $limits['chatbot_messages']; ?></td>
            </tr>
        </table>
        <?php endif; ?>
    </div>
    <?php
}
```

---

## Testing

### Test License Keys

For development, create test users via the Admin dashboard at `https://wooasm.com/admin` and use their license keys.

### API Health Check

```php
<?php
function wooasm_check_api_health() {
    $response = wp_remote_get(WOOASM_API_URL . '/../health', ['timeout' => 5]);
    
    if (is_wp_error($response)) {
        return false;
    }
    
    $body = json_decode(wp_remote_retrieve_body($response), true);
    return $body['status'] === 'healthy';
}
```

---

## Update README

Add API documentation section:

```markdown
## API Integration

WooASM plugin connects to `api.wooasm.com` for:
- License validation
- AI features (Chat, Content Generation, Chatbot)
- Usage tracking
- Event analytics

### Getting a License Key

1. Create an account at https://wooasm.com/signup
2. Choose a plan at https://wooasm.com/pricing
3. Find your license key in the dashboard
4. Enter the license key in WooASM settings
```

---

## Checklist

- [ ] Implement license validation on activation
- [ ] Store license data in wp_options
- [ ] Implement AI chat endpoint integration
- [ ] Implement content generation endpoint
- [ ] Implement chatbot endpoint
- [ ] Add usage tracking
- [ ] Add event tracking
- [ ] Handle all error codes
- [ ] Add caching for license validation
- [ ] Create settings page with license input
- [ ] Show usage statistics in settings
- [ ] Add upgrade prompts when limits reached
- [ ] Test with all plan types

---

## Questions?

Coordinate with:
- **Backend Builder** - For API endpoint details
- **Frontend Builder** - For license key display format
