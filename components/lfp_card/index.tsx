import { getUserById, getUsersByIds } from "@/queries/users";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import { useFileUrl } from "@supabase-cache-helpers/storage-react-query";
import React, { useEffect, useState } from "react";
import { Separator } from "../ui/separator";
import ActiveRoomParticipants from "./active-room-participants";
import JoinButton from "./join-button";
import { MessageButton } from "./message-button";
import Slot from "./slot";
import UserAccessibilityTools from "./user-accessibility-tools";
import { UserAvatar } from "./user-avatar";
import UserCustomTags from "./user-custom-tags";
import UserRank from "./user-rank";
import { useUser } from "../context/user-context";
import { useSearchParams } from "next/navigation";
import { RealtimeChannel } from "@supabase/supabase-js";

export interface LfpCardProps {
  max_allowed_size: number;
  room_participants: Array<{
    users: {
      username: string;
      avatar_url: string;
    };
  }>;
  game: {
    img_url: string;
    name: string;
  };
  rank_id: number;
  title: string;
  description: string;
  id: number;
  createdUserId: string;
  customTagsIds: number[];
  accessibilityToolsIds: number[];
}

const LfpCard: React.FC<LfpCardProps> = ({
  max_allowed_size,
  room_participants,
  game,
  rank_id,
  title,
  description,
  id,
  createdUserId,
  customTagsIds,
  accessibilityToolsIds,
}) => {
  const searchParams = useSearchParams();
  const roomId = searchParams.get("roomId");
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const is_upcoming = true;
  const schedule = "2023-10-10T10:00:00Z";

  const supabase = useSupabaseBrowser();

  const { data: gameIconUrl } = useFileUrl(
    supabase.storage.from("games"),
    `${game.name}/icon.png`,
    "public",
    {
      refetchOnWindowFocus: false,
    }
  );

  const { data: user, isLoading } = useQuery(
    getUserById(supabase, createdUserId),
    { refetchOnWindowFocus: false }
  );

  // const [roomParticipants, setRoomParticipants] = useState<{ user_id: any }[]>(
  //   []
  // );

  // useEffect(() => {
  //   const channel = supabase.channel(`game_room_${id}`);

  //   channel
  //     .on("presence", { event: "sync" }, () => {
  //       const userIds = [];

  //       for (const id in channel.presenceState()) {
  //         // @ts-ignore
  //         console.info(roomId, channel.presenceState()[id][0].user_id);
  //         // @ts-ignore
  //         userIds.push({ user_id: channel.presenceState()[id][0].user_id });
  //       }

  //       setRoomParticipants([...userIds]);
  //       refetchRoomParticipants();
  //     })
  //     .subscribe((status) => {
  //       if (status === "CLOSED") {
  //         console.log("closed from room:", id);
  //       }
  //     });

  //   // Cleanup function
  //   return () => {
  //     channel.unsubscribe();
  //   };
  // }, [searchParams]);

  const [roomParticipants, setRoomParticipants] = useState<
    { user_id: string; avatar_url?: string }[]
  >([]);

  // const { data: usersData, refetch: refetchRoomParticipants } = useQuery(
  //   getUsersByIds(
  //     supabase,
  //     roomParticipants.map((user) => user.user_id)
  //   ),
  //   { refetchOnWindowFocus: false }
  // );

  // useEffect(() => {
  //   const fetchUsers = async () => {
  //     const { data, error } = await supabase
  //       .from("profiles")
  //       .select("id, username, avatar_url")
  //       .in(
  //         "id",
  //         roomParticipants.map((user) => user.user_id)
  //       );

  //     if (data) {
  //       setRoomParticipants(
  //         data.map((d) => ({
  //           user_id: d.id,
  //           avatar_url: d.avatar_url ?? undefined,
  //         }))
  //       );
  //     } else if (error) {
  //       console.error(error);
  //     }
  //   };

  //   fetchUsers();
  // }, []);

  useEffect(() => {
    // Subscribing to real-time events on room users table

    const roomSubscription = supabase
      .channel("room-users-channel")
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: "room_users",
          filter: `room_id=eq.${Number(roomId || "0")}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT") {
            setRoomParticipants((prev) => [
              ...prev,
              {
                user_id: payload.new.user_id,
                avatar_url: payload.new.avatar_url,
              },
            ]);
          }
          if (payload.eventType === "DELETE") {
            setRoomParticipants((prev) =>
              prev.filter((user) => user.user_id !== payload.old.user_id)
            );
          }
        }
      )
      .subscribe();

    // Cleanup subscription on unmount
    return () => {
      roomSubscription.unsubscribe();
    };
  }, [supabase, roomId]);

  console.log({ roomParticipants, roomId });

  const availableSlotLength = max_allowed_size - roomParticipants?.length || 0;

  return (
    <article className="inline-block rounded-lg  border-border bg-background p-4 shadow-lg shadow-black/5 border text-black min-w-[560px]">
      <div className="flex h-full w-full flex-row justify-between ">
        <div className="flex flex-col items-center justify-between relative pr-2">
          <div className="flex flex-col items-center gap-4 w-16">
            <UserAvatar
              profilePictureSrc={user?.avatar_url ?? ""}
              username={user?.username ?? ""}
              isOnline={true}
            />
            <UserRank rankId={rank_id} />
          </div>
          <div className="absolute bottom-0 left-4">
            <MessageButton />
          </div>
          {/* <button className="w-min rounded-full bg-primary p-2 focus:outline-none focus:ring-2 focus:ring-gray-500 active:bg-[#0F0F0F]">
            <MessageSquare className="h-3 w-3 text-white " />
          </button> */}
        </div>
        <div className="ml-1 flex w-full max-w-full flex-col justify-between pl-2 sm:ml-2 sm:pl-[10px]">
          <div className="flex flex-row">
            <div className="flex w-full flex-col pr-2">
              <div className="flex w-full items-start justify-between">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex w-full flex-col items-start gap-1 md:flex-row md:items-center">
                    <a href="/" title={user?.username ?? ""}>
                      <span className="xs:text-base block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold text-foreground">
                        {user?.username || ""}
                      </span>
                    </a>
                    <div className="flex items-start justify-start gap-1">
                      <span className=" pt-[2px] text-[8px] italic text-foreground">
                        LFP
                      </span>
                      <span className="inline-block">
                        <img
                          draggable="false"
                          src={gameIconUrl ?? game.img_url}
                          alt="game-looking-for"
                          className="ml-[2px] max-h-3 select-none object-cover sm:max-h-4"
                        />
                      </span>
                    </div>
                  </div>
                </div>
                {/* <Timer {is_upcoming} {schedule} /> */}
                asd
              </div>
              <div className="mt-2 flex w-full justify-between items-center">
                <div className="flex flex-row gap-1">
                  <UserCustomTags ids={customTagsIds} />
                </div>
                <div className="flex w-max flex-wrap gap-[5px]">
                  <UserAccessibilityTools ids={accessibilityToolsIds} />
                </div>
              </div>
            </div>
          </div>
          <Separator className="mt-2" />
          <div className="text-foreground ml-[5px] mt-4 flex h-full flex-col justify-between gap-1 text-ellipsis">
            <div
              className="pr-[6px] {detailsExpanded
            ? ''
            : '[&>*]:line-clamp-2'} flex flex-col gap-2"
              //   on:click={() => (detailsExpanded = !detailsExpanded)}
            >
              <h5 className=" font-os text-xs font-bold uppercase">{title}</h5>
              <p className="font-os inline-block text-[11px] font-normal leading-[15px]">
                {description}
              </p>
            </div>
            <div className="mt-4 flex flex-row items-center justify-end gap-[5px]">
              <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5">
                <div className="flex -space-x-3">
                  <ActiveRoomParticipants usersData={roomParticipants} />
                  <Slot
                    availableSlotLength={availableSlotLength}
                    filled={false}
                  />
                </div>
              </div>
              <JoinButton
                roomId={String(id)}
                disabled={availableSlotLength === 0}
              />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LfpCard;
