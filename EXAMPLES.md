# Playwright MCP Server - Usage Examples

This document provides practical examples of how to use the Playwright MCP Server with various AI assistants and tools.

## Example 1: Basic Web Scraping

### Scenario
Extract the title and first paragraph from a website.

### Tool Sequence

```
Step 1: Launch Browser
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://example.com"
  Expected Response: browser-1

Step 2: Get Page Title
  Tool: get_title
  Parameters:
    browserId: "browser-1"
  Expected Response: "Example Domain"

Step 3: Extract Text
  Tool: get_text
  Parameters:
    browserId: "browser-1"
    selector: "p"
  Expected Response: "This domain is established to be used for illustrative examples..."

Step 4: Take Screenshot
  Tool: screenshot
  Parameters:
    browserId: "browser-1"
    filename: "example_page.png"
  Expected Response: "Screenshot saved to example_page.png"

Step 5: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Example 2: Form Submission

### Scenario
Fill out and submit a login form.

### Tool Sequence

```
Step 1: Launch Browser
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://example.com/login"
  Expected Response: browser-1

Step 2: Fill Username
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input#username"
    text: "testuser"
  Expected Response: "Successfully filled input with selector: input#username"

Step 3: Fill Password
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input#password"
    text: "securepassword123"
  Expected Response: "Successfully filled input with selector: input#password"

Step 4: Click Submit
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "button[type='submit']"
  Expected Response: "Successfully clicked element with selector: button[type='submit']"

Step 5: Wait for Navigation
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
    timeout: 5000
  Expected Response: "Navigation completed"

Step 6: Verify Success
  Tool: get_url
  Parameters:
    browserId: "browser-1"
  Expected Response: "Current URL: https://example.com/dashboard"

Step 7: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Example 3: Multi-Step Navigation

### Scenario
Navigate through multiple pages and collect information.

### Tool Sequence

```
Step 1: Launch Browser
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://example.com/products"
  Expected Response: browser-1

Step 2: Get First Page Title
  Tool: get_title
  Parameters:
    browserId: "browser-1"
  Expected Response: "Products - Example.com"

Step 3: Click on Product
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "a.product-link[href*='product-1']"
  Expected Response: "Successfully clicked element..."

Step 4: Wait for Navigation
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
  Expected Response: "Navigation completed"

Step 5: Get Product Details
  Tool: get_text
  Parameters:
    browserId: "browser-1"
    selector: "div.product-description"
  Expected Response: "Premium product description..."

Step 6: Navigate Back
  Tool: navigate
  Parameters:
    browserId: "browser-1"
    url: "https://example.com/products"
    waitUntil: "load"
  Expected Response: "Successfully navigated to https://example.com/products"

Step 7: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Example 4: Search and Extract Results

### Scenario
Search for content and extract results from search results page.

### Tool Sequence

```
Step 1: Launch Browser
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://example-search.com"
  Expected Response: browser-1

Step 2: Fill Search Box
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input[name='q']"
    text: "TypeScript programming"
  Expected Response: "Successfully filled input..."

Step 3: Submit Search
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "button[type='submit']"
  Expected Response: "Successfully clicked element..."

Step 4: Wait for Results
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
    timeout: 10000
  Expected Response: "Navigation completed"

Step 5: Extract Result Titles
  Tool: get_text
  Parameters:
    browserId: "browser-1"
    selector: "div.search-results h2"
  Expected Response: "TypeScript Documentation\nTypeScript Handbook\n..."

Step 6: Screenshot Results
  Tool: screenshot
  Parameters:
    browserId: "browser-1"
    filename: "search_results.png"
  Expected Response: "Screenshot saved to search_results.png"

Step 7: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Example 5: Testing Responsive Design

### Scenario
Test a website in different browser engines.

### Browser Test 1: Chromium
```
Tool: launch_browser
Parameters:
  browserType: "chromium"
  headless: true
  url: "https://example.com"
Response: browser-chromium

Tool: screenshot
Parameters:
  browserId: "browser-chromium"
  filename: "chromium_view.png"
Response: Screenshot saved

Tool: close_browser
Parameters:
  browserId: "browser-chromium"
```

### Browser Test 2: Firefox
```
Tool: launch_browser
Parameters:
  browserType: "firefox"
  headless: true
  url: "https://example.com"
Response: browser-firefox

Tool: screenshot
Parameters:
  browserId: "browser-firefox"
  filename: "firefox_view.png"
Response: Screenshot saved

Tool: close_browser
Parameters:
  browserId: "browser-firefox"
```

### Browser Test 3: WebKit
```
Tool: launch_browser
Parameters:
  browserType: "webkit"
  headless: true
  url: "https://example.com"
Response: browser-webkit

Tool: screenshot
Parameters:
  browserId: "browser-webkit"
  filename: "webkit_view.png"
Response: Screenshot saved

Tool: close_browser
Parameters:
  browserId: "browser-webkit"
```

## Example 6: E-Commerce Product Ordering

### Scenario
Complete a product purchase workflow.

### Tool Sequence

