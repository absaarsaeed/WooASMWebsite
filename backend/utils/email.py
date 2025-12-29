import os
import logging
from typing import Optional
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail

logger = logging.getLogger(__name__)

# Email configuration
SENDGRID_API_KEY = os.environ.get("SENDGRID_API_KEY", "")
FROM_EMAIL = os.environ.get("FROM_EMAIL", "noreply@wooasm.ai")
APP_URL = os.environ.get("APP_URL", "https://wooasm.com")


def send_email(to: str, subject: str, html_content: str, plain_content: Optional[str] = None) -> bool:
    """Send an email using SendGrid"""
    if not SENDGRID_API_KEY:
        logger.warning(f"SendGrid API key not configured. Would send email to {to}: {subject}")
        # For development, just log the email
        logger.info(f"Email content: {html_content[:500]}...")
        return True  # Return True in dev mode to not block flow
    
    message = Mail(
        from_email=FROM_EMAIL,
        to_emails=to,
        subject=subject,
        html_content=html_content,
        plain_text_content=plain_content
    )
    
    try:
        sg = SendGridAPIClient(SENDGRID_API_KEY)
        response = sg.send(message)
        return response.status_code in [200, 201, 202]
    except Exception as e:
        logger.error(f"Failed to send email: {str(e)}")
        return False


