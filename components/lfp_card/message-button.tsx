import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export const MessageButton = () => {
  return (
    <Button
      className="group rounded-full py-1 px-2.5 transition-transform hover:translate-x-0.5"
      variant="outline"
      aria-label="Message to user"
    >
      <div className="flex items-center transition-transform group-hover:translate-x-0.5">
        <span className="hidden group-hover:block text-xs">Send a DM</span>
        <MessageSquare
          size={14}
          aria-hidden="true"
          className="group-hover:me-1 group-hover:ms-2 opacity-60 text-foreground"
        />
      </div>
    </Button>
  );
};
