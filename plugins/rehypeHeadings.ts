import type { RehypePlugin } from "@astrojs/markdown-remark";
import type { Element, Root } from "hast";
import { visit } from "unist-util-visit";

function extractText(element: Element): string {
    let text = "";
    if (element.children) {
        for (const child of element.children) {
            if (child.type === "text") {
                text += child.value;
            } else if ((child as Element).children) {
                text += extractText(child as Element);
            }
        }
    }
    return text;
}

export default function rehypeHeadings(): RehypePlugin {
    return (tree: Root) => {
        visit(tree, "element", (node) => {
            const match = /^h([1-6])$/.exec(node.tagName);
            if (match) {
                const level = parseInt(match[1], 10) + 1;
                const content = extractText(node);
                node.tagName = "Heading";
                node.children = [
                    {
                        type: "text",
                        value: content,
                    },
                ];
                node.properties = {
                    level,
                    ...node.properties,
                };
                console.log(node);
            }
        });
    };
}
