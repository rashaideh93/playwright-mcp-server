# GitHub Setup Guide for Playwright MCP Server

Complete step-by-step guide to upload your project to GitHub.

---

## 📋 Prerequisites

### 1. Install Git

**Windows:**
- Download from: https://git-scm.com/download/win
- Choose "Git for Windows"
- Run installer with default options
- Restart PowerShell/Terminal after installation

**macOS:**
```bash
brew install git
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get install git
```

### 2. Verify Git Installation

```bash
git --version
```

Should return: `git version 2.x.x`

---

## 🔧 Configure Git

### Step 1: Set Global User Configuration

Replace with your actual information:

```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Step 2: Verify Configuration

```bash
git config --list
```

You should see your name and email in the output.

---

## 🚀 Create GitHub Repository

### Step 1: Create GitHub Account (if you don't have one)

1. Visit: https://github.com/signup
2. Enter email, password, username
3. Verify email address
4. Done!

### Step 2: Create New Repository on GitHub

1. Log into GitHub: https://github.com/login
2. Click **+** icon (top right) → **New repository**
3. Fill in details:
   - **Repository name:** `playwright-mcp-server`
   - **Description:** "AI-powered automated QA testing with Playwright and Model Context Protocol"
   - **Visibility:** Public (or Private if you prefer)
   - **Initialize repository:** NO (don't check any boxes)
4. Click **Create repository**

**Important:** Do NOT initialize with README, .gitignore, or license on GitHub

---

## 📤 Upload Project to GitHub

### Step 1: Navigate to Project

```bash
cd /path/to/playwright-mcp-server
```

Replace `/path/to/` with your actual project location.

### Step 2: Initialize Git Repository

```bash
git init
```

### Step 3: Add All Files

```bash
git add .
```

Or add specific files:
```bash
git add src/ build/ package.json tsconfig.json README.md LICENSE
```

### Step 4: Create First Commit

```bash
git commit -m "Initial commit: Playwright MCP Server with 10 automation tools"
```

### Step 5: Add Remote Repository

Get the HTTPS URL from your GitHub repository (looks like: `https://github.com/yourusername/playwright-mcp-server.git`)

```bash
git remote add origin https://github.com/yourusername/playwright-mcp-server.git
```

Replace `yourusername` with your GitHub username.

### Step 6: Rename Branch (optional but recommended)

```bash
git branch -M main
```

### Step 7: Push to GitHub

```bash
git push -u origin main
```

When prompted:
- **Username:** Your GitHub username
- **Password:** Your GitHub personal access token (see next section)

---

## 🔐 GitHub Personal Access Token (Important!)

GitHub no longer accepts passwords for command-line operations. You need a Personal Access Token.

### Generate Token:

