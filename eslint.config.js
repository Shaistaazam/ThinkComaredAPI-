const typescriptEslint = require('@typescript-eslint/eslint-plugin');

module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: [
    "@typescript-eslint"
  ],
  extends: [
    "eslint:recommended",
    "@typescript-eslint/recommended"
  ],
  rules: {
    "no-console": "warn",
    "no-debugger": "warn",
    "@typescript-eslint/no-unused-vars": "error",
    "@typescript-eslint/no-explicit-any": "warn"
  },
  env: {
    browser: true,
    node: true,
    es6: true
  },
  ignorePatterns: [
    "dist/",
    "node_modules/"
  ],
  overrides: [
    {
      files: ["*.ts"],
      parserOptions: {
        project: "./tsconfig.json",
        tsconfigRootDir: __dirname,
      },
    },
  ],
};