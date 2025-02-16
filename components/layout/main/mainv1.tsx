"use client";

import * as React from "react";
import {
  AlertCircle,
  Archive,
  ArchiveX,
  File,
  Inbox,
  MessagesSquare,
  Search,
  Send,
  ShoppingCart,
  Trash2,
  Users2,
} from "lucide-react";

import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

import { cn } from "@/lib/utils";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Separator } from "@/components/ui/separator";
import { Nav } from "../nav";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import LfpCard from "@/components/lfp_card";
import { Sidebar } from "../sidebar";

interface MailProps {
  defaultLayout: number[] | undefined;
  defaultCollapsed?: boolean;
  navCollapsedSize: number;
}

export function Mail({
  defaultLayout = [20, 32, 48],
  defaultCollapsed = false,
  navCollapsedSize,
}: MailProps) {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);
  //   const [mail] = useMail()

  return (
    <TooltipProvider delayDuration={0}>
      <ResizablePanelGroup
        direction="horizontal"
        onLayout={(sizes: number[]) => {
          document.cookie = `react-resizable-panels:layout:mail=${JSON.stringify(
            sizes
          )}`;
        }}
        className="h-full max-h-[800px] items-stretch"
      >
        <ResizablePanel
          defaultSize={defaultLayout[0]}
          collapsedSize={navCollapsedSize}
          collapsible={true}
          minSize={15}
          maxSize={23}
          onCollapse={() => {
            setIsCollapsed(true);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              true
            )}`;
          }}
          onResize={() => {
            setIsCollapsed(false);
            document.cookie = `react-resizable-panels:collapsed=${JSON.stringify(
              false
            )}`;
          }}
          className={cn(
            isCollapsed && "min-w-fit transition-all duration-300 ease-in-out"
          )}
        >
          {/* <Sidebar /> */}
          <Nav
            isCollapsed={isCollapsed}
            communities={[
              {
                title: "Dota 2",
                description: "The best MOBA enjoyers",
                avatarSrc:
                  "https://i.pinimg.com/736x/02/67/5c/02675c281fd4103f083323b802f10205.jpg",
              },
              {
                title: "Minecraft",
                description: "Creative builders and adventurers",
                avatarSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRMCtFKDuFX3qHZZK2AhY7SC_E8WFtuYR5FnA&s",
              },
              {
                title: "Fortnite",
                description: "Battle Royale and creative mode players",
                avatarSrc:
                  "https://crystalpng.com/wp-content/uploads/2024/09/Fortnite-logo-png.png",
              },
              {
                title: "League of Legends",
                description: "MOBA strategy gamers",
                avatarSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
              },
              {
                title: "Valorant",
                description: "Tactical shooter enthusiasts",
                avatarSrc:
                  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
              },
            ]}
          />
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[1]} minSize={30}>
          <Tabs defaultValue="all">
            <div className="flex items-center px-4 py-2">
              <h1 className="text-xl font-bold">Inbox</h1>
              <TabsList className="ml-auto">
                <TabsTrigger
                  value="all"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  All mail
                </TabsTrigger>
                <TabsTrigger
                  value="unread"
                  className="text-zinc-600 dark:text-zinc-200"
                >
                  Unread
                </TabsTrigger>
              </TabsList>
            </div>
            <Separator />
            <div className="bg-background/95 p-4 backdrop-blur supports-[backdrop-filter]:bg-background/60">
              <form>
                <div className="relative">
                  <Search className="absolute left-2 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input placeholder="Search" className="pl-8" />
                </div>
              </form>
            </div>
            <TabsContent value="all" className="m-0">
              {/* <div className="flex flex-col gap-2">
                <LfpCard />
                <LfpCard />
                <LfpCard />
                <LfpCard />
                <LfpCard />
              </div> */}
            </TabsContent>
            <TabsContent value="unread" className="m-0">
              {/* <MailList items={mails.filter((item) => !item.read)} /> */}
            </TabsContent>
          </Tabs>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={defaultLayout[2]} minSize={30}>
          {/* <MailDisplay
            mail={mails.find((item) => item.id === mail.selected) || null}
          /> */}
        </ResizablePanel>
      </ResizablePanelGroup>
    </TooltipProvider>
  );
}