1. Go to: https://github.com/settings/tokens/new
2. **Token name:** `playwright-mcp-token`
3. **Expiration:** 90 days (or your preference)
4. **Scopes:** Check these boxes:
   - `repo` (full control of private/public repositories)
   - `workflow` (if you'll use GitHub Actions)
5. Click **Generate token**
6. **COPY** the token immediately (you won't see it again!)

### Use Token for Authentication:

When `git push` asks for password, paste your token.

### Save Token Locally (Windows):

1. Open **Credential Manager**
2. Click **Windows Credentials**
3. Click **Add a generic credential**
4. Fill in:
   - **Internet or network address:** `git:https://github.com`
   - **User name:** Your GitHub username
   - **Password:** Your personal access token
5. Click **OK**

Now `git push` won't ask for credentials anymore.

---

## ✅ Verify Upload

### Check GitHub Repository

1. Go to: `https://github.com/yourusername/playwright-mcp-server`
2. You should see all your files:
   - `src/index.ts`
   - `build/index.js`
   - `package.json`
   - `README.md`
   - All documentation files
   - `.gitignore`

### Check Git Status Locally

```bash
git status
```

Should show:
```
On branch main
Your branch is up to date with 'origin/main'.

nothing to commit, working tree clean
```

---

## 📝 Update .gitignore (Recommended)

Create or update `.gitignore` to exclude unnecessary files:

```
node_modules/
build/
*.log
.vscode/
.env
.DS_Store
*.lock
```

This prevents these files from being uploaded to GitHub.

---

## 🔄 Making Changes & Pushing Updates

After you make changes to your project:

### 1. Check Status
```bash
git status
```

### 2. Stage Changes
```bash
git add .
```

### 3. Commit
```bash
git commit -m "Describe your changes here"
```

### 4. Push to GitHub
```bash
git push
```

---

## 🏷️ Create Release Tags (Optional)

Tag important versions:

```bash
git tag -a v1.0.0 -m "Release version 1.0.0"
git push origin v1.0.0
```

Then go to GitHub → Releases and click "Draft a new release" to create release notes.

---

## 📊 GitHub Repository Structure

After upload, your GitHub repository should have:

```
playwright-mcp-server/
├── .github/
│   └── workflows/           # (optional) CI/CD pipelines
├── .gitignore
├── src/
│   └── index.ts            # Main server code
├── build/
│   └── index.js            # Compiled output
├── package.json
├── package-lock.json
├── tsconfig.json
├── LICENSE                 # MIT License
├── README.md              # Main documentation
├── SETUP.md              # Setup instructions
├── API_REFERENCE.md      # Tool documentation
├── EXAMPLES.md           # Usage examples
├── QUICK_START.md        # Quick start guide
├── QA_TESTING_GUIDE.md   # QA testing workflows
├── TEST_CASE_DESIGN.md   # Test case templates
├── QA_SCENARIOS.md       # Real-world scenarios
└── [other documentation files]
```

---

## 🎯 GitHub Repository Features

### 1. Add Topics (Tags)

1. Go to your repository settings
2. Scroll to "Topics"
3. Add: `playwright`, `mcp`, `testing`, `automation`, `qa`, `browser-automation`

This helps people discover your project.

### 2. Add Description

1. Top of repository page, click **Edit**
2. Add description: "AI-powered automated QA testing with Playwright and MCP"
3. Add website URL (optional)

### 3. Enable Discussions (Optional)

1. Go to **Settings** → **Features**
2. Enable **Discussions**
3. Users can discuss your project

### 4. Enable Issues (Optional)

Keep this enabled for bug reports and feature requests.

---

## 🚀 After Upload: Next Steps

### Publish to NPM

Once on GitHub, you can publish to NPM:

1. Update `package.json` with correct fields
2. Create NPM account: https://www.npmjs.com/signup
3. Run: `npm publish`

See `NPM_QUICK_START.md` for detailed instructions.

### Setup GitHub Actions (Optional)

Automate testing and releases with GitHub Actions:

1. Create `.github/workflows/test.yml`
2. Configure automated tests on push
3. Automatic releases

### Create GitHub Pages (Optional)

Host documentation at `yourusername.github.io/playwright-mcp-server`:

1. Go to **Settings** → **Pages**
2. Set source to `main` branch `/docs` folder
3. Add your docs to `/docs` folder

---

## 🔧 Troubleshooting

### Error: "fatal: not a git repository"

**Solution:** Run `git init` in your project directory first.

### Error: "fatal: 'origin' does not appear to be a git repository"

**Solution:** Run `git remote add origin <your-repo-url>`

### Error: "Permission denied (publickey)"

**Solution:** 
- Make sure you've set up SSH keys or personal access token
- Or use HTTPS instead of SSH

### Error: "fatal: The remote end hung up unexpectedly"

**Solution:**
- Increase buffer size: `git config http.postBuffer 524288000`
- Try push again

### Push rejected: "Updates were rejected because the tip of your current branch is behind"

**Solution:** 
```bash
git pull origin main
git push origin main
```

---

## 📚 Useful Git Commands

```bash
# See commit history
git log

# See what changed
git diff

# Undo last commit (keep changes)
git reset --soft HEAD~1

# Undo last commit (discard changes)
git reset --hard HEAD~1

# Create new branch
git checkout -b feature-name

# Switch to branch
git checkout main

# Merge branch
git merge feature-name

# Delete branch
git branch -d feature-name
```

---

## ✨ GitHub Repository Ready!

After following these steps:

✅ Project uploaded to GitHub
✅ All files visible and accessible
✅ Ready for collaboration
✅ Ready to publish on NPM
✅ Ready for GitHub Pages documentation
✅ Ready for GitHub Actions CI/CD

**Your Playwright MCP Server is now global and maintainable on GitHub!**

---

## 📞 Next Steps

1. ✅ **GitHub Upload** (This guide)
2. → **NPM Publication** (See `NPM_QUICK_START.md`)
3. → **Add CI/CD** (Optional GitHub Actions)
4. → **Documentation Site** (Optional GitHub Pages)

---

## 🔗 Useful Links

- GitHub: https://github.com
- Git Documentation: https://git-scm.com/doc
- GitHub Guides: https://guides.github.com/
- Personal Access Tokens: https://github.com/settings/tokens
- SSH Keys Setup: https://docs.github.com/en/authentication/connecting-to-github-with-ssh

