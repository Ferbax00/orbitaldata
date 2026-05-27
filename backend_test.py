import requests
import json
from datetime import datetime
import time

# Backend URL from frontend/.env
BASE_URL = "https://orbital-portal.preview.emergentagent.com/api"

def print_test_header(test_name):
    print(f"\n{'='*80}")
    print(f"TEST: {test_name}")
    print(f"{'='*80}")

def print_result(passed, message):
    status = "✅ PASS" if passed else "❌ FAIL"
    print(f"{status}: {message}")

def test_health_check():
    """Test GET /api/ endpoint"""
    print_test_header("Health Check Endpoint")
    
    try:
        response = requests.get(f"{BASE_URL}/")
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 200:
            data = response.json()
            if "message" in data:
                print_result(True, "Health check endpoint working")
                return True
            else:
                print_result(False, "Health check response missing 'message' field")
                return False
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Health check failed with error: {str(e)}")
        return False

def test_create_contact_request_valid():
    """Test POST /api/contact-requests with valid data"""
    print_test_header("Create Contact Request - Valid Data")
    
    test_data = {
        "name": "Juan Pérez",
        "email": "juan.perez@example.com",
        "message": "Estoy interesado en sus servicios de seguridad electrónica."
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
        
        if response.status_code == 201:
            data = response.json()
            
            # Verify all required fields are present
            required_fields = ["id", "name", "email", "message", "created_at"]
            missing_fields = [f for f in required_fields if f not in data]
            
            if missing_fields:
                print_result(False, f"Response missing fields: {missing_fields}")
                return False, None
            
            # Verify data matches input
            if data["name"] != test_data["name"]:
                print_result(False, f"Name mismatch: expected {test_data['name']}, got {data['name']}")
                return False, None
            
            if data["email"] != test_data["email"]:
                print_result(False, f"Email mismatch: expected {test_data['email']}, got {data['email']}")
                return False, None
            
            if data["message"] != test_data["message"]:
                print_result(False, f"Message mismatch: expected {test_data['message']}, got {data['message']}")
                return False, None
            
            # Verify UUID format for id
            if len(data["id"]) < 32:
                print_result(False, f"Invalid ID format: {data['id']}")
                return False, None
            
            print_result(True, "Contact request created successfully with valid data")
            return True, data["id"]
        else:
            print_result(False, f"Expected status 201, got {response.status_code}")
            return False, None
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False, None

def test_create_contact_request_empty_name():
    """Test POST /api/contact-requests with empty name"""
    print_test_header("Create Contact Request - Empty Name")
    
    test_data = {
        "name": "",
        "email": "test@example.com",
        "message": "Test message"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print_result(True, "Empty name correctly rejected with 422")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_create_contact_request_invalid_email():
    """Test POST /api/contact-requests with invalid email"""
    print_test_header("Create Contact Request - Invalid Email")
    
    test_data = {
        "name": "Test User",
        "email": "invalid-email",
        "message": "Test message"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print_result(True, "Invalid email correctly rejected with 422")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_create_contact_request_empty_message():
    """Test POST /api/contact-requests with empty message"""
    print_test_header("Create Contact Request - Empty Message")
    
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": ""
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print_result(True, "Empty message correctly rejected with 422")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_create_contact_request_name_too_long():
    """Test POST /api/contact-requests with name exceeding 200 chars"""
    print_test_header("Create Contact Request - Name Too Long")
    
    test_data = {
        "name": "A" * 201,  # 201 characters
        "email": "test@example.com",
        "message": "Test message"
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print_result(True, "Name exceeding 200 chars correctly rejected with 422")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_create_contact_request_message_too_long():
    """Test POST /api/contact-requests with message exceeding 2000 chars"""
    print_test_header("Create Contact Request - Message Too Long")
    
    test_data = {
        "name": "Test User",
        "email": "test@example.com",
        "message": "A" * 2001  # 2001 characters
    }
    
    try:
        response = requests.post(
            f"{BASE_URL}/contact-requests",
            json=test_data,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.text}")
        
        if response.status_code == 422:
            print_result(True, "Message exceeding 2000 chars correctly rejected with 422")
            return True
        else:
            print_result(False, f"Expected status 422, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_get_contact_requests():
    """Test GET /api/contact-requests endpoint"""
    print_test_header("Get All Contact Requests")
    
    # First, create multiple contact requests
    print("\nCreating test contact requests...")
    test_requests = [
        {
            "name": "María García",
            "email": "maria.garcia@example.com",
            "message": "Necesito información sobre sistemas de videovigilancia."
        },
        {
            "name": "Carlos Rodríguez",
            "email": "carlos.rodriguez@example.com",
            "message": "Quiero cotizar un sistema de control de acceso."
        },
        {
            "name": "Ana Martínez",
            "email": "ana.martinez@example.com",
            "message": "Estoy interesado en sus servicios de cableado estructurado."
        }
    ]
    
    created_ids = []
    for req in test_requests:
        try:
            response = requests.post(
                f"{BASE_URL}/contact-requests",
                json=req,
                headers={"Content-Type": "application/json"}
            )
            if response.status_code == 201:
                created_ids.append(response.json()["id"])
                print(f"  ✓ Created request from {req['name']}")
                time.sleep(0.5)  # Small delay to ensure different timestamps
        except Exception as e:
            print(f"  ✗ Failed to create request: {str(e)}")
    
    # Now test GET endpoint
    print("\nTesting GET /api/contact-requests...")
    try:
        response = requests.get(f"{BASE_URL}/contact-requests")
        
        print(f"Status Code: {response.status_code}")
        
        if response.status_code == 200:
            data = response.json()
            print(f"Number of requests returned: {len(data)}")
            
            if not isinstance(data, list):
                print_result(False, "Response is not a list")
                return False
            
            if len(data) == 0:
                print_result(False, "No contact requests returned (expected at least the ones we created)")
                return False
            
            # Verify structure of first item
            first_item = data[0]
            required_fields = ["id", "name", "email", "message", "created_at"]
            missing_fields = [f for f in required_fields if f not in first_item]
            
            if missing_fields:
                print_result(False, f"Response items missing fields: {missing_fields}")
                return False
            
            # Verify sorting by created_at descending
            print("\nVerifying sort order (created_at descending)...")
            for i in range(len(data) - 1):
                current_time = datetime.fromisoformat(data[i]["created_at"].replace('Z', '+00:00'))
                next_time = datetime.fromisoformat(data[i+1]["created_at"].replace('Z', '+00:00'))
                
                if current_time < next_time:
                    print_result(False, f"Sort order incorrect: item {i} is older than item {i+1}")
                    return False
            
            print_result(True, f"GET endpoint working correctly, returned {len(data)} requests in correct order")
            
            # Display sample of returned data
            print("\nSample of returned data (first 3 items):")
            for i, item in enumerate(data[:3]):
                print(f"\n  Request {i+1}:")
                print(f"    Name: {item['name']}")
                print(f"    Email: {item['email']}")
                print(f"    Message: {item['message'][:50]}...")
                print(f"    Created: {item['created_at']}")
            
            return True
        else:
            print_result(False, f"Expected status 200, got {response.status_code}")
            return False
    except Exception as e:
        print_result(False, f"Request failed with error: {str(e)}")
        return False

def test_create_contact_request_missing_fields():
    """Test POST /api/contact-requests with missing required fields"""
    print_test_header("Create Contact Request - Missing Fields")
    
    test_cases = [
        ({"email": "test@example.com", "message": "Test"}, "name"),
        ({"name": "Test", "message": "Test"}, "email"),
        ({"name": "Test", "email": "test@example.com"}, "message"),
    ]
    
    all_passed = True
    for test_data, missing_field in test_cases:
        print(f"\nTesting without '{missing_field}' field...")
        try:
            response = requests.post(
                f"{BASE_URL}/contact-requests",
                json=test_data,
                headers={"Content-Type": "application/json"}
            )
            
            print(f"Status Code: {response.status_code}")
            
            if response.status_code == 422:
                print_result(True, f"Missing {missing_field} correctly rejected with 422")
            else:
                print_result(False, f"Expected status 422, got {response.status_code}")
                all_passed = False
        except Exception as e:
            print_result(False, f"Request failed with error: {str(e)}")
            all_passed = False
    
    return all_passed

def run_all_tests():
    """Run all backend tests"""
    print("\n" + "="*80)
    print("ORBITALDATA BACKEND API TESTS")
    print("="*80)
    print(f"Backend URL: {BASE_URL}")
    print(f"Test Started: {datetime.now().isoformat()}")
    
    results = {}
    
    # Test 1: Health Check
    results["health_check"] = test_health_check()
    
    # Test 2: Create with valid data
    results["create_valid"], created_id = test_create_contact_request_valid()
    
    # Test 3: Validation tests
    results["empty_name"] = test_create_contact_request_empty_name()
    results["invalid_email"] = test_create_contact_request_invalid_email()
    results["empty_message"] = test_create_contact_request_empty_message()
    results["name_too_long"] = test_create_contact_request_name_too_long()
    results["message_too_long"] = test_create_contact_request_message_too_long()
    results["missing_fields"] = test_create_contact_request_missing_fields()
    
    # Test 4: Get all requests
    results["get_all"] = test_get_contact_requests()
    
    # Summary
    print("\n" + "="*80)
    print("TEST SUMMARY")
    print("="*80)
    
    passed = sum(1 for v in results.values() if v)
    total = len(results)
    
    print(f"\nTotal Tests: {total}")
    print(f"Passed: {passed}")
    print(f"Failed: {total - passed}")
    print(f"Success Rate: {(passed/total)*100:.1f}%")
    
    print("\nDetailed Results:")
    for test_name, result in results.items():
        status = "✅ PASS" if result else "❌ FAIL"
        print(f"  {status} - {test_name}")
    
    print(f"\nTest Completed: {datetime.now().isoformat()}")
    print("="*80)
    
    return all(results.values())

if __name__ == "__main__":
    success = run_all_tests()
    exit(0 if success else 1)
