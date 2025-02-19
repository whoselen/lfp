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
import { Switch } from "@/components/ui/switch";
import { useCharacterLimit } from "@/hooks/use-character-limit";
import { AccessibilityToolKey } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { getUserTags } from "@/queries/common";
import {
  getAccessibilityTools,
  getGames,
  getGameServers,
  getRanksByGameId,
} from "@/queries/games";
import useSupabaseBrowser from "@/utils/supabase/client";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  useInsertMutation,
  useQuery,
  useUpsertMutation,
} from "@supabase-cache-helpers/postgrest-react-query";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import DropdownSelect from "../common/dropdown-select";
import AccessibilityIcons from "../lfp_card/accessibility-icons";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import NumberInput from "../ui/number-input";
import { Textarea } from "../ui/textarea";
import { useUser } from "../context/user-context";
import { toast } from "sonner";
import clsx from "clsx";
import { CheckedState } from "@radix-ui/react-checkbox";

type RoomFormProps = {};

const roomCreateFormSchema = z.object({
  game_id: z.string().min(1, { message: "Select a game too!" }),
  rank_id: z.string(),
  description: z
    .string()
    .min(1, { message: "Description is required" })
    .max(150),
  title: z.string().min(1, { message: "cmon, give your room a title" }),
  max_participants: z.number(),
  tags: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  servers: z.array(
    z.object({
      value: z.string(),
      label: z.string(),
    })
  ),
  accessibility_tools: z.array(z.number()),
});

type RoomCreateFormValues = z.infer<typeof roomCreateFormSchema>;

