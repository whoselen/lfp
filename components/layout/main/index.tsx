"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Box,
  House,
  PanelsTopLeft,
  Radio,
  Swords,
} from "lucide-react";
import { Sidebar } from "../sidebar";
import LfpCard from "@/components/lfp_card";

export default function MainLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1 overflow-auto p-6">
        <div className="mx-auto">
          {/* above max-w-4xl */}
          <div className="flex justify-center w-full">
            <Tabs defaultValue="lfp-feed" className="w-full">
              <ScrollArea>
                <div className="flex justify-center">
                  <TabsList className="mb-3 mx-auto">
                    <TabsTrigger value="lfp-feed" className="group">
                      <Radio
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Looking for party feed
                      <Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
                        1 new
                      </Badge>
                    </TabsTrigger>
                    <TabsTrigger value="community-feed" className="group">
                      <Activity
                        className="-ms-0.5 me-1.5 opacity-60"
                        size={16}
                        strokeWidth={2}
                        aria-hidden="true"
                      />
                      Community feed
                      <Badge className="ms-1.5 transition-opacity group-data-[state=inactive]:opacity-50">
                        +10 new
                      </Badge>
                    </TabsTrigger>
                  </TabsList>
                </div>
                <ScrollBar orientation="horizontal" />
              </ScrollArea>

              <TabsContent value="lfp-feed">
                <div className="flex flex-col gap-3 5">
                  <LfpCard />
                </div>
              </TabsContent>
              <TabsContent value="community-feed">
                <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
                  Content for Tab 3
                </p>
              </TabsContent>
            </Tabs>
          </div>

          {/* <h1 className="text-2xl font-bold">
            Welcome to Talent Agency Dashboard
          </h1>
          <p className="mt-2 text-muted-foreground">
            Select an agency from the sidebar to view details.
          </p> */}
        </div>
      </main>
    </div>
  );
}
