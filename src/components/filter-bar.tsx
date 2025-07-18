import { useState } from "react";
import { Check, ListFilterPlus, X } from "lucide-react";
import { Badge } from "./ui/badge";
import { Card } from "./ui/card";
import type { Filter } from "@/types/filter";
import filtersData from "@/data/filters.json"
import { Button } from "./ui/button";

type FilterBarProps = {
    className?: string;
    selectedFilters: (Filter | string)[];
    onFilterClick: (filter: Filter) => void;
    onClear: () => void;
}

export function FilterBar({className, selectedFilters, onFilterClick, onClear, onFilterMobileOpened}: FilterBarProps) {
    const [filterMobileOpened, setFilterMobileOpened] = useState(false);
    const renderBadge = (filter: Filter | string, dismissible: boolean = false) => {
        if (typeof filter === 'string') {
            filter = (filtersData as Record<string, Filter>)[filter] ?? { name: filter, type: "others", color: "gray" };
        }
        
        return (<Badge key={filter.name} color={filter.color} onClick={() => onFilterClick(filter)}>{filter.name} {dismissible ? <X></X> : null}</Badge>)
    }

    const toggleFilterMobile = () => {
        setFilterMobileOpened(prev => !prev);
        onFilterMobileOpened();
    }

    return <Card className={"flex flex-row justify-between py-2 mx-3 px-4 items-center " + className}>
        <>
            {selectedFilters.length === 0 ? 
            <>
                <div className="text-stone-400">Choose the filters from stack</div> 
            </>
            : <><div className="flex flex-row flex-wrap max-w-full gap-2">
            { selectedFilters.map((filter) => renderBadge(filter, true)) }
            </div>
            <X onClick={onClear} className="ml-auto"></X>
            </>
            }
            <Button className="md:hidden place-self-end" onClick={toggleFilterMobile}>
                { !filterMobileOpened ? <ListFilterPlus/> : <Check/>}
            </Button>
        </>
    </Card>
}