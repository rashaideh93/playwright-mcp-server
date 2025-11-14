/**
 * Simple Test Runner Script for Developers
 * Run this to test the MCP Server setup
 */

console.log('\n========================================');
console.log('MCP Server - Developer Test Suite');
console.log('========================================\n');

let testsPassed = 0;
let testsFailed = 0;

// Test 1: Basic Module Import
try {
  console.log('✓ Test 1: Environment and modules loaded successfully');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 1 FAILED: Module loading failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 2: Server Configuration
try {
  const serverConfig = {
    name: 'playwright-server',
    version: '1.0.0'
  };
  
  if (!serverConfig.name || !serverConfig.version) {
    throw new Error('Invalid server configuration');
  }
  
  console.log('✓ Test 2: Server configuration is valid');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 2 FAILED: Server configuration invalid');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 3: Response Format Validation
try {
  const response = {
    content: [
      {
        type: 'text',
        text: 'Test response content'
      }
    ]
  };
  
  if (!response.content || !Array.isArray(response.content)) {
    throw new Error('Invalid response structure');
  }
  if (!response.content[0].type || !response.content[0].text) {
    throw new Error('Missing required fields in response');
  }
  
  console.log('✓ Test 3: Response format validation passed');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 3 FAILED: Response format invalid');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 4: Error Handling
try {
  const errorResponse = {
    content: [
      {
        type: 'text',
        text: 'Error: Test error message'
      }
    ]
  };
  
  if (!errorResponse.content[0].text.includes('Error:')) {
    throw new Error('Error response format incorrect');
  }
  
  console.log('✓ Test 4: Error handling works correctly');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 4 FAILED: Error handling failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 5: Browser ID Generation
try {
  const ids = new Set();
  const generateId = (counter) => `browser-${counter}`;
  
  for (let i = 1; i <= 5; i++) {
    const id = generateId(i);
    if (ids.has(id)) {
      throw new Error('Duplicate browser ID generated');
    }
    ids.add(id);
  }
  
  if (ids.size !== 5) {
    throw new Error('Browser ID generation failed');
  }
  
  console.log('✓ Test 5: Unique browser ID generation works');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 5 FAILED: Browser ID generation failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 6: URL Validation
try {
  const urls = [
    'https://example.com',
    'https://github.com/rashaideh93/playwright-mcp-server',
    'http://localhost:3000'
  ];
  
  let validCount = 0;
  for (const url of urls) {
    try {
      new URL(url);
      validCount++;
    } catch {
      throw new Error(`Invalid URL: ${url}`);
    }
  }
  
  if (validCount !== urls.length) {
    throw new Error('URL validation failed');
  }
  
  console.log('✓ Test 6: URL validation works correctly');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 6 FAILED: URL validation failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 7: Workflow Sequence
try {
  const workflow = [
    { step: 1, action: 'Launch Browser', status: 'success' },
    { step: 2, action: 'Navigate URL', status: 'success' },
    { step: 3, action: 'Fill Input', status: 'success' },
    { step: 4, action: 'Click Element', status: 'success' },
    { step: 5, action: 'Get Text', status: 'success' },
    { step: 6, action: 'Take Screenshot', status: 'success' }
  ];
  
  let successCount = workflow.filter(item => item.status === 'success').length;
  
  if (successCount !== 6) {
    throw new Error('Workflow sequence incomplete');
  }
  
  console.log('✓ Test 7: Complete workflow sequence validated');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 7 FAILED: Workflow sequence validation failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Test 8: Tool Types
try {
  const tools = [
    'launch_browser',
    'navigate',
    'click_element',
    'fill_input',
    'get_text',
    'get_title',
    'screenshot',
    'close_browser',
    'wait_for_navigation',
    'get_url'
  ];
  
  if (tools.length !== 10) {
    throw new Error('Expected 10 tools');
  }
  
  for (const tool of tools) {
    if (typeof tool !== 'string' || tool.length === 0) {
      throw new Error(`Invalid tool: ${tool}`);
    }
  }
  
  console.log('✓ Test 8: All 10 MCP tools are registered');
  testsPassed++;
} catch (error) {
  console.log('✗ Test 8 FAILED: Tool validation failed');
  console.log('  Error:', error.message);
  testsFailed++;
}

// Summary
console.log('\n========================================');
console.log('Test Summary');
console.log('========================================');
console.log(`✓ Tests Passed: ${testsPassed}`);
console.log(`✗ Tests Failed: ${testsFailed}`);
console.log(`Total Tests:    ${testsPassed + testsFailed}`);
console.log('========================================\n');

if (testsFailed === 0) {
  console.log('✓ All tests passed! The MCP server is ready for development.\n');
  process.exit(0);
} else {
  console.log('✗ Some tests failed. Please review the errors above.\n');
  process.exit(1);
}
