# WooASM System Integration - All Three Parts Aligned

## Overview

This document ensures all three parts of WooASM are aligned:
1. **Frontend Website** (wooasm.com) - User dashboard
2. **Backend API** (api.wooasm.com) - Central API server
3. **WordPress Plugin** - Connects stores to WooASM

---

## License Key Flow

```
┌─────────────────────────────────────────────────────────────────────────────┐
│                           LICENSE KEY LIFECYCLE                              │
├─────────────────────────────────────────────────────────────────────────────┤
│                                                                              │
│  1. USER SUBSCRIBES (Website)                                                │
│     └─> Backend generates license key: WASM-XXXX-XXXX-XXXX                  │
│     └─> Stored in: user.licenseKey                                          │
│                                                                              │
│  2. USER ACTIVATES PLUGIN (WordPress)                                        │
│     └─> Plugin calls: POST /api/v1/plugin/activate                          │
│     └─> Backend creates site record with licenseKey                         │
│     └─> Backend increments: user.sitesUsed                                  │
│                                                                              │
│  3. PLUGIN VALIDATES PERIODICALLY (WordPress)                                │
│     └─> Plugin calls: POST /api/v1/plugin/validate                          │
│     └─> Backend checks: provided key === user.licenseKey                    │
│     └─> If match: valid=true                                                │
│     └─> If NO match: valid=false, reason="key_regenerated"                  │
│                                                                              │
│  4. USER REGENERATES KEY (Website)                                           │
│     └─> Frontend calls: POST /api/v1/dashboard/regenerate-license           │
│     └─> Backend generates NEW key                                           │
│     └─> Backend updates: user.licenseKey = NEW_KEY                          │
│     └─> OLD KEY IS NOW INVALID                                              │
│     └─> Next plugin validation will FAIL                                    │
│                                                                              │
│  5. PLUGIN DETECTS INVALID KEY (WordPress)                                   │
│     └─> Validation returns: valid=false, reason="key_regenerated"           │
│     └─> Plugin clears stored license                                        │
│     └─> Plugin shows error: "License key regenerated, enter new key"        │
│     └─> Plugin disables premium features                                    │
│                                                                              │
└─────────────────────────────────────────────────────────────────────────────┘
```

---

## API Endpoints Reference

### Plugin Endpoints (called by WordPress plugin)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/plugin/activate` | POST | Activate license on a WordPress site |
| `/api/v1/plugin/validate` | POST | Check if license is still valid |
| `/api/v1/plugin/deactivate` | POST | Deactivate a site from license |

### Dashboard Endpoints (called by frontend website)

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/v1/dashboard` | GET | Get full dashboard data |
| `/api/v1/dashboard/license` | GET | Get license details |
| `/api/v1/dashboard/regenerate-license` | POST | Generate new license key |
| `/api/v1/dashboard/sites` | GET | List activated sites |
| `/api/v1/dashboard/usage` | GET | Get usage statistics |

---

## Backend: Key Regeneration Logic

```javascript
// POST /api/v1/dashboard/regenerate-license
async regenerateLicense(userId) {
  // 1. Generate new license key
  const newLicenseKey = generateLicenseKey(); // WASM-XXXX-XXXX-XXXX
  
  // 2. Update user record - OLD KEY BECOMES INVALID
  await User.updateOne(
    { _id: userId },
    { 
      $set: { 
        licenseKey: newLicenseKey,
        licenseRegeneratedAt: new Date()
      }
    }
  );
  
  // 3. Optionally: Mark all sites for revalidation
  await Site.updateMany(
    { userId: userId },
    { $set: { needsRevalidation: true } }
  );
  
  // 4. Send email notification (optional)
  await sendEmail(user.email, 'license_regenerated', { newLicenseKey });
  
  return { success: true, data: { licenseKey: newLicenseKey } };
}
```

---

## Backend: License Validation Logic

```javascript
// POST /api/v1/plugin/validate
async validateLicense(licenseKey, siteUrl, siteId) {
  // 1. Find user by the provided license key
  const user = await User.findOne({ licenseKey: licenseKey });
  
  // If no user found - key doesn't exist or was regenerated
  if (!user) {
    return {
      success: false,
      data: { valid: false, reason: 'invalid_key' },
      message: 'License key is invalid or has been regenerated'
    };
  }
  
  // 2. Check subscription status
  if (user.subscriptionStatus !== 'active') {
    return {
      success: false,
      data: { valid: false, reason: 'subscription_expired' },
      message: 'Your subscription has expired'
    };
  }
  
  // 3. Verify this site is registered to this user
  const site = await Site.findOne({ siteId, userId: user._id });
  if (!site) {
    return {
      success: false,
      data: { valid: false, reason: 'site_not_registered' },
      message: 'This site is not registered with this license'
    };
  }
  
  // 4. Update last seen
  await Site.updateOne({ siteId }, { $set: { lastSeenAt: new Date() } });
  
  // 5. Return valid
  return {
    success: true,
    data: {
      valid: true,
      plan: user.plan,
      status: user.subscriptionStatus,
      expiresAt: user.subscriptionEndsAt
    }
  };
}
```

---

## Frontend: What It Does

### License Page (`/dashboard/license`)

```javascript
// Fetch license data
const response = await api.getLicense();
// Response: { success, data: { hasLicense, licenseKey, sitesUsed, maxSites, ... } }

// Regenerate license
const response = await api.regenerateLicense();
// Response: { success, data: { licenseKey: "NEW-KEY-XXXX" } }

