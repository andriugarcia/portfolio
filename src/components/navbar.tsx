import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuIndicator,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    NavigationMenuViewport,
    navigationMenuTriggerStyle,
  } from "@/components/ui/navigation-menu";

import { ModeToggle } from "./mode-toggle";
import { Button } from "./ui/button";

import { Mail, Linkedin, Github } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import aboutData from "@/data/about.json";

type AboutData = {
    name: string;
    description: string;
    avatar: string;
    profilePicture: string;
    links: {
        github: string;
        linkedin: string;
        email: string;
    };
}

export function Navbar() {
    const about: AboutData = aboutData;
    return (
    <div className="flex items-center justify-between w-full px-4 py-2 border-b-1 border-grey-400">
            <div className="flex items-center">
                <a href="/" className="flex items-center">
                <Avatar>
                    <AvatarImage src={about.profilePicture} />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                    <div className="text-sm" style={{fontFamily: "ui-monospace, SFMono-Regular, SF Mono, Menlo, Consolas, Liberation Mono, monospace"}}>{about.name}</div>
                    <div className="hidden text-sm md:block">{about.description}</div>
                </div>
                </a>
            </div>
            <div>
                <a href={about.links.linkedin} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <Linkedin className="h-4 w-4" />
                    </Button>
                </a>
                <a href={about.links.github} target="_blank" rel="noopener noreferrer">
                    <Button variant="ghost" size="icon" className="cursor-pointer">
                        <Github className="h-4 w-4" />
                    </Button>
                </a>
                <a href={about.links.email} target="_blank" rel="noopener noreferrer">
                    <Button className="ml-2 cursor-pointer">
                        <Mail className="h-4 w-4" />
                        <div className="hidden md:block">Get In Touch</div>
                    </Button>
                </a>
                {/* <ModeToggle></ModeToggle> */}
            </div>
    </div>
                );
}