import { FilterSection } from "./filter-section";
import filtersData from "@/data/filters.json"
import experienceData from "@/data/experience.json"
import type { Filter } from "@/types/filter";

export function FilterSelector({selectedFilters, addFilter}) {
    const otherFilters = new Set(experienceData.flatMap((company) => [...company.highlights.flatMap(h => h.keywords), ...company.projects.flatMap(p => p.highlights.map(h => h.keywords))]).flat().filter(filter => 
        !Object.keys(filtersData).includes(filter) && filter !== ''
    ));
    const filtersPerType: { [type: string]: Filter[] } = Object.values(filtersData).reduce((acc: { [type: string]: Filter[] }, filter: Filter) => {
        if (!acc[filter.type]) {
            acc[filter.type] = [];
        }
        acc[filter.type].push(filter);
        return acc;
    }, {});
    filtersPerType['Others'] = Array.from(otherFilters).map((keyword) => ({
        name: keyword,
        type: 'Others',
        color: 'gray'
    }));
    return (
        <>
            {
                Object.entries(filtersPerType).map(([type, filters]) => (
                    <>
                        {filters && <FilterSection key={type} defaultOpen={type === 'Frontend Frameworks'} type={type} filters={filters} onFilterSelected={addFilter} selectedFilters={selectedFilters}></FilterSection>}
                    </>
                ))
            }
        </>
    );
}