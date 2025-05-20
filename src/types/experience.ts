import type { Project, Highlight } from "./project";

export type Experience = {
    company: string;
    role: string;
    team?: string;
    location: string;
    startDate: string;
    endDate: string;
    baseScore: number;
    highlights: Highlight[];
    projects: Project[];
    score?: number;
    matchedKeywords?: string[];
}