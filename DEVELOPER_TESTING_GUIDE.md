# Developer Testing Guide

This guide explains how to write and run unit tests for the Playwright MCP Server when extending or modifying the codebase.

## Quick Start

### 1. Install Dependencies

```bash
npm install
```

This installs Jest and TypeScript testing dependencies.

### 2. Write a Test

Create a test file in `src/__tests__/` with `.test.ts` extension:

```typescript
// src/__tests__/my-feature.test.ts
describe('My Feature', () => {
  it('should do something', () => {
    expect(true).toBe(true);
  });
});
```

### 3. Run Tests

```bash
# Run all tests
npm test

# Run tests in watch mode (auto-rerun on changes)
npm run test:watch

# Run with coverage report
npm run test:coverage
```

## Test Structure

### Directory Organization

```
src/
├── index.ts                          # Main server code
├── __tests__/
│   ├── example.test.ts              # Example test file
│   ├── feature-name.test.ts         # Your test files
│   └── integration/
│       └── workflow.test.ts         # Integration tests
```

### Test File Naming

- Files must end with `.test.ts` or `.spec.ts`
- Place in `src/__tests__/` directory
- Use descriptive names: `browser-launcher.test.ts`, `form-fill.test.ts`, etc.

## Writing Tests

### Basic Test Structure

```typescript
describe('Feature Name', () => {
  beforeEach(() => {
    // Setup before each test
  });

  afterEach(() => {
    // Cleanup after each test
  });

  it('should do something', () => {
    // Arrange
    const input = 'test';
    
    // Act
    const result = testFunction(input);
    
    // Assert
    expect(result).toBeDefined();
  });
});
```

### Common Assertions

```typescript
// Equality
expect(value).toBe(5);
expect(value).toEqual({ name: 'test' });

// Existence
expect(value).toBeDefined();
expect(value).toBeNull();
expect(value).toBeTruthy();

// Strings
expect(text).toContain('substring');
expect(text).toMatch(/regex/);

// Arrays
expect(arr).toHaveLength(3);
expect(arr).toContain('item');

// Types
expect(value).toBeInstanceOf(MyClass);
expect(typeof value).toBe('string');

// Errors
expect(() => throwingFunction()).toThrow();
expect(() => throwingFunction()).toThrow('Error message');
```

### Async Tests

```typescript
it('should handle async operations', async () => {
  const result = await asyncFunction();
  expect(result).toBeDefined();
});

it('should wait for promises', () => {
  return promiseFunction().then(result => {
    expect(result).toBe('expected value');
  });
});
```

## Example Test Cases

### Testing Tool Parameters

```typescript
describe('Tool Parameters', () => {
  it('should validate browser types', () => {
    const validTypes = ['chromium', 'firefox', 'webkit'];
    expect(validTypes).toContain('chromium');
  });

  it('should validate CSS selectors', () => {
    const selector = 'button.submit';
    expect(selector.length).toBeGreaterThan(0);
  });
});
```

### Testing Tool Responses

```typescript
describe('Tool Responses', () => {
  it('should return proper MCP response format', () => {
    const response = {
      content: [
        {
          type: 'text',
          text: 'Success message'
        }
      ]
    };

    expect(response.content).toBeDefined();
    expect(Array.isArray(response.content)).toBe(true);
    expect(response.content[0].type).toBe('text');
  });
});
```

### Testing Error Handling

```typescript
describe('Error Handling', () => {
  it('should handle invalid browser ID', () => {
    const handleError = (error: string) => {
      return error.startsWith('Error:');
    };

    expect(handleError('Error: Browser not found')).toBe(true);
  });
});
```

### Testing State Management

```typescript
describe('Browser State', () => {
  it('should track browser instances', () => {
    const browsers = new Map<string, any>();
    
    browsers.set('browser-1', { type: 'chromium' });
    expect(browsers.has('browser-1')).toBe(true);
    expect(browsers.size).toBe(1);
    
    browsers.delete('browser-1');
    expect(browsers.has('browser-1')).toBe(false);
  });
});
```

