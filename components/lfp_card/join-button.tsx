import React from "react";
import { Button } from "../ui/button";
import { ArrowRight } from "lucide-react";

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
      className="group rounded-full shadow shadow-black/5"
      type="button"
      onClick={() => routeToPage(`room/${roomId}`)}
    >
      JOIN
      <ArrowRight
        className="-me-1 ms-2 opacity-60 transition-transform group-hover:translate-x-0.5"
        size={16}
        strokeWidth={2}
        aria-hidden="true"
      />
    </Button>
    // <button

    //   className="rounded-[30px] bg-[#222121] px-6 py-1 hover:bg-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-gray-500 active:bg-[#0F0F0F]"

    // >
    //   <span className="text-lg font-bold leading-[18px] text-white">
    //     {" "}
    //     JOIN{" "}
    //   </span>
    // </button>
  );
};

export default JoinButton;
