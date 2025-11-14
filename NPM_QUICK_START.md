# NPM Publication - Quick Start (15 Minutes)

## 🎯 Goal
Publish your Playwright MCP Server to NPM so users can install globally with:
```bash
npm install -g playwright-mcp-server
npx playwright-mcp-server
```

## ⏱️ Timeline
- **Preparation:** 10 minutes
- **Publishing:** 2 minutes
- **Verification:** 3 minutes

---

## Step 1️⃣: Update package.json (3 minutes)

**Current issues to fix:**
- Package name should be unique on NPM
- Missing metadata (author, license, etc.)
- Missing bin field for global install
- Need to exclude unnecessary files

**Add these fields:**

```json
{
  "name": "@yourusername/playwright-mcp-server",
  "version": "1.0.0",
  "description": "AI-powered automated QA testing with Playwright and Model Context Protocol",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/yourusername/playwright-mcp-server",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/playwright-mcp-server.git"
  },
  "bugs": {
    "url": "https://github.com/yourusername/playwright-mcp-server/issues"
  },
  "keywords": [
    "playwright",
    "mcp",
    "model-context-protocol",
    "testing",
    "automation",
    "qa",
    "browser-automation",
    "ai"
  ],
  "main": "./build/index.js",
  "type": "module",
  "bin": {
    "playwright-mcp": "./build/index.js"
  },
  "engines": {
    "node": ">=17.0.0"
  },
  "files": [
    "build/",
    "README.md",
    "LICENSE"
  ],
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "dev": "tsc && node build/index.js",
    "prepublishOnly": "npm run build"
  }
}
```

---

## Step 2️⃣: Create LICENSE file (2 minutes)

Create file: `LICENSE`

```
MIT License

Copyright (c) 2025 Your Name

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Step 3️⃣: Create .npmignore (2 minutes)

Create file: `.npmignore`

```
.vscode/
.github/
node_modules/
src/
tsconfig.json
test-server.mjs
test-server.js
*.log
.gitignore
PUBLISHING_GUIDE.md
NPM_QUICK_START.md
QA_*.md
TEST_*.md
INTEGRATION_*.md
SETUP.md
QUICK_*.md
INDEX.md
PROJECT_*.md
EXAMPLES.md
API_REFERENCE.md
TROUBLESHOOTING.md
FINAL_SUMMARY.md
```

---

## Step 4️⃣: Create NPM Account (3 minutes)

**If you don't have an NPM account:**

1. Visit: https://www.npmjs.com/signup
2. Enter username, email, password
3. Verify email
4. Done!

**Your package name:** `@yourusername/playwright-mcp-server`

---

## Step 5️⃣: Login to NPM (2 minutes)

**Terminal command:**

```bash
npm login
```

**When prompted:**
1. Enter username
2. Enter password
3. Enter email
4. Authenticate in browser if required

**Result:** `.npmrc` file created with auth token

---

## Step 6️⃣: Publish Package (1 minute)

**From project root directory:**

```bash
npm publish --access public
```

**If using scoped name (@yourusername/...):**

```bash
npm publish --access public
```

**Expected output:**
```
npm notice Publishing to the public npm registry
+ @yourusername/playwright-mcp-server@1.0.0
```

---

## Step 7️⃣: Verify Publishing (2 minutes)

**Check NPM registry:**
```bash
npm view @yourusername/playwright-mcp-server
```

**Or visit URL:**
```
https://www.npmjs.com/package/@yourusername/playwright-mcp-server
```

---

## ✅ After Publishing: End Users Can Install

### Option 1: Local Installation
```bash
npm install @yourusername/playwright-mcp-server
```

### Option 2: Global Installation
```bash
npm install -g @yourusername/playwright-mcp-server
playwright-mcp
```

### Option 3: Using npx (No Installation)
```bash
npx @yourusername/playwright-mcp-server
```

### Option 4: In Node.js Project
```javascript
import { spawn } from 'child_process';

