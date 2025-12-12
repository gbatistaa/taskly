import { FlatCompat } from "@eslint/eslintrc";
import { createRequire } from "module";
import { dirname } from "path";
import { fileURLToPath } from "url";

const require = createRequire(import.meta.url);
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

// Next.js-specific ESLint configurations
const nextConfig = compat.extends("next/core-web-vitals", "next/typescript");

// Custom ESLint configurations for plain React projects
const customReactConfig = [
  {
    ignores: ["node_modules"],
  },
  {
    files: ["**/*.ts", "**/*.tsx"],
    plugins: {
      "@typescript-eslint": require("@typescript-eslint/eslint-plugin"),
      react: require("eslint-plugin-react"),
      prettier: require("eslint-plugin-prettier"),
      import: require("eslint-plugin-import"),
      "react-hooks": require("eslint-plugin-react-hooks"),
      tailwindcss: require("eslint-plugin-tailwindcss"),
    },
    languageOptions: {
      parser: require("@typescript-eslint/parser"),
      parserOptions: {
        ecmaFeatures: { jsx: true },
        ecmaVersion: "latest",
        sourceType: "module",
      },
    },
    rules: {
      "no-use-before-define": "off",
      "@typescript-eslint/no-use-before-define": ["error"],
      "react/jsx-filename-extension": ["warn", { extensions: [".tsx"] }],
      "import/extensions": "off",
      "no-shadow": "off",
      "@typescript-eslint/no-shadow": ["error"],
      "@typescript-eslint/explicit-function-return-type": ["error", { allowExpressions: true }],
      "max-len": [
        "warn",
        {
          code: 120,
          ignoreComments: true,
          ignoreUrls: true,
        },
      ],
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      "import/prefer-default-export": "off",
      "react/prop-types": "off",
      "prettier/prettier": ["error", { endOfLine: "auto", singleQuote: false }],
      quotes: ["error", "double"],

      // TailwindCSS Sorting
      "tailwindcss/classnames-order": "warn",
      "tailwindcss/no-custom-classname": "off",
    },
    settings: {
      react: { version: "detect" },
      "import/resolver": {
        typescript: {},
      },
      tailwindcss: {
        callees: ["classnames", "clsx", "ctl"],
      },
    },
  },
];

const eslintConfig = [...nextConfig, ...customReactConfig];

export default eslintConfig;
