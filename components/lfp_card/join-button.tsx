import { ArrowRight } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface JoinButtonProps {
  roomId: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ roomId }) => {
  const router = useRouter();
  const pathname = usePathname();

  const handleJoin = () => {
    router.push(`${pathname}?roomId=${roomId}`);
  };

  return (
    <Button
      className="relative group rounded-full shadow shadow-black/5"
      type="button"
      onClick={handleJoin}
    >
      JOIN
      <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={12}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
  );
};

export default JoinButton;
