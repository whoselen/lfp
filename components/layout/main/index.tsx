"use client";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Activity,
  Box,
  DiscIcon,
  Headphones,
  Headset,
  House,
  PanelsTopLeft,
  Radio,
  Speaker,
  Swords,
} from "lucide-react";
import { Sidebar } from "../sidebar";
import LfpCard from "@/components/lfp_card";
import LfpCardVar from "@/components/lfp_card/lfp-card-var";
import { SegmentedControl } from "./nav-bar";
import { useId, useState } from "react";
import { Separator } from "@/components/ui/separator";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import MultipleSelector, { Option } from "@/components/ui/multiselect";
import MultipleSelectorWithLeftSection, {
  Option as LeftSectionOption,
} from "@/components/ui/multiselect-with-left-section";
import { Checkbox } from "@/components/ui/checkbox";
import { FaDiscord } from "react-icons/fa6";
import clsx from "clsx";
import { Button } from "@/components/ui/button";

const Square = ({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) => (
  <span
    data-square
    className={cn(
      "flex size-5 items-center justify-center rounded bg-muted text-xs font-medium text-muted-foreground",
      className
    )}
    aria-hidden="true"
  >
    {children}
  </span>
);

const frameworks: Option[] = [
  {
    value: "sea",
    label: "SEA",
  },
  {
    value: "europe-west",
    label: "Europe-West",
  },
  {
    value: "europe-east",
    label: "Europe-East",
  },
  {
    value: "na-east",
    label: "NA-East",
  },
  {
    value: "na-west",
    label: "NA-West",
  },
  {
    value: "sa",
    label: "South America",
  },
  {
    value: "oce",
    label: "Oceania",
  },
  {
    value: "asia",
    label: "Asia",
  },
  {
    value: "africa",
    label: "Africa",
  },
];

const player_tags: Option[] = [
  {
    value: "chill",
    label: "Chill",
  },
  {
    value: "play-for-fun",
    label: "Play for Fun",
  },
  {
    value: "serious",
    label: "Serious",
  },
  {
    value: "pma",
    label: "Positive Mental Attitude (PMA)",
  },
  {
    value: "competitive",
    label: "Competitive",
  },
  {
    value: "casual",
    label: "Casual",
  },
  {
    value: "team-player",
    label: "Team Player",
  },
  {
    value: "solo",
    label: "Solo",
  },
  {
    value: "newbie-friendly",
    label: "Newbie Friendly",
  },
];

const accessibility_tools = [
  {
    value: "discord",
    label: "Discord",
    Icon: FaDiscord,
    defaultChecked: true,
    backgroundColor: "#7289da",
    foregroundColor: "",
    iconColor: "#7289da",
  },
  {
    value: "microphone",
    label: "Microphone only",
    Icon: Speaker,
    backgroundColor: "",
    foregroundColor: "",
  },
  {
    value: "headphone",
    label: "Headphone only",
    Icon: Headphones,
    backgroundColor: "",
    foregroundColor: "",
  },
  {
    value: "headset",
    label: "Headset",
    Icon: Headset,
    backgroundColor: "",
    foregroundColor: "",
  },
];

export default function MainLayout() {
  const [activeTab, setActiveTab] = useState<string | null>("lfp-feed");
  const id = useId();

  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto">
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-full">
              <div className="flex justify-center h-20 border-b">
                <SegmentedControl setActiveTab={setActiveTab} />
              </div>
              <div className="flex gap-3 justify-center pt-2 px-6">
                <ScrollArea className="h-[calc(100vh-5.5rem)] relative pr-4">
                  {activeTab === "lfp-feed" && (
                    <div className="flex gap-4">
                      <div className="flex flex-col">
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                        <div className="mb-2">
                          <LfpCard />
                        </div>
                      </div>
                    </div>
                  )}
                </ScrollArea>
                <Card className="w-[350px] h-min ">
                  <CardHeader>
                    <CardTitle className="text-lg">
                      Find the right party
                    </CardTitle>
                    <CardDescription className="text-xs">
                      Use these filters to find the most suited party for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <form>
                      <div className="grid w-full items-center gap-4">
                        <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
                          <Switch
                            id={id}
                            className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                            aria-describedby={`${id}-description`}
                          />
                          <div className="grid grow gap-2">
                            <Label htmlFor={id}>
                              DUO ONLY{" "}
                              {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                                (aaaa)
                              </span> */}
                            </Label>
                            <p
                              id={`${id}-description`}
                              className="text-xs text-muted-foreground"
                            >
                              If you play duo only, select this option.
                            </p>
                          </div>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="title">Title</Label>
                          <Input id="title" placeholder="Search for title" />
                        </div>

                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="tag">Tags</Label>
                          <MultipleSelector
                            commandProps={{
                              label: "Select your likings",
                            }}
                            value={player_tags.slice(0, 2)}
                            defaultOptions={player_tags}
                            placeholder="Select your likings"
                            hideClearAllButton
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No results found
                              </p>
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="framework">Rank</Label>
                          <Select defaultValue="1">
                            <SelectTrigger
                              id="framework"
                              className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0"
                            >
                              <SelectValue placeholder="Select framework" />
                            </SelectTrigger>
                            <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                              <SelectGroup>
                                {/* <SelectLabel className="ps-2">
                                  Ranks
                                </SelectLabel> */}
                                <SelectItem value="1">
                                  <Square className="bg-indigo-400/20 text-indigo-500">
                                    IM
                                  </Square>
                                  <span className="truncate">Immortal</span>
                                </SelectItem>
                                <SelectItem value="2">
                                  <Square className="bg-purple-400/20 text-purple-500">
                                    DIA
                                  </Square>
                                  <span className="truncate">Diamond</span>
                                </SelectItem>
                                <SelectItem value="3">
                                  <Square className="bg-rose-400/20 text-rose-500">
                                    AS
                                  </Square>
                                  <span className="truncate">Ascendant</span>
                                </SelectItem>
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <Label htmlFor="server">Servers</Label>
                          <MultipleSelector
                            commandProps={{
                              label: "Select your servers",
                            }}
                            value={frameworks.slice(0, 2)}
                            defaultOptions={frameworks}
                            placeholder="Select your servers"
                            hideClearAllButton
                            hidePlaceholderWhenSelected
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No results found
                              </p>
                            }
                          />
                        </div>
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="accessibility">
                              Accessibility Options
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Choose players with specific accessibility tools
                            </p>
                          </div>
                          <div className="grid grid-cols-2 gap-3">
                            {accessibility_tools.map((item) => (
                              <label
                                key={`${id}-${item.value}`}
                                htmlFor={`${id}-${item.value}`}
                              >
                                <div
                                  className="relative flex cursor-pointer flex-col gap-4 select-none rounded-lg border border-input p-4 shadow-sm shadow-black/5
                                   has-[[data-state=checked]]:bg-secondary"
                                  style={{
                                    borderColor: item.backgroundColor,
                                  }}
                                >
                                  <div className="flex justify-between gap-2">
                                    <Checkbox
                                      id={`${id}-${item.value}`}
                                      value={item.value}
                                      className="sr-only after:absolute after:inset-0"
                                      defaultChecked={item.defaultChecked}
                                    />
                                    <item.Icon
                                      className=""
                                      style={{
                                        color: item.iconColor,
                                      }}
                                      size={16}
                                      strokeWidth={2}
                                      aria-hidden="true"
                                    />
                                  </div>
                                  <p className="text-xs">{item.label}</p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </form>
                  </CardContent>
                  {/* <CardFooter className="flex justify-between">
                    <Button>Save for the next sessions</Button>
                  </CardFooter> */}
                </Card>
              </div>
            </div>
            {/* <Tabs defaultValue="lfp-feed" className="w-full">
              <ScrollArea className="pt-6">
                <div className="flex justify-center h-14 border-b">
                  <TabsList className="w-full mx-auto">
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

              <ScrollArea className="h-[calc(100vh-5rem)] pl-6">
                <TabsContent value="lfp-feed" className="pb-6">
                  <div className="flex flex-col gap-3.5">
                    <LfpCard />
                    <LfpCard />
                    <LfpCard />
                    <LfpCard />
                    <LfpCard /> 
                  </div>
                </TabsContent>
                <TabsContent value="community-feed" className="pb-6">
                  <p className="p-4 pt-1 text-center text-xs text-muted-foreground">
                    Content for Tab 3
                  </p>
                </TabsContent>
              </ScrollArea>
            </Tabs> */}
          </div>
        </div>
      </main>
    </div>
  );
}
