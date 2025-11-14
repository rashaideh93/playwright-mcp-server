# Test Case Design & Planning Template

## 📋 How to Design Test Cases with AI Assistance

### Step 1: Identify Feature/Workflow to Test

**Example:** User Registration Form

---

## Test Case Template

```
TEST CASE ID: TC_REG_001

Title: Valid User Registration

Feature: User Registration
Module: Authentication
Priority: Critical
Type: Functional Test

PRECONDITIONS:
- Browser is open
- User is on registration page (/register)
- Application is in test environment
- Test database is clean

TEST STEPS:
1. Navigate to registration page
2. Enter username: "testuser123"
3. Enter email: "test@example.com"
4. Enter password: "SecurePass123!"
5. Confirm password: "SecurePass123!"
6. Check "Accept Terms & Conditions" checkbox
7. Click "Register" button
8. Wait for page redirect

EXPECTED RESULTS:
✅ Form submits successfully
✅ User is redirected to dashboard or verification page
✅ Success message: "Registration successful!"
✅ User account created in database
✅ Verification email sent to "test@example.com"

ACTUAL RESULTS:
[Automated system will fill this in]

STATUS: ✅ PASS / ❌ FAIL

NOTES:
- Screenshot captured on success
- User can now login with credentials
```

---

## Comprehensive Test Suite: E-Commerce Platform

### TEST CATEGORY 1: Authentication (Critical)

#### TC_AUTH_001: Valid Login
```
WHAT: Valid user login with correct credentials
STEPS:
  1. Navigate to login page
  2. Enter email: "test@shop.com"
  3. Enter password: "ValidPass123"
  4. Click "Login"
  5. Verify redirect to dashboard

EXPECTED: User logged in, dashboard visible
TOOLS USED: navigate, fill_input, click_element, get_title
```

#### TC_AUTH_002: Invalid Login - Wrong Password
```
WHAT: User attempts login with wrong password
STEPS:
  1. Navigate to login page
  2. Enter email: "test@shop.com"
  3. Enter password: "WrongPassword"
  4. Click "Login"
  5. Get error message text

EXPECTED: Error message: "Invalid credentials"
TOOLS USED: navigate, fill_input, click_element, get_text
```

#### TC_AUTH_003: Account Lockout After Failed Attempts
```
WHAT: Account locks after 5 failed login attempts
STEPS:
  1. Navigate to login page
  2. REPEAT 5 times:
     - Enter email: "test@shop.com"
     - Enter wrong password
     - Click "Login"
     - Wait for error
  3. Attempt 6th login
  4. Get error message

EXPECTED: Message: "Account locked. Try again in 30 minutes"
TOOLS USED: navigate, fill_input, click_element, get_text, wait_for_navigation
```

#### TC_AUTH_004: Password Reset Flow
```
WHAT: User can reset forgotten password
STEPS:
  1. Navigate to login page
  2. Click "Forgot Password?" link
  3. Enter email: "test@shop.com"
  4. Click "Send Reset Email"
  5. Get confirmation message
  6. Get password reset link from email (mock)
  7. Click reset link
  8. Enter new password: "NewPass123"
  9. Confirm new password: "NewPass123"
  10. Click "Reset Password"

EXPECTED: "Password reset successful"
TOOLS USED: navigate, click_element, fill_input, get_text
```

---

### TEST CATEGORY 2: Product Browsing (High Priority)

#### TC_BROWSE_001: View All Products
```
WHAT: User can view all products on homepage
STEPS:
  1. Navigate to home page
  2. Get all product elements (selector: ".product-card")
  3. Count products
  4. Verify count > 0

EXPECTED: At least 10 products displayed
TOOLS USED: navigate, get_text, screenshot
```

#### TC_BROWSE_002: Filter Products by Category
```
WHAT: User can filter products by category
STEPS:
  1. Navigate to products page
  2. Click category filter "Electronics"
  3. Wait for page to update
  4. Get all visible products
  5. Verify all products are in Electronics category

EXPECTED: Only Electronics products shown
TOOLS USED: navigate, click_element, wait_for_navigation, get_text
```

#### TC_BROWSE_003: Search Functionality
```
WHAT: User can search for products
STEPS:
  1. Navigate to home page
  2. Fill search box: "laptop"
  3. Click "Search" button
  4. Wait for results
  5. Get product titles
  6. Verify "laptop" in results

EXPECTED: Results contain laptop products
TOOLS USED: navigate, fill_input, click_element, get_text
```

#### TC_BROWSE_004: Product Details Page
```
WHAT: Clicking product shows detailed view
STEPS:
  1. Navigate to products page
  2. Click first product
  3. Wait for page load
  4. Get product title, price, description
  5. Verify all details present
  6. Take screenshot

EXPECTED: Product details page fully loaded with all info
TOOLS USED: navigate, click_element, wait_for_navigation, get_text, screenshot
```

---

### TEST CATEGORY 3: Shopping Cart (High Priority)

