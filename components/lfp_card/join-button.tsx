import { ArrowRight } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";
import clsx from "clsx";

interface JoinButtonProps {
  roomId: string;
  disabled: boolean;
}

const JoinButton: React.FC<JoinButtonProps> = ({ roomId, disabled }) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const searchParamsRoomId = searchParams.get("roomId");

  const handleJoin = () => {
    router.push(`${pathname}?roomId=${roomId}`);
  };

  const isCurrentUserInRoom = searchParamsRoomId === roomId;

  return (
    <Button
      className={clsx(
        "relative group rounded-full shadow shadow-black/5",
        isCurrentUserInRoom && "bg-green-500 hover:bg-green-600"
      )}
      type="button"
      onClick={handleJoin}
      disabled={disabled && !isCurrentUserInRoom}
    >
      {isCurrentUserInRoom ? "IN CHAT" : disabled ? "FULL" : "JOIN"}
      <ArrowRight
        className="-me-1 ms-2 transition-transform group-hover:translate-x-0.5"
        size={12}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
};

export default JoinButton;
