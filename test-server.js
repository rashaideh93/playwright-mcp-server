#!/usr/bin/env node

/**
 * MCP Server Test Client
 * Tests the Playwright MCP Server by making tool calls
 */

const { spawn } = require("child_process");
const { createInterface } = require("readline");

console.log("🚀 Starting Playwright MCP Server test...\n");

// Spawn the server
const server = spawn(process.execPath, ["./build/index.js"], {
  cwd: process.cwd(),
});

let messageId = 0;
const rl = createInterface({
  input: server.stdout,
  output: server.stdin,
  terminal: false,
});

// Store responses
const responses = {};

// Listen for responses
rl.on("line", (line) => {
  try {
    const response = JSON.parse(line);
    console.log("📨 Server Response:", JSON.stringify(response, null, 2));
    responses[response.id] = response;
  } catch (error) {
    console.log("Raw output:", line);
  }
});

// Handle server errors
server.stderr.on("data", (data) => {
  console.error("Server stderr:", data.toString());
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

// Send initialize request
setTimeout(() => {
  console.log("\n📤 Sending: initialize request");
  const msg = {
    jsonrpc: "2.0",
    id: ++messageId,
    method: "initialize",
    params: {
      protocolVersion: "2024-11-05",
      capabilities: {},
      clientInfo: {
        name: "test-client",
        version: "1.0.0",
      },
    },
  };
  server.stdin.write(JSON.stringify(msg) + "\n");
}, 500);

// List tools after initialize
setTimeout(() => {
  console.log("\n📤 Sending: tools/list request");
  const msg = {
    jsonrpc: "2.0",
    id: ++messageId,
    method: "tools/list",
    params: {},
  };
  server.stdin.write(JSON.stringify(msg) + "\n");
}, 1500);

// Test launch_browser tool
setTimeout(() => {
  console.log("\n📤 Sending: launch_browser call");
  const msg = {
    jsonrpc: "2.0",
    id: ++messageId,
    method: "tools/call",
    params: {
      name: "launch_browser",
      arguments: {
        browserType: "chromium",
        headless: true,
      },
    },
  };
  server.stdin.write(JSON.stringify(msg) + "\n");
}, 2500);

// Close after 5 seconds
setTimeout(() => {
  console.log("\n✅ Test complete. Closing server...");
  server.stdin.end();
  server.kill();
  process.exit(0);
}, 5000);
