import astro from "eslint-plugin-astro";
import importPlugin from "eslint-plugin-import";
import a11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import sortKeys from "eslint-plugin-sort-keys-fix";
import tsSortKeys from "eslint-plugin-typescript-sort-keys";
import ts from "typescript-eslint";

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
    // imports
    {
        plugins: {
            import: importPlugin,
            simpleImportSort,
        },
        rules: {
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
            "simpleImportSort/exports": "error",
            "simpleImportSort/imports": "error",
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
    // allow unused variables prefixed with _
    {
        rules: {
            "@typescript-eslint/no-unused-vars": [
                "error",
                {
                    args: "all",
                    argsIgnorePattern: "^_",
                    caughtErrors: "all",
                    caughtErrorsIgnorePattern: "^_",
                    destructuredArrayIgnorePattern: "^_",
                    ignoreRestSiblings: true,
                    varsIgnorePattern: "^_",
                },
            ],
        },
    },
];
