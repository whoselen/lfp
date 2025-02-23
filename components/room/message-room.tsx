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
import { Skeleton } from "../ui/skeleton";

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
  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState<{ user_id: string }[]>([]);

  // const roomId = useRoomStore((state) => state.roomId);
  const setRoomId = useRoomStore((state) => state.setRoomId);

  useEffect(() => {
    if (!virtuosoRef.current) return;
    virtuosoRef.current.scrollToIndex(messages.length - 1);
  }, []);

  // useEffect(() => {
  //   if (paramRoomId && paramRoomId !== roomId) {
  //     setRoomId(paramRoomId);
  //   }
  // }, [paramRoomId]);

  // ✅ Load initial messages
  useEffect(() => {
    if (!paramRoomId) return;

    setMessages([]);
    setHasMore(true);
    setPage(0);

    loadMoreMessages();
  }, [paramRoomId, user]);

  // ✅ Fetch older messages when scrolling up
  const loadMoreMessages = useCallback(async () => {
    if (!paramRoomId || !hasMore) return;

    try {
      setIsFetchingMessages(true);
      const { data: newMessages, totalCount } = await fetchMessages(
        supabase,
        Number(paramRoomId),
        page
      );

      if (page * 15 >= totalCount) {
        setHasMore(false);
        setIsFetchingMessages(false);
        return;
      }

      setMessages((prev) => [...newMessages, ...prev]); // Prepend older messages
      setPage((prev) => prev + 1);
    } catch (error) {
    } finally {
      setIsFetchingMessages(false);
    }
  }, [paramRoomId, hasMore, supabase]);

  // ✅ Subscription: New messages
  useEffect(() => {
    if (!paramRoomId) return;
    const subscription = supabase
      .channel(`messages_room_${paramRoomId}`)
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "room_chat",
          filter: `room_id=eq.${paramRoomId}`,
        },
        (payload) => {
          if (payload.eventType === "INSERT" && payload.new) {
            //@ts-ignore
            setMessages((prev) => [...prev, payload.new]); // Append at bottom
            virtuosoRef?.current?.scrollToIndex(messages.length - 1);
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, paramRoomId]);

  // ✅ Presence: Track online users
  useEffect(() => {
    if (!paramRoomId) return;
    const channel = supabase.channel(`presence_room_${paramRoomId}`);

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
  }, [user, paramRoomId]);

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-grow">
        {isFetchingMessages ? (
          <div className="h-full space-y-4 mx-4 mt-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center space-x-4">
                <Skeleton className="h-12 w-12 rounded-full" />
                <div className="space-y-2 flex-1">
                  <Skeleton className="h-4 w-3/4" />
                  <Skeleton className="h-3 w-1/2" />
                </div>
              </div>
            ))}
          </div>
        ) : messages.length === 0 ? (
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

        <MessageInput
          userId={userId ?? ""}
          roomId={Number(paramRoomId ?? "0")}
        />
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
