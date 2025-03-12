"use client";

import useRoomUsers from "@/hooks/use-room-users";
import { useSearchParams } from "next/navigation";
import MessageInput from "./message-input";
import MessagesList from "./messages-list";
import RoomParticipants from "./room-participants";
import { useRef } from "react";
import { VirtuosoHandle } from "react-virtuoso";

const MessageRoom = () => {
  const searchParams = useSearchParams();
  const roomId = Number(searchParams.get("roomId"));

  const messageListRef = useRef<VirtuosoHandle>(null);

  const { onlineUsers } = useRoomUsers();

  return (
    <div className="flex h-full">
      <div className="flex flex-col flex-grow">
        <div className="flex gap-2 flex-grow">
          <MessagesList ref={messageListRef} />
          <div className="border-l h-full p-4 flex flex-col gap-4 w-[240px] max-w-[240px]">
            <div className="font-medium text-sm text-muted-foreground">
              In this room
            </div>
            <RoomParticipants
              userIds={onlineUsers.map((user) => user.user_id)}
              onlineUsers={onlineUsers}
            />
          </div>
        </div>
        <MessageInput roomId={Number(roomId)} ref={messageListRef} />
      </div>
    </div>
  );
};

export default MessageRoom;
