import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import { chromium, firefox, webkit } from "playwright";

// Create server instance
const server = new McpServer({
  name: "playwright-server",
  version: "1.0.0",
});

// Type definitions
interface BrowserContext {
  browserId: string;
  browserType: "chromium" | "firefox" | "webkit";
  page?: any;
}

interface StoredBrowser {
  browser: any;
  context: any;
  pages: Map<string, any>;
}

// Global storage for browser instances
const browsers = new Map<string, StoredBrowser>();
let browserId = 0;

// Helper function to generate unique browser IDs
function generateBrowserId(): string {
  return `browser-${++browserId}`;
}

// Tool: Launch Browser
server.registerTool(
  "launch_browser",
  {
    title: "Launch Browser",
    description:
      "Launch a new browser instance (chromium, firefox, or webkit)",
    inputSchema: z.object({
      browserType: z
        .enum(["chromium", "firefox", "webkit"])
        .describe("Type of browser to launch"),
      headless: z
        .boolean()
        .optional()
        .default(true)
        .describe("Run browser in headless mode"),
      url: z
        .string()
        .optional()
        .describe("Optional URL to navigate to on launch"),
    }),
  },
  async ({ browserType, headless, url }: { browserType: "chromium" | "firefox" | "webkit"; headless?: boolean; url?: string }) => {
    try {
      let browserLauncher;

      switch (browserType) {
        case "chromium":
          browserLauncher = chromium;
          break;
        case "firefox":
          browserLauncher = firefox;
          break;
        case "webkit":
          browserLauncher = webkit;
          break;
      }

      const browser = await browserLauncher.launch({ headless });
      const context = await browser.newContext();
      const page = await context.newPage();

      const bid = generateBrowserId();
      browsers.set(bid, {
        browser,
        context,
        pages: new Map([[page.toString(), page]]),
      });

      if (url) {
        await page.goto(url);
      }

      return {
        content: [
          {
            type: "text",
            text: `Browser launched successfully. Browser ID: ${bid}, Browser Type: ${browserType}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error launching browser: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Navigate to URL
server.registerTool(
  "navigate",
  {
    title: "Navigate to URL",
    description: "Navigate to a specific URL in the browser",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      url: z.string().describe("URL to navigate to"),
      waitUntil: z
        .enum(["load", "domcontentloaded", "networkidle"])
        .optional()
        .default("load")
        .describe("When to consider navigation succeeded"),
    }),
  },
  async ({ browserId, url, waitUntil }: { browserId: string; url: string; waitUntil?: "load" | "domcontentloaded" | "networkidle" }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      await page.goto(url, { waitUntil });

      return {
        content: [
          {
            type: "text",
            text: `Successfully navigated to ${url}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error navigating: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Get Page Title
server.registerTool(
  "get_title",
  {
    title: "Get Page Title",
    description: "Get the title of the current page",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
    }),
  },
  async ({ browserId }: { browserId: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];
      const title = await page.title();

      return {
        content: [
          {
            type: "text",
            text: `Page title: ${title}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting title: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Click Element
server.registerTool(
  "click_element",
  {
    title: "Click Element",
    description: "Click an element on the page using a selector",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      selector: z.string().describe("CSS selector of the element to click"),
    }),
  },
  async ({ browserId, selector }: { browserId: string; selector: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      await page.click(selector);

      return {
        content: [
          {
            type: "text",
            text: `Successfully clicked element with selector: ${selector}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error clicking element: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Fill Input
server.registerTool(
  "fill_input",
  {
    title: "Fill Input",
    description: "Fill an input field with text",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      selector: z.string().describe("CSS selector of the input element"),
      text: z.string().describe("Text to fill in the input"),
    }),
  },
  async ({ browserId, selector, text }: { browserId: string; selector: string; text: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      await page.fill(selector, text);

      return {
        content: [
          {
            type: "text",
            text: `Successfully filled input with selector: ${selector}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error filling input: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Get Text Content
server.registerTool(
  "get_text",
  {
    title: "Get Text Content",
    description: "Get the text content of an element",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      selector: z.string().describe("CSS selector of the element"),
    }),
  },
  async ({ browserId, selector }: { browserId: string; selector: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      const text = await page.textContent(selector);

      return {
        content: [
          {
            type: "text",
            text: `Text content: ${text}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting text: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Screenshot
server.registerTool(
  "screenshot",
  {
    title: "Take Screenshot",
    description: "Take a screenshot of the current page",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      filename: z
        .string()
        .optional()
        .describe("Optional filename for the screenshot"),
    }),
  },
  async ({ browserId, filename }: { browserId: string; filename?: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      const path = filename || `screenshot-${Date.now()}.png`;
      await page.screenshot({ path });

      return {
        content: [
          {
            type: "text",
            text: `Screenshot saved to: ${path}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error taking screenshot: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Close Browser
server.registerTool(
  "close_browser",
  {
    title: "Close Browser",
    description: "Close a browser instance",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to close"),
    }),
  },
  async ({ browserId }: { browserId: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      await browserData.context.close();
      await browserData.browser.close();
      browsers.delete(browserId);

      return {
        content: [
          {
            type: "text",
            text: `Browser ${browserId} closed successfully`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error closing browser: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Wait for Navigation
server.registerTool(
  "wait_for_navigation",
  {
    title: "Wait for Navigation",
    description: "Wait for a page navigation to complete",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
      timeout: z
        .number()
        .optional()
        .default(30000)
        .describe("Timeout in milliseconds"),
    }),
  },
  async ({ browserId, timeout }: { browserId: string; timeout?: number }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      await page.waitForNavigation({ timeout });

      return {
        content: [
          {
            type: "text",
            text: `Navigation completed`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error waiting for navigation: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Tool: Get URL
server.registerTool(
  "get_url",
  {
    title: "Get Current URL",
    description: "Get the current URL of the page",
    inputSchema: z.object({
      browserId: z.string().describe("ID of the browser to use"),
    }),
  },
  async ({ browserId }: { browserId: string }) => {
    try {
      const browserData = browsers.get(browserId);
      if (!browserData) {
        return {
          content: [{ type: "text", text: `Browser ${browserId} not found` }],
        };
      }

      const pages = Array.from(browserData.pages.values());
      const page = pages[0];

      const url = page.url();

      return {
        content: [
          {
            type: "text",
            text: `Current URL: ${url}`,
          },
        ],
      };
    } catch (error) {
      return {
        content: [
          {
            type: "text",
            text: `Error getting URL: ${error instanceof Error ? error.message : String(error)}`,
          },
        ],
      };
    }
  }
);

// Main function
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error("Playwright MCP Server running on stdio");
}

main().catch((error) => {
  console.error("Fatal error in main():", error);
  process.exit(1);
});
