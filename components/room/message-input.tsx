"use client";

import useSupabaseBrowser from "@/utils/supabase/client";
import { Send } from "lucide-react";
import { FormEvent, forwardRef, useState } from "react";
import { VirtuosoHandle } from "react-virtuoso";
import { useUser } from "../context/user-context";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { sendMessage } from "./sendMessage";

type MessageInputProps = {
  roomId: number;
  // messagesCount: number;
};
const MessageInput = forwardRef<VirtuosoHandle, MessageInputProps>(
  ({ roomId }, ref) => {
    const user = useUser();
    const [message, setMessage] = useState("");

    const supabase = useSupabaseBrowser();

    const handleSend = async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!roomId || !user?.id) return;
      await sendMessage(supabase, roomId, user?.id, message);
      setMessage("");

      setTimeout(() => {
        if (ref && "current" in ref && ref.current) {
          ref.current.scrollToIndex(-1);
        }
      }, 100);
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
  }
);

export default MessageInput;
