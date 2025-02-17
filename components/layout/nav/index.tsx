"use client";

import Link from "next/link";
import { LucideIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { buttonVariants } from "@/components/ui/button";
import { ListItem } from "../sidebar/list-item";
import SearchInput from "../sidebar/search-input";
import { AppLogo } from "@/components/common/app-logo";

interface NavProps {
  isCollapsed: boolean;
  communities: {
    title: string;
    description?: string;
    avatarSrc: string;
  }[];
}

export function Nav({ communities, isCollapsed }: NavProps) {
  return (
    <div data-collapsed={isCollapsed} className="group flex flex-col gap-2">
      <AppLogo isSidebarCollapsed={isCollapsed} />
      <div className="px-4 flex items-center justify-between">
        {isCollapsed ? (
          ""
        ) : (
          //   <Button variant="ghost" size="icon">
          //     <Search className="h-4 w-4" />
          //   </Button>
          <SearchInput />
        )}
      </div>
      <nav className="grid px-2 group-[[data-collapsed=true]]:justify-center group-[[data-collapsed=true]]:px-0">
        {communities.map((link, index) =>
          isCollapsed ? (
            <Link key={index} href="#">
              <ListItem
                name={link.title}
                description={link.description}
                avatarSrc={link.avatarSrc}
                isCollapsed={true}
              />
              <span className="sr-only">{link.title}</span>
            </Link>
          ) : (
            <Link key={index} href="#">
              <ListItem
                name={link.title}
                description={link.description}
                avatarSrc={link.avatarSrc}
                isCollapsed={false}
              />
            </Link>
          )
        )}
      </nav>
    </div>
  );
}
