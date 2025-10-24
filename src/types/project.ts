export type Highlight = {
    content: string;
    keywords?: string[];
    priority?: boolean;
    source?: string;
    projectName?: string;
    score?: number;
    matchedKeywords?: string[];
}

export type Project = {
    name: string;
    description: string;
    priority?: boolean;
    stack?: string[];
    highlights?: Highlight[];
    score?: number;
    matchedKeywords?: string[];
    images?: string[];
    url?: string;
    github?: string;
    website?: string;
}