import { MessageSquare } from "lucide-react";
import { Button } from "../ui/button";

export const MessageButton = () => {
  return (
    <Button
      className="rounded-full"
      variant="outline"
      size="icon"
      aria-label="Message to user"
    >
      <MessageSquare size={16} strokeWidth={2} aria-hidden="true" />
    </Button>
  );
};
