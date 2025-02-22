"use client";

import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { ListItem } from "./list-item";
import SearchInput from "./search-input";
import { ThemeToggler } from "@/components/common/theme-toggler";
import { AppLogo } from "@/components/common/app-logo";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { getGames } from "@/queries/games";

// Constants
const MIN_SIDEBAR_WIDTH = 80;
const MAX_SIDEBAR_WIDTH = 320;
const COLLAPSE_THRESHOLD = 140;
const SIDEBAR_COOKIE_NAME = "sidebar-state";

function getSidebarStateFromCookie() {
  const cookieValue = document.cookie
    .split("; ")
    .find((row) => row.startsWith(SIDEBAR_COOKIE_NAME));
  if (cookieValue) {
    const isCollapsed = cookieValue.split("=")[1] === "collapsed";
    return isCollapsed ? MIN_SIDEBAR_WIDTH : MAX_SIDEBAR_WIDTH;
  }
  return MAX_SIDEBAR_WIDTH;
}

function setSidebarStateToCookie(isCollapsed: boolean) {
  document.cookie = `${SIDEBAR_COOKIE_NAME}=${
    isCollapsed ? "collapsed" : "expanded"
  }; path=/; max-age=31536000`;
}

export function Sidebar() {
  const supabase = useSupabaseBrowser();
  const { data: games, isLoading, isError } = useQuery(getGames(supabase));

  const initialSidebarWidth = getSidebarStateFromCookie();
  const [sidebarWidth, setSidebarWidth] = useState(initialSidebarWidth);
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
      setSidebarStateToCookie(true);
    } else if (newWidth >= MIN_SIDEBAR_WIDTH) {
      setSidebarWidth(MAX_SIDEBAR_WIDTH);
      setSidebarStateToCookie(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging, handleMouseMove]);

  return (
    <div
      ref={sidebarRef}
      className="border-r flex-shrink-0 relative transition-all duration-300 ease-in-out bg-background"
      style={{ width: `${sidebarWidth}px` }}
    >
      <div className="h-full overflow-hidden flex flex-col">
        <AppLogo isSidebarCollapsed={isCollapsed} className="border-b" />

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
          {(games || []).map((community) => (
            <ListItem
              key={community.id}
              isCollapsed={isCollapsed}
              {...community}
            />
          ))}
        </div>
        <div className="flex justify-between items-center border-t p-4">
          {!isCollapsed && (
            <p className="text-xs text-muted-foreground">
              {games?.length} communities available
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
