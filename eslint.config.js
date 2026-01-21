import js from "@eslint/js";
import globals from "globals";
import jestPlugin from 'eslint-plugin-jest';

export default [
  {
    ignores: ["dist/**", "node_modules/**"]
  },
  js.configs.recommended,
  {
    files: ["**/*.js", "**/*.mjs", "**/*.cjs"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: { ...globals.browser, ...globals.node },
    },
    rules: {
      "semi": "error",
      "indent": ["error", 2],
      "quotes": ["error", "double"],
      "no-unused-vars": [
        "error",
        {
          argsIgnorePattern: "^_",
          varsIgnorePattern: "^_",
          ignoreRestSiblings: true,
        },
      ],
    },
  },
  // Configuration spécifique pour les fichiers de test
  {
    files: ["**/__tests__/**/*.js", "**/*.test.js", "jest.setup.js"],
    ...jestPlugin.configs["flat/recommended"],
    languageOptions: {
      globals: {
        ...jestPlugin.environments.globals.globals,
      }
    }
  }
];