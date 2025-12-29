#!/usr/bin/env python3
"""
WooASM SaaS Backend API Testing Script
Tests the complete flow: registration -> login -> dashboard -> test plan -> plugin validation -> admin
"""

import requests
import json
import sys
import os
from datetime import datetime

# Get backend URL from frontend .env
def get_backend_url():
    env_path = "/app/frontend/.env"
    try:
        with open(env_path, 'r') as f:
            for line in f:
                if line.startswith('REACT_APP_BACKEND_URL='):
                    return line.split('=', 1)[1].strip()
    except FileNotFoundError:
        print(f"❌ Could not find {env_path}")
        return None
    return None

BACKEND_URL = get_backend_url()
if not BACKEND_URL:
    print("❌ Could not get REACT_APP_BACKEND_URL from frontend/.env")
    sys.exit(1)

API_BASE = f"{BACKEND_URL}/api"
print(f"🔗 Testing API at: {API_BASE}")

# Test data
TEST_USER = {
    "email": "nodetest@example.com",
    "password": "TestPassword123",
    "name": "Node Test User"
}

ADMIN_CREDS = {
    "username": "absaar",
    "password": "AbsaarAdmin@12345"
}

# Global variables to store tokens and data
access_token = None
admin_token = None
license_key = None

def make_request(method, endpoint, data=None, headers=None, expected_status=200):
    """Make HTTP request and handle response"""
    url = f"{API_BASE}{endpoint}"
    
    try:
        if method.upper() == 'GET':
            response = requests.get(url, headers=headers, timeout=30)
        elif method.upper() == 'POST':
            response = requests.post(url, json=data, headers=headers, timeout=30)
        elif method.upper() == 'PUT':
            response = requests.put(url, json=data, headers=headers, timeout=30)
        elif method.upper() == 'DELETE':
            response = requests.delete(url, headers=headers, timeout=30)
        else:
            raise ValueError(f"Unsupported method: {method}")
        
        print(f"📡 {method.upper()} {endpoint} -> {response.status_code}")
        
        if response.status_code != expected_status:
            print(f"❌ Expected {expected_status}, got {response.status_code}")
            print(f"Response: {response.text}")
            return None, response.status_code
        
        try:
            return response.json(), response.status_code
        except json.JSONDecodeError:
            return response.text, response.status_code
            
    except requests.exceptions.RequestException as e:
        print(f"❌ Request failed: {e}")
        return None, 0

def test_health_check():
    """Test 0: Health Check"""
    print("\n🧪 Test 0: Health Check")
    
    data, status = make_request('GET', '', expected_status=200)
    
    if data and data.get('status') == 'ok':
        print("✅ Health check successful")
        print(f"   Status: {data.get('status')}")
        print(f"   Message: {data.get('message')}")
        return True
    else:
        print("❌ Health check failed")
        print(f"   Response: {data}")
        return False

def test_user_registration():
    """Test 1: User Registration"""
    print("\n🧪 Test 1: User Registration")
    
    data, status = make_request('POST', '/auth/register', TEST_USER, expected_status=201)
    
    if status == 201 and data and data.get('message') and 'user' in data:
        print("✅ User registration successful")
        print(f"   User ID: {data.get('user', {}).get('id')}")
        print(f"   Email: {data.get('user', {}).get('email')}")
        return True
    elif status == 400 and data and 'already registered' in data.get('detail', ''):
        print("✅ User registration - email already exists (expected)")
        print(f"   Email: {TEST_USER['email']} already registered")
        return True
    else:
        print("❌ User registration failed")
        print(f"   Response: {data}")
        return False

def test_user_login():
    """Test 2: User Login"""
    global access_token, license_key
    print("\n🧪 Test 2: User Login")
    
    login_data = {
        "email": TEST_USER["email"],
        "password": TEST_USER["password"]
    }
    
    data, status = make_request('POST', '/auth/login', login_data, expected_status=200)
    
    if data and data.get('access_token'):
        access_token = data.get('access_token')
        license_key = data.get('user', {}).get('license_key')
        print("✅ User login successful")
        print(f"   Access token: {access_token[:20]}...")
        print(f"   License key: {license_key}")
        return True
    else:
        print("❌ User login failed")
        print(f"   Response: {data}")
        return False

