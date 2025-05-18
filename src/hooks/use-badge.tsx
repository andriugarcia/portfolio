import FiltersData from "../data/filters.json";
import type { Filter } from "@/types/filter";

export default function useBadge() {
    const filters: { [key: string]: Filter } = FiltersData;

    const getFilter = (filterName: string): Filter => {
        if (filters.hasOwnProperty(filterName)) {
            return filters[filterName];
        }
        return { name: filterName, type: "others", color: "bg-gray-200" };
    }
    
}