// After regeneration:
// - Fetches new license data
// - Refreshes user data
// - Shows success message: "Your old key is now invalid"
```

### Dashboard Overview

```javascript
// Fetch dashboard
const response = await api.getDashboard();
// Response: { success, data: { user, license, hasSubscription, usage, ... } }

// License key shown from:
const licenseKey = data.license?.licenseKey || data.user?.licenseKey;

// Sites shown as:
const sitesUsed = data.license?.sitesUsed ?? data.user?.sitesUsed ?? 0;
const maxSites = data.license?.maxSites ?? data.user?.maxSites ?? 1;
```

---

## Plugin: What It Should Do

### 1. On Activation (user enters license key)

```php
function activate_license($license_key) {
    $response = wp_remote_post('https://api.wooasm.com/api/v1/plugin/activate', [
        'body' => json_encode([
            'licenseKey' => $license_key,
            'siteUrl' => get_site_url(),
            'pluginVersion' => WOOASM_VERSION,
            'wordpressVersion' => get_bloginfo('version'),
            'woocommerceVersion' => WC()->version
        ]),
        'headers' => ['Content-Type' => 'application/json']
    ]);
    
    $data = json_decode(wp_remote_retrieve_body($response), true);
    
    if ($data['success']) {
        // Store license info
        update_option('wooasm_license_key', $license_key);
        update_option('wooasm_site_id', $data['data']['siteId']);
        update_option('wooasm_plan', $data['data']['plan']);
        update_option('wooasm_license_valid', true);
        update_option('wooasm_last_validated', time());
        return true;
    }
    
    return false;
}
```

### 2. Periodic Validation (every 24 hours)

```php
function validate_license() {
    $license_key = get_option('wooasm_license_key');
    $site_id = get_option('wooasm_site_id');
    
    if (!$license_key) return false;
    
    $response = wp_remote_post('https://api.wooasm.com/api/v1/plugin/validate', [
        'body' => json_encode([
            'licenseKey' => $license_key,
            'siteUrl' => get_site_url(),
            'siteId' => $site_id
        ]),
        'headers' => ['Content-Type' => 'application/json']
    ]);
    
    $data = json_decode(wp_remote_retrieve_body($response), true);
    
    if (!$data['success'] || $data['data']['valid'] === false) {
        $reason = $data['data']['reason'] ?? 'unknown';
        
        // Handle different failure reasons
        switch ($reason) {
            case 'key_regenerated':
            case 'invalid_key':
                // KEY WAS REGENERATED - Clear everything
                delete_option('wooasm_license_key');
                delete_option('wooasm_site_id');
                update_option('wooasm_license_valid', false);
                
                // Show admin notice
                set_transient('wooasm_license_error', 
                    'Your license key has been regenerated. Please enter your new key.', 
                    DAY_IN_SECONDS
                );
                break;
                
            case 'subscription_expired':
                update_option('wooasm_license_valid', false);
                set_transient('wooasm_license_error', 
                    'Your subscription has expired. Please renew to continue using WooASM.', 
                    DAY_IN_SECONDS
                );
                break;
        }
        
        return false;
    }
    
    // License is valid
    update_option('wooasm_license_valid', true);
    update_option('wooasm_plan', $data['data']['plan']);
    update_option('wooasm_last_validated', time());
    return true;
}
```

### 3. Show Admin Notice When License Invalid

```php
add_action('admin_notices', function() {
    $error = get_transient('wooasm_license_error');
    if ($error) {
        echo '<div class="notice notice-error is-dismissible">';
        echo '<p><strong>WooASM:</strong> ' . esc_html($error) . ' ';
        echo '<a href="' . admin_url('admin.php?page=wooasm-settings') . '">Update License</a></p>';
        echo '</div>';
    }
});
```

### 4. When to Validate

```php
// On every admin page load (with 24-hour cache)
add_action('admin_init', function() {
    $last_validated = get_option('wooasm_last_validated', 0);
    
    // Validate every 24 hours
    if (time() - $last_validated > DAY_IN_SECONDS) {
        validate_license();
    }
});

// Always validate on WooASM settings page
add_action('load-toplevel_page_wooasm', function() {
    validate_license();
});

// Validate before any premium feature
function check_license_before_feature() {
    if (!get_option('wooasm_license_valid')) {
        return false;
    }
    return true;
}
```

---

## Summary: What Happens When Key is Regenerated

| Step | System | Action |
|------|--------|--------|
| 1 | Frontend | User clicks "Regenerate Key" |
| 2 | Frontend | Calls `POST /api/v1/dashboard/regenerate-license` |
| 3 | Backend | Generates new key, updates `user.licenseKey` |
| 4 | Backend | Old key is now INVALID (not stored anywhere) |
| 5 | Frontend | Shows new key, displays success message |
| 6 | Plugin | Next validation call (within 24 hours) |
| 7 | Plugin | Sends old key to `POST /api/v1/plugin/validate` |
| 8 | Backend | Can't find user with that key → returns `valid: false` |
| 9 | Plugin | Clears stored license, shows error to admin |
| 10 | User | Must enter new key in WordPress plugin |

---

## Test Checklist

- [ ] User regenerates key on website → Old key immediately invalid
- [ ] Plugin validates with old key → Returns `valid: false, reason: "key_regenerated"`
- [ ] Plugin clears stored license → Shows error notice
- [ ] User enters new key in plugin → Activation succeeds
- [ ] Dashboard shows correct `sitesUsed` count after reactivation
