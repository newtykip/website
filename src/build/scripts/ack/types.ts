export enum LinkType {
    GITHUB = 0,
    OTHER = 1,
}

export interface Link {
    content: string;
    type: LinkType;
}

export interface Package {
    license: string;
    link?: Link;
    name: string;
    version: string;
}
