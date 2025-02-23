import { Message } from "@/lib/definitions";
import useSupabaseBrowser from "@/utils/supabase/client";
import {
  useQuery,
  useSubscriptionQuery,
} from "@supabase-cache-helpers/postgrest-react-query";
import { formatDistanceToNow, getDate } from "date-fns";
import { useEffect, useRef, useState } from "react";
import { UserAvatar } from "../lfp_card/user-avatar";
import { getRoomChats } from "@/queries/rooms";
import { useSearchParams } from "next/navigation";
import { EmptyChat } from "./empty-chat";
import { ScrollArea } from "../ui/scroll-area";
import { useUser } from "../context/user-context";
import RoomParticipants from "./room-participants";
import { Skeleton } from "../ui/skeleton";

const MessagesList = () => {
  const searchParams = useSearchParams();
  const supabase = useSupabaseBrowser();
  const user = useUser();

  const [messages, setMessages] = useState<Message[]>([]);
  const [onlineUsers, setOnlineUsers] = useState<{ user_id: string }[]>([]);
  const [userScrolled, setUserScrolled] = useState(false);

  const scrollRef = useRef<HTMLDivElement>(null);
  const roomId = searchParams.get("roomId");

  const {
    data: messagesData,
    isFetching: isFetchingMessages,
    refetch: refetchMessages,
  } = useQuery(getRoomChats(supabase, Number(roomId)), {
    //   retry: false,
  });

  useEffect(() => {
    refetchMessages();
    console.log("messages", roomId, messagesData?.length);
  }, [roomId, refetchMessages]);
  //   useEffect(() => {
  //     if (messagesData) {
  //       setMessages(
  //         messagesData?.map(({ id, content, created_at, profiles }) => ({
  //           id: String(id ?? 11),
  //           user: {
  //             id: profiles?.id,
  //             name: profiles?.username ?? "",
  //             avatar: profiles?.avatar_url ?? "",
  //           },
  //           content: content ?? "",
  //           timestamp: formatDistanceToNow(created_at, { addSuffix: true }),
  //         }))
  //       );
  //     }
  //   }, [messagesData]);

  //   useEffect(() => {
  //     const scrollContainer = scrollRef.current;
  //     if (scrollContainer && !userScrolled) {
  //       scrollContainer.scrollTop = scrollContainer.scrollHeight;
  //     }
  //   }, [messages]);

  //   const handleOnScroll = () => {
  //     const scrollContainer = scrollRef.current;
  //     if (scrollContainer) {
  //       const isScroll =
  //         scrollContainer.scrollTop <
  //         scrollContainer.scrollHeight - scrollContainer.clientHeight - 10;
  //       setUserScrolled(isScroll);
  //     }
  //   };
  //   const scrollDown = () => {
  //     if (scrollRef && scrollRef.current) {
  //       scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  //     }
  //   };

  useEffect(() => {
    const channel = supabase.channel(`game_room_${roomId}`);
    channel
      .on("presence", { event: "sync" }, () => {
        const userIds = [];
        for (const id in channel.presenceState()) {
          // @ts-ignore
          userIds.push({ user_id: channel.presenceState()[id][0].user_id });
        }
        setOnlineUsers([...userIds]);
      })
      .subscribe(async (status) => {
        if (status === "SUBSCRIBED") {
          await channel.track({
            online_at: getDate(new Date()),
            user_id: user?.id,
          });
        }
      });
    return () => {
      channel.unsubscribe();
    };
  }, [user, searchParams]);

  const { status, channel } = useSubscriptionQuery(
    supabase,
    `room_chat`,
    {
      event: "*",
      table: "room_chat",
      schema: "public",
    },
    ["id, room_id"],
    "id, room_id, content, user_id, profiles ( username )", // define the query to be executed when the realtime update arrives
    {
      callback: (payload) => {
        const { id, content, created_at, user } = payload.new;
        // setMessages((prevMessages) => [
        //   ...prevMessages,
        //   {
        //     id,
        //     content,
        //     timestamp: formatDistanceToNow(created_at, { addSuffix: true }),
        //     user: {
        //       id: user?.id,
        //       name: user?.username ?? "",
        //       avatar: user?.avatar_url ?? "",
        //     },
        //   },
        // ]);
      },
    }
  );

  return Array.from({ length: 5 }).map((_, index) => (
    <div key={index} className="flex items-center space-x-4">
      <Skeleton className="h-12 w-12 rounded-full" />
      <div className="space-y-2 flex-1">
        <Skeleton className="h-4 w-3/4" />
        <Skeleton className="h-3 w-1/2" />
      </div>
    </div>
  ));

  // return messagesData?.length === 0 ? (
  //   <EmptyChat />
  // ) : (
  //   <div className="flex flex-grow overflow-scroll">
  //     <ScrollArea className="flex-grow h-full px-2">
  //       <div className="space-y-4 first:mt-4 last:mb-4">
  //         {messagesData?.map((message) => (
  //           <div key={message.id} className="flex items-center space-x-4 mx-4">
  //             <UserAvatar
  //               profilePictureSrc={
  //                 message.profiles?.avatar_url ??
  //                 "https://upload.wikimedia.org/wikipedia/commons/thumb/5/55/Question_Mark.svg/1200px-Question_Mark.svg.png"
  //               }
  //               username={message.profiles?.username ?? ""}
  //               isOnline={onlineUsers.some(
  //                 (user) => user.user_id === message.profiles?.id
  //               )}
  //             />
  //             <div className="flex-1 space-y-1">
  //               <div className="flex items-center space-x-2">
  //                 <span className="font-semibold text-sm">
  //                   {message.profiles?.username}
  //                 </span>
  //                 <span className="text-xs text-muted-foreground">
  //                   {formatDistanceToNow(message.created_at, {
  //                     addSuffix: true,
  //                   })}
  //                 </span>
  //               </div>
  //               <p className="text-sm break-all">{message.content}</p>
  //             </div>
  //           </div>
  //         ))}
  //       </div>
  //     </ScrollArea>
  //     <div className="flex-grow border-l h-full p-4 flex flex-col gap-4 w-[240px] max-w-[240px]">
  //       <div className="font-medium text-sm text-muted-foreground">
  //         In this room
  //       </div>
  //       <RoomParticipants
  //         userIds={onlineUsers.map((user) => user.user_id)}
  //         onlineUsers={onlineUsers}
  //       />
  //     </div>
  //   </div>
  // );
};

export default MessagesList;
