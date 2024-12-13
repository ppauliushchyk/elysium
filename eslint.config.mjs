import { dirname } from "path";
import { fileURLToPath } from "url";

import { FlatCompat } from "@eslint/eslintrc";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({ baseDirectory: __dirname });

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:import/recommended"
  ),
  ...compat.plugins("@stylistic/js", "@stylistic/ts", "@stylistic/jsx"),
  ...compat.config({
    rules: {
      "@stylistic/js/object-property-newline": "error",
      "@stylistic/js/padding-line-between-statements": [
        "error",
        {
          blankLine: "always",
          next: "*",
          prev: ["const", "let", "var"],
        },
        {
          blankLine: "any",
          next: ["const", "let", "var"],
          prev: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["block", "block-like"],
        },
        {
          blankLine: "always",
          next: ["block", "block-like"],
          prev: "*",
        },
      ],
      "@stylistic/js/quotes": ["error", "double"],
      camelcase: "off",
      curly: ["error", "all"],
      "import/extensions": "off",
      "import/no-unresolved": "off",
      "import/order": [
        "error",
        {
          alphabetize: {
            caseInsensitive: true,
            order: "asc",
          },
          groups: [
            "builtin",
            "external",
            "internal",
            "parent",
            "sibling",
            "index",
          ],
          "newlines-between": "always",
        },
      ],
      "import/prefer-default-export": "off",
      "jsx-a11y/label-has-associated-control": "off",
      "no-console": "error",
      "no-unused-vars": "error",
      quotes: ["error", "double"],
      "react/jsx-filename-extension": [
        "error",
        { extensions: [".js", ".jsx", ".ts", ".tsx"] },
      ],
      "react/jsx-sort-props": "error",
      "sort-keys": "error",
    },
  }),
];

export default eslintConfig;
