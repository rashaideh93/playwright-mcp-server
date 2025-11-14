# Playwright MCP Server - Copilot Instructions

This is a Model Context Protocol (MCP) Server for Playwright browser automation framework.

## Project Overview

**Project Type:** MCP Server (TypeScript)
**Language:** TypeScript
**Runtime:** Node.js
**Main Framework:** Playwright + MCP SDK

## Key Features

- Launch and manage multiple browser instances (Chromium, Firefox, WebKit)
- Navigate pages and wait for navigation completion
- Interact with page elements (click, fill inputs, get text)
- Take screenshots and inspect page content
- Full MCP protocol support for AI application integration

## Project Structure

```
├── src/
│   └── index.ts              # Main MCP server implementation
├── build/                    # Compiled output (generated)
├── .vscode/
│   └── mcp.json             # MCP server configuration
├── package.json             # Dependencies
├── tsconfig.json            # TypeScript config
└── README.md                # Full documentation
```

## Dependencies

- `@modelcontextprotocol/sdk` - MCP protocol SDK
- `playwright` - Browser automation
- `zod` - Type validation
- `typescript` - Language support

## Build & Run Commands

- **Install:** `npm install`
- **Build:** `npm run build`
- **Start:** `npm start`
- **Dev:** `npm run dev`

## How to Use

1. Build the project: `npm run build`
2. Start the server: `npm start`
3. Connect via MCP client (VS Code, Claude Desktop, etc.)
4. Use tools like `launch_browser`, `navigate`, `click_element`, etc.

## Available Tools

- `launch_browser` - Start a new browser instance
- `navigate` - Go to a URL
- `click_element` - Click page elements
- `fill_input` - Type into input fields
- `get_text` - Extract text content
- `get_title` - Get page title
- `screenshot` - Capture page screenshot
- `close_browser` - Terminate browser instance
- `wait_for_navigation` - Wait for page navigation
- `get_url` - Get current URL

## MCP Configuration

The server is configured to run via stdio transport. Configuration file:
```json
{
  "servers": {
    "playwright-mcp": {
      "type": "stdio",
      "command": "node",
      "args": ["./build/index.js"]
    }
  }
}
```

## Testing

Test the server using MCP Inspector:
```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

## Integration Points

- **VS Code:** Use with GitHub Copilot
- **Claude Desktop:** Add to `claude_desktop_config.json`
- **Other Clients:** Any MCP-compatible application

## Documentation

See `README.md` for comprehensive documentation including:
- Installation instructions
- Usage examples
- API reference
- Troubleshooting guide
- Advanced configuration

## Key Implementation Details

- Browser instances managed with unique IDs
- Zod for runtime type validation
- Error handling with meaningful messages
- Stdio transport for host communication
- Support for all Playwright browser types