#### TC_CART_001: Add Product to Cart
```
WHAT: User can add product to cart
STEPS:
  1. Navigate to product page
  2. Click "Add to Cart" button
  3. Wait for confirmation
  4. Navigate to cart page
  5. Verify product is in cart
  6. Get quantity and price

EXPECTED: Product added, correct quantity, correct price
TOOLS USED: navigate, click_element, wait_for_navigation, get_text
```

#### TC_CART_002: Update Product Quantity
```
WHAT: User can change product quantity in cart
STEPS:
  1. Navigate to cart page
  2. Find quantity input for product
  3. Clear current value
  4. Fill with "5"
  5. Click "Update Cart"
  6. Get updated total price
  7. Calculate expected total

EXPECTED: Total price updated correctly (price × 5)
TOOLS USED: navigate, fill_input, click_element, get_text
```

#### TC_CART_003: Remove Product from Cart
```
WHAT: User can remove product from cart
STEPS:
  1. Navigate to cart with items
  2. Click "Remove" button for product
  3. Wait for cart update
  4. Verify product removed
  5. Get remaining items count

EXPECTED: Product removed, cart updated
TOOLS USED: navigate, click_element, wait_for_navigation, get_text
```

#### TC_CART_004: Apply Discount Code
```
WHAT: User can apply valid discount code
STEPS:
  1. Navigate to cart page
  2. Fill promo code: "SUMMER20"
  3. Click "Apply Code"
  4. Get discount amount
  5. Get new total price
  6. Calculate expected discount (original × 0.20)

EXPECTED: 20% discount applied, price updated
TOOLS USED: navigate, fill_input, click_element, get_text
```

---

### TEST CATEGORY 4: Checkout Process (Critical)

#### TC_CHECKOUT_001: Complete Checkout Flow
```
WHAT: User completes full checkout successfully
STEPS:
  1. Navigate to cart with items
  2. Click "Proceed to Checkout"
  3. Wait for checkout page
  4. Fill billing address:
     - Name: "John Doe"
     - Street: "123 Main St"
     - City: "New York"
     - State: "NY"
     - ZIP: "10001"
  5. Fill shipping address (same as billing)
  6. Select shipping method: "Standard (3-5 days)"
  7. Fill payment info:
     - Card: "4111 1111 1111 1111"
     - Exp: "12/26"
     - CVC: "123"
  8. Click "Place Order"
  9. Wait for order confirmation
  10. Get order number

EXPECTED: Order confirmation page shown, order number generated
TOOLS USED: navigate, fill_input, click_element, get_text, wait_for_navigation, screenshot
```

#### TC_CHECKOUT_002: Form Validation - Missing Fields
```
WHAT: Checkout form validates required fields
STEPS:
  1. Navigate to checkout page
  2. Click "Place Order" without filling form
  3. Get error messages
  4. Verify error for each empty field

EXPECTED: Error messages for Name, Address, City, State, ZIP, Payment
TOOLS USED: navigate, click_element, get_text
```

#### TC_CHECKOUT_003: Order Confirmation Email
```
WHAT: Confirmation email sent after successful order
STEPS:
  1. Complete checkout successfully
  2. Get order number from confirmation page
  3. Check email inbox for confirmation email
  4. Verify email contains order number
  5. Verify email contains order items

EXPECTED: Email received with correct order details
TOOLS USED: navigate, fill_input, click_element, get_text
```

---

## Data-Driven Test Cases

### Template: Testing Multiple User Types

```
FOR EACH user_type IN [admin, regular_user, trial_user, guest]:
  
  TEST: Login and dashboard access for [user_type]
  
  STEPS:
    1. Navigate to login page
    2. Login as [user_type] user
    3. Navigate to dashboard
    4. Get visible menu options
    5. Verify menu matches permissions for [user_type]
  
  ADMIN USER expected menu:
    ✓ Dashboard
    ✓ Users Management
    ✓ Analytics
    ✓ Settings
  
  REGULAR USER expected menu:
    ✓ Dashboard
    ✓ Profile
    ✓ Orders
    ✓ Settings
  
  TRIAL USER expected menu:
    ✓ Dashboard
    ✓ Profile
    ✓ (Limited features)
  
  GUEST - Expected: Redirect to login page
```

---

## Edge Case Test Cases

### TC_EDGE_001: SQL Injection Prevention
```
WHAT: System prevents SQL injection attacks
STEPS:
  1. Navigate to login page
  2. Fill email: "test@test.com' OR '1'='1"
  3. Fill password: "anything"
  4. Click "Login"
  5. Get response

EXPECTED: Login fails, no database error shown, "Invalid credentials" message
TOOLS USED: navigate, fill_input, click_element, get_text
```

### TC_EDGE_002: XSS Prevention
```
WHAT: System prevents XSS attacks
STEPS:
  1. Navigate to product review form
  2. Fill review: "<script>alert('XSS')</script>"
  3. Click "Submit Review"
  4. Refresh page
  5. Get review text

EXPECTED: Script tag not executed, displayed as text only
TOOLS USED: navigate, fill_input, click_element, wait_for_navigation, get_text
```

