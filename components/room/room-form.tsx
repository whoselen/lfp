import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet";
import { CreateRoom } from "./create-room";

import { Checkbox } from "@/components/ui/checkbox";
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
import { useCharacterLimit } from "@/hooks/use-character-limit";
import {
  accessibility_tools,
  frameworks,
  games,
  player_tags,
} from "@/lib/placeholder_datas";
import { Check, ChevronDown } from "lucide-react";
import { Fragment, useState } from "react";
import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from "../ui/command";
import NumberInput from "../ui/number-input";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import Square from "../ui/square";
import { Textarea } from "../ui/textarea";

type RoomFormProps = {};

export const RoomForm: React.FC<RoomFormProps> = ({}) => {
  const [open, setOpen] = useState<boolean>(false);
  const [gameSearchValue, setGameSearchValue] = useState<string>("");

  const maxLength = 180;
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  return (
    <Sheet>
      <SheetTrigger asChild>
        <CreateRoom />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 py-4 gap-0 w-[400px] sm:w-[540px] sm:max-w-[calc(100%-2rem)] ">
        <SheetHeader className="border-b pb-4 px-4">
          <SheetTitle>LFP room creation</SheetTitle>
          <SheetDescription>
            Make a room and find your teammates, click create room to post
          </SheetDescription>
        </SheetHeader>
        <div className="grid gap-4 py-4 px-6 overflow-y-auto">
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
                <Switch
                  id="duo_only"
                  className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                  aria-describedby={`duo_only-description`}
                />
                <div className="grid grow gap-2">
                  <Label htmlFor="duo_only">
                    DUO ONLY{" "}
                    {/* <span className="text-xs font-normal leading-[inherit] text-muted-foreground">
                              (aaaa)
                            </span> */}
                  </Label>
                  <p
                    id="duo_only-description"
                    className="text-xs text-muted-foreground"
                  >
                    If you play duo only, select this option.
                  </p>
                </div>
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="title">Title</Label>
                <Input id="title" placeholder="Room title" />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={value}
                  maxLength={maxLength}
                  onChange={handleChange}
                  aria-describedby="description"
                  placeholder="What are you looking for?"
                />
                <p
                  id="description"
                  className="mt-2 text-right text-xs text-muted-foreground"
                  role="status"
                  aria-live="polite"
                >
                  <span className="tabular-nums">{limit - characterCount}</span>{" "}
                  characters left
                </p>
              </div>

              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="game">Game</Label>
                {/* <Select defaultValue="1">
                  <SelectTrigger
                    id="game"
                    className="ps-2 [&>span]:flex [&>span]:items-center [&>span]:gap-2 [&>span_[data-square]]:shrink-0"
                  >
                    <SelectValue placeholder="Select game" />
                  </SelectTrigger>
                  <SelectContent className="[&_*[role=option]>span]:end-2 [&_*[role=option]>span]:start-auto [&_*[role=option]>span]:flex [&_*[role=option]>span]:items-center [&_*[role=option]>span]:gap-2 [&_*[role=option]]:pe-8 [&_*[role=option]]:ps-2">
                    <SelectGroup>
                      {games.map((game) => (
                        <SelectItem key={game.name} value={game.name}>
                          <Square className="bg-indigo-400/20 text-indigo-500">
                            <img src={game.avatarSrc} />
                          </Square>
                          <span className="truncate">{game.name}</span>
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select> */}
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      id="game"
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full justify-between bg-background px-3 font-normal outline-offset-0 hover:bg-background focus-visible:border-ring focus-visible:outline-[3px] focus-visible:outline-ring/20"
                    >
                      {gameSearchValue ? (
                        <span className="flex min-w-0 items-center gap-2">
                          <Square className="bg-indigo-400/20 text-indigo-500">
                            <img
                              src={
                                games.find(
                                  (game) => game.name === gameSearchValue
                                )?.avatarSrc
                              }
                            />
                          </Square>
                          {/* <span className="text-lg leading-none">
                            {gameSearchValue}
                          </span> */}
                          <span className="truncate">{gameSearchValue}</span>
                        </span>
                      ) : (
                        <span className="text-muted-foreground">
                          Select game
                        </span>
                      )}
                      <ChevronDown
                        size={16}
                        strokeWidth={2}
                        className="shrink-0 text-muted-foreground/80"
                        aria-hidden="true"
                      />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-full min-w-[var(--radix-popper-anchor-width)] border-input p-0"
                    align="start"
                  >
                    <Command>
                      <CommandInput placeholder="Search game..." />
                      <CommandList>
                        <CommandEmpty>No game found.</CommandEmpty>
                        {games.map((game) => (
                          <Fragment key={game.name}>
                            <CommandItem
                              value={game.name}
                              onSelect={(currentValue) => {
                                setGameSearchValue(currentValue);
                                setOpen(false);
                              }}
                            >
                              <Square className="bg-indigo-400/20 text-indigo-500">
                                <img src={game.avatarSrc} />
                              </Square>
                              {game.name}
                              {gameSearchValue === game.name && (
                                <Check
                                  size={16}
                                  strokeWidth={2}
                                  className="ml-auto"
                                />
                              )}
                            </CommandItem>
                          </Fragment>
                        ))}
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
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
                <NumberInput
                  label={
                    <Label htmlFor="participant_count">
                      Number of gals you need
                    </Label>
                  }
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
                    <p className="text-center text-sm">No results found</p>
                  }
                />
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
                    <p className="text-center text-sm">No results found</p>
                  }
                />
              </div>
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="server">Date & time</Label>
                <DateTimePicker />
              </div>
              <div className="flex flex-col space-y-1.5">
                <div className="flex flex-col gap-1.5">
                  <Label htmlFor="accessibility">Accessibility Options</Label>
                  <p className="text-xs text-muted-foreground">
                    Choose what you have and willing to use
                  </p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {accessibility_tools.map((item) => (
                    <label key={`${item.value}`} htmlFor={`${item.value}`}>
                      <div
                        className="relative flex cursor-pointer flex-col gap-4 select-none rounded-lg border border-input p-4 shadow-sm shadow-black/5
                                 has-[[data-state=checked]]:bg-secondary"
                        style={{
                          borderColor: item.backgroundColor,
                        }}
                      >
                        <div className="flex justify-between gap-2">
                          <Checkbox
                            id={`${item.value}`}
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
        </div>
        <SheetFooter className="pt-4 px-4 border-t">
          {/* <SheetClose asChild> */}
          <Button type="submit" className="flex-grow">
            Create a room
          </Button>
          {/* </SheetClose> */}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};