def send_welcome_email(to: str, name: str) -> bool:
    """Send welcome email after signup"""
    subject = "Welcome to WooASM! 🎉"
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Welcome to WooASM!</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>Thank you for joining WooASM! We're excited to have you on board.</p>
                <p>With WooASM, you can:</p>
                <ul>
                    <li>🤖 Manage your store by just asking</li>
                    <li>💬 Provide 24/7 AI customer support</li>
                    <li>📊 Get instant insights about your business</li>
                    <li>✍️ Generate product content automatically</li>
                </ul>
                <p>Get started by downloading the plugin and activating your license key in your dashboard.</p>
                <a href="{APP_URL}/dashboard" class="button">Go to Dashboard</a>
                <p>If you have any questions, don't hesitate to reach out to our support team.</p>
                <p>Happy selling!<br>The WooASM Team</p>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_verification_email(to: str, name: str, token: str) -> bool:
    """Send email verification link"""
    subject = "Verify your WooASM email"
    verify_url = f"{APP_URL}/verify-email?token={token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
            .link {{ word-break: break-all; color: #7C3AED; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Verify Your Email</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>Please verify your email address to complete your WooASM registration.</p>
                <a href="{verify_url}" class="button">Verify Email</a>
                <p>Or copy and paste this link in your browser:</p>
                <p class="link">{verify_url}</p>
                <p>This link expires in 24 hours.</p>
                <p>If you didn't create an account with WooASM, you can safely ignore this email.</p>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_password_reset_email(to: str, name: str, token: str) -> bool:
    """Send password reset link"""
    subject = "Reset your WooASM password"
    reset_url = f"{APP_URL}/reset-password?token={token}"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
            .warning {{ background: #fef3cd; border: 1px solid #ffc107; padding: 15px; border-radius: 8px; margin: 15px 0; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>Reset Your Password</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>We received a request to reset your password. Click the button below to create a new password:</p>
                <a href="{reset_url}" class="button">Reset Password</a>
                <div class="warning">
                    <strong>⚠️ This link expires in 1 hour.</strong>
                </div>
                <p>If you didn't request a password reset, you can safely ignore this email. Your password will remain unchanged.</p>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_purchase_confirmation_email(to: str, name: str, plan: str, billing_cycle: str, license_key: str) -> bool:
    """Send purchase confirmation with license key"""
    subject = "Your WooASM subscription is active! 🚀"
    price = "$29" if plan == "starter" else "$79"
    if billing_cycle == "yearly":
        price = "$290" if plan == "starter" else "$790"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #7C3AED 0%, #9333EA 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
            .license-box {{ background: #1f2937; color: #10b981; padding: 20px; border-radius: 8px; font-family: monospace; font-size: 18px; text-align: center; margin: 20px 0; }}
            .details {{ background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }}
            .details-row {{ display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e5e7eb; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>🎉 You're All Set!</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>Thank you for subscribing to WooASM <strong>{plan.title()}</strong>! Your subscription is now active.</p>
                
                <h3>Your License Key:</h3>
                <div class="license-box">{license_key}</div>
                
                <div class="details">
                    <h3>Order Details</h3>
                    <div class="details-row"><span>Plan:</span><span>{plan.title()}</span></div>
                    <div class="details-row"><span>Billing:</span><span>{billing_cycle.title()}</span></div>
                    <div class="details-row"><span>Amount:</span><span>{price}/{billing_cycle.replace('ly', '')}</span></div>
                </div>
                
                <h3>Next Steps:</h3>
                <ol>
                    <li>Download the WooASM plugin from your dashboard</li>
                    <li>Install and activate it on your WordPress site</li>
                    <li>Enter your license key in the plugin settings</li>
                    <li>Start managing your store with AI!</li>
                </ol>
                
                <a href="{APP_URL}/dashboard" class="button">Go to Dashboard</a>
                
                <p>If you have any questions, our support team is here to help!</p>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_subscription_expiring_email(to: str, name: str, days_remaining: int) -> bool:
    """Send subscription expiring reminder"""
    subject = f"Your WooASM subscription expires in {days_remaining} days"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>⚠️ Subscription Expiring Soon</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>Your WooASM subscription will expire in <strong>{days_remaining} days</strong>.</p>
                <p>To avoid any interruption to your AI-powered store management, please renew your subscription.</p>
                <p><strong>What happens if you don't renew:</strong></p>
                <ul>
                    <li>Your account will be downgraded to the free plan</li>
                    <li>You'll lose access to premium features</li>
                    <li>Your usage limits will be reduced</li>
                </ul>
                <a href="{APP_URL}/dashboard/billing" class="button">Renew Subscription</a>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_payment_failed_email(to: str, name: str) -> bool:
    """Send payment failed notification"""
    subject = "Payment failed for your WooASM subscription"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>❌ Payment Failed</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>We were unable to process your payment for WooASM. Please update your payment method to continue using premium features.</p>
                <p>You have a <strong>7-day grace period</strong> to update your payment information before your account is downgraded.</p>
                <a href="{APP_URL}/dashboard/billing" class="button">Update Payment Method</a>
                <p>If you believe this is an error or need assistance, please contact our support team.</p>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)


def send_usage_warning_email(to: str, name: str, percentage: int, limit_type: str) -> bool:
    """Send usage limit warning at 80%"""
    subject = f"You've used {percentage}% of your WooASM {limit_type} quota"
    
    html_content = f"""
    <!DOCTYPE html>
    <html>
    <head>
        <style>
            body {{ font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; line-height: 1.6; color: #333; }}
            .container {{ max-width: 600px; margin: 0 auto; padding: 20px; }}
            .header {{ background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }}
            .header h1 {{ color: white; margin: 0; }}
            .content {{ background: #f9fafb; padding: 30px; border-radius: 0 0 10px 10px; }}
            .button {{ display: inline-block; background: #7C3AED; color: white; padding: 12px 30px; text-decoration: none; border-radius: 8px; margin: 20px 0; }}
            .footer {{ text-align: center; margin-top: 20px; color: #666; font-size: 14px; }}
            .progress {{ background: #e5e7eb; border-radius: 10px; height: 20px; overflow: hidden; margin: 20px 0; }}
            .progress-bar {{ background: linear-gradient(90deg, #f59e0b, #d97706); height: 100%; width: {percentage}%; }}
        </style>
    </head>
    <body>
        <div class="container">
            <div class="header">
                <h1>📊 Usage Alert</h1>
            </div>
            <div class="content">
                <p>Hi {name},</p>
                <p>You've used <strong>{percentage}%</strong> of your monthly {limit_type} quota.</p>
                <div class="progress"><div class="progress-bar"></div></div>
                <p>Consider upgrading your plan for higher limits and more features.</p>
                <a href="{APP_URL}/pricing" class="button">Upgrade Plan</a>
            </div>
            <div class="footer">
                <p>© 2024 WooASM. All rights reserved.</p>
            </div>
        </div>
    </body>
    </html>
    """
    return send_email(to, subject, html_content)
