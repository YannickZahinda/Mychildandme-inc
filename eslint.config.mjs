import globals from "globals";
import pluginJs from "@eslint/js";
import pluginReact from "eslint-plugin-react";
import parserBabel from "@babel/eslint-parser";

const { configs } = pluginReact; // Destructure the `configs` property

export default [
  {
    ignores: [
      "**/node_modules/**",
      "dist/**",
      "**/build/**",
    ],
  },
  {
    files: ["*.js", "*.jsx"],
    languageOptions: {
      globals: {
        require: "readonly",
        test: "readonly",
        expect: "readonly",
      },
      parser: parserBabel,
      parserOptions: {
        ecmaVersion: 2022, // Use the latest ECMAScript features
        sourceType: "module", // Allow the use of imports
        ecmaFeatures: {
          jsx: true, // Enable JSX support
        },
      },
    },
    plugins: {
      react: pluginReact, // Use the imported pluginReact here
    },
    settings: {
      react: {
        version: "detect", // Automatically detect the React version
      },
    },
    rules: {
      "react/react-in-jsx-scope": "off", // For React 17 and above
      "no-console": "off", // Warn about console statements
      "no-unused-vars": ["warn", { vars: "all", args: "none" }], // Warn for unused variables
      "react/no-unescaped-entities": "warn", // Warn about unescaped entities
      "react/prop-types": "warn", // Warn if prop types are not specified
      "no-undef": "error", // Error for undefined variables
    },
  },
];
