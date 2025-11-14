# Setup Guide for Playwright MCP Server

## Prerequisites Installation

### 1. Install Node.js

**Windows:**
- Download the LTS version from [nodejs.org](https://nodejs.org/)
- Run the installer and follow the prompts
- Make sure to check "Add to PATH" during installation
- Restart your terminal/PowerShell after installation

**macOS:**
```bash
brew install node
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install nodejs npm
```

### 2. Verify Installation

After installing Node.js, verify the installation:

```bash
node --version
npm --version
```

Both commands should return version numbers.

## Project Setup

Once Node.js is installed, follow these steps:

### 1. Navigate to Project Directory

```bash
cd playwright-mcp-server
```

### 2. Install Dependencies

```bash
npm install
```

This will install:
- `@modelcontextprotocol/sdk` - MCP protocol support
- `playwright` - Browser automation library (includes Chromium, Firefox, WebKit)
- `zod` - Type validation
- `typescript` - TypeScript compiler

### 3. Build the Project

```bash
npm run build
```

This compiles TypeScript code to JavaScript in the `build/` folder.

### 4. Start the Server

```bash
npm start
```

The server should print: "Playwright MCP Server running on stdio"

## Connecting to VS Code with GitHub Copilot

1. Open VS Code
2. Press `Ctrl+Shift+P` (Windows/Linux) or `Cmd+Shift+P` (macOS)
3. Select **MCP: Add server...**
4. Choose **Stdio**
5. Enter the command:
   ```
   node ./build/index.js
   ```
6. Provide a name like "Playwright MCP"

## Connecting to Claude Desktop

1. On **macOS**: Open `~/Library/Application Support/Claude/claude_desktop_config.json`
2. On **Windows**: Open `%APPDATA%\Claude\claude_desktop_config.json`

Add the following configuration:

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

Replace `/absolute/path/to/` with your actual project path. For Windows, use backslashes or forward slashes.

### Example Windows Path:
```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "node",
      "args": ["C:\\path\\to\\playwright-mcp-server\\build\\index.js"]
    }
  }
}
```

### Example macOS/Linux Path:
```json
{
  "mcpServers": {
    "playwright-mcp": {
      "command": "node",
      "args": ["/Users/username/playwright-mcp-server/build/index.js"]
    }
  }
}
```

## Troubleshooting

### npm not found
- Restart your terminal/PowerShell after installing Node.js
- Verify Node.js is in your PATH by running `echo %PATH%` (Windows) or `echo $PATH` (macOS/Linux)

### TypeScript compilation errors
- Make sure you're in the project directory
- Run `npm install` first to ensure all dependencies are installed
- Delete the `node_modules` folder and `package-lock.json`, then run `npm install` again

### Playwright browsers not found
- The first run of the server will download browsers (Chromium, Firefox, WebKit)
- Ensure you have sufficient disk space
- Check your internet connection

### MCP client can't connect to the server
- Verify the command path is correct (use absolute paths)
- Make sure the build folder exists and contains `index.js`
- Check that the MCP configuration syntax is correct (valid JSON)
- Restart your MCP client application

### Port already in use
- The server uses stdio, not ports, so this shouldn't occur
- If you get "Address already in use", there may be another process with the same name

## Development

### Watch Mode (Auto-rebuild on changes)

To develop with automatic TypeScript compilation:

```bash
npm run dev
```

This will:
1. Compile TypeScript
2. Start the server
3. Restart on file changes (requires additional setup)

For a better development experience, you can use `ts-node`:

```bash
npm install -D ts-node
npx ts-node src/index.ts
```

### Testing with MCP Inspector

Test the server without connecting to a client:

```bash
npx @modelcontextprotocol/inspector node ./build/index.js
```

This opens a web interface where you can:
- Test each tool individually
- View tool schemas
- Debug tool execution
- Inspect error messages

## Docker Setup (Optional)

For a containerized environment, create a `Dockerfile`:

```dockerfile
FROM node:20-alpine

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY tsconfig.json ./
COPY src ./src

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
```

Build and run:
```bash
docker build -t playwright-mcp .
docker run -it playwright-mcp
```

## Next Steps

1. **Verify Installation**: Run `npm start` and confirm the server starts without errors
2. **Connect to Client**: Follow the instructions above to connect to VS Code or Claude Desktop
3. **Test Tools**: Use the MCP Inspector or your client to test the available tools
4. **Refer to README.md**: See README.md for tool usage examples and API reference

## Additional Resources

- [Node.js Official Website](https://nodejs.org/)
- [Playwright Documentation](https://playwright.dev/)
- [MCP Documentation](https://modelcontextprotocol.io/)
- [MCP Inspector](https://github.com/modelcontextprotocol/inspector)