const server = spawn('npx', ['@yourusername/playwright-mcp-server']);
```

---

## 🔄 Updating Your Package

### When You Make Changes:

**Increment version in package.json:**
```json
{
  "version": "1.0.1"  // was 1.0.0
}
```

**Republish:**
```bash
npm publish
```

**Version Guidelines:**
- `1.0.0` → `1.0.1` = Bug fix
- `1.0.0` → `1.1.0` = New feature
- `1.0.0` → `2.0.0` = Breaking change

---

## 🎓 Common Issues & Solutions

### Issue 1: Package Name Already Taken
**Solution:** Use scoped package
```json
{
  "name": "@yourusername/playwright-mcp-server"
}
```

### Issue 2: npm ERR! 403 Forbidden
**Solution:** Re-login
```bash
npm login
```

### Issue 3: Need to Unpublish
**Solution:**
```bash
npm unpublish @yourusername/playwright-mcp-server@1.0.0
```

### Issue 4: Build Not Included
**Solution:** Ensure `build/` is in files field and run `npm run build` before publish

---

## 📊 NPM Publishing Checklist

- [ ] Package name chosen (unique & scoped)
- [ ] Version bumped in package.json
- [ ] README.md is complete
- [ ] LICENSE file created
- [ ] .npmignore created
- [ ] `npm run build` succeeds
- [ ] build/index.js exists and works
- [ ] NPM account created
- [ ] `npm login` successful
- [ ] Keywords added to package.json
- [ ] Repository URL correct
- [ ] `npm publish --access public` executed
- [ ] Package visible on npmjs.com
- [ ] Installation test successful

---

## 🚀 Quick Copy-Paste Template

Replace `yourusername` with your actual NPM username:

```json
{
  "name": "@yourusername/playwright-mcp-server",
  "version": "1.0.0",
  "description": "AI-powered automated QA testing with Playwright and Model Context Protocol",
  "author": "Your Name <your.email@example.com>",
  "license": "MIT",
  "homepage": "https://github.com/yourusername/playwright-mcp-server",
  "repository": {
    "type": "git",
    "url": "https://github.com/yourusername/playwright-mcp-server.git"
  },
  "keywords": ["playwright", "mcp", "testing", "automation", "qa"],
  "main": "./build/index.js",
  "type": "module",
  "bin": {
    "playwright-mcp": "./build/index.js"
  },
  "engines": {
    "node": ">=17.0.0"
  },
  "files": ["build/", "README.md", "LICENSE"],
  "scripts": {
    "build": "tsc",
    "start": "node build/index.js",
    "dev": "tsc && node build/index.js",
    "prepublishOnly": "npm run build"
  },
  "dependencies": {
    "@modelcontextprotocol/sdk": "^1.4.0",
    "playwright": "^1.48.0",
    "zod": "^3"
  }
}
```

---

## ✨ After Publishing Success

**Share with developers:**

```markdown
# Installation

```bash
npm install @yourusername/playwright-mcp-server
npx playwright-mcp
```

**Use in your automation framework:**

```javascript
import { spawn } from 'child_process';

// Start Playwright MCP Server
const server = spawn('npx', ['@yourusername/playwright-mcp-server']);

// Connect via MCP protocol
// Now you have 10 tools available:
// - launch_browser
// - navigate
// - click_element
// - fill_input
// - get_text
// - take_screenshot
// - etc.
```
```

---

## 🎯 Next Steps

1. **Modify package.json** with your username
2. **Create LICENSE file**
3. **Create .npmignore file**
4. **Run `npm login`**
5. **Run `npm publish --access public`**
6. **Verify on npmjs.com**
7. **Share with users**

**Total time: ~15 minutes to global NPM distribution!**

---

## 📞 Support

**Need help?**
- NPM Docs: https://docs.npmjs.com/
- Package Publishing: https://docs.npmjs.com/packages-and-modules/contributing-packages-to-the-registry
- Scoped Packages: https://docs.npmjs.com/cli/v9/using-npm/scope
