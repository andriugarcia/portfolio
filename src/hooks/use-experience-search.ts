import type { Filter } from "@/types/filter";
import { useMemo, useState } from "react";
import type { Experience } from "../types/experience";
import type { Project, Highlight } from "../types/project";
import experienceData from "@/data/experience.json";

type ScoredHighlight = Highlight & {
    score: number;
    matchedKeywords: string[];
    source: string;
    projectName?: string;
    companyName: string;
    priority?: boolean;
};

type ScoredProject = Project & {
    score: number;
    matchedKeywords: string[];
    companyName: string;
    priority?: boolean;
};

type FilterStats = {
    [filterName: string]: number;
};

export default function useExperienceSearch() {
    const [keywords, setKeywords] = useState<Filter[]>([]);
    const experience: Experience[] = experienceData as Experience[];
    
    // Calculate filter usage statistics for specificity scoring
    const filterStats = useMemo((): FilterStats => {
        const stats: FilterStats = {};
        
        experience.forEach(exp => {
            // Count keywords in experience highlights
            exp.highlights?.forEach(highlight => {
                highlight.keywords?.forEach(keyword => {
                    if (keyword.trim()) { // Only count non-empty keywords
                        stats[keyword] = (stats[keyword] || 0) + 1;
                    }
                });
            });
            
            // Count keywords in project highlights and stack
            exp.projects?.forEach(project => {
                project.stack?.forEach(tech => {
                    if (tech.trim()) {
                        stats[tech] = (stats[tech] || 0) + 1;
                    }
                });
                
                project.highlights?.forEach(highlight => {
                    highlight.keywords?.forEach(keyword => {
                        if (keyword.trim()) {
                            stats[keyword] = (stats[keyword] || 0) + 1;
                        }
                    });
                });
            });
        });
        
        return stats;
    }, [experience]);
    
    // Get total occurrences for specificity calculation
    const totalOccurrences = Object.values(filterStats).reduce((sum, count) => sum + count, 0);
    
    const filteredExperience = useMemo(() => {
        if (keywords.length === 0) {
            return experience;
        }
        
        const keywordNames = keywords.map(k => k.name);
        
        // Step 1: Collect and score all highlights
        const scoredHighlights: ScoredHighlight[] = [];
        
        experience.forEach(exp => {
            // Company highlights
            exp.highlights?.forEach(highlight => {
                const matchedKeywords = highlight.keywords?.filter(k => k.trim() && keywordNames.includes(k)) || [];
                if (matchedKeywords.length > 0) {
                    const matchScore = matchedKeywords.length;
                    const specificityScore = matchedKeywords.reduce((sum, keyword) => {
                        const occurrences = filterStats[keyword] || 1;
                        return sum + (totalOccurrences / occurrences) / 100; // Normalize specificity
                    }, 0);
                    
                    scoredHighlights.push({
                        ...highlight,
                        score: matchScore + specificityScore,
                        matchedKeywords,
                        source: 'company',
                        companyName: exp.company,
                        priority: highlight.priority
                    });
                }
            });
            
            // Project highlights
            exp.projects?.forEach(project => {
                project.highlights?.forEach(highlight => {
                    const matchedKeywords = highlight.keywords?.filter(k => k.trim() && keywordNames.includes(k)) || [];
                    if (matchedKeywords.length > 0) {
                        const matchScore = matchedKeywords.length;
                        const specificityScore = matchedKeywords.reduce((sum, keyword) => {
                            const occurrences = filterStats[keyword] || 1;
                            return sum + (totalOccurrences / occurrences) / 100;
                        }, 0);
                        
                        scoredHighlights.push({
                            ...highlight,
                            score: matchScore + specificityScore,
                            matchedKeywords,
                            source: 'project',
                            projectName: project.name,
                            companyName: exp.company,
                            priority: highlight.priority
                        });
                    }
                });
            });
        });
        
        // Sort highlights by score (priority items first, then by score)
        scoredHighlights.sort((a, b) => {
            if (a.priority && !b.priority) return -1;
            if (!a.priority && b.priority) return 1;
            return b.score - a.score;
        });
        
        // Step 2: Generate scored projects
        const scoredProjects: ScoredProject[] = [];
        
        experience.forEach(exp => {
            exp.projects?.forEach(project => {
                // Score from stack
                const stackMatches = project.stack?.filter(tech => tech.trim() && keywordNames.includes(tech)) || [];
                const stackScore = stackMatches.reduce((sum, tech) => {
                    const occurrences = filterStats[tech] || 1;
                    return sum + 1 + (totalOccurrences / occurrences) / 100;
                }, 0);
                
                // Score from project highlights (use already calculated scores)
                const projectHighlights = scoredHighlights.filter(h => 
                    h.projectName === project.name && h.companyName === exp.company
                );
                const highlightScore = projectHighlights.length > 0 
                    ? projectHighlights.reduce((sum, h) => sum + h.score, 0) / projectHighlights.length
                    : 0;
                
                const totalScore = stackScore + highlightScore;
                const allMatchedKeywords = [...stackMatches, ...projectHighlights.flatMap(h => h.matchedKeywords)];
                const uniqueMatchedKeywords = [...new Set(allMatchedKeywords)];
                
                if (totalScore > 0 || project.priority) {
                    scoredProjects.push({
                        ...project,
                        score: totalScore,
                        matchedKeywords: uniqueMatchedKeywords,
                        companyName: exp.company,
                        priority: project.priority
                    });
                }
            });
        });
        
        // Sort projects by score (priority items first, then by score)
        scoredProjects.sort((a, b) => {
            if (a.priority && !b.priority) return -1;
            if (!a.priority && b.priority) return 1;
            return b.score - a.score;
        });
        
        // Step 3: Generate filtered experience with limits
        // Always show ALL companies, but with filtered/limited content
        const result: Experience[] = experience.map(exp => {
            // Company highlights - get matched + priority highlights
            const matchedCompanyHighlights = scoredHighlights.filter(h => 
                h.companyName === exp.company && h.source === 'company'
            );
            
            // Add priority company highlights that might not have matched keywords
            const priorityCompanyHighlights = exp.highlights?.filter(h => 
                h.priority && !matchedCompanyHighlights.some(mh => mh.content === h.content)
            ).map(h => ({
                ...h,
                score: 1000, // High score for priority
                matchedKeywords: [],
                source: 'company' as const,
                companyName: exp.company,
                priority: true
            })) || [];
            
            const allCompanyHighlights = [...priorityCompanyHighlights, ...matchedCompanyHighlights]
                .sort((a, b) => {
                    if (a.priority && !b.priority) return -1;
                    if (!a.priority && b.priority) return 1;
                    return b.score - a.score;
                });
            
            // Limit to max 3 company highlights, but ensure at least 1 if any exist
            const selectedCompanyHighlights = allCompanyHighlights.slice(0, Math.min(3, allCompanyHighlights.length));
            if (selectedCompanyHighlights.length === 0 && exp.highlights && exp.highlights.length > 0) {
                // If no matched/priority highlights, show first available highlight
                selectedCompanyHighlights.push({
                    ...exp.highlights[0],
                    score: 0,
                    matchedKeywords: [],
                    source: 'company' as const,
                    companyName: exp.company
                });
            }
            
            // Projects - get matched + priority projects
            const matchedCompanyProjects = scoredProjects.filter(p => p.companyName === exp.company);
            
            // Add priority projects that might not have matched
            const priorityCompanyProjects = exp.projects?.filter(p => 
                p.priority && !matchedCompanyProjects.some(mp => mp.name === p.name)
            ).map(p => ({
                ...p,
                score: 1000, // High score for priority
                matchedKeywords: [],
                companyName: exp.company,
                priority: true
            })) || [];
            
            const allCompanyProjects = [...priorityCompanyProjects, ...matchedCompanyProjects]
                .sort((a, b) => {
                    if (a.priority && !b.priority) return -1;
                    if (!a.priority && b.priority) return 1;
                    return b.score - a.score;
                });
            
            // Ensure at least 1 project per company, but limit projects per company
            const maxProjectsPerCompany = Math.min(3, allCompanyProjects.length); // Limit to 3 projects per company
            let projectsToShow = Math.max(1, maxProjectsPerCompany);
            
            // If no matched/priority projects, show first available project
            if (allCompanyProjects.length === 0 && exp.projects && exp.projects.length > 0) {
                allCompanyProjects.push({
                    ...exp.projects[0],
                    score: 0,
                    matchedKeywords: [],
                    companyName: exp.company
                });
                projectsToShow = 1;
            }
            
            const selectedProjects = allCompanyProjects.slice(0, projectsToShow);
            
            // Process selected projects with highlight limits
            const processedProjects: Project[] = selectedProjects.map(project => {
                // Get matched highlights for this project
                const matchedProjectHighlights = scoredHighlights.filter(h => 
                    h.projectName === project.name && h.companyName === exp.company
                );
                
                // Add priority highlights that might not have matched
                const originalProject = exp.projects?.find(p => p.name === project.name);
                const priorityProjectHighlights = originalProject?.highlights?.filter(h => 
                    h.priority && !matchedProjectHighlights.some(mh => mh.content === h.content)
                ).map(h => ({
                    ...h,
                    score: 1000, // High score for priority
                    matchedKeywords: [],
                    source: 'project' as const,
                    projectName: project.name,
                    companyName: exp.company,
                    priority: true
                })) || [];
                
                const allProjectHighlights = [...priorityProjectHighlights, ...matchedProjectHighlights]
                    .sort((a, b) => {
                        if (a.priority && !b.priority) return -1;
                        if (!a.priority && b.priority) return 1;
                        return b.score - a.score;
                    });
                
                // Max 5 highlights per project
                const selectedProjectHighlights = allProjectHighlights.slice(0, Math.min(5, allProjectHighlights.length));
                
                return {
                    ...project,
                    highlights: selectedProjectHighlights,
                    score: project.score || 0,
                    matchedKeywords: project.matchedKeywords || []
                };
            });
            
            const experienceScore = Math.max(
                selectedCompanyHighlights.reduce((sum, h) => sum + h.score, 0),
                processedProjects.reduce((sum, p) => sum + (p.score || 0), 0)
            );
            
            const allMatchedKeywords = [
                ...selectedCompanyHighlights.flatMap(h => h.matchedKeywords),
                ...processedProjects.flatMap(p => p.matchedKeywords || [])
            ].filter((value, index, self) => self.indexOf(value) === index);
            
            return {
                ...exp,
                highlights: selectedCompanyHighlights,
                projects: processedProjects,
                score: experienceScore,
                matchedKeywords: allMatchedKeywords
            };
        }); // Remove the filter - show ALL companies
        
        return result;
    }, [keywords, experience, filterStats, totalOccurrences]);
    
    return { 
        filteredExperience, 
        setKeywords,
        // Export additional data for debugging/development
        debug: {
            filterStats,
            totalOccurrences
        }
    };
}