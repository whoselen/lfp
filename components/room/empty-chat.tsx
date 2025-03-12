import {
  MessageSquare,
  MessageSquareDashed,
  MessageSquareMore,
} from "lucide-react";

export function EmptyChat() {
  return (
    <div className="flex flex-col items-center justify-center h-full text-center p-4 flex-grow">
      <MessageSquareMore className="h-12 w-12 text-muted-foreground mb-4" />
      <h3 className="text-lg font-semibold mb-2">No messages yet</h3>
      <p className="text-muted-foreground">
        Be the first to start the conversation!
      </p>
    </div>
  );
}
