"use client";

import { FormEvent, useState } from "react";
import { sendMessage } from "./sendMessage";
import useSupabaseBrowser from "@/utils/supabase/client";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Send } from "lucide-react";

const MessageInput = ({
  userId,
  roomId,
}: {
  userId: string;
  roomId: number;
}) => {
  const [message, setMessage] = useState("");

  const supabase = useSupabaseBrowser();

  const handleSend = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!roomId) return;
    await sendMessage(supabase, roomId, userId, message);
    setMessage("");
  };

  return (
    <form onSubmit={handleSend} className="flex-grow-0 py-2 px-4 border-t">
      <div className="relative">
        <Input
          type="text"
          placeholder="You can chat here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="h-12 rounded-full flex-grow focus-visible:ring-transparent focus-visible:border-input pr-24"
        />
        {message.trim() && (
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
  );
};

export default MessageInput;
