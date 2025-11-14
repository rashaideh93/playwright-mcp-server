# Quick Start - Playwright MCP Server

## 🚀 Get Started in 2 Minutes

### Step 1: Add to Claude Desktop

Edit your Claude configuration file:
- Windows: `%APPDATA%\Claude\claude_desktop_config.json`
- macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "playwright": {
      "command": "node",
      "args": ["/path/to/playwright-mcp-server/build/index.js"]
    }
  }
}
```

### Step 2: Restart Claude Desktop

Close and reopen Claude Desktop application.

### Step 3: Start Using

In Claude chat:
```
Launch a Chromium browser, navigate to google.com, and take a screenshot
```

Claude will:
1. Call `launch_browser` → Get browser ID
2. Call `navigate` → Go to google.com
3. Call `screenshot` → Save screenshot
4. Call `close_browser` → Clean up

---

## 📋 Available Tools

| Tool | Purpose | Parameters |
|------|---------|------------|
| `launch_browser` | Start a browser | browserType, headless, url |
| `navigate` | Go to URL | browserId, url, waitUntil |
| `click_element` | Click element | browserId, selector |
| `fill_input` | Type in input | browserId, selector, text |
| `get_text` | Read text | browserId, selector |
| `get_title` | Get page title | browserId |
| `get_url` | Get current URL | browserId |
| `screenshot` | Save screenshot | browserId, filename |
| `wait_for_navigation` | Wait for navigation | browserId, timeout |
| `close_browser` | Close browser | browserId |

---

## 💡 Example Workflows

### Web Scraping
```
1. launch_browser (chromium, headless: true)
2. navigate (url: example.com)
3. get_text (selector: "h1")
4. screenshot
5. close_browser
```

### Form Filling
```
1. launch_browser (chromium)
2. navigate (url: form.example.com)
3. fill_input (selector: "#name", text: "John")
4. fill_input (selector: "#email", text: "john@example.com")
5. click_element (selector: "button[type=submit]")
6. screenshot
7. close_browser
```

### E-commerce Testing
```
1. launch_browser
2. navigate (url: shop.example.com)
3. click_element (selector: ".product")
4. get_text (selector: ".price")
5. click_element (selector: ".add-to-cart")
6. screenshot
7. close_browser
```

---

## 🔧 Manual Server Control

### Start Server
```bash
node build/index.js
```

### Test with Client
```bash
node test-server.mjs
```

### Install Browsers (if needed)
```bash
node node_modules/playwright/cli.js install
```

---

## ✅ Verify Installation

Run test client and look for:
```
✅ "Server Response" with serverInfo
✅ All 10 tools listed
✅ "launch_browser" successful
```

---

## 📱 Browser Types

- **chromium** - Fastest, most compatible
- **firefox** - Good compatibility, larger
- **webkit** - Good compatibility, medium

---

## 🎯 Pro Tips

1. **Use headless mode** for speed: `headless: true`
2. **Wait strategies**: Use `waitUntil: "networkidle"` for AJAX
3. **Selectors**: CSS selectors work best (e.g., `#id`, `.class`, `[attr]`)
4. **Screenshots**: Filenames auto-timestamped if not specified
5. **Error messages**: Detailed - read them to debug issues

---

## 📞 Need Help?

See:
- `API_REFERENCE.md` - Detailed tool documentation
- `EXAMPLES.md` - Real-world examples
- `TROUBLESHOOTING.md` - Common issues & solutions

---

**You're all set! Start automating with your AI assistant!** 🚀
