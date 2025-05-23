import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import a11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeys from "eslint-plugin-sort-keys-fix";
import svelte from "eslint-plugin-svelte";
import tsSortKeys from "eslint-plugin-typescript-sort-keys";
import unusedImports from "eslint-plugin-unused-imports";
import ts from "typescript-eslint";

import svelteConfig from "./svelte.config.ts";

export default [
    // typescript-eslint
    ...ts.configs.recommended,
    // a11y
    {
        ...a11y.flatConfigs.recommended,
        files: ["**/*.{astro,svelte}"],
        rules: {
            "jsx-a11y/aria-activedescendant-has-tabindex": "off",
        },
    },
    // astro
    ...astro.configs["flat/jsx-a11y-recommended"].map((config) => {
        delete config?.plugins?.["jsx-a11y"];
        return config;
    }),
    // svelte
    ...svelte.configs.recommended,
    {
        files: ["**/*.svelte"],
        languageOptions: {
            parserOptions: {
                extraFileExtensions: [".svelte"],
                parser: ts.parser,
                projectService: true,
                svelteConfig,
            },
        },
    },
    // imports and allow _ prefixed variables
    {
        plugins: {
            import: importPlugin,
            simpleImportSort,
            unusedImports,
        },
        rules: {
            "@typescript-eslint/no-unused-vars": "off",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "simpleImportSort/exports": "error",
            "simpleImportSort/imports": "error",
            "unusedImports/no-unused-imports": "error",
            "unusedImports/no-unused-vars": [
                "error",
                {
                    args: "after-used",
                    argsIgnorePattern: "^_",
                    vars: "all",
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
    // sort object keys
    {
        plugins: {
            sortKeys,
            tsSortKeys,
        },
        rules: {
            "sortKeys/sort-keys-fix": "error",
            "tsSortKeys/interface": "error",
        },
    },
    // sort destructured keys
    {
        plugins: {
            sortDestructureKeys,
        },
        rules: {
            "sortDestructureKeys/sort-destructure-keys": "error",
        },
    },
];
