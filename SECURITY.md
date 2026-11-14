# Security Policy

## Reporting a vulnerability

Please **don't open a public issue** for security problems.

Report them privately through GitHub instead: go to the **[Security tab](https://github.com/sleepeq-null/AI-prompts-library/security)** and click **Report a vulnerability**. Only the maintainer can see the report.

Please include:
- what you found and where (file, page or prompt)
- steps to reproduce it
- what impact you think it could have

**What to expect:** an acknowledgment within 5 business days, and an update on the fix plan once the report has been assessed. Credit is given in the release notes unless you'd prefer to stay anonymous.

## Supported versions

Only the latest release, deployed at [sleepeq-null.github.io/AI-prompts-library](https://sleepeq-null.github.io/AI-prompts-library/), receives fixes.

## In scope

- The website: for example, script injection through the prompt builder or search, or bypassing the Content Security Policy
- The repository's GitHub Actions workflows and validation script
- Prompt content that could lead users to expose sensitive data

## Security controls in place

| Area | Control |
|---|---|
| **Code scanning** | CodeQL (`security-extended` queries) on every push and pull request, and weekly, covering the JavaScript and the GitHub Actions workflows |
| **Secrets** | GitHub secret scanning with **push protection**: commits containing credentials are blocked |
| **Dependencies and supply chain** | Every GitHub Action is pinned to a full commit SHA; Dependabot alerts and security updates are on, and Dependabot keeps the pins current |
| **CI/CD** | Workflows run with least-privilege `GITHUB_TOKEN` permissions and don't keep checkout credentials. `main` is protected: required checks must pass, force-pushes and deletion are blocked |
| **Review** | CODEOWNERS sends every change, especially to `.github/` and `scripts/`, to the maintainer |
| **Website** | A strict Content Security Policy (only the site's own scripts may run, no inline code, no plugins or form posts); all prompt text and user input is HTML-escaped before display |
| **Data privacy** | The site has no backend, cookies or analytics, and everything typed stays in the browser. The validator blocks text that looks like personal data (emails, SSN-style or card-length numbers) from being committed in prompts |

## Known limitation

GitHub Pages can't send custom HTTP headers, so the Content Security Policy is set with a `<meta>` tag. That means `frame-ancestors` (clickjacking protection) can't be enforced. The risk is low because the site has no accounts or state-changing actions.
