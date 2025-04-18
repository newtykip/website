import astro from "eslint-plugin-astro";
import import_ from "eslint-plugin-import";
import a11y from "eslint-plugin-jsx-a11y";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import sortDestructureKeys from "eslint-plugin-sort-destructure-keys";
import ts from "typescript-eslint";

export default [
    ...ts.configs.recommended,
    {
        ...a11y.flatConfigs.recommended,
        files: ["**/*.{astro,svelte}"],
    },
    ...astro.configs["flat/jsx-a11y-recommended"].map((config) => {
        delete config?.plugins?.["jsx-a11y"];
        return config;
    }),
    // imports
    {
        plugins: {
            import: import_,
            simple: simpleImportSort,
        },
        rules: {
            "simple/imports": "error",
            "simple/exports": "error",
            "import/first": "error",
            "import/newline-after-import": "error",
            "import/no-duplicates": "error",
        },
    },
    // sort destructured keys
    {
        plugins: {
            sort: sortDestructureKeys,
        },
        rules: {
            "sort/sort-destructure-keys": "error",
        },
    },
];
