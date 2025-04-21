import { pluginLineNumbers } from "@expressive-code/plugin-line-numbers";
import { pluginCodeOutput } from "@fujocoded/expressive-code-output";
import { transformerColorizedBrackets } from "@shikijs/colorized-brackets";
import expressiveCode from "astro-expressive-code";
import pluginTwoslash from "expressive-code-twoslash";

export default () =>
    expressiveCode({
        plugins: [pluginLineNumbers(), pluginCodeOutput(), pluginTwoslash()],
        shiki: {
            bundledLangs: ["ts", "rust"],
            transformers: [transformerColorizedBrackets()],
        },
        styleOverrides: {
            codeBackground: "var(--mantle)",
            codeFontFamily: "var(--font-mono)",
            frames: {
                tooltipSuccessBackground: "var(--green)",
                tooltipSuccessForeground: "#000000",
            },
            uiFontFamily: "var(--font-sans)",
        },
        themes: [
            "catppuccin-latte",
            "catppuccin-frappe",
            "catppuccin-macchiato",
            "catppuccin-mocha",
        ],
    });
