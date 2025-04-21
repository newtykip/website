import { encode } from "@msgpack/msgpack";
import fs from "fs/promises";
import { dependencies, devDependencies } from "package.json";

import { LinkType, type Package } from "./types";

const BLOCKED_NAMESPACES = ["fontsource", "types", "iconify-json"];
const packages: Package[] = [];

function processGithub(url: string): string {
    return url
        .replace("https://github.com/", "")
        .replace(".git", "")
        .replace("git@github.com:", "");
}

for (const name of Object.keys({
    ...dependencies,
    ...devDependencies,
})) {
    // skip blocked namespaces
    if (BLOCKED_NAMESPACES.some((ns) => name.startsWith(`@${ns}`))) {
        continue;
    }

    const { homepage, license, repository, version } = await import(
        `node_modules/${name}/package.json`
    );

    let linkType = LinkType.OTHER;
    let linkContent = "";

    if (homepage) {
        if (homepage.startsWith("https://github.com")) {
            linkType = LinkType.GITHUB;
            linkContent = processGithub(homepage);
        } else {
            linkContent = homepage;
        }
    } else if (repository) {
        if (typeof repository === "string") {
            if (
                repository.includes("github.com") ||
                repository.split("/").length == 2
            ) {
                linkType = LinkType.GITHUB;
                linkContent = processGithub(repository);
            } else {
                linkContent = repository;
            }
        } else if (typeof repository === "object" && "url" in repository) {
            const url = repository.url as string;
            if (url.includes("github.com")) {
                linkContent = processGithub(url);
                linkType = LinkType.GITHUB;
            } else {
                linkContent = repository.url;
            }
        }
    }

    const pkg: Package = {
        license,
        link: {
            content: linkContent,
            type: linkType,
        },
        name,
        version,
    };
    if (linkContent === "") {
        delete pkg.link;
    }
    packages.push(pkg);
}

// todo: collect maintainers
const cache = encode(packages);
await fs.writeFile("ack.cache", cache);
