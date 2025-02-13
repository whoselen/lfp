import { MessageCircle } from "lucide-react";
import React, { useState } from "react";
import UserModeChip from "./user-mode-chip";
import UserAccessibility from "./user-accessibility";
import Slot from "./slot";
import JoinButton from "./join-button";
import UserRank from "./user-rank";

const LfpCard = () => {
  const [detailsExpanded, setDetailsExpanded] = useState(false);

  const users = {
    avatar_url: "https://via.placeholder.com/150",
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
          name: "Tool1",
        },
      },
      {
        tools: {
          name: "Tool2",
        },
      },
    ],
  };

  const ranks = {
    is_level_based: true,
    level_prefix: "AR",
    name: "20",
  };

  const is_upcoming = true;
  const schedule = "2023-10-10T10:00:00Z";
  const id = "placeholder_id";
  const title = "Placeholder Title";
  const description = "This is a placeholder description for the activity.";
  const games = {
    img_url: "https://via.placeholder.com/50",
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
      <div className="flex h-full w-full flex-row justify-between px-2 pb-2 pt-2.5 sm:px-3 sm:pb-2 sm:pt-3">
        <div className=" flex flex-col items-center justify-between">
          <div className="flex flex-col items-center gap-3">
            <a
              href="/"
              className="h-10 w-10 rounded-full sm:h-[2.6875rem] sm:w-[2.6875rem]"
            >
              <img
                src={users.avatar_url}
                alt="pfp"
                className="h-full w-full select-none rounded-full border-1 border-stone-400 object-cover"
                draggable="false"
              />
            </a>
            <UserRank {...ranks} />
          </div>
          <button className="w-min rounded-full bg-[#222121] p-2 hover:bg-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-gray-500 active:bg-[#0F0F0F]">
            <MessageCircle className="h-3 w-3 text-white " />
          </button>
        </div>
        <div className="ml-1 flex w-full max-w-full flex-col justify-between pl-2 sm:ml-2 sm:pl-[10px]">
          <div className="flex flex-row">
            <div className="flex w-full flex-col">
              <div className="flex w-full items-start justify-between">
                <div className="flex w-full flex-col gap-2">
                  <div className="flex w-full flex-col items-start gap-1 text-white md:flex-row md:items-center">
                    <a href="/" title={users.username}>
                      <span className="font-op xs:text-base block overflow-hidden text-ellipsis whitespace-nowrap text-sm font-semibold">
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
              <hr className="-ml-1 mt-2 w-full border-0 border-t-[0.5px] border-[#9D9D9D] border-opacity-40" />
            </div>
          </div>
          <div className=" ml-[5px] mt-4 flex h-full flex-col justify-between gap-1 text-ellipsis">
            <a
              href={"javascript:void(0);"}
              role="button"
              className="pr-[6px] {detailsExpanded
            ? ''
            : '[&>*]:line-clamp-2'} flex flex-col gap-2"
              //   on:click={() => (detailsExpanded = !detailsExpanded)}
            >
              <h5 className=" font-os text-xs font-bold uppercase text-white">
                {title}
              </h5>
              <p className="font-os inline-block text-[11px] font-normal leading-[15px] text-white">
                {description}
              </p>
            </a>

            <div className="mt-4 flex flex-row items-center justify-end gap-[5px]">
              {room_participants.map((participant) => (
                <Slot
                  key={participant.users.username}
                  filled
                  src={participant?.users?.avatar_url}
                  username={participant.users.username}
                />
              ))}
              {availableSlotLength > 0 &&
                new Array(availableSlotLength).map((i) => (
                  <Slot key={i} filled={false} />
                ))}

              <JoinButton roomId={id} />
            </div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default LfpCard;
