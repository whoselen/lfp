import React, { useState } from "react";
import { Separator } from "../ui/separator";
import JoinButton from "./join-button";
import { MessageButton } from "./message-button";
import Slot from "./slot";
import UserAccessibility from "./user-accessibility";
import { UserAvatar } from "./user-avatar";
import UserModeChip from "./user-mode-chip";
import UserRank from "./user-rank";
import { AccessibilityToolKey } from "@/lib/constants";
import { useQuery } from "@supabase-cache-helpers/postgrest-react-query";
import useSupabaseBrowser from "@/utils/supabase/client";
import { getUserById } from "@/queries/users";
import UserCustomTags from "./user-custom-tags";
import UserAccessibilityTools from "./user-accessibility-tools";

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
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const is_upcoming = true;
  const schedule = "2023-10-10T10:00:00Z";

  const availableSlotLength = max_allowed_size - room_participants.length;

  const supabase = useSupabaseBrowser();

  const { data: user, isLoading } = useQuery(
    getUserById(supabase, createdUserId)
  );

  console.log(user?.avatar_url);

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
                          src={game.img_url}
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
            <a
              href={"javascript:void(0);"}
              role="button"
              className="pr-[6px] {detailsExpanded
            ? ''
            : '[&>*]:line-clamp-2'} flex flex-col gap-2"
              //   on:click={() => (detailsExpanded = !detailsExpanded)}
            >
              <h5 className=" font-os text-xs font-bold uppercase">{title}</h5>
              <p className="font-os inline-block text-[11px] font-normal leading-[15px]">
                {description}
              </p>
            </a>
            <div className="mt-4 flex flex-row items-center justify-end gap-[5px]">
              <div className="flex items-center rounded-full border border-border bg-background p-1 shadow shadow-black/5">
                <div className="flex -space-x-3">
                  {room_participants.map((participant) => (
                    <Slot
                      key={participant.users.username}
                      filled
                      src={participant?.users?.avatar_url}
                      username={participant.users.username}
                    />
                  ))}
                  <Slot
                    availableSlotLength={availableSlotLength}
                    filled={false}
                  />
                </div>
              </div>
              <JoinButton roomId={String(id)} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LfpCard;
