import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { AvatarImage } from "@radix-ui/react-avatar";

interface JoinButtonProps {
  roomId: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ roomId }) => {
  // const history = useHistory();

  const routeToPage = (route: string) => {
    // history.push(`/${route}`);
  };

  return (
    <Button
      className="relative group rounded-full shadow shadow-black/5"
      type="button"
      onClick={() => routeToPage(`room/${roomId}`)}
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
