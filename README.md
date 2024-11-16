# Maritime Factbook Express

This is a backend application built with Express.js and TypeScript. The app is designed for managing maritime data, with features like initialization scripts, database operations, and server-side functionality for various maritime-related services.

## Features

- Express.js server setup.
- TypeScript support for type safety.
- Custom database initialization scripts.
- Middleware integration like CORS, helmet, and rate limiting.
- Swagger API documentation setup.
- JWT-based authentication.
- Custom logging with Winston.

## Installation

### Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (>= 18.x)
- [npm](https://npmjs.com) (>= 8.x)
- [TypeScript](https://www.typescriptlang.org/)

### Steps to set up

1. Clone the repository:
   ```bash
   git clone <repo-url>
   cd maritime-factbook-express
   ```
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Setup environment**

- Copy .env.example to .env and configure the necessary variables.

4. **Initialize database**:
   ```bash
   npm run db:init
   ```
5. **Run the application in development mode**
   ```bash
   npm run dev
   ```
6. **Run the application in production mode**
   ```bash
   npm run build
   npm start
   ```

### Available Scripts

- dev: Starts the application in development mode with hot-reloading using ts-node-dev.
- start: Runs the compiled JavaScript files in dist/.
- db:init: Executes the database initialization script using ts-node.
- lint: Lints the source code using ESLint.
- build: Runs lint followed by TypeScript compilation (tsc).

### File Structure

```bash
MARITIME-FACTBOOK-EXPRESS/
├── dist/                     # Compiled JavaScript files (generated after build)
├── logs/                     # Directory to store application logs
├── node_modules/             # Dependencies installed via npm
├── src/                      # Source code directory
│   ├── api/                  # Route handlers for API endpoints
│   ├── config/               # Configuration files (e.g., database, environment)
│   ├── interfaces/           # TypeScript interfaces for typing
│   ├── middlewares/          # Custom middleware functions
│   ├── schemas/              # Validation schemas for data using Zod
│   ├── scripts/              # Utility scripts (e.g., database initialization)
│   ├── types/                # TypeScript custom type definitions
│   ├── utils/                # Helper functions/utilities for reusable logic
│   ├── app.ts                # Main application file to configure Express
│   └── server.ts             # Entry point to start the Express server
├── .env                      # Environment-specific variables (ignored in version control)
├── .env.example              # Example environment configuration
├── .gitignore                # List of files and folders to be ignored by Git
├── package-lock.json         # Exact versions of dependencies installed
├── package.json              # Project metadata and npm scripts
├── README.md                 # Documentation for the project
├── tsconfig.json             # TypeScript compiler configuration
└── tsconfig.tsbuildinfo      # Build information for TypeScript (auto-generated)

```

### Linting and Code Style

We use ESLint to maintain code quality. You can run npm run lint to check for code style violations. Make sure to follow the coding conventions outlined in the ESLint configuration.

### License

This project is licensed under the ISC License.

---

This `README.md` provides a comprehensive overview of your Express.js application and its setup. The file structure and its corresponding descriptions give clarity on the organization of your codebase. If there are any additional details you'd like to add, let me know!
