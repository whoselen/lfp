import { MessageCircle, MessageSquare } from "lucide-react";
import React, { useState } from "react";
import UserModeChip from "./user-mode-chip";
import UserAccessibility from "./user-accessibility";
import Slot from "./slot";
import JoinButton from "./join-button";
import UserRank from "./user-rank";
import { UserAvatar } from "./user-avatar";
import { Separator } from "../ui/separator";
import { MessageButton } from "./message-button";

const LfpCard = () => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const users = {
    avatar_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNk32E4jgtolJEPLa9gqCp9L6ntJ43pe6Ht_frx4VvsoXvVuSbELspHvRMgKJn_cTVS-c&usqp=CAU",
    username: "placeholder_user",
    nickname: "Placeholder User",
    user_player_tags: [
      {
        player_tags: {
          title: "Tag1",
          background_hex_code: "#FF5733",
          text_hex_code: "#FFFFFF",
        },
      },
      {
        player_tags: {
          title: "Tag2",
          background_hex_code: "#33FF57",
          text_hex_code: "#000000",
        },
      },
    ],
    user_tools: [
      {
        tools: {
          name: "pc",
        },
      },
      {
        tools: {
          name: "headset",
        },
      },
    ],
  };

  const ranks = {
    is_level_based: false,
    level_prefix: "AR",
    name: "Diamond II",
    iconUrl: "https://cdn3.emoji.gg/emojis/3939-valorant-diamond-2.png",
  };

  const is_upcoming = true;
  const schedule = "2023-10-10T10:00:00Z";
  const id = "placeholder_id";
  const title = "Placeholder Title";
  const description = "This is a placeholder description for the activity.";
  const games = {
    img_url:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRuSCkAXO7mf6aIPo3R41z6W-oMlT4qxEgD_Q&s",
  };
  const max_allowed_size = 5;
  const room_participants = [
    {
      users: {
        avatar_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNk32E4jgtolJEPLa9gqCp9L6ntJ43pe6Ht_frx4VvsoXvVuSbELspHvRMgKJn_cTVS-c&usqp=CAU",
        username: "participant1",
      },
    },
    {
      users: {
        avatar_url:
          "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQNk32E4jgtolJEPLa9gqCp9L6ntJ43pe6Ht_frx4VvsoXvVuSbELspHvRMgKJn_cTVS-c&usqp=CAU",
        username: "participant2",
      },
    },
  ];

  const availableSlotLength = max_allowed_size - room_participants.length;

  return (
    <article className="inline-block rounded-lg  border-border bg-background p-4 shadow-lg shadow-black/5 border  text-black max-w-[560px]">
      <div className="flex h-full w-full flex-row justify-between ">
        <div className=" flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-4">
            <UserAvatar
              profilePictureSrc={users.avatar_url}
              username={users.username}
              isOnline={true}
            />
            <UserRank {...ranks} />
          </div>
          <MessageButton />
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
                    <a href="/" title={users.username}>
                      <span className="xs:text-base block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
                        {users.nickname}
                      </span>
                    </a>
                    <div className="flex items-start justify-start gap-1">
                      <span className=" pt-[2px] text-[8px] italic">LFP</span>
                      <span className="inline-block">
                        <img
                          draggable="false"
                          src={games.img_url}
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
              <div className="mt-2 flex w-full justify-between">
                <div className="flex flex-row gap-1">
                  {users?.user_player_tags.map((tag) => (
                    <UserModeChip
                      key={tag.player_tags.title}
                      title={tag?.player_tags?.title}
                      backgroundColor={tag?.player_tags?.background_hex_code}
                      textColor={tag?.player_tags?.text_hex_code}
                    />
                  ))}
                </div>

                <div className="flex w-max flex-wrap gap-[5px]">
                  {users?.user_tools.map((tool) => (
                    <UserAccessibility
                      key={tool.tools.name}
                      name={tool?.tools?.name}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
          <Separator className="mt-2" />
          <div className=" ml-[5px] mt-4 flex h-full flex-col justify-between gap-1 text-ellipsis">
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
              <JoinButton roomId={id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LfpCard;
