import { FilterSection } from "./filter-section";
import filtersData from "@/data/filters.json"
import type { Filter } from "@/types/filter";

export function FilterSelector({selectedFilters, addFilter}) {
    const filtersPerType: { [type: string]: Filter[] } = Object.values(filtersData).reduce((acc: { [type: string]: Filter[] }, filter: Filter) => {
        if (!acc[filter.type]) {
            acc[filter.type] = [];
        }
        acc[filter.type].push(filter);
        return acc;
    }, {});
    return (
        <>
            {
                Object.entries(filtersPerType).map(([type, filters]) => (
                    <>
                    {filters && <FilterSection defaultOpen={type === 'Frontend Frameworks'} type={type} filters={filters} onFilterSelected={addFilter} selectedFilters={selectedFilters}></FilterSection>}
                    </>
                ))
            }
        </>
    );
}