### TC_EDGE_003: Large Input Handling
```
WHAT: System handles very long inputs gracefully
STEPS:
  1. Navigate to search page
  2. Fill search: "a" repeated 10,000 times
  3. Click "Search"
  4. Wait for response (max 5 seconds)

EXPECTED: Search completes, displays "No results" or error, doesn't crash
TOOLS USED: navigate, fill_input, click_element, wait_for_navigation
```

---

## Performance Test Cases

### TC_PERF_001: Page Load Time
```
WHAT: Homepage loads within acceptable time
STEPS:
  1. Record start time
  2. Navigate to home page
  3. Wait for "networkidle"
  4. Record end time
  5. Calculate load time
  6. Verify load time < 3 seconds

EXPECTED: Page fully loaded in < 3 seconds
TOOLS USED: navigate, wait_for_navigation
```

### TC_PERF_002: Search Performance with Large Dataset
```
WHAT: Search responds quickly even with many products
STEPS:
  1. Ensure database has 100,000 products
  2. Navigate to search page
  3. Record start time
  4. Fill search: "popular item"
  5. Click Search
  6. Wait for results
  7. Record end time
  8. Verify response time < 2 seconds

EXPECTED: Results returned in < 2 seconds
TOOLS USED: navigate, fill_input, click_element
```

---

## Cross-Browser Test Cases

### TC_CROSS_001: Homepage Display on All Browsers
```
FOR EACH browser IN [chromium, firefox, webkit]:
  
  TEST: Homepage display on [browser]
  
  STEPS:
    1. Launch [browser]
    2. Navigate to home page
    3. Get viewport size
    4. Take screenshot as "[browser]-home.png"
    5. Verify layout correct
    6. Click featured product
    7. Wait for product page
    8. Take screenshot as "[browser]-product.png"
    9. Close browser
  
  EXPECTED: Layout consistent across all browsers
  TOOLS USED: launch_browser, navigate, screenshot, click_element, wait_for_navigation, close_browser
```

---

## Test Case Priority Guide

```
CRITICAL (P0): Must pass for release
- User authentication
- Payment processing
- Order creation
- Data consistency

HIGH (P1): Should pass for release
- Core features
- Main workflows
- UI/UX
- Performance

MEDIUM (P2): Nice to have for release
- Edge cases
- Advanced features
- Optimization

LOW (P3): Can defer to next release
- UI polish
- Nice-to-have features
- Minor bugs
```

---

## AI Prompts for Test Case Generation

### Prompt 1: Generate Test Suite for Feature
```
"Generate comprehensive test cases for [feature name] including:
- Happy path (valid scenarios)
- Sad path (invalid inputs)
- Edge cases
- Security tests
- Performance tests

Format as test case IDs, titles, steps, and expected results."
```

### Prompt 2: Generate Data-Driven Tests
```
"Create data-driven test cases for [feature] testing these user types:
- [user_type_1]
- [user_type_2]
- [user_type_3]

Include expected outcomes for each user type."
```

### Prompt 3: Generate Edge Cases
```
"What are the most important edge cases for [feature]?
Generate test cases for:
- Boundary values
- Special characters
- Very large inputs
- Very small inputs
- Null/empty values
- Concurrent actions"
```

---

## Weekly Test Plan Template

```
WEEK OF: [Date]

MONDAY:
  [ ] Run authentication test suite
  [ ] Run product browsing tests
  [ ] Review results

TUESDAY:
  [ ] Run shopping cart tests
  [ ] Run checkout tests
  [ ] Run payment tests

WEDNESDAY:
  [ ] Run cross-browser tests (all 3 browsers)
  [ ] Run performance tests
  [ ] Document performance metrics

THURSDAY:
  [ ] Run data-driven tests (all user types)
  [ ] Run edge case tests
  [ ] Run security tests

FRIDAY:
  [ ] Generate weekly test report
  [ ] Send to stakeholders
  [ ] Identify failures and improvements
  [ ] Plan next week tests

TOTAL AUTOMATED TEST TIME: 60 minutes
EQUIVALENT MANUAL TIME: 8-10 hours
TIME SAVED: 7-9 hours
```

---

## Success Metrics

Track these KPIs:

```
Test Coverage:
  - Target: 80% of features automated
  - Measure: Number of automated tests / Total tests

Pass Rate:
  - Target: 95%+ tests passing
  - Measure: Passing tests / Total tests

Execution Time:
  - Current manual: 8 hours per cycle
  - Target automated: 30 minutes
  - Savings: 7.5 hours per cycle

Defect Detection:
  - Pre-automation: 20 bugs found in production
  - Post-automation: < 3 bugs in production
  - Improvement: 85% fewer production bugs

Release Velocity:
  - Before: 1 release/month
  - After: 2-3 releases/week
  - Improvement: 8-12x faster releases
```

---

**Use this template to design and execute your automated test cases with AI assistance!**
