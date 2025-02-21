"use client";

import { useState, useEffect, useCallback, useRef, forwardRef } from "react";
import { Components, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { useSearchParams } from "next/navigation";
import useSupabaseBrowser from "@/utils/supabase/client";
import { fetchMessages, Message } from "./fetchMessages";
import { useUser } from "../context/user-context";
import { EmptyChat } from "./empty-chat";
import { UserAvatar } from "../lfp_card/user-avatar";
import { formatDistanceToNow, getDate } from "date-fns";
import { useRoomStore } from "@/stores/current-room-store";
import MessageInput from "./message-input";
import UserMessage from "./user-message";
import RoomParticipants from "./room-participants";

const Item: Components["Item"] = forwardRef<HTMLDivElement, any>(
  ({ style, children, ...props }, ref) => {
    return (
      <div
        style={style}
        ref={ref}
        {...props}
        className="w-full py-2 first-of-type:pt-4 last-of-type:pb-4"
      >
        {children}
      </div>
    );
  }
);

const Header = () => (
  <div className="py-4 text-center text-sm text-gray-500">Loading...</div>
);

const MessageRoom = () => {
  const user = useUser();
  const userId = user?.id;
  const supabase = useSupabaseBrowser();
  const searchParams = useSearchParams();
  const paramRoomId = Number(searchParams.get("roomId"));
  const virtuosoRef = useRef<VirtuosoHandle>(null);

  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ user_id: string }[]>([]);

  const roomId = useRoomStore((state) => state.roomId);
  const setRoomId = useRoomStore((state) => state.setRoomId);

  useEffect(() => {
    if (!virtuosoRef.current) return;
    virtuosoRef.current.scrollToIndex(messages.length - 1);
  }, []);

  useEffect(() => {
    if (paramRoomId && paramRoomId !== roomId) {
      setRoomId(paramRoomId);
    }
  }, [paramRoomId]);

  // ✅ Load initial messages
  useEffect(() => {
    if (!roomId) return;

    setMessages([]);
    setHasMore(true);
    setPage(0);
    loadMoreMessages();

    const subscription = supabase
      .channel(`messages_room_${roomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_chat",
          filter: `room_id=eq.${roomId}`,
        },
        (payload) => {
          //@ts-ignore
          setMessages((prev) => [...prev, payload.new]); // Append at bottom
          virtuosoRef?.current?.scrollToIndex(messages.length - 1);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [roomId]);

  // ✅ Fetch older messages when scrolling up
  const loadMoreMessages = useCallback(async () => {
    if (!roomId || !hasMore) return;

    try {
      const { data: newMessages, totalCount } = await fetchMessages(
        supabase,
        Number(roomId),
        page
      );

      console.log(page, totalCount);

      if (page * 15 >= totalCount) {
        setHasMore(false);
        return;
      }

      setMessages((prev) => [...newMessages, ...prev]); // Prepend older messages
      setPage((prev) => prev + 1);
    } catch (error) {
    } finally {
    }
  }, [roomId, hasMore, supabase]);

  console.log({ hasMore });

  // ✅ Presence: Track online users
  useEffect(() => {
    if (!roomId) return;
    const channel = supabase.channel(`presence_room_${roomId}`);

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
  }, [user, roomId]);

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-grow">
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <Virtuoso
            ref={virtuosoRef}
            //   increaseViewportBy={100}
            style={{ height: "100%" }}
            data={messages}
            startReached={loadMoreMessages} // Fetch older messages when scrolling up
            components={{ Item }}
            initialTopMostItemIndex={messages.length - 1} // Scroll to bottom on first load
            itemContent={(index, message) => (
              <UserMessage
                key={message.id}
                userId={message.user_id}
                message={message}
                isOnline={onlineUsers.some(
                  (user) => user.user_id === message.user_id
                )}
              />
            )}
          />
        )}
        <MessageInput userId={userId ?? ""} roomId={Number(roomId ?? "0")} />
      </div>
      <div className="flex-grow border-l h-full p-4 flex flex-col gap-4 w-[240px] max-w-[240px]">
        <div className="font-medium text-sm text-muted-foreground">
          In this room
        </div>
        <RoomParticipants
          userIds={onlineUsers.map((user) => user.user_id)}
          onlineUsers={onlineUsers}
        />
      </div>
    </div>
  );
};

export default MessageRoom;
