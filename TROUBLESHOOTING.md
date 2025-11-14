# Troubleshooting Guide

## Common Issues and Solutions

### Installation Issues

#### Node.js Not Found

**Problem:**
```
npm : The term 'npm' is not recognized
node : The term 'node' is not recognized
```

**Solutions:**

1. **Check if Node.js is installed:**
   ```bash
   node --version
   npm --version
   ```

2. **If not installed:**
   - Windows: Download from https://nodejs.org/
   - macOS: `brew install node`
   - Linux: `sudo apt-get install nodejs npm`

3. **After installation, restart your terminal/PowerShell**

4. **Verify PATH:**
   - Windows: `echo %PATH%` should include Node.js directory
   - macOS/Linux: `which node` should show node path

#### npm install Fails

**Problem:**
```
npm ERR! code ERESOLVE
npm ERR! ERESOLVE unable to resolve dependency tree
```

**Solutions:**

1. **Clear npm cache:**
   ```bash
   npm cache clean --force
   ```

2. **Try with legacy peer deps flag:**
   ```bash
   npm install --legacy-peer-deps
   ```

3. **Delete and reinstall:**
   ```bash
   rm -rf node_modules package-lock.json
   npm install
   ```

4. **Check Node version compatibility:**
   ```bash
   node --version  # Should be v17 or higher
   npm --version   # Should be v8 or higher
   ```

#### Permission Denied

**Problem:**
```
npm ERR! code EACCES
npm ERR! syscall mkdir
```

**Solutions:**

1. **Fix npm permissions (macOS/Linux):**
   ```bash
   mkdir ~/.npm-global
   npm config set prefix '~/.npm-global'
   export PATH=~/.npm-global/bin:$PATH
   ```

2. **Use sudo (not recommended):**
   ```bash
   sudo npm install
   ```

3. **Check folder permissions:**
   ```bash
   ls -la  # Check if you own the directory
   chmod 755 ~/AppData  # Windows/WSL
   ```

### Build Issues

#### TypeScript Compilation Errors

**Problem:**
```
error TS2307: Cannot find module '@modelcontextprotocol/sdk'
```

**Solutions:**

1. **Ensure dependencies are installed:**
   ```bash
   npm install
   ```

2. **Check package.json has correct versions**

3. **Clear and rebuild:**
   ```bash
   rm -rf build
   npm run build
   ```

4. **Check TypeScript version:**
   ```bash
   npx tsc --version  # Should be v5+
   ```

#### Build Command Not Found

**Problem:**
```
'npm' is not recognized
or
tsc command not found
```

**Solutions:**

1. **Verify you're in the correct directory:**
   ```bash
   pwd  # Should show project directory
   ls   # Should show package.json
   ```

2. **Use full path:**
   ```bash
   ./node_modules/.bin/tsc  # Local TypeScript
   ```

3. **Or use npm script:**
   ```bash
   npm run build  # Runs npm's TypeScript
   ```

### Runtime Issues

#### Server Won't Start

**Problem:**
```
npm start
# No output or error
```

**Solutions:**

1. **Verify build exists:**
   ```bash
   ls build/
   ls build/index.js  # Should exist
   ```

2. **Check for errors:**
   ```bash
   npm run build  # Rebuild
   npm start      # Try again
   ```

3. **Manual start:**
   ```bash
   node ./build/index.js
   ```

4. **Check file permissions:**
   ```bash
   chmod 755 build/index.js  # Make executable
   ```

#### Port Already in Use

**Problem:**
```
Error: listen EADDRINUSE :::3000
or
Address already in use
```

**Solutions:**

1. **Note:** This shouldn't happen with stdio transport

2. **If it does, find process:**
   ```bash
   # Windows
   netstat -ano | findstr :3000
   taskkill /PID <PID> /F
   
   # macOS/Linux
   lsof -i :3000
   kill -9 <PID>
   ```

3. **Or use different port if applicable**

### Connection Issues

#### VS Code Can't Connect

**Problem:**
```
MCP server failed to connect
Connection refused
```

**Solutions:**

1. **Check .vscode/mcp.json syntax:**
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

2. **Use absolute path instead of relative:**
   ```json
   "args": ["C:\\Users\\...\\build\\index.js"]  # Windows
   "args": ["/Users/.../ build/index.js"]       # macOS
   ```