```
Step 1: Launch Browser and Go to Store
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://shop.example.com"
  Expected Response: browser-1

Step 2: Search for Product
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input.search-box"
    text: "wireless headphones"
  Expected Response: "Successfully filled input..."

Step 3: Submit Search
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "button.search-btn"
  Expected Response: "Successfully clicked element..."

Step 4: Wait for Results
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
  Expected Response: "Navigation completed"

Step 5: Click First Product
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "div.product-item:first-child a"
  Expected Response: "Successfully clicked element..."

Step 6: Wait for Product Page
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
  Expected Response: "Navigation completed"

Step 7: Add to Cart
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "button.add-to-cart"
  Expected Response: "Successfully clicked element..."

Step 8: Go to Checkout
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "a.checkout-link"
  Expected Response: "Successfully clicked element..."

Step 9: Wait for Checkout Page
  Tool: wait_for_navigation
  Parameters:
    browserId: "browser-1"
  Expected Response: "Navigation completed"

Step 10: Fill Shipping Address
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input[name='address']"
    text: "123 Main Street"
  Expected Response: "Successfully filled input..."

Step 11: Fill City
  Tool: fill_input
  Parameters:
    browserId: "browser-1"
    selector: "input[name='city']"
    text: "Springfield"
  Expected Response: "Successfully filled input..."

Step 12: Complete Purchase
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "button.complete-purchase"
  Expected Response: "Successfully clicked element..."

Step 13: Verify Order Confirmation
  Tool: get_title
  Parameters:
    browserId: "browser-1"
  Expected Response: "Order Confirmation"

Step 14: Screenshot Confirmation
  Tool: screenshot
  Parameters:
    browserId: "browser-1"
    filename: "order_confirmation.png"
  Expected Response: "Screenshot saved to order_confirmation.png"

Step 15: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Example 7: API Testing with Browser

### Scenario
Load an API documentation page and test endpoints.

### Tool Sequence

```
Step 1: Open API Docs
  Tool: launch_browser
  Parameters:
    browserType: "chromium"
    headless: true
    url: "https://api.example.com/docs"
  Expected Response: browser-1

Step 2: Get Page Title
  Tool: get_title
  Parameters:
    browserId: "browser-1"
  Expected Response: "API Documentation - Example"

Step 3: Navigate to Endpoint
  Tool: click_element
  Parameters:
    browserId: "browser-1"
    selector: "a[href='#/users/get']"
  Expected Response: "Successfully clicked element..."

Step 4: Get Endpoint Description
  Tool: get_text
  Parameters:
    browserId: "browser-1"
    selector: "div.endpoint-description"
  Expected Response: "Get user information by ID..."

Step 5: Screenshot Endpoint
  Tool: screenshot
  Parameters:
    browserId: "browser-1"
    filename: "api_endpoint.png"
  Expected Response: "Screenshot saved to api_endpoint.png"

Step 6: Close Browser
  Tool: close_browser
  Parameters:
    browserId: "browser-1"
  Expected Response: "Browser browser-1 closed successfully"
```

## Using with GitHub Copilot

When using with GitHub Copilot in VS Code, you can give natural language instructions:

```
"Open example.com, fill the search box with 'TypeScript', submit the form, 
and show me the first 5 search result titles"

Copilot will use the tools in sequence:
1. launch_browser
2. navigate (if needed)
3. fill_input (for search box)
4. click_element (submit button)
5. wait_for_navigation
6. get_text (for results)
7. close_browser
```

## Using with Claude

Similar natural language workflow with Claude Desktop:

```
"I need to test my login form. Please:
1. Go to my test site at http://localhost:3000/login
2. Enter 'testuser@example.com' in the email field
3. Enter 'testpass123' in the password field
4. Click the login button
5. Verify I'm on the dashboard page
6. Take a screenshot"

Claude will orchestrate all the necessary tool calls.
```

## Common Patterns

### Pattern 1: Extract Dynamic Content
```
launch_browser → navigate → wait_for_navigation → get_text → close_browser
```

### Pattern 2: Interact and Verify
```
launch_browser → fill_input → click_element → wait_for_navigation → get_title → close_browser
```

### Pattern 3: Multi-page Crawl
```
launch_browser → (navigate → click → wait_for_navigation → get_text)* → close_browser
```

### Pattern 4: Screenshot Sequence
```
launch_browser → (navigate → screenshot)* → close_browser
```

## Troubleshooting Examples

### Issue: Element Not Found
**Tool Call:**
```
get_text with selector: "div.nonexistent"
```
**Error:**
```
Error getting text: [Error message about selector not matching]
```
**Solution:** Use correct CSS selector from browser DevTools

### Issue: Navigation Timeout
**Tool Call:**
```
wait_for_navigation with timeout: 1000 (too short)
```
**Error:**
```
Error waiting for navigation: Timeout 1000ms exceeded
```
**Solution:** Increase timeout value to 5000-10000ms

### Issue: Stale Browser ID
**Tool Call:**
```
navigate with browserId: "browser-99" (doesn't exist)
```
**Error:**
```
Browser browser-99 not found
```
**Solution:** Use correct browser ID from launch_browser response

## Best Practices

1. **Always capture browser ID** from launch_browser response
2. **Use meaningful filenames** for screenshots
3. **Wait appropriately** after navigation
4. **Test selectors in DevTools** before using
5. **Close browsers** when done to free memory
6. **Use headless=true** for faster execution
7. **Handle errors gracefully** in your AI instructions