def test_dashboard():
    """Test 3: Get Dashboard"""
    print("\n🧪 Test 3: Get Dashboard")
    
    if not access_token:
        print("❌ No access token available")
        return False
    
    headers = {"Authorization": f"Bearer {access_token}"}
    data, status = make_request('GET', '/dashboard', headers=headers, expected_status=200)
    
    if data and 'user' in data and 'subscription' in data:
        print("✅ Dashboard data retrieved successfully")
        print(f"   User: {data.get('user', {}).get('name')}")
        print(f"   Plan: {data.get('user', {}).get('plan')}")
        print(f"   Subscription Status: {data.get('subscription', {}).get('status')}")
        print(f"   Sites Count: {data.get('sites_count', 0)}")
        return True
    else:
        print("❌ Dashboard retrieval failed")
        print(f"   Response: {data}")
        return False

def test_license():
    """Test 4: Get License"""
    print("\n🧪 Test 4: Get License")
    
    if not access_token:
        print("❌ No access token available")
        return False
    
    headers = {"Authorization": f"Bearer {access_token}"}
    data, status = make_request('GET', '/dashboard/license', headers=headers, expected_status=200)
    
    if data and 'license_key' in data:
        print("✅ License data retrieved successfully")
        print(f"   License Key: {data.get('license_key')}")
        print(f"   Plan: {data.get('plan')}")
        print(f"   Status: {data.get('status')}")
        print(f"   Sites Used: {data.get('sites_used', 0)}")
        print(f"   Sites Allowed: {data.get('sites_allowed', 0)}")
        return True
    else:
        print("❌ License retrieval failed")
        print(f"   Response: {data}")
        return False

def test_activate_test_plan():
    """Test 5: Activate Test Plan"""
    print("\n🧪 Test 5: Activate Test Plan")
    
    if not access_token:
        print("❌ No access token available")
        return False
    
    headers = {"Authorization": f"Bearer {access_token}"}
    plan_data = {
        "plan": "starter",
        "billing_cycle": "monthly"
    }
    
    data, status = make_request('POST', '/billing/activate-test-plan', plan_data, headers=headers, expected_status=200)
    
    if data and data.get('message') and 'activated successfully' in data.get('message'):
        print("✅ Test plan activated successfully")
        print(f"   Plan: {data.get('plan')}")
        print(f"   Billing Cycle: {data.get('billing_cycle')}")
        print(f"   Ends At: {data.get('ends_at')}")
        return True
    else:
        print("❌ Test plan activation failed")
        print(f"   Response: {data}")
        return False

def test_dashboard_after_upgrade():
    """Test 6: Get Dashboard After Upgrade"""
    print("\n🧪 Test 6: Get Dashboard After Upgrade")
    
    if not access_token:
        print("❌ No access token available")
        return False
    
    headers = {"Authorization": f"Bearer {access_token}"}
    data, status = make_request('GET', '/dashboard', headers=headers, expected_status=200)
    
    if data and data.get('user', {}).get('plan') == 'starter':
        print("✅ Dashboard shows upgraded plan")
        print(f"   Plan: {data.get('user', {}).get('plan')}")
        print(f"   Limits: {data.get('limits', {})}")
        return True
    else:
        print("❌ Dashboard upgrade verification failed")
        print(f"   Current plan: {data.get('user', {}).get('plan') if data else 'N/A'}")
        return False

