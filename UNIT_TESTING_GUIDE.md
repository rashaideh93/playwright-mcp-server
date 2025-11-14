# Unit Testing Guide for Developers

## Overview

This project includes comprehensive unit and integration tests using **Jest**, the industry-standard testing framework for Node.js projects.

## Setup

### 1. Install Dependencies

The testing dependencies are already configured in `package.json`. Install them with:

```bash
npm install
```

This installs:
- **jest** - Testing framework
- **ts-jest** - TypeScript support for Jest
- **@types/jest** - TypeScript type definitions

### 2. Configure Jest

The project includes `jest.config.js` which configures:
- TypeScript support via ts-jest
- Test discovery patterns
- Coverage thresholds
- ES Module support

## Running Tests

### Run All Tests with Coverage Report

```bash
npm test
```

This command:
- Runs all tests in `src/__tests__`
- Generates coverage report
- Displays coverage summary in console

### Run Tests in Watch Mode

```bash
npm run test:watch
```

Useful during development - automatically reruns tests when files change.

### Run Only Unit Tests

```bash
npm run test:unit
```

Tests in `src/__tests__/unit/` directory only.

### Run Only Integration Tests

```bash
npm run test:integration
```

Tests in `src/__tests__/integration/` directory only.

## Test Structure

```
src/
├── __tests__/
│   ├── unit/
│   │   └── server.test.ts          # Core server tests
│   └── integration/
│       └── workflows.test.ts       # End-to-end workflow tests
└── index.ts                        # Main server code
```

## Writing Tests

### Test File Naming Convention

- Unit tests: `*.test.ts`
- Location: `src/__tests__/unit/` or `src/__tests__/integration/`

### Basic Test Structure

```typescript
describe("Feature Name", () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it("should do something", () => {
    // Arrange
    const input = "test";
    
    // Act
    const result = testFunction(input);
    
    // Assert
    expect(result).toBeDefined();
  });
});
```

### Common Assertions

```typescript
// Existence checks
expect(value).toBeDefined();
expect(value).toBeNull();
expect(value).toBeTruthy();
expect(value).toBeFalsy();

// Equality
expect(value).toBe(5);
expect(value).toEqual({ name: "test" });

// String matching
expect(text).toContain("substring");
expect(text).toMatch(/regex/);

// Arrays
expect(arr).toHaveLength(3);
expect(arr).toContain("item");

// Type checking
expect(value).toBeInstanceOf(Class);
```

## Current Test Coverage

### Unit Tests (`src/__tests__/unit/server.test.ts`)

Tests the MCP server core functionality:

1. **Server Initialization**
   - Server instance creation
   - Name and version configuration
   - Tool registration capability

2. **Tool Registration**
   - `launch_browser` - Browser launch functionality
   - `navigate` - URL navigation
   - `click_element` - DOM interaction
   - `fill_input` - Form input handling
   - `get_text` - Text extraction
   - `screenshot` - Page capture
   - `close_browser` - Browser termination

3. **Response Format**
   - Valid MCP response structure
   - Error response handling

### Integration Tests (`src/__tests__/integration/workflows.test.ts`)

Tests complete automation workflows:

1. **Browser Launch Workflow**
   - Successful launch responses
   - Unique browser ID generation

2. **Navigation Workflow**
   - URL validation
   - Navigation responses

3. **Element Interaction Workflow**
   - Click operations
   - Input filling
   - Text retrieval

4. **Screenshot Workflow**
   - Screenshot capture and saving

5. **Complete QA Workflow**
   - Multi-step automation sequences
   - Login + verification workflow

6. **Error Handling**
   - Browser launch errors
   - Navigation errors
   - Element interaction errors

## Coverage Thresholds

The project enforces minimum coverage thresholds:

```
Branches:   50%
Functions:  50%
Lines:      50%
Statements: 50%
```

View coverage reports:
```bash
npm test
# Coverage report displays in terminal
# Detailed HTML report in: coverage/
```

## Best Practices for Testing

### 1. Test Organization
- Group related tests using `describe` blocks
- One assertion per test when possible
- Clear, descriptive test names

### 2. Test Isolation
- Each test should be independent
- Use `beforeEach`/`afterEach` for setup/teardown
- Avoid shared state between tests

### 3. Mocking
For tests that need browser or network interaction:

```typescript
jest.mock('playwright', () => ({
  chromium: { launch: jest.fn() }
}));
```

### 4. Async Tests
For async operations:

```typescript
it("should handle async operation", async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});
```

## Continuous Integration

The test suite is designed to run in CI/CD pipelines:

```bash
# In GitHub Actions or similar:
npm ci           # Install exact versions
npm run build    # Compile TypeScript
npm test         # Run tests with coverage
```

## Debugging Tests

### Run Specific Test File

```bash
npm test -- server.test.ts
```

### Run Specific Test Suite

```bash
npm test -- --testNamePattern="Server Initialization"
```

### Enable Debug Logging

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then use Chrome DevTools at `chrome://inspect`

## Adding New Tests

### Step 1: Create Test File
```bash
src/__tests__/unit/my-feature.test.ts
```

### Step 2: Write Tests
```typescript
describe("My Feature", () => {
  it("should work", () => {
    expect(true).toBe(true);
  });
});
```

### Step 3: Run Tests
```bash
npm test
```

## Troubleshooting

### Tests Not Found
- Ensure files end with `.test.ts`
- Verify location: `src/__tests__/unit/` or `src/__tests__/integration/`
- Check jest.config.js `testMatch` pattern

### TypeScript Errors in Tests
- Run `npm install @types/jest`
- Ensure tsconfig.json includes `"types": ["jest", "node"]`

### Coverage Not Generated
```bash
npm test -- --coverage
```

### Watch Mode Not Working
```bash
npm run test:watch
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Testing Library](https://testing-library.com/)
- [Playwright Documentation](https://playwright.dev/)

## Example Test Run Output

```
 PASS  src/__tests__/unit/server.test.ts
  MCP Server - Unit Tests
    Server Initialization
      ✓ should create a server instance (5ms)
      ✓ should have correct server name and version (2ms)
      ✓ should be ready to register tools (1ms)
    Tool Registration
      ✓ should register launch_browser tool (1ms)
      ✓ should register navigate tool (1ms)
      ✓ should register click_element tool (1ms)
      ✓ should register fill_input tool (1ms)
      ✓ should register get_text tool (1ms)
      ✓ should register screenshot tool (1ms)
      ✓ should register close_browser tool (1ms)

Tests:       10 passed, 10 total
Snapshots:   0 total
Time:        2.345s
```

## Support

For questions or issues with testing:
1. Check [Jest Documentation](https://jestjs.io/)
2. Review existing test examples in `src/__tests__/`
3. Create an issue on [GitHub](https://github.com/rashaideh93/playwright-mcp-server/issues)
