# Contributing to Syllora

Thank you for your interest in contributing! This document outlines how to propose changes, report bugs, and submit pull requests.

---

## Getting Started

1. **Fork** the repository on GitHub
2. **Clone** your fork locally:
   ```bash
   git clone https://github.com/your-username/syllora-edtech.git
   cd syllora-edtech
   ```
3. **Set up the project** following the [Local Setup](README.md#local-setup) instructions in the README
4. **Create a branch** from `main`:
   ```bash
   git checkout -b type/short-description
   ```

---

## Branch Naming

Use the following prefixes:

| Prefix | Use for |
|--------|---------|
| `feat/` | New features or capabilities |
| `fix/` | Bug fixes |
| `docs/` | Documentation changes only |
| `refactor/` | Code restructuring without behaviour change |
| `test/` | Adding or updating tests |
| `chore/` | Dependency updates, config changes, tooling |

Examples: `feat/quiz-system`, `fix/otp-validation`, `docs/api-reference`

---

## Commit Messages

Use the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short summary>

[optional body]
[optional footer]
```

Examples:
```
feat(auth): add refresh token rotation
fix(payments): handle edge case when course list is empty
docs(readme): add API reference table
```

---

## Pull Request Process

1. Ensure your branch is up to date with `main` before opening a PR
2. Run the existing test suite and confirm it passes:
   ```bash
   npm test -- --watchAll=false
   ```
3. Fill out the PR template:
   - **What** — describe the change in plain language
   - **Why** — explain the motivation or link to the relevant issue
   - **How to test** — describe the steps a reviewer should follow
4. Open against the `main` branch
5. PRs with failing tests or unrelated changes will not be merged

---

## Reporting Issues

Please use [GitHub Issues](https://github.com/UditSinghChauhan/syllora-edtech/issues) to report bugs or request features.

When reporting a bug, include:
- Steps to reproduce
- Expected behavior
- Actual behavior
- Browser / Node.js version
- Any relevant error messages or screenshots

---

## Code Style

- Use `camelCase` for variables and functions, `PascalCase` for React components and class names
- Keep functions focused — one responsibility per function
- Write `console.error` for error paths; avoid `console.log` in production code paths
- Use `async/await` over `.then()` chains for async operations

---

## License

By submitting a contribution, you agree that your work will be licensed under the project's [MIT License](LICENSE).
