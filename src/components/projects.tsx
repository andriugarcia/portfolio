import { Badge } from "@/components/ui/badge"
import useExperienceSearch from "@/hooks/use-experience-search"
import type { Filter } from "@/types/filter";
import { useEffect, useState } from "react";
import { X, ExternalLink, FileDown, Github } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area"
import generateResumePDF from "@/resume/resume"
import { WheelGesturesPlugin } from 'embla-carousel-wheel-gestures'
import filtersData from "@/data/filters.json"
import { FilterSelector } from "./filter-selector";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Button } from "./ui/button";
import { Card } from "./ui/card";
import { FilterBar } from "./filter-bar";

export function Projects() {
  const [selectedFilters, setSelectedFilters] = useState<Filter[]>([]);
  const [filterMobileOpened, setFilterMobileOpened] = useState(false);
  const [showGenerateButton, setShowGenerateButton] = useState(false);
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
    const showGenerate = url.searchParams.has('generate');
    
    filterParams.forEach((filterParam) => {
      addFilter(filterParam);
    });

    setShowGenerateButton(showGenerate);
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

  const clearFilters = () => {
    setSelectedFilters([]);
    setKeywords([]);
  }

  const getRandomColor = () => {
    const colorStrings = ['green', 'blue', 'pink', 'purple', 'red', 'yellow', 'gray', 'orange', 'teal', 'cyan', 'indigo', 'lime', 'amber', 'emerald', 'rose', 'slate']
    return colorStrings[Math.floor(Math.random() * colorStrings.length)];
  }

  const ProjectList = () => (<>
  {
    filteredExperience.map((experience) => (
        <Card key={experience.company} className="mt-5 gap-1">
            {/* Desktop layout */}
            <div className="hidden md:flex items-center justify-between pr-6">
                <div className="ml-4 text-2xl text-wrap">{experience.role} <span className="text-muted-foreground font-normal text-lg">@ {experience.company}</span></div>
                <div className="text-muted-foreground text-sm">
                    {experience.startDate}
                    {experience.startDate && experience.endDate && ' - '}
                    {experience.endDate}
                </div>
            </div>
            
            {/* Mobile layout */}
            <div className="md:hidden ml-4 pr-6">
                <div className="text-2xl text-wrap">{experience.role}</div>
                <div className="text-muted-foreground font-normal text-lg">@ {experience.company}</div>
                <div className="text-muted-foreground text-sm">
                    {experience.startDate}
                    {experience.startDate && experience.endDate && ' - '}
                    {experience.endDate}
                </div>
            </div>
            
            <div className="ml-4 text-muted-foreground mb-4">{experience.team}</div>
            <ul className="list-disc list-inside mb-2 ml-4 pr-6">
                {
                    experience.highlights.map((highlight) => (
                        <li key={highlight.content} className="text-pretty">{highlight.content} {
                          highlight.matchedKeywords.map((kw) => (
                            <Badge key={kw} variant="outline" className="text-xs">{kw}</Badge>
                          ))
                        }</li>
                    ))
                }
            </ul>
            {
                experience.projects.map((project) => (
                    <Card color={getRandomColor()} className="relative px-4 mb-2 mx-3" key={project.name}>
                        <div className="flex items-center justify-between">
                          <div className="font-semibold">{ project.name } </div>
                          <div className="flex gap-2">
                            {project.github && (
                              <Button variant="ghost" size="icon" asChild>
                                <a href={project.github} target="_blank" rel="noopener noreferrer">
                                  <Github />
                                </a>
                              </Button>
                            )}
                            {project.url && (
                              <Button variant="secondary" asChild>
                                <a href={project.url} target="_blank" rel="noopener noreferrer">
                                  <div className="hidden md:block">Visit Site</div>
                                  <ExternalLink></ExternalLink>
                                </a>
                              </Button>
                            )}
                          </div>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {
                                project.stack.map((tech) => (
                                    <Badge key={tech} variant={selectedFilters.find(filter => filter.name === tech) ? 'default' : 'outline'}>{tech}</Badge>
                                ))
                            }
                        </div>
                        <div>
                          <div className="text-muted-foreground font-bold tracking-wider text-green-50/70 mb-2">ABOUT THIS PROJECT</div>
                          <p className="mb-2 text-pretty text-green-50">{ project.description }</p>
                        </div>
                        <div>
                          <div className="text-muted-foreground font-bold tracking-wider text-purple-50/70 mb-2">HIGHLIGHTS</div>
                          <ul className="list-disc list-inside">
                              {
                                  project.highlights.map((highlight) => (
                                      <li key={highlight.content} className="text-pretty text-purple-50">{highlight.content} {
                                        highlight.matchedKeywords.map((kw) => (
                                          <Badge key={kw} variant="outline" className="text-xs">{kw}</Badge>
                                        ))
                                      }</li>
                                  ))
                              }
                          </ul>
                        </div>
                        <div className="px-12">
                        {
                          project.images &&
                          <Carousel
                            opts={{
                              loop: false,
                              align: "start",
                            }}
                            plugins={[
                              WheelGesturesPlugin()
                            ]}
                            className="hidden md:block w-full"
                          >
                            <CarouselContent>
                              {project.images.map((src, index) => (
                                <CarouselItem key={index} className="basis-auto">
                                  <div className="">
                                    <Card className="h-60 py-0">
                                      <img className="h-full w-full md:w-auto rounded-xl" src={src} alt="" />
                                    </Card>
                                  </div>
                                </CarouselItem>
                              ))}
                            </CarouselContent>
                            <CarouselPrevious />
                            <CarouselNext />
                          </Carousel>
                        }
                        </div>
                        {
                          project.images &&
                          <div className="md:hidden grid grid-cols-2 gap-2">
                            <div className="grid gap-2">
                              {project.images.map((src, index) => (
                                index % 2 === 0 ? (
                                <Card key={src} className="py-0">
                                  <img className="rounded-xl" src={src} alt="" />
                                </Card>) : null
                              ))}
                            </div>
                            <div className="grid gap-2">
                              {project.images.map((src, index) => (
                                index % 2 !== 0 ? (
                                  <Card key={src} className="py-0 h-fit">
                                    <img className="rounded-xl" src={src} alt="" />
                                  </Card>) : null
                              ))}
                            </div>
                          </div>
                        }
                    </Card>
                ))
            }
        </Card>
        
    ))
}
  </>);

  return (
    <div className="flex flex-row h-full flex-1 gap-x-2 min-h-0 pb-4">
        <Card className="basis-[360px] pt-4 px-4 border-r-1 border-grey h-full flex flex-col hidden md:block">
            <h2 className="text-2xl font-bold tracking-tight">Stack</h2>
            <p className="text-muted-foreground text-sm mb-2">Choose filters to showcase the enhanced experience</p>
            <ScrollArea className="w-full h-full pb-16">
              <FilterSelector selectedFilters={selectedFilters} addFilter={addFilter}></FilterSelector>
            </ScrollArea>
        </Card>
        <div className="basis-auto md:basis-full flex flex-col min-h-0">
            <Card className="py-4 gap-2 hidden md:block md:z-2">
              <div className="flex items-center justify-between px-4">
                <div>
                  <h2 className="text-2xl font-bold tracking-tight">Projects</h2>
                  <p className="text-muted-foreground text-sm mb-2">Projects I have worked on as a frontend developer</p>
                </div>
              {showGenerateButton && (
                <Button onClick={() => generateResumePDF(filteredExperience, window.location.href)}><div className="hidden md:block">Generate Resume </div><FileDown></FileDown></Button>
              )}
              </div>
              <FilterBar selectedFilters={selectedFilters} onFilterClick={addFilter} onClear={clearFilters} onFilterMobileOpened={() => setFilterMobileOpened(prev => !prev)}/>
            </Card>
            <FilterBar className="md:hidden mx-0" selectedFilters={selectedFilters} onFilterClick={addFilter} onClear={clearFilters} onFilterMobileOpened={() => setFilterMobileOpened(prev => !prev)}/>
            <ScrollArea className="w-full flex-1 min-h-0 md:-mt-2">
              {
                filterMobileOpened ? (<FilterSelector selectedFilters={selectedFilters} addFilter={addFilter} onClose={() => setFilterMobileOpened(false)}></FilterSelector>)
                : (<ProjectList></ProjectList>)
              }
            </ScrollArea>
        </div>
    </div>
  )
}