# Playwright MCP Server - API Reference

## Complete Tool Specifications

This document provides detailed API specifications for all 10 tools available in the Playwright MCP Server.

---

## Tool 1: launch_browser

### Overview
Launches a new browser instance and creates a default page. Returns a unique browser ID for use with other tools.

### Input Schema
```json
{
  "browserType": "chromium|firefox|webkit",
  "headless": true|false (optional, default: true),
  "url": "https://example.com" (optional)
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| browserType | string | Yes | N/A | Browser engine: "chromium", "firefox", or "webkit" |
| headless | boolean | No | true | Run without visible UI |
| url | string | No | None | Optional URL to navigate to immediately |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Browser launched successfully. Browser ID: browser-1, Browser Type: chromium"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserType: "chromium"
  headless: true
  url: "https://example.com"

Response: browser-1
```

### Error Handling
- Returns error message if browser launch fails
- Includes details about the failure

### Notes
- Each browser gets a unique ID (browser-1, browser-2, etc.)
- A default browser context and page are created
- If URL is provided, navigation is automatic
- Browser persists until closed with close_browser

---

## Tool 2: navigate

### Overview
Navigate to a specific URL in an open browser. Supports different wait conditions for page readiness.

### Input Schema
```json
{
  "browserId": "browser-1",
  "url": "https://example.com",
  "waitUntil": "load|domcontentloaded|networkidle" (optional, default: "load")
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| browserId | string | Yes | N/A | ID of browser from launch_browser |
| url | string | Yes | N/A | Full URL to navigate to |
| waitUntil | enum | No | "load" | When to consider navigation complete |

### waitUntil Options
- **"load"** - Wait for page load event (standard)
- **"domcontentloaded"** - Wait for DOM content loaded event (faster)
- **"networkidle"** - Wait for network idle state (slower, more thorough)

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Successfully navigated to https://example.com"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  url: "https://example.com/products"
  waitUntil: "load"

Response: Successfully navigated to https://example.com/products
```

### Error Handling
- Returns error if browser ID not found
- Returns timeout error if URL takes too long to load
- Returns network error if URL is invalid

### Notes
- Navigating to another page clears previous page state
- Use wait_for_navigation after triggering navigation via click

---

## Tool 3: click_element

### Overview
Click an element on the page using a CSS selector.

### Input Schema
```json
{
  "browserId": "browser-1",
  "selector": "button.submit"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |
| selector | string | Yes | CSS selector for element to click |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Successfully clicked element with selector: button.submit"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  selector: "button[type='submit']"

Response: Successfully clicked element with selector: button[type='submit']
```

### CSS Selector Examples
```css
/* By ID */
#loginBtn

/* By class */
.submit-button

/* By attribute */
button[type='submit']
button[data-action='save']

/* By tag */
button
input
a

/* Combinations */
form#myForm button[type='submit']
div.container > button

/* Pseudo-selectors */
button:first-child
input:last-of-type
```

### Error Handling
- Returns error if browser ID not found
- Returns error if element not found
- Returns error if element not visible/interactable

### Notes
- Element must be visible and interactable
- Automatically scrolls element into view if needed
- Waits for element to be ready before clicking

---

## Tool 4: fill_input

### Overview
Fill an input field with text. Can fill text inputs, textareas, and password fields.

### Input Schema
```json
{
  "browserId": "browser-1",
  "selector": "input#email",
  "text": "user@example.com"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |
| selector | string | Yes | CSS selector for input element |
| text | string | Yes | Text to fill into the input |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Successfully filled input with selector: input#email"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  selector: "input[name='email']"
  text: "john.doe@example.com"

Response: Successfully filled input with selector: input[name='email']
```

### Supported Input Types
- text
- password
- email
- search
- number
- url
- tel
- textarea

### Error Handling
- Returns error if browser ID not found
- Returns error if element not found
- Returns error if element is not an input

### Notes
- Clears existing text first
- Supports special characters
- Works with contenteditable elements

---

## Tool 5: get_text

### Overview
Extract text content from an element using a CSS selector.

### Input Schema
```json
{
  "browserId": "browser-1",
  "selector": "h1.title"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |
| selector | string | Yes | CSS selector for element |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Text content: Hello World"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  selector: "p.description"

Response: Text content: This is a product description...
```

### Behavior
- Returns trimmed text content
- Handles nested elements
- Returns empty string if no text found
- Preserves newlines and formatting

### Error Handling
- Returns error if browser ID not found
- Returns error if element not found
- Returns error message for other issues

### Notes
- Gets textContent, not innerHTML
- Good for extracting readable text
- Works with dynamic content

---

## Tool 6: get_title

### Overview
Get the title of the current page (from `<title>` tag).

### Input Schema
```json
{
  "browserId": "browser-1"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Page title: Example Domain"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"

Response: Page title: My Website - Home Page
```

### Error Handling
- Returns error if browser ID not found
- Returns "Page title: " with empty string if no title tag

### Notes
- Reads from the `<title>` tag
- Returns page title dynamically
- Useful for verifying page loads

---

## Tool 7: get_url

### Overview
Get the current URL of the page.

### Input Schema
```json
{
  "browserId": "browser-1"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Current URL: https://example.com/page"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"

Response: Current URL: https://example.com/dashboard
```

### Error Handling
- Returns error if browser ID not found

### Notes
- Returns full URL including query parameters and fragments
- Useful for verifying navigation
- Reflects current page address

---

## Tool 8: screenshot

### Overview
Take a screenshot of the current page and save it to a file.

