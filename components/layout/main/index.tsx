"use client";

import { AuthForm } from "@/components/auth/auth-form";
import Chat from "@/components/room/chat";
import { RoomForm } from "@/components/room/room-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import MultipleSelector from "@/components/ui/multiselect";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { DateTimePicker } from "@/components/ui/time-picker";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import clsx from "clsx";
import { ChevronLeft } from "lucide-react";
import { useTheme } from "next-themes";
import { useSearchParams } from "next/navigation";
import { useId, useState } from "react";

import UserDropdown from "@/components/auth/user-dropdown";
import Square from "@/components/ui/square";
import Notification from "@/components/user/notification";
import {
  accessibility_tools,
  frameworks,
  player_tags,
} from "@/lib/placeholder_datas";
import { User } from "@supabase/supabase-js";
import { Sidebar } from "../sidebar";
import { SegmentedControl } from "./nav-bar";
import RecentRooms from "./recent-rooms";
import { useUser } from "@/components/context/user-context";

export default function MainLayout({ user }: { user?: User | null }) {
  const [activeTab, setActiveTab] = useState<string | null>("lfp-feed");
  const searchParams = useSearchParams();
  const activeRoomId = searchParams.get("roomId");

  const id = useId();
  const { resolvedTheme } = useTheme();

  return (
    <div className="flex h-screen overflow-hidden">
      {resolvedTheme === "dark" ? (
        <div className="absolute top-0 z-[-2] h-screen w-screen bg-neutral-950 bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      ) : (
        <div className="absolute top-0 z-[-10] h-screen w-screen bg-white bg-[radial-gradient(ellipse_80%_80%_at_50%_-20%,rgba(120,119,198,0.3),rgba(255,255,255,0))]" />
      )}

      <Sidebar />
      <main className="flex-1">
        <div className="mx-auto">
          <div className="flex justify-center w-full">
            <div className="flex flex-col w-full">
              <nav className="flex justify-between items-center px-20 h-20 border-b">
                <SegmentedControl
                  activeTab={activeTab}
                  setActiveTab={setActiveTab}
                />
                {user ? (
                  <div className="flex gap-3">
                    <UserDropdown />
                    <Notification />
                  </div>
                ) : (
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Log In</Button>
                    </DialogTrigger>
                    <DialogContent
                      className="w-full max-w-sm md:max-w-3xl p-0 rounded-lg border-none"
                      hideCloseButton
                    >
                      <AuthForm />
                      <VisuallyHidden>
                        <DialogTitle>Login form</DialogTitle>
                      </VisuallyHidden>
                    </DialogContent>
                  </Dialog>
                )}
              </nav>
              {activeTab === "lfp-feed" && (
                <div className="flex gap-3 justify-center mt-2 pr-6">
                  <div
                    className={clsx(
                      "flex flex-col gap-2",
                      activeRoomId ? "w-[600px]" : "w-[640px]"
                    )}
                  >
                    <RoomForm />
                    {/* <Separator className="mb-0 pb-0" /> */}
                    {/* <ScrollArea
                      className="h-[calc(100vh-10.5rem)] relative"
                      style={{
                        backdropFilter: "blur(20px)",
                      }}
                    > */}
                    <RecentRooms />
                    {/* </ScrollArea> */}
                  </div>

                  {activeRoomId ? (
                    <div
                      className="pb-2 h-[calc(100vh-6rem)] max-h-[calc(100vh-6rem)] flex-grow"
                      // animate-slide-right-to-left
                    >
                      <Chat />
                    </div>
                  ) : (
                    <Card className="min-w-[350px] max-w-[350px] h-min">
                      <CardHeader>
                        <CardTitle className="text-lg">
                          Find the right party
                        </CardTitle>
                        <CardDescription className="text-xs">
                          Use these filters to find the most suited party for
                          you.
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
                              <Input
                                id="title"
                                placeholder="Search for title"
                              />
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
                                      <span className="truncate">
                                        Ascendant
                                      </span>
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
                              <Label htmlFor="server">Date & time</Label>
                              <DateTimePicker />
                            </div>
                            <div className="flex flex-col space-y-1.5">
                              <div className="flex flex-col gap-1.5">
                                <Label htmlFor="accessibility">
                                  Accessibility Options
                                </Label>
                                <p className="text-xs text-muted-foreground">
                                  Choose players with specific accessibility
                                  tools
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
                  )}
                </div>
              )}
              {activeTab === "community-feed" && (
                <div className="flex flex-col items-center justify-center min-h-screen p-4">
                  <h1 className="text-2xl sm:text-2xl md:text-7xl font-extrabold text-center">
                    <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-transparent bg-clip-text animate-gradient-x">
                      Coming Soon
                    </span>
                  </h1>
                  <p className="mt-4 text-xl sm:text-2xl text-gray-300 text-center max-w-md">
                    Stay tuned
                  </p>
                  <Button
                    variant="link"
                    onClick={() => setActiveTab("lfp-feed")}
                  >
                    <ChevronLeft
                      className="me-1 opacity-60"
                      size={16}
                      strokeWidth={2}
                      aria-hidden="true"
                    />
                    Go back
                  </Button>
                </div>
              )}
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