def test_plugin_license_validation():
    """Test 7: Plugin License Validation"""
    print("\n🧪 Test 7: Plugin License Validation")
    
    if not license_key:
        print("❌ No license key available")
        return False
    
    validation_data = {
        "license_key": license_key,
        "site_url": "https://nodetest.com",
        "site_id": "node-test-site-456",
        "plugin_version": "1.0.0"
    }
    
    data, status = make_request('POST', '/plugin/validate-license', validation_data, expected_status=200)
    
    if data and data.get('valid') == True:
        print("✅ Plugin license validation successful")
        print(f"   Valid: {data.get('valid')}")
        print(f"   Plan: {data.get('plan')}")
        print(f"   Features: {data.get('features', [])}")
        print(f"   Limits: {data.get('limits', {})}")
        return True
    else:
        print("❌ Plugin license validation failed")
        print(f"   Response: {data}")
        return False

def test_admin_login():
    """Test 8: Admin Login"""
    global admin_token
    print("\n🧪 Test 8: Admin Login")
    
    data, status = make_request('POST', '/admin/login', ADMIN_CREDS, expected_status=200)
    
    if data and data.get('admin_token'):
        admin_token = data.get('admin_token')
        print("✅ Admin login successful")
        print(f"   Admin token: {admin_token[:20]}...")
        print(f"   Role: {data.get('role')}")
        return True
    else:
        print("❌ Admin login failed")
        print(f"   Response: {data}")
        return False

def test_admin_stats():
    """Test 9: Admin Stats"""
    print("\n🧪 Test 9: Admin Stats")
    
    if not admin_token:
        print("❌ No admin token available")
        return False
    
    headers = {"X-Admin-Token": admin_token}
    data, status = make_request('GET', '/admin/stats', headers=headers, expected_status=200)
    
    if data and 'overview' in data:
        print("✅ Admin stats retrieved successfully")
        print(f"   Total Users: {data.get('overview', {}).get('total_users', 0)}")
        print(f"   Plans: {data.get('plans', {})}")
        print(f"   Revenue MRR: ${data.get('revenue', {}).get('mrr', 0)}")
        print(f"   Usage: {data.get('usage', {})}")
        print(f"   Sites: {data.get('sites', {})}")
        return True
    else:
        print("❌ Admin stats retrieval failed")
        print(f"   Response: {data}")
        return False

def test_trust_notifications():
    """Test 10: Trust Notifications"""
    print("\n🧪 Test 10: Trust Notifications")
    
    data, status = make_request('GET', '/notifications/recent', expected_status=200)
    
    if data and 'notification' in data:
        notification = data.get('notification', {})
        print("✅ Trust notification retrieved successfully")
        print(f"   Display Name: {notification.get('display_name')}")
        print(f"   Plan: {notification.get('plan')}")
        print(f"   Seconds Ago: {notification.get('seconds_ago')}")
        return True
    else:
        print("❌ Trust notification retrieval failed")
        print(f"   Response: {data}")
        return False

def main():
    """Run all tests"""
    print("🚀 Starting WooASM SaaS Backend API Tests")
    print(f"⏰ Test started at: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    
    tests = [
        ("Health Check", test_health_check),
        ("User Registration", test_user_registration),
        ("User Login", test_user_login),
        ("Dashboard API", test_dashboard),
        ("License Key Management", test_license),
        ("Test Plan Activation", test_activate_test_plan),
        ("Dashboard After Upgrade", test_dashboard_after_upgrade),
        ("Plugin License Validation", test_plugin_license_validation),
        ("Admin Login", test_admin_login),
        ("Admin Stats", test_admin_stats),
        ("Trust Notifications", test_trust_notifications)
    ]
    
    passed = 0
    failed = 0
    
    for test_name, test_func in tests:
        try:
            if test_func():
                passed += 1
            else:
                failed += 1
        except Exception as e:
            print(f"❌ {test_name} failed with exception: {e}")
            failed += 1
    
    print(f"\n📊 Test Results:")
    print(f"✅ Passed: {passed}")
    print(f"❌ Failed: {failed}")
    print(f"📈 Success Rate: {(passed/(passed+failed)*100):.1f}%")
    
    if failed > 0:
        print(f"\n⚠️  {failed} test(s) failed. Check the logs above for details.")
        sys.exit(1)
    else:
        print(f"\n🎉 All tests passed successfully!")

if __name__ == "__main__":
    main()