### Input Schema
```json
{
  "browserId": "browser-1",
  "filename": "page.png" (optional)
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| browserId | string | Yes | N/A | ID of browser from launch_browser |
| filename | string | No | screenshot-[timestamp].png | Output filename |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Screenshot saved to: page.png"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  filename: "homepage.png"

Response: Screenshot saved to: homepage.png
```

### Default Filename Format
If no filename provided: `screenshot-1731526400000.png`
(timestamp-based unique names)

### Error Handling
- Returns error if browser ID not found
- Returns error if screenshot capture fails
- May indicate file permission issues

### Notes
- Saves as PNG format
- Captures full viewport
- Useful for debugging visual issues
- Screenshots save to current working directory

---

## Tool 9: wait_for_navigation

### Overview
Wait for a page navigation to complete. Useful after clicking links or submitting forms.

### Input Schema
```json
{
  "browserId": "browser-1",
  "timeout": 30000 (optional, default: 30000)
}
```

### Parameters

| Parameter | Type | Required | Default | Description |
|-----------|------|----------|---------|-------------|
| browserId | string | Yes | N/A | ID of browser from launch_browser |
| timeout | number | No | 30000 | Timeout in milliseconds |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Navigation completed"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"
  timeout: 10000

Response: Navigation completed
```

### Error Handling
- Returns timeout error if navigation takes too long
- Returns error if browser ID not found

### Notes
- Default timeout is 30 seconds (30000ms)
- Useful after clicking a link that navigates
- Use after form submission
- For immediate navigation, use navigate() instead

---

## Tool 10: close_browser

### Overview
Close a browser instance and clean up all resources.

### Input Schema
```json
{
  "browserId": "browser-1"
}
```

### Parameters

| Parameter | Type | Required | Description |
|-----------|------|----------|-------------|
| browserId | string | Yes | ID of browser from launch_browser |

### Return Value
```json
{
  "content": [
    {
      "type": "text",
      "text": "Browser browser-1 closed successfully"
    }
  ]
}
```

### Example Usage

```
Parameters:
  browserId: "browser-1"

Response: Browser browser-1 closed successfully
```

### Error Handling
- Returns error if browser ID not found
- Errors during close don't prevent cleanup

### Notes
- Always close browsers when done
- Frees memory and system resources
- Cannot reuse browser ID after closing
- Must launch new browser to continue

---

## Type System and Validation

All tools use **Zod** for schema validation:

```typescript
import { z } from "zod";

// Example: launch_browser schema
const launchBrowserSchema = z.object({
  browserType: z.enum(["chromium", "firefox", "webkit"]),
  headless: z.boolean().optional().default(true),
  url: z.string().optional(),
});
```

Benefits:
- Runtime validation of inputs
- Type-safe parameters
- Clear error messages
- Prevents invalid data

---

## Tool Call Patterns

### Sequential Pattern
```
launch_browser → navigate → get_text → close_browser
```

### Interaction Pattern
```
launch_browser → fill_input → click_element → wait_for_navigation → close_browser
```

### Multi-page Pattern
```
launch_browser → navigate → get_text → navigate → get_text → close_browser
```

### Screenshot Pattern
```
launch_browser → navigate → screenshot → close_browser
```

---

## Error Response Format

All errors follow this format:

```json
{
  "content": [
    {
      "type": "text",
      "text": "Error [tool_name]: [error_message]"
    }
  ]
}
```

Examples:
- `Error navigating: Navigation timeout after 30000ms`
- `Browser browser-99 not found`
- `Error getting text: Element not found`
- `Error launching browser: Connection refused`

---

## Rate Limiting and Constraints

- **Browser Instances**: No hard limit (limited by system resources)
- **Tool Calls**: No rate limiting
- **Timeout**: Default 30 seconds for navigation
- **Screenshot Size**: Limited by system memory

---

## Best Practices

1. **Always close browsers:**
   ```
   launch_browser → [operations] → close_browser
   ```

2. **Capture browser ID immediately:**
   ```
   Response from launch_browser gives you the ID to use
   ```

3. **Use appropriate selectors:**
   - Test selectors in browser DevTools first
   - Be specific to avoid ambiguity

4. **Wait appropriately:**
   - Use wait_for_navigation after navigation triggers
   - Don't assume instant response

5. **Handle errors gracefully:**
   - Check error messages
   - Try alternative selectors
   - Verify page state with screenshots

---

## Integration with Clients

### VS Code with GitHub Copilot
```
Natural language: "Fill the login form and submit it"
Copilot will sequence: fill_input → fill_input → click_element → wait_for_navigation
```

### Claude Desktop
```
Natural language: "Take a screenshot of the homepage"
Claude will sequence: launch_browser → navigate → screenshot → close_browser
```

---

## Performance Characteristics

| Tool | Typical Duration | Notes |
|------|-----------------|-------|
| launch_browser | 3-5 seconds | Headless mode is faster |
| navigate | 1-10 seconds | Depends on page complexity |
| click_element | <1 second | Nearly instant |
| fill_input | <1 second | Nearly instant |
| get_text | <1 second | Very fast |
| get_title | <1 second | Immediate |
| get_url | <1 second | Immediate |
| screenshot | 1-2 seconds | Depends on page size |
| wait_for_navigation | 1-30 seconds | Depends on page load |
| close_browser | 1-2 seconds | Cleanup time |

---

## Version Information

- **Server Version**: 1.0.0
- **Playwright Version**: 1.48.0+
- **MCP SDK Version**: 1.4.0+
- **Node.js Version**: 17+

---

## Support and Documentation

- Full documentation: See README.md
- Setup guide: See SETUP.md
- Quick reference: See QUICK_REFERENCE.md
- Usage examples: See EXAMPLES.md
- Troubleshooting: See TROUBLESHOOTING.md

---

Last updated: November 14, 2025
