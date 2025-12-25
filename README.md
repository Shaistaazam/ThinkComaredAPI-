# E-commerce Application

This is an Angular-based e-commerce application with modern development tooling.

## Development Tools

### ESLint + Prettier
- **ESLint**: Static code analysis for identifying syntax errors and style issues
- **Prettier**: Automatic code formatting for consistent style

**Commands:**
```bash
npm run lint        # Check for linting errors
npm run lint:fix    # Fix linting errors automatically
npm run format      # Format code with Prettier
```

### Husky + lint-staged
- **Husky**: Git hooks manager for running scripts on git actions
- **lint-staged**: Runs linters on staged files only

**Features:**
- Pre-commit hook that automatically lints and formats staged files
- Ensures code quality before commits

### npm-check-updates
Tool for checking newer versions of dependencies

**Commands:**
```bash
npm run check-updates  # Check for outdated dependencies
npm run update-deps    # Update dependencies and install
```

### GitHub Actions
CI/CD workflows for automated testing and deployment

**Workflows:**
- `ci.yml`: Runs on push/PR to main branch
  - Tests multiple Node.js versions
  - Runs linting and formatting checks
  - Executes unit tests
  - Builds the application
  
- `deploy.yml`: Runs on push to main branch
  - Builds the application for production
  - Deploys to hosting platform

## Available Scripts

| Script | Description |
|--------|-------------|
| `npm start` | Start development server |
| `npm run build` | Build for production |
| `npm test` | Run unit tests |
| `npm run lint` | Check for linting errors |
| `npm run lint:fix` | Fix linting errors automatically |
| `npm run format` | Format code with Prettier |
| `npm run check-updates` | Check for outdated dependencies |
| `npm run update-deps` | Update dependencies |

## Project Structure

```
src/
├── app/
│   ├── components/     # Reusable UI components
│   ├── models/         # Data models
│   ├── pages/          # Page components
│   ├── services/       # Business logic services
│   └── app.routes.ts   # Routing configuration
├── assets/             # Static assets
└── styles/             # Global styles
```

## Development Workflow

1. Create feature branch
2. Develop features
3. Commit changes (auto-linting/formatting)
4. Push to GitHub (CI runs automatically)
5. Create PR for review
6. Merge to main (auto-deployment)