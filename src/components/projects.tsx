import { Badge } from "@/components/ui/badge"
import filtersData from "@/data/filters.json"
import useExperienceSearch from "@/hooks/use-experience-search"
import type { Filter } from "@/types/filter";
import { useEffect, useState } from "react";
import { X, ExternalLink, FileDown } from "lucide-react";
import { FilterSection } from "./filter-section";
import { ScrollArea } from "@/components/ui/scroll-area"
import generateResumePDF from "@/resume/resume"

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button";
import { Card } from "./ui/card";

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

  useEffect(() => {
    const url = new URL(window.location.href);
    const filterParams = url.searchParams.getAll('f');
    console.log(filterParams);
    
    filterParams.forEach((filterParam) => {
      addFilter(filterParam);
    });
  }, []);

  const addQueryParam = (param: string) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;

    if (!params.getAll('f').includes(param)) {
      params.append('f', param);
      window.history.replaceState({}, '', url);
    }
  }

  const removeQueryParam = (valueToRemove: string) => {
    const url = new URL(window.location.href);
    const params = url.searchParams;
  
    // Get all values for this key
    const values = params.getAll('f');
  
    // Clear the key entirely, then re-add all except the one we want to remove
    params.delete('f');
    values
      .filter(value => value !== valueToRemove)
      .forEach(value => params.append('f', value));
  
    // Update the URL without reloading
    window.history.replaceState({}, '', url);
  };

  const addFilter = (filterParam: Filter | string) => {
    let filter: Filter;
    if (typeof filterParam === 'string') {
      filter = (filtersData as { [type: string]: Filter })[filterParam];
      if (!filter) return;
    } else {
      filter = filterParam
    }

    if (selectedFilters.includes(filter)) {
      setSelectedFilters((prev) => prev.filter((f) => f !== filter));
      setKeywords((prev) => prev.filter((f) => f !== filter));
      removeQueryParam(filter.name);
    }
    else {
      setSelectedFilters((prev) => Array.from(new Set([...prev, filter])));
      setKeywords((prev) => Array.from(new Set([...prev, filter])));
      addQueryParam(filter.name);
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
    <div className="flex flex-row h-full flex-1 min-h-0">
        <div className="basis-180 pt-4 px-4 border-r-1 border-grey h-full flex flex-col">
            <h2 className="text-2xl font-bold tracking-tight">Stack</h2>
            <p className="text-muted-foreground mb-2">Choose filters to showcase the enhanced experience</p>
            <ScrollArea className="w-full h-full">
              {
                  Object.entries(filtersPerType).map(([type, filters]) => (
                      <>
                        {filters && <FilterSection defaultOpen={type === 'Frontend Frameworks'} type={type} filters={filters} onFilterSelected={addFilter} selectedFilters={selectedFilters}></FilterSection>}
                      </>
                  ))
              }
            </ScrollArea>
        </div>
        <div className="basis-auto pt-4 px-4 flex flex-col min-h-0">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                <p className="text-muted-foreground mb-2">Projects I have worked on as a frontend developer</p>
              </div>
              <Button onClick={() => generateResumePDF(filteredExperience)}>Generate Resume <FileDown></FileDown></Button>
            </div>
            <Card className="flex flex-row py-2 px-4 items-center mb-6">
                {selectedFilters.length === 0 ? <div className="text-stone-400">Choose the filters from the stack in the left panel</div> : <><div className="flex flex-row flex-wrap max-w-full gap-2">
                  { selectedFilters.map((filter) => renderBadge(filter, true)) }
                </div>
                  <X onClick={clearFilters} className="ml-auto"></X>
                </>
                }
            </Card>
            <ScrollArea className="w-full flex-1 min-h-0">
              {
                  filteredExperience.map((experience) => (
                      <div className="mb-8" key={experience.company}>
                          <div className="text-2xl">{experience.company}</div>
                          <div className="text-muted-foreground mb-4">{experience.team}</div>
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
                                  <Card className="relative px-4 mb-4" key={project.name}>
                                      <Button className="absolute top-6 right-4">
                                        Visit Site
                                        <ExternalLink></ExternalLink>
                                      </Button>
                                      <div className="flex items-center">
                                        <div className="font-semibold">{ project.name } </div>
                                        <div className="ml-2 h-2 w-2 rounded-full bg-green-600"></div>
                                      </div>
                                      <div className="flex gap-2">
                                          {
                                              project.stack.map((tech) => (
                                                  <Badge variant={selectedFilters.find(filter => filter.name === tech) ? 'default' : 'outline'}>{tech}</Badge>
                                              ))
                                          }
                                      </div>
                                      <p className="mb-2 text-pretty">{ project.description }</p>
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
                                      <Carousel
                                        opts={{
                                          align: "start",
                                        }}
                                        className="w-full"
                                      >
                                        <CarouselContent>
                                          {Array.from({ length: 5 }).map((_, index) => (
                                            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
                                              <div className="p-1">
                                                <Card className="w-full h-40">
                                                  <img className="" src="https://placehold.co/600x400" alt="" />
                                                </Card>
                                              </div>
                                            </CarouselItem>
                                          ))}
                                        </CarouselContent>
                                        <CarouselPrevious />
                                        <CarouselNext />
                                      </Carousel>
                                  </Card>
                              ))
                          }
                      </div>
                      
                  ))
              }
            </ScrollArea>
        </div>
    </div>
  )
}