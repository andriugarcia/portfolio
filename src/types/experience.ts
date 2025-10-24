import type { Project, Highlight } from "./project";

export type Experience = {
    company: string;
    role: string;
    team?: string;
    location: string;
    startDate: string;
    endDate: string;
    priority?: boolean;
    highlights?: Highlight[];
    projects?: Project[];
    score?: number;
    matchedKeywords?: string[];
}