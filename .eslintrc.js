module.exports = {
  ignorePatterns: ["node_modules", "dist", ".eslintrc.js", "scripts"],
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    "plugin:react/recommended",
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react-hooks/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: ["react", "@typescript-eslint", "css-reorder"],
  rules: {
    "react/self-closing-comp": "error",
    "css-reorder/property-reorder": "error",
  },
};
