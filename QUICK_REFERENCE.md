# Quick Reference Guide

## Command Cheat Sheet

### Installation & Setup
```bash
# Install dependencies
npm install

# Build the project
npm run build

# Start the server
npm start

# Development mode (with auto-rebuild)
npm run dev

# Test with MCP Inspector
npx @modelcontextprotocol/inspector node ./build/index.js
```

## Tool Usage Examples

### Launch a Browser and Navigate

```
Tool: launch_browser
Parameters:
  browserType: "chromium"
  headless: true
  url: "https://example.com"

Response: browser-1
```

### Take a Screenshot

```
Tool: screenshot
Parameters:
  browserId: "browser-1"
  filename: "screenshot.png"

Response: Screenshot saved to screenshot.png
```

### Fill a Form

```
Tool: fill_input
Parameters:
  browserId: "browser-1"
  selector: "input#email"
  text: "user@example.com"

Response: Successfully filled input
```

### Submit a Form

```
Tool: click_element
Parameters:
  browserId: "browser-1"
  selector: "button[type='submit']"

Response: Successfully clicked element
```

### Close Browser

```
Tool: close_browser
Parameters:
  browserId: "browser-1"

Response: Browser closed successfully
```

## CSS Selectors Reference

Common CSS selector patterns:

```css
/* By ID */
#myId

/* By class */
.myClass

/* By attribute */
input[type='submit']
input[name='username']
button[data-action='save']

/* By tag */
button
input
div

/* Combinations */
div.container button
form#loginForm input[type='email']

/* Pseudo-selectors */
button:first-child
input:last-of-type
```

## Common Workflows

### Web Scraping

```
1. launch_browser with URL
2. wait_for_navigation (if needed)
3. get_text with various selectors to extract content
4. close_browser
```

### Form Testing

```
1. launch_browser with form URL
2. fill_input for each field
3. click_element on submit button
4. wait_for_navigation
5. get_title to verify success page
6. close_browser
```

### Screenshot Comparison

```
1. launch_browser with URL 1
2. screenshot (filename: "before.png")
3. close_browser
4. launch_browser with URL 2
5. screenshot (filename: "after.png")
6. close_browser
```

### Multi-page Testing

```
1. launch_browser with URL 1
2. click_element to navigate
3. wait_for_navigation
4. get_url to verify location
5. navigate to another URL
6. get_text to extract content
7. close_browser
```

## Environment Setup

### Windows
1. Install Node.js from nodejs.org
2. Restart PowerShell after installation
3. Verify: `node --version`

### macOS
```bash
brew install node
node --version
```

### Linux
```bash
sudo apt-get install nodejs npm
node --version
```

## Configuration Files

### package.json
Project metadata and scripts. Defines dependencies (MCP SDK, Playwright, Zod).

### tsconfig.json
TypeScript compiler configuration. Specifies ES2022 target and module format.

### .vscode/mcp.json
MCP server registration for VS Code. Uses stdio transport with node command.

### .github/copilot-instructions.md
Copilot-specific instructions for the project.

## File Structure

```
project/
├── src/index.ts              Main server code
├── build/                    Compiled JavaScript (after npm run build)
├── package.json              Dependencies & scripts
├── tsconfig.json             TypeScript settings
├── .vscode/mcp.json         MCP config for VS Code
├── .github/
│   └── copilot-instructions.md
├── README.md                 Full documentation
├── SETUP.md                  Setup guide
└── QUICK_REFERENCE.md        This file
```

## Debugging Tips

### Check if server starts
```bash
npm run build
npm start
# Should print: "Playwright MCP Server running on stdio"
```

### Test with Inspector
```bash
npx @modelcontextprotocol/inspector node ./build/index.js
# Opens web interface at http://localhost:8000
```

### Check browser IDs
Browser IDs follow format: `browser-1`, `browser-2`, etc.
Each ID is unique during the session.

### Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| Browser not found | Invalid browserId | Check the ID returned from launch_browser |
| Element not found | Selector doesn't match | Inspect the page, verify CSS selector |
| Navigation timeout | Page took too long | Increase timeout or check the URL |
| npm not found | Node.js not installed | Install Node.js and restart terminal |
| Port already in use | Another process uses the port | This shouldn't occur with stdio transport |

## Browser Types

### Chromium
- Most compatible
- Best for Chromium-based apps (Chrome, Edge, Brave)
- Fastest performance

### Firefox
- Good for Firefox-specific testing
- Better privacy features
- Slightly slower than Chromium

### WebKit
- For Safari testing
- Best for macOS/iOS compatibility
- Good for performance-sensitive apps

## Tips & Best Practices

1. **Always close browsers** - Use `close_browser` to free resources
2. **Use headless mode** - Faster when you don't need to see the browser
3. **Proper selectors** - Test CSS selectors in browser DevTools first
4. **Wait appropriately** - Use `wait_for_navigation` when needed
5. **Error handling** - The server returns meaningful error messages
6. **Test with Inspector** - Use MCP Inspector to debug tool execution
7. **Screenshot debugging** - Take screenshots to debug visual issues
8. **Timeout management** - Set appropriate timeouts for slow pages

## Integration Checklist

- [ ] Node.js installed and in PATH
- [ ] Project dependencies installed (`npm install`)
- [ ] Project builds successfully (`npm run build`)
- [ ] Server starts without errors (`npm start`)
- [ ] build/index.js exists
- [ ] MCP config has correct paths (absolute, not relative)
- [ ] MCP client configured correctly
- [ ] MCP client restarted after configuration changes
- [ ] Tools appear in client interface
- [ ] First tool execution succeeds

## Getting Help

1. Check README.md for detailed documentation
2. Review SETUP.md for installation issues
3. Use MCP Inspector to test tools directly
4. Check tool parameters match the schema
5. Verify browser ID is valid
6. Look at error messages from the server
7. Consult Playwright documentation for browser-specific issues
8. Check MCP documentation for protocol-specific questions
