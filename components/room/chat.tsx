import { Send, X } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { rooms } from "../layout/main/rooms";
import { Button } from "../ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../ui/card";

import { Input } from "@/components/ui/input";
import useSupabaseBrowser from "@/utils/supabase/client";
import {
  useInsertMutation,
  useQuery,
} from "@supabase-cache-helpers/postgrest-react-query";
import { toast } from "sonner";
import { useUser } from "../context/user-context";
import MessagesList from "./messages-list";
import { getRoomById } from "@/queries/rooms";
import { useUserStore } from "@/stores/user-store";

type ChatProps = {};
const Chat: React.FC<ChatProps> = ({}) => {
  const pathname = usePathname();
  const router = useRouter();
  const searchParams = useSearchParams();

  const roomId = searchParams.get("roomId");

  const [newMessage, setNewMessage] = useState("");
  const containerRef = useRef<HTMLDivElement | null>(null);

  const user = useUser();
  const avatar_url = useUserStore((state) => state.avatar_url);
  const supabase = useSupabaseBrowser();

  const { data: roomData } = useQuery(getRoomById(supabase, Number(roomId)));

  const { mutateAsync: insertMessage } = useInsertMutation(
    supabase.from("room_chat"),
    ["id"],
    null,
    {
      onSuccess: () => toast.message("Message sent!"),
      revalidateTables: [{ schema: "public", table: "room_chat" }],
    }
  );

  const closeChat = () => {
    router.push(pathname);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (
      containerRef.current &&
      !containerRef.current.contains(event.target as Node)
    ) {
      closeChat();
    }
  };

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const joinRoom = async () => {
      setLoading(true);
      try {
        if (!user?.id) {
          return;
        }

        // Check if the user is already in the room
        const { data: existingUser } = await supabase
          .from("room_users")
          .select("*")
          .eq("room_id", Number(roomId))
          .eq("user_id", user?.id)
          .single();

        // If the user is not already in the room, insert them
        if (!existingUser) {
          const { data, error } = await supabase.from("room_users").insert([
            {
              room_id: Number(roomId),
              user_id: user?.id,
              avatar_url: avatar_url,
              entered_at: new Date().toISOString(),
            },
          ]);

          console.log("error", error);
          console.log("User joined room:", data);
        }
      } catch (error) {
        console.error("Error joining room:", error);
      } finally {
        setLoading(false);
      }
    };

    const leaveRoom = async () => {
      setLoading(true);
      try {
        if (!user?.id) {
          return;
        }
        const { data, error } = await supabase
          .from("room_users")
          .delete()
          .eq("room_id", Number(roomId))
          .eq("user_id", user?.id);

        if (error) throw error;
        console.log("User left room:", data);
      } catch (error) {
        console.error("Error leaving room:", error);
      } finally {
        setLoading(false);
      }
    };

    const leaveAndJoinRoom = async () => {
      // If the user was in another room, leave it
      await leaveRoom(); // This ensures the user leaves the previous room (if any)

      // Now join the new room
      await joinRoom(); // Join the new room
    };

    leaveAndJoinRoom();

    return () => {
      leaveRoom();
    };
  }, [roomId, user]);

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() === "") return;

    insertMessage([
      { room_id: Number(roomId), content: newMessage, user_id: user?.id },
    ]);

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
            {roomData?.title}
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
          {roomData?.description}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex-grow flex flex-col p-0 h-full overflow-hidden">
        <MessagesList />
        <form
          onSubmit={handleSendMessage}
          className="flex-grow-0 py-2 px-4 border-t"
        >
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
