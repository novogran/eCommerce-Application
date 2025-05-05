# eCommerce Application

A modern eCommerce platform built with React, TypeScript, and CommerceTools API to enhance frontend development skills through practical implementation.

## 🎯 Project Goals

- Master core frontend development
- Implement full CRUD operations
- Deep dive into React ecosystem
- API integration best practices
- Team collaboration workflow (Git, PR reviews, task management)

## 🛠 Tech Stack

**Core:**

- React 18+ (Functional Components + Hooks)
- TypeScript
- React Router v6
- Axios/REST API

**State Management:**

- Context API

**Tooling:**

- ESLint, Prettier, StyleLint
- Husky Git hooks
- Vite build system

## 📜 Available Scripts

The project provides these npm scripts for development workflow:

- `npm run dev` - starts Vite development server with hot reload (Runs on `http://localhost:5173` by default)

- `npm run build` - Compiles TypeScript and builds production-ready assets (Outputs to `/dist` folder)

- `npm run lint` - Runs ESLint to check all files for errors (Config: `.eslintrc.cjs`)

- `npm run format` - Formats all supported files with Prettier (Applies to: `.js, .ts, .tsx, .css,`)

- `npm run test` - Runs Vitest in watch mode for unit tests (Looks for `*.test.ts` files)

- `npm run test:coverage` - Runs tests and generates coverage report (Outputs to terminal)

- `pre-commit` - Auto-runs on git commit and executes lint-staged to:
  1. Run ESLint on staged files
  2. Apply Prettier formatting
- `prepare` sets up Husky git hooks in `.husky/` directory

## 🚀 How Start

### 1. Clone repo

```bash
git clone https://github.com/novogran/eCommerce-Application
```

### 2. Instal deps

```bash
npm install
```

### Run dev server
```bash
npm run dev
```
