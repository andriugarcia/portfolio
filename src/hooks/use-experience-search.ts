import type { Filter } from "@/types/filter";
import { useMemo, useState } from "react";
import type { Experience } from "../types/experience";
import experienceData from "@/data/experience.json";

const KEYWORD_MATCH_SCORE = 20;
const MAX_COMPANIES = 2;
const MAX_PROJECTS = 3;
const MAX_HIGHLIGHTS = 5;
declare global {
    interface Array<T> {
        prepare(limit: number, callback?: (item: T) => any): T[];
    }
}

Array.prototype.prepare = function<T>(limit: number, callback?: (item: T) => any): T[] {
    const list = this.sort((a: any, b: any) => b.score - a.score)
        .filter((company: any) => company.score > 0)
        .slice(0, limit)
    
        if (callback) return list.map(callback);
        else return list;
};

export default function useExperienceSearch() {
    const [keywords, setKeywords] = useState<Filter[]>([]);
    const experience: Experience[] = experienceData;

    // There's no limit of companies, but there's a limit of 5 projects no matter their company, so companies are implicitly limited
    // There's a limit of 15 highlights, no matter how are they distributed, the can be in the same company or project or in different, depending of their score
    // Companies, projects and highlights have a base score, which is used to give them some base priority no matter if the keywords matches
    // The score will be incremented if the keywords matches in company or project highlight keywords, giving a extra score of 10 (create a constant to configure it)
    // The companies will be sorted by their total score, which is the sum of all their baseScore, project baseScore, company highlight matches and project highlight matches
    // After sorted it will be limited
    // The highlight limitation is applied to the entire list, so the total amount of highlights will be limited to 15, no matter how many companies or projects they have

    const filteredExperience = useMemo(() => {

        const keywordValues = keywords.map(k => k.name.toLowerCase());
    
        return experience.map(company => {
            // Calculate company score
            let companyScore = company.baseScore;
            
            // Score company highlights
            const scoredCompanyHighlights = company.highlights.map(highlight => {
                const matchedKeywords = highlight.keywords.filter(k => keywordValues.includes(k.toLowerCase()));
                return {
                    ...highlight,
                    score: highlight.baseScore + (matchedKeywords.length > 0 ? KEYWORD_MATCH_SCORE : 0),
                    matchedKeywords
                };
            });
    
            // Score projects and their highlights
            const scoredProjects = company.projects.map(project => {
                const scoredProjectHighlights = project.highlights.map(highlight => {
                    const matchedKeywords = highlight.keywords.filter(k => keywordValues.includes(k.toLowerCase()));
                    return {
                        ...highlight,
                        score: highlight.baseScore + matchedKeywords.length * KEYWORD_MATCH_SCORE,
                        matchedKeywords
                    };
                });
    
                const matchedStackKeywords = project.stack.filter(tech => keywordValues.includes(tech.toLowerCase()));
                const orderedStack = [
                    ...matchedStackKeywords,
                    ...project.stack.filter(tech => !keywordValues.includes(tech.toLowerCase()))
                ];
                const projectScore = project.baseScore + 
                    matchedStackKeywords.length * KEYWORD_MATCH_SCORE +
                    scoredProjectHighlights.reduce((sum, h) => sum + h.score, 0);
    
                return {
                    ...project,
                    score: projectScore,
                    matchedKeywords: matchedStackKeywords,
                    stack: orderedStack,
                    highlights: scoredProjectHighlights
                };
            });
    
            // Calculate total company score including projects
            const totalScore = companyScore + 
                scoredProjects.reduce((sum, p) => sum + p.score, 0) +
                scoredCompanyHighlights.reduce((sum, h) => sum + h.score, 0);
            return {
                ...company,
                score: totalScore,
                highlights: scoredCompanyHighlights,
                projects: scoredProjects
            };
        })
        .prepare(MAX_COMPANIES, company => ({
            ...company,
            highlights: company.highlights.prepare(2),
            projects: company.projects
                .prepare(MAX_PROJECTS, project => ({
                    ...project,
                    highlights: project.highlights
                        .prepare(MAX_HIGHLIGHTS)
                }))
        }));
    }, [keywords, experience]);
    
    return {filteredExperience, setKeywords}
}