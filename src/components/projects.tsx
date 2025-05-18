import { Card } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import filtersData from "@/data/filters.json"
import useExperienceSearch from "@/hooks/use-experience-search"
import type { Filter } from "@/types/filter";
import { useState } from "react";
import { X } from "lucide-react";

const badgeStyles = {
  green: "bg-green-900 text-green-200",
  blue: "bg-blue-900 text-blue-200",
  pink: "bg-pink-900 text-pink-200",
  purple: "bg-purple-900 text-purple-200",
  red: "bg-red-900 text-red-200",
  yellow: "bg-yellow-900 text-yellow-200",
  gray: "bg-gray-900 text-gray-200",
  orange: "bg-orange-900 text-orange-200",
  teal: "bg-teal-900 text-teal-200",
  cyan: "bg-cyan-900 text-cyan-200",
  indigo: "bg-indigo-900 text-indigo-200",
  lime: "bg-lime-900 text-lime-200",
  amber: "bg-amber-900 text-amber-200",
  emerald: "bg-emerald-900 text-emerald-200",
  rose: "bg-rose-900 text-rose-200",
  slate: "bg-slate-900 text-slate-200",
};

export function Projects() {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const filtersPerType: { [type: string]: Filter[] } = Object.values(filtersData).reduce((acc: { [type: string]: Filter[] }, filter: Filter) => {
    if (!acc[filter.type]) {
      acc[filter.type] = [];
    }
    acc[filter.type].push(filter);
    return acc;
  }, {});
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
      filter = (filtersData as Record<string, Filter>)[filter] ?? { name: filter, type: "others", color: "gray" as keyof typeof badgeStyles };
    }
    
    return (<Badge className={badgeStyles[filter.color as keyof typeof badgeStyles]} onClick={() => addFilter(filter)}>{filter.name} {dismissible ? <X></X> : null}</Badge>)
  }

  const clearFilters = () => {
    setSelectedFilters([]);
    setKeywords([]);
  }

  return (
    <Card className="flex-row">
        <div className="basis-1/4 p-4">
            {
                Object.entries(filtersPerType).map(([type, filters]) => (
                    <>
                        <div className="leading-7">{type}</div>
                        <div className="flex flex-wrap gap-2 mb-2">
                            {
                                filters?.map((filter) => renderBadge(filter, false))
                            }
                        </div>
                    </>
                ))
            }
        </div>
        <div className="basis-3/4 p-4">
            <Card className="flex-row py-2 px-4 gap-2">
                {selectedFilters.length === 0 ? 'No Filters Selected' : <>
                { selectedFilters.map((filter) => renderBadge(filter, true)) }
                <X onClick={clearFilters} className="ml-auto"></X>
                </>}
            </Card>
            {
                filteredExperience.map((experience) => (
                    <div key={experience.company}>
                        <div className="text-2xl mt-12 mb-4">{experience.company}</div>
                        <ul className="list-disc list-inside">
                            {
                                experience.highlights.map((highlight) => (
                                    <li>{highlight.content} {
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
                                                <li>{highlight.content} {
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