3. **Verify build/index.js exists:**
   ```bash
   ls -la build/index.js
   file build/index.js  # Should be JavaScript
   ```

4. **Reload VS Code:**
   - Close all instances of VS Code
   - Reopen the project
   - Try connecting again

#### Claude Desktop Can't Connect

**Problem:**
```
Failed to connect to MCP server
Server not responding
```

**Solutions:**

1. **Check config location:**
   - Windows: `%APPDATA%\Claude\claude_desktop_config.json`
   - macOS: `~/Library/Application Support/Claude/claude_desktop_config.json`

2. **Verify JSON syntax:**
   ```bash
   # Use a JSON validator
   # Or try: python -m json.tool < claude_desktop_config.json
   ```

3. **Use absolute paths:**
   ```json
   "args": ["C:\\full\\path\\to\\build\\index.js"]
   ```

4. **Verify the file exists:**
   ```bash
   test -f path/to/build/index.js && echo "OK"
   ```

5. **Check permissions:**
   ```bash
   ls -la path/to/build/index.js
   ```

6. **Restart Claude Desktop completely:**
   - Quit Claude (Cmd+Q or Alt+F4)
   - Wait 5 seconds
   - Reopen Claude

### Tool Execution Issues

#### Browser Not Found

**Problem:**
```
Tool returned: Browser browser-1 not found
```

**Solutions:**

1. **Check browser ID:**
   - Use the exact ID returned from `launch_browser`
   - IDs follow format: `browser-1`, `browser-2`, etc.

2. **Verify browser was launched:**
   ```
   launch_browser first → get browser ID → use that ID
   ```

3. **Browser may have been closed:**
   - Launch a new browser first

#### Element Not Found

**Problem:**
```
Tool returned: Error getting text: [Error about selector not matching]
```

**Solutions:**

1. **Verify CSS selector:**
   - Open DevTools in real browser (F12)
   - Test selector: `document.querySelector("your.selector")`

2. **Common selector patterns:**
   ```css
   #id           /* By ID */
   .class        /* By class */
   button        /* By tag */
   [name="x"]    /* By attribute */
   div > button  /* By hierarchy */
   ```

3. **Elements might not be visible:**
   - Page might still be loading
   - Element might be in a modal/popup
   - Element might be hidden with CSS

4. **Try more specific selector:**
   ```
   Bad:  button
   Good: form#login button[type='submit']
   ```

#### Navigation Timeout

**Problem:**
```
Tool returned: Error waiting for navigation: Timeout exceeded
```

**Solutions:**

1. **Increase timeout:**
   - Default is 30 seconds
   - Try higher value: 60000ms

2. **Use different waitUntil:**
   - `"load"` - Full page load (default, safest)
   - `"domcontentloaded"` - DOM ready
   - `"networkidle"` - Network idle

3. **Check URL:**
   - Verify the URL exists
   - Try in a real browser first
   - Check for redirects

4. **Page might be stuck:**
   - Try navigating to simpler page first
   - Check network tab in DevTools

### Performance Issues

#### Server Running Slowly

**Problem:**
```
Tools take a long time to execute
```

**Solutions:**

1. **Use headless mode:**
   ```
   headless: true  (default, faster)
   headless: false (visual, slower)
   ```

2. **Close unused browsers:**
   ```
   Use close_browser to free memory
   ```

3. **Check system resources:**
   ```bash
   # Windows
   tasklist | findstr node
   
   # macOS/Linux
   ps aux | grep node
   ```

4. **Use Chromium (fastest):**
   ```
   browserType: "chromium"  (fastest)
   browserType: "firefox"   (medium)
   browserType: "webkit"    (slower)
   ```

#### High Memory Usage

**Problem:**
```
MCP server using lots of memory
System getting slow
```

**Solutions:**

1. **Close browsers:**
   ```
   Always use close_browser when done
   ```

2. **Limit concurrent browsers:**
   - Don't launch too many at once
   - Close one before launching another

3. **Check for memory leaks:**
   - Look at build/index.ts
   - Ensure pages are cleaned up

4. **Monitor memory:**
   ```bash
   # macOS/Linux
   top -p $(pgrep -f "node ./build/index.js")
   ```

### MCP Inspector Issues

#### Can't Open Inspector