## Running Specific Tests

### Run a Single Test File

```bash
npx jest src/__tests__/example.test.ts
```

### Run Tests Matching a Pattern

```bash
npx jest --testNamePattern="should validate"
```

### Run Tests in a Directory

```bash
npx jest src/__tests__/integration
```

## Watch Mode

For development, use watch mode to automatically rerun tests when you make changes:

```bash
npm run test:watch
```

Press `a` to run all tests
Press `f` to run only failed tests
Press `p` to filter by filename
Press `q` to quit

## Coverage Reports

Generate a coverage report to see which parts of your code are tested:

```bash
npm run test:coverage
```

This creates a coverage report in `coverage/` directory:
- `coverage/index.html` - Open in browser for detailed report
- `coverage/lcov-report/` - Line coverage details
- Console output shows summary

## Debugging Tests

### Run with Debugging

```bash
node --inspect-brk node_modules/.bin/jest --runInBand
```

Then open `chrome://inspect` in Chrome DevTools.

### Add Console Logs

```typescript
it('should do something', () => {
  console.log('Debug info:', myVariable);
  expect(true).toBe(true);
});
```

Run with:
```bash
npx jest --verbose
```

## Best Practices

### 1. Test Isolation
- Each test should be independent
- Don't share state between tests
- Use `beforeEach`/`afterEach` for setup/cleanup

### 2. Clear Test Names
```typescript
// Good
it('should throw error when browser ID is invalid')

// Bad
it('throws error')
```

### 3. One Assertion Per Test (When Possible)
```typescript
// Good
it('should validate URL format', () => {
  expect(isValidUrl('https://example.com')).toBe(true);
});

// Acceptable (related assertions)
it('should validate URL format', () => {
  expect(isValidUrl('https://example.com')).toBe(true);
  expect(isValidUrl('invalid')).toBe(false);
});
```

### 4. Arrange-Act-Assert Pattern
```typescript
it('should calculate total correctly', () => {
  // Arrange
  const items = [1, 2, 3];
  
  // Act
  const total = items.reduce((a, b) => a + b, 0);
  
  // Assert
  expect(total).toBe(6);
});
```

### 5. Mock External Dependencies
```typescript
jest.mock('playwright', () => ({
  chromium: { launch: jest.fn() }
}));

it('should launch browser', async () => {
  const launch = require('playwright').chromium.launch;
  // Test with mocked launch
});
```

## Example Test File

See `src/__tests__/example.test.ts` for a complete working example covering:
- String utilities
- Response validation
- Tool parameters
- Workflow scenarios

## Continuous Integration

Tests run automatically in CI/CD pipelines:

```bash
npm ci           # Install exact versions
npm run build    # Compile TypeScript
npm test         # Run all tests
```

## Troubleshooting

### Tests Not Running

1. Ensure files end with `.test.ts`
2. Check Jest configuration: `jest.config.js`
3. Verify test is in `src/` directory

### TypeScript Errors

1. Install types: `npm install --save-dev @types/jest`
2. Check `tsconfig.json` includes `"types": ["jest", "node"]`

### Async Test Timeout

Default timeout is 5000ms. Increase if needed:

```typescript
it('should do something slow', async () => {
  // ...
}, 10000); // 10 second timeout
```

## Resources

- [Jest Documentation](https://jestjs.io/)
- [Jest API Reference](https://jestjs.io/docs/api)
- [Testing Best Practices](https://jestjs.io/docs/getting-started#using-typescript)
- [Playwright Documentation](https://playwright.dev/)

## Next Steps

1. Check `src/__tests__/example.test.ts` for working examples
2. Create your first test file
3. Run `npm test` to verify it works
4. Use `npm run test:watch` during development

Happy testing! 🧪
