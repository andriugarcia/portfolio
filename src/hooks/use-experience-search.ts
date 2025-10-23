import type { Filter } from "@/types/filter";
import { useMemo, useState } from "react";
import type { Experience } from "../types/experience";
import experienceData from "@/data/experience.json";

const KEYWORD_MATCH_SCORE = 20;
const MAX_COMPANIES = 2;
const MAX_PROJECTS = 3;
const MAX_HIGHLIGHTS = 12;

// Filter specificity scoring constants
const BASE_FILTER_SCORE = 10; // Minimum score for any filter match
const SPECIFICITY_MULTIPLIER = 30; // Maximum additional score for rare filters
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

    // Calculate filter frequency across all experience data for specificity scoring
    const filterFrequency = useMemo(() => {
        const frequency: { [key: string]: number } = {};
        
        experience.forEach(company => {
            // Count filters in company highlights
            company.highlights.forEach(highlight => {
                highlight.keywords.forEach(keyword => {
                    const normalizedKeyword = keyword.toLowerCase();
                    frequency[normalizedKeyword] = (frequency[normalizedKeyword] || 0) + 1;
                });
            });
            
            // Count filters in project highlights
            company.projects.forEach(project => {
                project.highlights.forEach(highlight => {
                    highlight.keywords.forEach(keyword => {
                        const normalizedKeyword = keyword.toLowerCase();
                        frequency[normalizedKeyword] = (frequency[normalizedKeyword] || 0) + 1;
                    });
                });
                
                // Count filters in project stack
                project.stack.forEach(tech => {
                    const normalizedTech = tech.toLowerCase();
                    frequency[normalizedTech] = (frequency[normalizedTech] || 0) + 1;
                });
            });
        });
        
        return frequency;
    }, [experience]);

    // Calculate specificity score for a filter based on its frequency
    const calculateFilterSpecificityScore = (filterName: string): number => {
        const normalizedFilter = filterName.toLowerCase();
        const frequency = filterFrequency[normalizedFilter] || 0;
        
        if (frequency === 0) return BASE_FILTER_SCORE;
        
        // Calculate the maximum frequency to normalize scores
        const maxFrequency = Math.max(...Object.values(filterFrequency));
        
        // Inverse relationship: less frequent = higher score
        // Filters appearing only once get the maximum bonus
        // Most common filters get only the base score
        const specificityRatio = Math.max(0, (maxFrequency - frequency) / maxFrequency);
        const specificityBonus = specificityRatio * SPECIFICITY_MULTIPLIER;
        
        return BASE_FILTER_SCORE + specificityBonus;
    };

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
                const specificityScore = matchedKeywords.reduce((sum, keyword) => 
                    sum + calculateFilterSpecificityScore(keyword), 0);
                
                return {
                    ...highlight,
                    score: highlight.baseScore + specificityScore,
                    matchedKeywords
                };
            });
    
            // Score projects and their highlights
            const scoredProjects = company.projects.map(project => {
                const scoredProjectHighlights = project.highlights.map(highlight => {
                    const matchedKeywords = highlight.keywords.filter(k => keywordValues.includes(k.toLowerCase()));
                    const specificityScore = matchedKeywords.reduce((sum, keyword) => 
                        sum + calculateFilterSpecificityScore(keyword), 0);
                    
                    return {
                        ...highlight,
                        score: highlight.baseScore + specificityScore,
                        matchedKeywords
                    };
                });

                const matchedStackKeywords = project.stack.filter(tech => keywordValues.includes(tech.toLowerCase()));
                const stackSpecificityScore = matchedStackKeywords.reduce((sum, tech) => 
                    sum + calculateFilterSpecificityScore(tech), 0);
                
                const orderedStack = [
                    ...matchedStackKeywords,
                    ...project.stack.filter(tech => !keywordValues.includes(tech.toLowerCase()))
                ];
                const projectScore = project.baseScore + 
                    stackSpecificityScore +
                    scoredProjectHighlights.reduce((sum, h) => sum + h.score, 0);

                return {
                    ...project,
                    score: projectScore,
                    matchedKeywords: matchedStackKeywords,
                    stack: orderedStack,
                    highlights: scoredProjectHighlights
                };
            });            // Calculate total company score including projects
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