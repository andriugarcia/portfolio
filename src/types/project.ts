export type Highlight = {
    content: string;
    baseScore: number;
    keywords: string[];
    source?: string;
    projectName?: string;
    score?: number;
    matchedKeywords?: string[];
}

export type Project = {
    name: string;
    description: string;
    baseScore: number;
    stack: string[];
    highlights: Highlight[];
    score?: number;
    matchedKeywords?: string[];
    images: string[];
}