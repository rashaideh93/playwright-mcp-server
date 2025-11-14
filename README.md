# Playwright MCP Server

An MCP (Model Context Protocol) server that exposes Playwright automation capabilities through a standardized protocol interface. This allows AI applications to control web browsers and interact with web pages programmatically.

## Overview

This MCP server integrates the popular Playwright automation library with the Model Context Protocol, enabling seamless browser automation through AI assistants and other MCP clients.

### Supported Browsers
- **Chromium** - Full Chromium support
- **Firefox** - Mozilla Firefox support
- **WebKit** - Safari/WebKit support

## Features

The server exposes the following tools:

### Browser Management
- **launch_browser** - Launch a new browser instance with optional URL navigation
- **close_browser** - Close an existing browser instance and clean up resources

### Page Navigation
- **navigate** - Navigate to a specific URL with configurable wait conditions
- **get_url** - Retrieve the current URL of the active page
- **wait_for_navigation** - Wait for a page navigation to complete

### Element Interaction
- **click_element** - Click an element using CSS selector
- **fill_input** - Fill input fields with text
- **get_text** - Get text content from an element

### Page Inspection
- **get_title** - Get the current page title
- **screenshot** - Take a screenshot of the current page

## Installation

### Prerequisites
- Node.js 17 or higher
- npm or yarn package manager

### Install from NPM (Recommended)

The easiest way to get started is to install from NPM:

```bash
npm install playwright-mcp-rashaideh93
```

Then start the server:
```bash
npx playwright-mcp-rashaideh93
```

### Setup from Source

Alternatively, you can clone and build from source:

1. **Clone or download the project:**
   ```bash
   git clone https://github.com/rashaideh93/playwright-mcp-server.git
   cd playwright-mcp-server
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Build the TypeScript code:**
   ```bash
   npm run build
   ```

## Usage

### Starting the Server

```bash
npm start
```

Or in development mode with auto-rebuild:
```bash
npm run dev
```

### Connecting to the Server

#### VS Code with GitHub Copilot

1. Open VS Code and press `Cmd+Shift+P` (Mac) or `Ctrl+Shift+P` (Windows/Linux)
2. Select **MCP: Add server...**
3. Choose **Stdio** and enter the command:
   ```
   node ./build/index.js
   ```
4. Give it a name like "Playwright MCP"

#### Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "node",
      "args": ["/absolute/path/to/playwright-mcp-server/build/index.js"]
    }
  }
}
```

#### Other MCP Clients

Configure your MCP client to connect to this server using stdio transport on the node build/index.js command.

## Tool Usage Examples

### Example 1: Basic Navigation and Screenshot

```
1. launch_browser with browserType: "chromium", headless: true, url: "https://example.com"
   → Returns: browser-1

2. screenshot with browserId: "browser-1", filename: "example.png"
   → Screenshot saved

3. close_browser with browserId: "browser-1"
   → Browser closed
```

### Example 2: Form Filling

```
1. launch_browser with browserType: "chromium"
   → Returns: browser-1

2. navigate with browserId: "browser-1", url: "https://example.com/form"

3. fill_input with browserId: "browser-1", selector: "input[name='username']", text: "myuser"

4. fill_input with browserId: "browser-1", selector: "input[name='password']", text: "mypass"

5. click_element with browserId: "browser-1", selector: "button[type='submit']"

6. close_browser with browserId: "browser-1"
```

### Example 3: Content Extraction

```
1. launch_browser with browserType: "chromium", url: "https://news.example.com"
   → Returns: browser-1

2. get_title with browserId: "browser-1"
   → Returns page title

3. get_text with browserId: "browser-1", selector: ".article-title"
   → Returns article title text

4. close_browser with browserId: "browser-1"
```

## Architecture

### Browser Instance Management

- Each browser instance is assigned a unique ID (e.g., `browser-1`, `browser-2`)
- Browser instances include:
  - The browser process
  - A default browser context
  - A default page
- Instances are stored in memory and cleaned up when closed

### Tool Parameters

All tools use **Zod** for schema validation, ensuring type-safe inputs and clear error messages.

### Error Handling

The server gracefully handles errors and returns meaningful error messages:
- Invalid browser IDs
- Navigation timeouts
- Element not found errors
- Playwright runtime errors

## Development

### Project Structure

```
playwright-mcp-server/
├── src/
│   └── index.ts           # Main server implementation
├── build/                 # Compiled JavaScript (generated)
├── .vscode/
│   └── mcp.json          # MCP server configuration
├── package.json          # Project dependencies
├── tsconfig.json         # TypeScript configuration
└── README.md             # This file
```

### Building

```bash
npm run build
```

This compiles TypeScript to JavaScript and makes the script executable.

