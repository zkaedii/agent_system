# GitHub Actions Workflows Documentation

This repository uses GitHub Actions for continuous integration, deployment, and automation. Below is a comprehensive guide to all available workflows.

## 📋 Table of Contents

1. [CI/CD Workflows](#cicd-workflows)
2. [Security & Quality Workflows](#security--quality-workflows)
3. [Automation Workflows](#automation-workflows)
4. [Configuration Files](#configuration-files)

---

## CI/CD Workflows

### 🔄 CI Workflow (`ci.yml`)

**Triggers:** Push and Pull Requests to `main` and `develop` branches

**Purpose:** Ensures code quality through linting, type-checking, and building

**Jobs:**
- **Lint and Type Check**
  - Runs ESLint to check code style and quality
  - Performs TypeScript type checking

- **Build Application**
  - Compiles the application
  - Uploads build artifacts for download
  - Artifacts retained for 7 days

- **Run Tests**
  - Executes test suite (if available)
  - Continues on error to not block other checks

- **All Checks Passed**
  - Final verification that all jobs succeeded
  - Fails if any previous job failed

**Usage:**
```bash
# Automatically runs on:
git push origin main
git push origin develop

# Or when opening/updating a PR to these branches
```

---

### 🚀 Deploy Workflow (`deploy.yml`)

**Triggers:**
- Push to `main` branch
- Manual workflow dispatch

**Purpose:** Deploys the application to GitHub Pages

**Jobs:**
- **Build and Deploy**
  - Builds production-ready application
  - Configures GitHub Pages
  - Deploys to GitHub Pages
  - Provides deployment summary

**Configuration:**
- Uses Node.js 20
- Builds with `NODE_ENV=production`
- Prevents concurrent deployments

**Manual Trigger:**
```bash
# Via GitHub UI: Actions → Deploy to Production → Run workflow
# Or via GitHub CLI:
gh workflow run deploy.yml
```

**Access Deployed Site:**
The deployment URL will be shown in the workflow summary and job output.

---

## Security & Quality Workflows

### 🔒 CodeQL Security Scan (`codeql.yml`)

**Triggers:**
- Push to `main` and `develop` branches
- Pull Requests to `main` and `develop` branches
- Scheduled: Every Monday at 9 AM UTC

**Purpose:** Scans code for security vulnerabilities and quality issues

**Features:**
- Uses extended security queries
- Analyzes JavaScript/TypeScript code
- Reports findings to Security tab
- Runs automatically on schedule

**View Results:**
Navigate to: Repository → Security → Code scanning alerts

---

### 🛡️ Dependency Review (`dependency-review.yml`)

**Triggers:** Pull Requests that modify package files

**Purpose:** Reviews dependency changes for security vulnerabilities

**Features:**
- Fails on moderate or higher severity vulnerabilities
- Posts summary comment in PR
- Reviews both direct and transitive dependencies

**What it checks:**
- Known security vulnerabilities
- License compatibility
- Deprecated packages

---

### 📦 Bundle Size Check (`bundle-size.yml`)

**Triggers:** Pull Requests that modify frontend code or dependencies

**Purpose:** Monitors bundle size changes and prevents bloat

**Features:**
- Compares PR bundle size with base branch
- Posts detailed report as PR comment
- Calculates size difference in bytes and percentage
- **Fails PR if bundle increases by >20%**

**Bundle Size Report Includes:**
- Base branch bundle size
- PR branch bundle size
- Absolute and percentage difference
- Warning for significant changes (>10%)

---

## Automation Workflows

### ✅ PR Validation (`pr-validation.yml`)

**Triggers:** When PRs are opened, synchronized, reopened, or edited

**Purpose:** Ensures PRs meet quality standards

**Jobs:**

1. **Validate PR Metadata**
   - Checks PR title length (minimum 10 characters)
   - Ensures PR has a description

2. **Auto Label PR**
   - Automatically labels based on changed files
   - Labels: `frontend`, `documentation`, `config`, `dependencies`

3. **Size Label**
   - Adds size label based on changed lines:
     - `size/XS`: < 50 lines
     - `size/S`: < 200 lines
     - `size/M`: < 500 lines
     - `size/L`: < 1000 lines
     - `size/XL`: ≥ 1000 lines

4. **Check Conventional Commits**
   - Validates commit message format
   - Expected format: `type(scope): description`
   - Types: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `build`, `ci`, `chore`, `revert`
   - Warning only - doesn't block PR

**Commit Message Examples:**
```bash
feat(frontend): add dark mode toggle
fix(editor): resolve syntax highlighting bug
docs: update installation instructions
chore(deps): update dependencies
```

---

### 👋 Welcome New Contributors (`welcome.yml`)

**Triggers:** First-time issue or PR from a contributor

**Purpose:** Welcomes new contributors with helpful information

**Features:**
- Posts welcome message on first issue
- Posts welcome message on first PR
- Provides guidelines and next steps

---

### 🔄 Auto Assign Reviewers (`auto-assign.yml`)

**Triggers:** When PR is opened or marked ready for review

**Purpose:** Automatically assigns reviewers to PRs

**Configuration:** `.github/auto-assign.yml`
- Assigns 1 reviewer by default
- Skips PRs with keywords: `wip`, `WIP`, `draft`
- Default reviewer: `zkaedii`

**Customize:**
Edit `.github/auto-assign.yml` to add more reviewers or change settings.

---

### 🗑️ Stale Issues and PRs (`stale.yml`)

**Triggers:**
- Scheduled: Daily at 1 AM UTC
- Manual workflow dispatch

**Purpose:** Manages inactive issues and PRs

**Behavior:**
- Marks issues/PRs as stale after **30 days** of inactivity
- Closes stale items after **7 additional days**
- Exempt labels: `pinned`, `security`, `important`, `work-in-progress`

**Manual Trigger:**
```bash
gh workflow run stale.yml
```

---

## Configuration Files

### 📝 Dependabot (`dependabot.yml`)

**Purpose:** Automates dependency updates

**Configuration:**
- **NPM Dependencies:** Weekly updates every Monday at 9 AM
- **GitHub Actions:** Weekly updates every Monday at 9 AM
- Grouped updates for related packages (React, Vite, ESLint, etc.)
- Maximum 10 open PRs at once
- Auto-labels: `dependencies`, `automated`

**Dependency Groups:**
- `react`: React and React type definitions
- `vite`: Vite and Vite plugins
- `eslint`: ESLint and related packages
- `typescript`: TypeScript packages
- `radix`: Radix UI components

---

### 🏷️ Auto Labeler (`labeler.yml`)

**Purpose:** Automatically labels PRs based on changed files

**Labels:**
- `frontend`: Changes in `frontend/**`
- `documentation`: Changes in `*.md` or `docs/**`
- `config`: Changes in config files
- `dependencies`: Changes in package files

---

### 👥 Auto Assign Configuration (`auto-assign.yml`)

**Purpose:** Configures automatic reviewer assignment

**Settings:**
- Adds reviewers: ✅
- Adds assignees: ❌
- Number of reviewers: 1
- Default reviewer: `zkaedii`

---

## 🎯 Workflow Status Badges

Add these badges to your README to show workflow status:

```markdown
![CI](https://github.com/zkaedii/agent_system/workflows/CI/badge.svg)
![Deploy](https://github.com/zkaedii/agent_system/workflows/Deploy%20to%20Production/badge.svg)
![CodeQL](https://github.com/zkaedii/agent_system/workflows/CodeQL%20Security%20Scan/badge.svg)
```

---

## 🔧 Troubleshooting

### Workflow Not Running?

1. **Check branch protection rules** - Some workflows may be required for merging
2. **Verify file paths** - Workflows may only trigger on specific file changes
3. **Review workflow permissions** - Ensure proper GitHub token permissions

### Failed Workflow?

1. **Check workflow logs** - Click on failed job for detailed logs
2. **Review recent changes** - Check what triggered the failure
3. **Re-run failed jobs** - Use "Re-run failed jobs" button

### Bundle Size Check Failing?

If your bundle size increased significantly:
1. **Review added dependencies** - Check if new packages are necessary
2. **Enable code splitting** - Split large bundles into smaller chunks
3. **Analyze bundle** - Use `npm run build -- --analyze` to inspect
4. **Consider lazy loading** - Load components only when needed

---

## 📊 Best Practices

1. **Wait for CI checks** before merging PRs
2. **Write meaningful commit messages** following conventional commits
3. **Keep PRs small** - Aim for `size/S` or `size/M`
4. **Update dependencies regularly** - Review and merge Dependabot PRs
5. **Monitor security alerts** - Check Security tab regularly
6. **Review bundle size changes** - Keep application performant

---

## 🚀 Adding New Workflows

To add a new workflow:

1. Create a new file in `.github/workflows/`
2. Use YAML format with proper triggers
3. Test the workflow on a feature branch first
4. Document the workflow in this file
5. Add status badge to README if applicable

**Template:**
```yaml
name: My New Workflow

on:
  pull_request:
    branches: [ main ]

jobs:
  my-job:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - name: Run my task
        run: echo "Hello World"
```

---

## 📚 Additional Resources

- [GitHub Actions Documentation](https://docs.github.com/en/actions)
- [Workflow Syntax Reference](https://docs.github.com/en/actions/reference/workflow-syntax-for-github-actions)
- [GitHub Actions Marketplace](https://github.com/marketplace?type=actions)
- [Dependabot Documentation](https://docs.github.com/en/code-security/dependabot)

---

## 🤝 Contributing

When contributing to workflows:
1. Test changes in a fork first
2. Document all new workflows
3. Follow existing naming conventions
4. Add appropriate error handling
5. Update this documentation

---

**Last Updated:** 2025-12-29
**Maintainer:** zkaedii
