import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import filtersData from "@/data/filters.json"
import useExperienceSearch from "@/hooks/use-experience-search"
import type { Filter } from "@/types/filter";
import { useState } from "react";
import { X } from "lucide-react";
import { FilterSection } from "./filter-section";

export function Projects() {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const filtersPerType: { [type: string]: Filter[] | undefined } = Object.groupBy(Object.values(filtersData), ({ type }) => type);
  const { filteredExperience, setKeywords } = useExperienceSearch();

  const addFilter = (filter: Filter) => {
    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prev) => prev.filter((f) => f !== filter));
      setKeywords((prev) => prev.filter((f) => f !== filter));
    }
    else {
      setSelectedFilters((prev) => Array.from(new Set([...prev, filter])));
      setKeywords((prev) => Array.from(new Set([...prev, filter])));
    }
  }

  const renderBadge = (filter: Filter | string, dismissible: boolean = false) => {
    if (typeof filter === 'string') {
      filter = (filtersData as Record<string, Filter>)[filter] ?? { name: filter, type: "others", color: "gray" };
    }
    
    return (<Badge color={filter.color} onClick={() => addFilter(filter)}>{filter.name} {dismissible ? <X></X> : null}</Badge>)
  }

  const clearFilters = () => {
    setSelectedFilters([]);
    setKeywords([]);
  }

  return (
    <Card className="flex-row h-full overflow-y-scroll">
        <div className="basis-1/4 p-4">
            <h2 className="text-2xl text-semibold">Stack</h2>
            {
                Object.entries(filtersPerType).map(([type, filters]) => (
                    <>
                      {filters && <FilterSection defaultOpen={type === 'Frontend Frameworks'} type={type} filters={filters} onFilterSelected={addFilter} selectedFilters={selectedFilters}></FilterSection>}
                    </>
                ))
            }
        </div>
        <div className="basis-3/4 p-4">
            <h2 className="text-2xl text-semibold">Projects</h2>
            <Card className="flex flex-row py-2 px-4 items-center">
             

              
                {selectedFilters.length === 0 ? 'No Filters Selected' : <><div className="flex flex-row flex-wrap max-w-full gap-2">
                  { selectedFilters.map((filter) => renderBadge(filter, true)) }
                </div>
                  <X onClick={clearFilters} className="ml-auto"></X>
                </>
                }
            </Card>
            {
                filteredExperience.map((experience) => (
                    <div key={experience.company}>
                        <div className="text-2xl mt-12 mb-4">{experience.company}</div>
                        <ul className="list-disc list-inside">
                            {
                                experience.highlights.map((highlight) => (
                                    <li className="text-pretty">{highlight.content} {
                                      highlight.matchedKeywords.map((kw) => (
                                        <Badge variant="outline" className="text-xs">{kw}</Badge>
                                      ))
                                    }</li>
                                ))
                            }
                        </ul>
                        {
                            experience.projects.map((project) => (
                                <Card className="px-4 mb-4" key={project.name}>
                                    <div className="font-semibold mb-2">{ project.name }</div>
                                    <p className="mb-2 text-pretty">{ project.description }</p>
                                    <div className="flex gap-2">
                                        {
                                            project.stack.map((tech) => (
                                                <Badge variant={selectedFilters.find(filter => filter.name === tech) ? 'default' : 'outline'}>{tech}</Badge>
                                            ))
                                        }
                                    </div>
                                    <ul className="list-disc list-inside">
                                        {
                                            project.highlights.map((highlight) => (
                                                <li className="text-pretty">{highlight.content} {
                                                  highlight.matchedKeywords.map((kw) => (
                                                    <Badge variant="outline" className="text-xs">{kw}</Badge>
                                                  ))
                                                }</li>
                                            ))
                                        }
                                    </ul>
                                </Card>
                            ))
                        }
                    </div>
                    
                ))
            }
        </div>
    </Card>
  )
}