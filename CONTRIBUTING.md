# Contributing Guide

Thank you for your interest in contributing to the Playwright MCP Server! This guide will help you set up your development environment and understand how to contribute.

## Table of Contents

- [Getting Started](#getting-started)
- [Development Setup](#development-setup)
- [Running Tests](#running-tests)
- [Making Changes](#making-changes)
- [Testing Your Changes](#testing-your-changes)
- [Code Quality](#code-quality)
- [Submitting Changes](#submitting-changes)

## Getting Started

### Prerequisites

- Node.js >= 17.0.0
- Git
- A code editor (VS Code recommended)

### Clone the Repository

```bash
git clone https://github.com/rashaideh93/playwright-mcp-server.git
cd playwright-mcp-server
```

### Install Dependencies

```bash
npm install
```

This installs all dependencies including:
- `@modelcontextprotocol/sdk` - MCP protocol
- `playwright` - Browser automation
- `zod` - Type validation
- `jest` - Testing framework
- `ts-jest` - TypeScript support for tests

## Development Setup

### Project Structure

```
.
├── src/
│   ├── index.ts                 # Main server implementation
│   └── __tests__/               # Test files
│       ├── unit/                # Unit tests
│       └── integration/         # Integration tests
├── build/                       # Compiled JavaScript (generated)
├── package.json                 # Dependencies and scripts
├── tsconfig.json               # TypeScript configuration
├── jest.config.js              # Jest configuration
├── test-runner.cjs             # Simple test runner
└── README.md                   # Project documentation
```

### Build the Project

```bash
npm run build
```

This compiles TypeScript in `src/` to JavaScript in `build/`.

### Start Development Server

```bash
npm run dev
```

This rebuilds and starts the MCP server.

## Running Tests

### Quick Test

```bash
npm test
```

Runs 8 core validation tests to verify the MCP server is working correctly.

**Expected Output:**
```
✓ All 8 tests passed! The MCP server is ready for development.
```

### Unit Tests

```bash
npm run test:unit
```

Runs all unit tests for server initialization and tool registration.

### Integration Tests

```bash
npm run test:integration
```

Runs workflow and end-to-end tests.

### Watch Mode (For Development)

```bash
npm run test:watch
```

Automatically reruns tests when files change.

### With Coverage Report

```bash
npm run test:jest
```

Generates coverage report for test suite.

## Making Changes

### Step 1: Create a Feature Branch

```bash
git checkout -b feature/your-feature-name
```

### Step 2: Make Your Changes

Edit files in `src/` directory. The project uses:
- **TypeScript** for type safety
- **Playwright** for browser automation
- **Zod** for runtime validation
- **MCP SDK** for protocol implementation

### Step 3: Update Tests

If adding new functionality, add corresponding tests:

```typescript
// Example unit test
describe("New Feature", () => {
  it("should do something", () => {
    expect(result).toBeDefined();
  });
});
```

Place tests in:
- `src/__tests__/unit/` for unit tests
- `src/__tests__/integration/` for integration tests

## Testing Your Changes

### Run All Tests

```bash
npm test
npm run test:jest
```

### Verify Build

```bash
npm run build
```

Ensure TypeScript compiles without errors.

### Manual Testing

```bash
npm run dev
```

Starts the server and you can test it with MCP clients.

## Code Quality

### TypeScript

- All code must be valid TypeScript
- Enable strict mode: `strict: true` in tsconfig.json
- Use proper type annotations

### ESLint (Recommended)

Consider adding ESLint for code style:

```bash
npm install --save-dev eslint @typescript-eslint/eslint-plugin
```

### Naming Conventions

- **Functions**: camelCase
- **Classes**: PascalCase
- **Constants**: UPPER_SNAKE_CASE
- **Variables**: camelCase

### Comments

Add JSDoc comments for public APIs:

```typescript
/**
 * Launches a browser instance
 * @param browserType - The browser engine to launch
 * @param options - Launch options
 * @returns Browser ID and status
 */
function launchBrowser(browserType: string, options: any) {
  // Implementation
}
```

## Submitting Changes

### Step 1: Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature"
```

Use conventional commit messages:
- `feat:` - New feature
- `fix:` - Bug fix
- `docs:` - Documentation
- `test:` - Test updates
- `refactor:` - Code refactoring
- `perf:` - Performance improvements

### Step 2: Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### Step 3: Create a Pull Request

On GitHub, create a pull request with:
- Clear title and description
- Reference to any related issues
- Summary of changes

## Example: Adding a New Tool

### 1. Implement in `src/index.ts`

```typescript
server.registerTool(
  "my_new_tool",
  {
    title: "My New Tool",
    description: "What this tool does",
    inputSchema: z.object({
      param: z.string().describe("Parameter description")
    })
  },
  async ({ param }) => {
    try {
      // Implementation
      return {
        content: [{ type: "text", text: "Result" }]
      };
    } catch (error) {
      return {
        content: [{ type: "text", text: `Error: ${error.message}` }]
      };
    }
  }
);
```

### 2. Add Unit Test

```typescript
// src/__tests__/unit/my-tool.test.ts
describe("My New Tool", () => {
  it("should register successfully", () => {
    const server = new McpServer({ name: "test", version: "1.0.0" });
    expect(server.registerTool).toBeDefined();
  });

  it("should handle inputs correctly", () => {
    // Test implementation
  });
});
```

### 3. Add Integration Test

```typescript
// src/__tests__/integration/my-tool.test.ts
describe("My New Tool Workflow", () => {
  it("should complete workflow", () => {
    // Test workflow
  });
});
```

### 4. Test Locally

```bash
npm test
npm run build
npm run dev
```

### 5. Update Documentation

Add your tool to `API_REFERENCE.md` and `EXAMPLES.md`.

### 6. Commit and Push

```bash
git add .
git commit -m "feat: add my new tool"
git push origin feature/my-new-tool
```

## Troubleshooting

### TypeScript Errors

```bash
npm run build
```

Check error messages and fix type issues.

### Test Failures

```bash
npm test
npm run test:jest
```

Review test output and debug:

```bash
npm run test:watch
```

### Node Modules Issues

```bash
rm -r node_modules package-lock.json
npm install
```

## Getting Help

- Check existing [GitHub Issues](https://github.com/rashaideh93/playwright-mcp-server/issues)
- Read [API_REFERENCE.md](./API_REFERENCE.md)
- Review [EXAMPLES.md](./EXAMPLES.md)
- Check [TROUBLESHOOTING.md](./TROUBLESHOOTING.md)

## Code of Conduct

- Be respectful and inclusive
- Provide constructive feedback
- Help others learn and grow

## Questions?

Open an issue on GitHub: [Issues](https://github.com/rashaideh93/playwright-mcp-server/issues)

---

Thank you for contributing! 🚀
