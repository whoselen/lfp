import useRoomUsers from "@/hooks/use-room-users";
import useSupabaseBrowser from "@/utils/supabase/client";
import { useSearchParams } from "next/navigation";
import { forwardRef, useCallback, useEffect, useState } from "react";
import { Components, Virtuoso, VirtuosoHandle } from "react-virtuoso";
import { EmptyChat } from "./empty-chat";
import { fetchMessages, Message } from "./fetchMessages";
import MessageSkeleton from "./message/skeleton";
import UserMessage from "./message/user-message";

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

const MessagesList = forwardRef<VirtuosoHandle>((_, ref) => {
  const supabase = useSupabaseBrowser();
  const searchParams = useSearchParams();
  const roomId = Number(searchParams.get("roomId"));

  const [isFetchingMessages, setIsFetchingMessages] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(0);

  const { onlineUsers } = useRoomUsers();

  useEffect(() => {
    if (ref && "current" in ref && ref.current) {
      ref.current.scrollToIndex({ index: messages.length - 1 });
    }
  }, []);

  // Load initial messages
  useEffect(() => {
    setMessages([]);
    setHasMore(true);
    setPage(0);

    loadMoreMessages();
  }, [roomId]);

  // Fetch older messages when scrolling up
  const loadMoreMessages = useCallback(async () => {
    if (!roomId || !hasMore) return;

    try {
      setIsFetchingMessages(true);
      const { data: newMessages, totalCount } = await fetchMessages(
        supabase,
        Number(roomId),
        page
      );

      if (page * 30 >= totalCount) {
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
  }, [roomId, hasMore, supabase]);

  // Subscription: New messages
  useEffect(() => {
    if (!roomId) return;

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
          if (payload.eventType === "INSERT" && payload.new) {
            //@ts-ignore
            setMessages((prev) => [...prev, payload.new]); // Append at bottom
          }
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(subscription);
    };
  }, [supabase, roomId]);

  return isFetchingMessages ? (
    <div className="h-full space-y-4 mx-4 mt-4 flex-grow">
      {Array.from({ length: 12 }).map((_, index) => (
        <MessageSkeleton key={index} />
      ))}
    </div>
  ) : messages.length === 0 ? (
    <EmptyChat />
  ) : (
    <Virtuoso
      ref={ref}
      style={{ height: "100%", flexGrow: 1 }}
      data={messages}
      startReached={loadMoreMessages}
      components={{ Item }}
      initialTopMostItemIndex={messages.length - 1}
      itemContent={(_, message) => (
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
  );
});

export default MessagesList;