**Problem:**
```
Command not found:
npx @modelcontextprotocol/inspector
```

**Solutions:**

1. **Install globally:**
   ```bash
   npm install -g @modelcontextprotocol/inspector
   ```

2. **Or use full command:**
   ```bash
   npx @modelcontextprotocol/inspector node ./build/index.js
   ```

3. **Check npm:**
   ```bash
   npm --version
   npx --version
   ```

#### Inspector Can't Connect to Server

**Problem:**
```
Inspector says: Failed to connect to server
```

**Solutions:**

1. **Make sure server is built:**
   ```bash
   npm run build
   ```

2. **Inspector will start the server:**
   - Just run the command
   - Inspector handles startup

3. **Check build/index.js permissions:**
   ```bash
   chmod 755 build/index.js
   ```

4. **Try with different command:**
   ```bash
   npx @modelcontextprotocol/inspector npx @modelcontextprotocol/server-memory
   # (This tests if inspector works with another server)
   ```

### Playwright-Specific Issues

#### Browser Binary Not Found

**Problem:**
```
Error: Failed to download Chromium
```

**Solutions:**

1. **Reinstall Playwright:**
   ```bash
   npm install --save-dev playwright
   npx playwright install
   ```

2. **Check disk space:**
   - Browsers need ~1GB
   - Verify available space

3. **Network issues:**
   - Try again with better connection
   - Or set proxy if needed

4. **Manual installation:**
   ```bash
   npx playwright install chromium firefox webkit
   ```

#### Timeout During Element Interaction

**Problem:**
```
Error: click action timeout after 30s
```

**Solutions:**

1. **Wait for element first:**
   ```
   Element might not be visible yet
   ```

2. **Try different selector:**
   - Elements might be nested
   - Try ancestor/parent selectors

3. **Element might be covered:**
   - Try scrolling to element
   - Check z-index in CSS

4. **Use screenshots for debugging:**
   ```
   screenshot before clicking to see page state
   ```

### Debugging Tips

#### Enable Verbose Logging

**Problem:**
```
Need to see what's happening
```

**Solutions:**

1. **Check stderr output:**
   ```bash
   npm start 2>&1  # Capture both stdout and stderr
   ```

2. **Add debug logging in src/index.ts:**
   ```typescript
   console.error("Debug info here");  // Shows in stderr
   ```

3. **Use screenshots:**
   ```
   screenshot to see page state at any point
   ```

#### Test Tools Individually

1. **Use MCP Inspector:**
   ```bash
   npx @modelcontextprotocol/inspector node ./build/index.js
   ```

2. **Test each tool one at a time**

3. **Verify tool responses**

4. **Then test in actual client**

### Getting Help

**If you still have issues:**

1. **Check README.md** for detailed documentation
2. **Review EXAMPLES.md** for working examples
3. **Use QUICK_REFERENCE.md** for common issues
4. **Test with MCP Inspector** for debugging
5. **Check Playwright docs** for browser-specific issues
6. **Check MCP docs** for protocol issues

### Error Message Reference

| Error | Likely Cause | Solution |
|-------|-------------|----------|
| Browser not found | Invalid ID | Check ID from launch_browser |
| Element not found | Wrong selector | Verify with DevTools |
| Navigation timeout | Page slow/stuck | Increase timeout, try simpler URL |
| npm not found | Node.js not installed | Install Node.js |
| Port in use | Stdio conflict | Shouldn't happen; restart |
| JSON syntax error | Config malformed | Use JSON validator |
| Permission denied | File permissions | Check chmod, ownership |
| Module not found | Dependencies missing | Run npm install |

### Quick Restart

If everything is broken, try this sequence:

```bash
# 1. Go to project directory
cd "c:\Users\mohammad.rashaideh\OneDrive - Department of Community Development\Desktop\test"

# 2. Clean
rm -r node_modules build package-lock.json

# 3. Reinstall
npm install

# 4. Rebuild
npm run build

# 5. Test
npm start

# 6. If that works, try with Inspector
npx @modelcontextprotocol/inspector node ./build/index.js
```

### Support Resources

- MCP Docs: https://modelcontextprotocol.io/
- Playwright Docs: https://playwright.dev/
- Node.js Docs: https://nodejs.org/docs/
- GitHub Issues: Check related projects

---

Last updated: November 14, 2025
