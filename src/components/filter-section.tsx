import type { Filter } from "@/types/filter";
import { Badge } from "@/components/ui/badge"
import filtersData from "@/data/filters.json"

import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import { X, ChevronRight, ChevronDown } from "lucide-react";
import { useState } from "react";

type FilterSectionProps = {
    type: string;
    filters: Filter[];
    onFilterSelected: (filter: Filter) => void;
}

export function FilterSection({type, filters, defaultOpen, onFilterSelected, selectedFilters}: FilterSectionProps) {
    const [opened, setOpen] = useState(defaultOpen);
    const renderBadge = (filter: Filter | string, dismissible: boolean = false) => {
      if (typeof filter === 'string') {
        filter = (filtersData as Record<string, Filter>)[filter] ?? { name: filter, type: "others", color: "gray" };
      }
      
      return (<Badge color={filter.color} onClick={() => onFilterSelected(filter)}>{filter.name} {dismissible ? <X></X> : null}</Badge>)
    }

    return (
        <Collapsible className="mb-2" defaultOpen={opened} key={type} onOpenChange={setOpen}>
        <CollapsibleTrigger className="flex items-center gap-2">
          {
            opened ? <ChevronDown size={18}></ChevronDown> : <ChevronRight size={18}></ChevronRight>
          }
          <div className="leading-7">{type}</div>
        </CollapsibleTrigger>
        <CollapsibleContent>
          <div className="flex flex-wrap gap-2 my-2 ml-6">
              {
                  filters?.map((filter) => renderBadge(filter, selectedFilters.includes(filter)))
              }
          </div>
        </CollapsibleContent>
      </Collapsible>
    )
}