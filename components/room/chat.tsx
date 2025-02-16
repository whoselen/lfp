import { usePathname, useRouter, useSearchParams } from "next/navigation";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { useEffect, useRef, useState } from "react";
import { Button } from "../ui/button";
import { MessageCircle, Send, X } from "lucide-react";
import { rooms } from "../layout/main/rooms";
import { UserAvatar } from "../lfp_card/user-avatar";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { EmptyChat } from "./empty-chat";

type Message = {
  id?: string;
  user: {
    name: string;
    avatar: string;
  };
  content: string;
  timestamp: Date;
};

type ChatProps = {};
const Chat: React.FC<ChatProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("roomId");

  const containerRef = useRef<HTMLDivElement | null>(null);

  const closeChat = () => {
    router.push(pathname);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      router.push(pathname);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const roomParticipants = rooms.find(
    (room) => room.id === roomId
  )?.room_participants;
  useEffect(() => {
    const currentRoomChat = rooms
      .find((room) => room.id === roomId)
      ?.room_participants.map((participant) => ({
        id: participant.users.username || "",
        user: {
          name: participant.users.username || "",
          avatar: participant.users.avatar_url || "",
        },
        content: "Hey everyone! How's it going?",
        timestamp: new Date(2023, 5, 1, 14, 30),
      }));

    if (currentRoomChat) {
      setMessages(currentRoomChat);
    }
  }, [roomId]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    const message: Message = {
      id: (messages.length + 1).toString(),
      user: {
        name: "You",
        avatar:
          "https://steamcdn-a.akamaihd.net/steamcommunity/public/images/avatars/e3/e32de017ab05fe4e58083175ff1b4fa221ee78a7_full.jpg",
      },
      content: newMessage.trim(),
      timestamp: new Date(),
    };

    setMessages([...messages, message]);
    setNewMessage("");
  };

  return (
    <Card
      ref={containerRef}
      className="transition-all transform [transition-timing-function:cubic-bezier(0,0,0.58,1)] flex flex-col h-full"
    >
      <CardHeader className="border-b">
        <CardTitle className="text-lg flex justify-between w-full relative">
          <div className="flex gap-2">
            {/* <div className="flex gap-2"> */}
            {/* <UserAvatar
                profilePictureSrc={
                  rooms.find((room) => room.id === roomId)?.users.avatar_url ||
                  ""
                }
                username={
                  rooms.find((room) => room.id === roomId)?.users.username || ""
                }
                isOnline={true}
              /> */}
            {/* <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold">
                  {rooms.find((room) => room.id === roomId)?.users.nickname}
                </span>
                <span className="text-xs text-muted-foreground">
                  @{rooms.find((room) => room.id === roomId)?.users.username}
                </span>
              </div> */}
            {/* </div> */}
            {rooms.find((room) => room.id === roomId)?.title}
          </div>
          <Button
            size="icon"
            variant="ghost"
            className="absolute -right-2 -top-2 rounded-full"
            onClick={closeChat}
          >
            <X size={16} />
          </Button>
        </CardTitle>
        <CardDescription className="text-xs">
          {rooms.find((room) => room.id === roomId)?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0 overflow-hidden">
        {messages.length === 0 ? (
          <EmptyChat />
        ) : (
          <div className="flex flex-grow">
            <ScrollArea className="flex-grow h-full px-4">
              <div className="space-y-4 first:mt-4 last:mb-4">
                {messages.map((message, index) => (
                  <div key={message.id} className="flex items-center space-x-4">
                    <UserAvatar
                      profilePictureSrc={message.user.avatar}
                      username={message.user.name}
                      isOnline={[true, false].at(index % 2) || false}
                    />
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center space-x-2">
                        <span className="font-semibold text-sm">
                          {message.user.name}
                        </span>
                        <span className="text-xs text-muted-foreground">
                          {message.timestamp.toLocaleTimeString([], {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </span>
                      </div>
                      <p className="text-sm break-all">{message.content}</p>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
            <div className="flex-1 border-l h-full p-4 flex flex-col gap-4 w-[240px] max-w-[240px]">
              <div className="font-medium text-sm text-muted-foreground">
                In this room
              </div>
              <div className="space-y-4 first:mt-4 last:mb-4">
                {roomParticipants?.map((participant, index) => (
                  <div
                    key={participant.users.username}
                    className="flex items-center space-x-2"
                  >
                    <UserAvatar
                      profilePictureSrc={participant.users.avatar_url}
                      username={participant.users.username}
                      isOnline={true}
                      size="sm"
                    />
                    <div className="flex flex-col">
                      <span className="font-medium text-xs line-clamp-1">
                        {participant.users.username}
                      </span>
                      <span className="text-xxs text-muted-foreground line-clamp-1">
                        @{participant.users.username}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        <form onSubmit={handleSendMessage} className="py-2 px-4 border-t">
          <div className="relative">
            <Input
              type="text"
              placeholder="You can chat here..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="h-12 rounded-full flex-grow focus-visible:ring-transparent focus-visible:border-input pr-24"
            />
            {newMessage.trim() && (
              <Button
                type="submit"
                className="rounded-full gap-2 absolute right-2 top-1/2 -translate-y-1/2"
              >
                <span className="text-xs">Send</span>
                <Send className="size-4" />
              </Button>
            )}
          </div>
        </form>
      </CardContent>
    </Card>
  );
};

export default Chat;