### Testing

The server can be tested using the MCP Inspector:

```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

This opens a web interface where you can:
- Test individual tools
- Inspect tool schemas
- View tool outputs
- Debug server behavior

## Integration with AI Applications

### GitHub Copilot in VS Code

Once connected, Copilot can:
- Control browsers through natural language
- Perform automated testing
- Extract data from web pages
- Fill forms and interact with web applications

### Claude (Anthropic)

When configured in Claude Desktop:
- Use natural language to script browser interactions
- Automate web scraping tasks
- Generate test scripts
- Create end-to-end automation workflows

### Other Clients

Any MCP-compatible client can use these browser automation tools:
- LM Studio
- Cursor
- Windsurf
- Cline
- And others in the MCP ecosystem

## Advanced Configuration

### Browser Launch Options

The `launch_browser` tool accepts:
- `browserType` - "chromium", "firefox", or "webkit"
- `headless` - Run in headless mode (default: true)
- `url` - Optional URL to navigate to immediately

### Navigation Wait Conditions

The `navigate` tool supports:
- `"load"` - Wait for the load event (default)
- `"domcontentloaded"` - Wait for DOM content loaded
- `"networkidle"` - Wait for network to be idle

## Troubleshooting

### Server Won't Start
- Ensure Node.js 17+ is installed
- Check that all dependencies are installed: `npm install`
- Verify the build succeeded: `npm run build`

### Connection Issues
- Verify the absolute path in mcp.json is correct
- Check that the build folder exists and contains `index.js`
- Look for stderr output for connection errors

### Tool Execution Errors
- Ensure the browser ID is valid
- Verify CSS selectors are correct
- Check that elements exist before interaction
- Review Playwright documentation for specific element interactions

### Performance
- Headless mode is faster than headed mode
- Close browsers when done to free resources
- Use appropriate wait conditions for navigation
- Consider browser context cleanup for long-running sessions

## API Reference

### Tool: launch_browser

**Description:** Launch a new browser instance

**Parameters:**
- `browserType` (enum: "chromium" | "firefox" | "webkit") - Browser to launch
- `headless` (boolean, optional, default: true) - Headless mode
- `url` (string, optional) - URL to navigate to

**Returns:** Browser ID string

### Tool: navigate

**Description:** Navigate to a URL

**Parameters:**
- `browserId` (string) - Browser instance ID
- `url` (string) - URL to navigate to
- `waitUntil` (enum: "load" | "domcontentloaded" | "networkidle", optional, default: "load")

**Returns:** Navigation result

### Tool: click_element

**Description:** Click an element

**Parameters:**
- `browserId` (string) - Browser instance ID
- `selector` (string) - CSS selector

**Returns:** Click result

### Tool: fill_input

**Description:** Fill an input field

**Parameters:**
- `browserId` (string) - Browser instance ID
- `selector` (string) - CSS selector of input
- `text` (string) - Text to fill

**Returns:** Fill result

### Tool: get_text

**Description:** Get text content

**Parameters:**
- `browserId` (string) - Browser instance ID
- `selector` (string) - CSS selector

**Returns:** Text content

### Tool: get_title

**Description:** Get page title

**Parameters:**
- `browserId` (string) - Browser instance ID

**Returns:** Page title

### Tool: get_url

**Description:** Get current URL

**Parameters:**
- `browserId` (string) - Browser instance ID

**Returns:** Current URL

### Tool: screenshot

**Description:** Take a screenshot

**Parameters:**
- `browserId` (string) - Browser instance ID
- `filename` (string, optional) - Output filename

**Returns:** Screenshot path

### Tool: wait_for_navigation

**Description:** Wait for navigation

**Parameters:**
- `browserId` (string) - Browser instance ID
- `timeout` (number, optional, default: 30000) - Timeout in ms

**Returns:** Navigation completion result

### Tool: close_browser

**Description:** Close a browser

**Parameters:**
- `browserId` (string) - Browser instance ID

**Returns:** Close result

## Dependencies

- **@modelcontextprotocol/sdk** - MCP protocol implementation
- **playwright** - Browser automation library
- **zod** - Runtime type validation

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit pull requests or open issues for bugs and feature requests.

## Resources

- [MCP Documentation](https://modelcontextprotocol.io/)
- [Playwright Documentation](https://playwright.dev/)
- [MCP GitHub Repository](https://github.com/modelcontextprotocol/)
- [Playwright GitHub Repository](https://github.com/microsoft/playwright)

## Support

For issues, questions, or suggestions:
1. Check the Playwright documentation for browser-specific issues
2. Review MCP documentation for protocol-related questions
3. Consult the troubleshooting section above
4. Open an issue on the GitHub repository
