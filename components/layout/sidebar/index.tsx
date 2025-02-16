"use client";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ListItem } from "./list-item";
import { SidebarLogo } from "./logo";
import SearchInput from "./search-input";
import { ThemeToggler } from "@/components/common/theme-toggler";

const communities = [
  {
    name: "Dota 2",
    description: "The best MOBA enjoyers",
    avatarSrc:
      "https://i.pinimg.com/736x/02/67/5c/02675c281fd4103f083323b802f10205.jpg",
  },
  {
    name: "Minecraft",
    description: "Creative builders and adventurers",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCtFKDuFX3qHZZK2AhY7SC_E8WFtuYR5FnA&s",
  },
  {
    name: "Fortnite",
    description: "Battle Royale and creative mode players",
    avatarSrc:
      "https://crystalpng.com/wp-content/uploads/2024/09/Fortnite-logo-png.png",
  },
  {
    name: "League of Legends",
    description: "MOBA strategy gamers",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
  },
  {
    name: "Valorant",
    description: "Tactical shooter enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
];

const MIN_SIDEBAR_WIDTH = 80;
const MAX_SIDEBAR_WIDTH = 320;
const COLLAPSE_THRESHOLD = 140;

export function Sidebar() {
  const [sidebarWidth, setSidebarWidth] = useState(MAX_SIDEBAR_WIDTH);
  const [isDragging, setIsDragging] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);

  const isCollapsed = sidebarWidth < COLLAPSE_THRESHOLD;

  const handleMouseDown = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging) return;

    const newWidth = e.clientX;
    if (newWidth <= MAX_SIDEBAR_WIDTH) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    } else if (newWidth >= MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(MAX_SIDEBAR_WIDTH);
    } else if (newWidth < MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(MIN_SIDEBAR_WIDTH);
    } else if (newWidth > MAX_SIDEBAR_WIDTH) {
      setSidebarWidth(MAX_SIDEBAR_WIDTH);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]); // Added handleMouseMove to dependencies

  return (
    <div
      ref={sidebarRef}
      className="border-r flex-shrink-0 relative transition-all duration-300 ease-in-out bg-background"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="h-full overflow-hidden flex flex-col">
        <SidebarLogo isSidebarCollapsed={isCollapsed} />

        <div className="px-4 py-2 flex items-center justify-between">
          {isCollapsed ? (
            <Button variant="ghost" size="icon">
              <Search className="h-4 w-4" />
            </Button>
          ) : (
            <SearchInput />
          )}
        </div>
        <div className="overflow-y-auto flex-1">
          {communities.map((community) => (
            <ListItem
              key={community.name}
              {...community}
              isCollapsed={isCollapsed}
            />
          ))}
        </div>
        <div className="flex justify-between items-center border-t p-4">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">
              {communities.length} communities available
            </p>
          )}
          <ThemeToggler />
        </div>
      </div>
      <div
        className="absolute top-0 right-0 w-1 h-full cursor-col-resize bg-primary/10 hover:bg-primary/20"
        onMouseDown={handleMouseDown}
      />
    </div>
  );
}
