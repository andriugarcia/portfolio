import { ListFilterPlus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import type { Filter } from "@/types/filter";
import filtersData from "@/data/filters.json"
import { Button } from "./ui/button";

type FilterBarProps = {
    selectedFilters: (Filter | string)[];
    onFilterClick: (filter: Filter) => void;
    onClear: () => void;
}

export function FilterBar({selectedFilters, onFilterClick, onClear}: FilterBarProps) {
    const renderBadge = (filter: Filter | string, dismissible: boolean = false) => {
        if (typeof filter === 'string') {
            filter = (filtersData as Record<string, Filter>)[filter] ?? { name: filter, type: "others", color: "gray" };
        }
        
        return (<Badge color={filter.color} onClick={() => onFilterClick(filter)}>{filter.name} {dismissible ? <X></X> : null}</Badge>)
    }
    return <Card className="flex flex-row py-2 mx-3 px-4 items-center mb-6">
        <>
            {selectedFilters.length === 0 ? 
            <>
                <div className="text-stone-400 hidden md:block">Choose the filters from the stack in the left panel</div> 
            </>
            : <><div className="flex flex-row flex-wrap max-w-full gap-2">
            { selectedFilters.map((filter) => renderBadge(filter, true)) }
            </div>
            <X onClick={onClear} className="ml-auto"></X>
            </>
            }
            <Button className="md:hidden place-self-end w-full  ">
                {
                    selectedFilters.length === 0 && <div>Add Filter</div>
                }
                <ListFilterPlus/>
            </Button>
        </>
    </Card>
}