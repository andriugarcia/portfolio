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

export function Navbar() {
    return (
    <div className="flex items-center justify-between w-full px-4 py-2">
            <div className="flex items-center">
                <a href="/" className="flex items-center">
                <Avatar>
                    <AvatarImage src="https://github.com/shadcn.png" />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <div className="ml-2">
                    <div>Andriu Garcia</div>
                    <div>Frontend Developer Making Life easier to users and developers</div>
                </div>
                </a>
            </div>
            <div>
                <Button variant="ghost" size="icon">
                    <Mail className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Linkedin className="h-4 w-4" />
                </Button>
                <Button variant="ghost" size="icon">
                    <Github className="h-4 w-4" />
                </Button>
                <ModeToggle></ModeToggle>
            </div>
    </div>
                );
}