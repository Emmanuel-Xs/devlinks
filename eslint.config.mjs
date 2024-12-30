import { FlatCompat } from "@eslint/eslintrc";
import js from "@eslint/js";
import checkFile from "eslint-plugin-check-file";
import n from "eslint-plugin-n";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
  recommendedConfig: js.configs.recommended,
  allConfig: js.configs.all,
});

const eslintConfig = [
  ...compat.extends(
    "next/core-web-vitals",
    "next/typescript",
    "plugin:@typescript-eslint/recommended",
    "eslint:recommended",
    "plugin:n/recommended",
    "plugin:react/recommended"
  ),
  {
    plugins: {
      "check-file": checkFile,
      n,
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
      "prefer-arrow-callback": ["error"],
      "prefer-template": ["error"],
      semi: ["error"],
      "no-case-declarations": "off",
      "@typescript-eslint/no-unused-vars": [
        "error",
        {
          vars: "all",
          args: "after-used",
          ignoreRestSiblings: true,
        },
      ],
      "@typescript-eslint/no-unused-expressions": [
        "error",
        {
          allowShortCircuit: true,
        },
      ],
      "check-file/filename-naming-convention": [
        "error",
        {
          "**/*.{ts,tsx}": "KEBAB_CASE",
        },
        {
          ignoreMiddleExtensions: true,
        },
      ],
      "check-file/folder-naming-convention": [
        "error",
        {
          "src/**/!^[.*": "KEBAB_CASE",
          "emails/**/!^[.*": "KEBAB_CASE",
        },
      ],
      "n/no-missing-import": "off",
      "n/no-unsupported-features/node-builtins": [
        "error",
        {
          ignores: ["crypto", "fetch", "FormData", "Response", "Request"],
        },
      ],
    },
  },
];

export default eslintConfig;