export const RoomForm: React.FC<RoomFormProps> = ({}) => {
  const user = useUser();
  const maxLength = 150;
  const [duoOnly, setDuoOnly] = useState(false);
  const [isFormOpen, setIsFormOpen] = useState(false);
  const {
    value,
    characterCount,
    handleChange,
    maxLength: limit,
  } = useCharacterLimit({ maxLength });

  const defaultValues: Partial<RoomCreateFormValues> = {
    game_id: "",
    rank_id: "",
    description: "",
    title: "",
    max_participants: 0,
    tags: [],
    servers: [],
    accessibility_tools: [],
  };

  const form = useForm<RoomCreateFormValues>({
    resolver: zodResolver(roomCreateFormSchema),
    defaultValues,
    mode: "onChange",
  });

  const selectedGameValue = form.watch("game_id");
  const toolsValue = form.watch("accessibility_tools");

  const supabase = useSupabaseBrowser();
  const { data: games = [], isLoading, isError } = useQuery(getGames(supabase));
  const {
    data: ranks = [],
    isLoading: ranksLoading,
    isError: ranksError,
  } = useQuery(getRanksByGameId(supabase, selectedGameValue), {
    refetchOnWindowFocus: false,
    // enabled: false,
  });

  const {
    data: tags = [],
    isLoading: tagsLoading,
    isError: tagsError,
  } = useQuery(getUserTags(supabase));

  const {
    data: servers = [],
    isLoading: serversLoading,
    isError: serversError,
  } = useQuery(getGameServers(supabase));

  const {
    data: accessibilityTools = [],
    isLoading: accessibilityToolsLoading,
    isError: accessibilityToolsError,
  } = useQuery(getAccessibilityTools(supabase));

  const { mutateAsync: insertRoom, data: insertedRoomData } = useInsertMutation(
    supabase.from("rooms"),
    ["id"],
    "id"
  );

  const { mutateAsync: insertTagsInfo } = useUpsertMutation(
    supabase.from("room_tags"),
    ["room_id", "tag_id"],
    null,
    {
      onError() {
        toast.error("Error creating room");
      },
    }
  );

  const { mutateAsync: insertAccessibilityToolsInfo } = useUpsertMutation(
    supabase.from("room_accessibility_tools"),
    ["room_id", "tool_id"],
    null,
    {
      onError() {
        toast.error("Error creating room");
      },
    }
  );

  const { mutateAsync: insertServersInfo } = useUpsertMutation(
    supabase.from("room_game_servers"),
    ["room_id", "server_id"],
    null,
    {
      onError() {
        toast.error("Error creating room");
      },
    }
  );

  useEffect(() => {
    form.resetField("rank_id");
  }, [selectedGameValue]);

  useEffect(() => {
    if (duoOnly) {
      form.setValue("max_participants", 1);
    }
  }, [duoOnly]);

  const microphoneToolId = accessibilityTools?.find(
    (tool) => tool.name.toLowerCase() === "mic only"
  )?.id;

  const headphoneToolId = accessibilityTools?.find(
    (tool) => tool.name.toLowerCase() === "headphone only"
  )?.id;

  const headsetToolId = accessibilityTools?.find(
    (tool) => tool.name.toLowerCase() === "headset"
  )?.id;

  const onSubmit = async (values: RoomCreateFormValues) => {
    const {
      title,
      description,
      game_id,
      rank_id,
      max_participants,
      accessibility_tools,
      servers,
      tags,
    } = values;

    if (!user?.id) {
      return;
    }

    insertRoom([
      {
        title,
        description,
        user_id: user.id,
        game_id,
        rank_id: Number(rank_id),
        max_participants,
      },
    ])
      .then(async (data) => {
        const roomId = data?.[0].id;

        // Insert into room_accessibility_tools
        const uniqueTools = [...new Set(accessibility_tools)];

        const accessibilityToolsInserts = uniqueTools.map((tool_id) => ({
          room_id: roomId,
          tool_id,
        }));

        await insertAccessibilityToolsInfo(accessibilityToolsInserts);

        // Insert into room_game_servers
        const tagsInserts = tags.map(({ value }) => ({
          room_id: roomId,
          tag_id: Number(value),
        }));

        await insertTagsInfo(tagsInserts);

        // Insert into room_game_servers
        const gameServersInserts = servers.map(({ value }) => ({
          room_id: roomId,
          server_id: Number(value),
        }));

        await insertServersInfo(gameServersInserts);
      })
      .catch(() => {
        toast.error("Error creating room :(");
      });

    toast.success("Your room has been created!");
    form.reset();
    setDuoOnly(false);
    setIsFormOpen(false);
  };

  const handleAccessibilityChecks = (
    checked: CheckedState,
    tool: {
      id: number;
      name: string;
    }
  ) => {
    // Retrieve the current accessibility tools from toolsValue (use toolsValue instead of form.getValues)
    const updatedTools = [...toolsValue];
    const isMicSelected = updatedTools.includes(microphoneToolId!);
    const isHeadphoneSelected = updatedTools.includes(headphoneToolId!);
    const isHeadsetSelected = updatedTools.includes(headsetToolId!);

    const getNewTools = () => {
      // If both mic and headphone are selected, select headset and remove mic and headphone
      if (
        (tool.id === microphoneToolId && isHeadphoneSelected) ||
        (tool.id === headphoneToolId && isMicSelected)
      ) {
        return [headsetToolId];
      }

      // If adding mic or headphone, remove headset if selected
      if (
        (tool.id === microphoneToolId || tool.id === headphoneToolId) &&
        isHeadsetSelected
      ) {
        return updatedTools
          .filter((id) => id !== headsetToolId)
          .concat([tool.id]);
      }

      // If adding headset, remove mic and headphone if they exist
      if (tool.id === headsetToolId) {
        return updatedTools
          .filter((id) => id !== microphoneToolId && id !== headphoneToolId)
          .concat([tool.id]);
      }

      // Default: add the new tool
      return updatedTools.concat([tool.id]);
    };

    if (checked) {
      const newTools = getNewTools();
      form.setValue(
        "accessibility_tools",
        newTools?.filter((tool) => tool !== undefined) ?? []
      );
    } else {
      // If unchecked, remove the selected tool from the array
      form.setValue(
        "accessibility_tools",
        updatedTools.filter((id) => id !== tool.id)
      );
    }
  };

  return (
    <Sheet open={isFormOpen} onOpenChange={setIsFormOpen}>
      <SheetTrigger asChild>
        <CreateRoom />
      </SheetTrigger>
      <SheetContent className="flex flex-col px-0 py-4 gap-0 w-[400px] sm:w-[540px] sm:max-w-[calc(100%-2rem)] ">
        <Form {...form}>
          <SheetHeader className="border-b pb-4 px-4">
            <SheetTitle>LFP room creation</SheetTitle>
            <SheetDescription>
              Make a room and find your teammates, click create room to post
            </SheetDescription>
          </SheetHeader>
          <div className="grid gap-4 py-4 px-6 overflow-y-auto">
            <form id="create-room" onSubmit={form.handleSubmit(onSubmit)}>
              <div className="grid w-full items-center gap-4">
                <div className="relative flex w-full items-start gap-2 rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:border-ring">
                  <Switch
                    id="duo_only"
                    className="order-1 h-4 w-6 after:absolute after:inset-0 [&_span]:size-3 [&_span]:data-[state=checked]:translate-x-2 rtl:[&_span]:data-[state=checked]:-translate-x-2"
                    aria-describedby="duo_only-description"
                    checked={duoOnly}
                    onCheckedChange={setDuoOnly}
                  />
                  <div className="grid grow gap-2">
                    <Label htmlFor="duo_only">DUO ONLY</Label>
                    <p
                      id="duo_only-description"
                      className="text-xs text-muted-foreground"
                    >
                      If you wanna play duo only, select this option.
                    </p>
                  </div>
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Room title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field: { onChange, ...otherProps } }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <Textarea
                            maxLength={maxLength}
                            onChange={(e) => {
                              handleChange(e);
                              onChange(e);
                            }}
                            placeholder="What are you looking for?"
                            {...otherProps}
                          />
                          <p
                            id="description"
                            className="mt-2 text-right text-xs text-muted-foreground"
                            role="status"
                            aria-live="polite"
                          >
                            <span className="tabular-nums">
                              {limit - characterCount}
                            </span>{" "}
                            characters left
                          </p>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="game_id"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Game</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <DropdownSelect
                            options={games || []}
                            value={value}
                            onChange={onChange}
                            placeholder="Select game"
                            name="game"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="rank_id"
                  render={({ field: { value, onChange } }) => (
                    <FormItem>
                      <FormLabel>Rank</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <DropdownSelect
                            options={ranks || []}
                            value={value}
                            onChange={onChange}
                            placeholder="Select your rank"
                            name="rank"
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {!duoOnly && (
                  <FormField
                    control={form.control}
                    name="max_participants"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <div className="flex flex-col space-y-1.5">
                            <NumberInput
                              minValue={2}
                              maxValue={10}
                              label={
                                <Label htmlFor="max_participants">
                                  Number of gals you need
                                </Label>
                              }
                              isDisabled={duoOnly}
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                )}

                <FormField
                  control={form.control}
                  name="tags"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Custom tags</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <MultipleSelector
                            options={tags?.map((tag) => ({
                              value: tag.id.toString(),
                              label: tag.name,
                            }))}
                            commandProps={{
                              label: "Select your likings",
                            }}
                            value={field.value}
                            placeholder="Select your likings"
                            hidePlaceholderWhenSelected
                            inputProps={{ ...field }}
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No tag found
                              </p>
                            }
                            onChange={(selectedTags) =>
                              field.onChange(selectedTags)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="servers"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Servers</FormLabel>
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <MultipleSelector
                            options={servers?.map((server) => ({
                              value: server.id.toString(),
                              label: server.name,
                            }))}
                            commandProps={{
                              label: "Select what server do you play",
                            }}
                            value={field.value}
                            placeholder="Select what server do you play"
                            hidePlaceholderWhenSelected
                            inputProps={{ ...field }}
                            emptyIndicator={
                              <p className="text-center text-sm">
                                No server found
                              </p>
                            }
                            onChange={(selectedTags) =>
                              field.onChange(selectedTags)
                            }
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="server">Date & time</Label>
                  <DateTimePicker />
                </div> */}

                <FormField
                  control={form.control}
                  name="accessibility_tools"
                  render={() => (
                    <FormItem>
                      {/* <FormLabel>Servers</FormLabel> */}
                      <FormControl>
                        <div className="flex flex-col space-y-1.5">
                          <div className="flex flex-col gap-1.5">
                            <Label htmlFor="accessibility">
                              Accessibility Options
                            </Label>
                            <p className="text-xs text-muted-foreground">
                              Choose what you have and willing to use
                            </p>
                          </div>
                          <div className="grid grid-cols-3 gap-3">
                            {accessibilityTools?.map((tool) => (
                              <label key={`${tool.id}`} htmlFor={`${tool.id}`}>
                                <div
                                  className={cn(
                                    "col-span-1 relative flex cursor-pointer flex-col gap-4 select-none rounded-lg border border-input p-4 shadow-sm shadow-black/5 has-[[data-state=checked]]:bg-secondary",
                                    tool.name.toLowerCase() === "discord"
                                      ? "has-[[data-state=checked]]:border-[#7289da]"
                                      : "has-[[data-state=checked]]:border-primary"
                                  )}
                                >
                                  <div className="flex justify-between gap-2">
                                    <Checkbox
                                      id={`${tool.id}`}
                                      value={tool.id}
                                      checked={toolsValue.includes(tool.id)}
                                      className="sr-only after:absolute after:inset-0"
                                      onCheckedChange={(checked) =>
                                        handleAccessibilityChecks(checked, tool)
                                      }
                                    />
                                    <AccessibilityIcons
                                      name={
                                        tool.name
                                          .toLowerCase()
                                          .replace(
                                            /\s+/g,
                                            "-"
                                          ) as AccessibilityToolKey
                                      }
                                      className={clsx(
                                        "size-5",
                                        tool.name.toLowerCase() === "discord" &&
                                          "text-[#7289da]"
                                      )}
                                    />
                                  </div>
                                  <p className="text-xs">
                                    {tool.name[0].toUpperCase() +
                                      tool.name.slice(1)}
                                  </p>
                                </div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </form>
          </div>
          <SheetFooter className="pt-4 px-4 border-t">
            <Button type="submit" form="create-room" className="flex-grow">
              Create a room
            </Button>
          </SheetFooter>
        </Form>
      </SheetContent>
    </Sheet>
  );
};
