import type { Project, Highlight } from "./project";

export type Experience = {
    company: string;
    role: string;
    location: string;
    startDate: string;
    baseScore: number;
    highlights: Highlight[];
    projects: Project[];
    score?: number;
    matchedKeywords?: string[];
}