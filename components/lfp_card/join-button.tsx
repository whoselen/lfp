import React from "react";

interface JoinButtonProps {
  roomId: string;
}

const JoinButton: React.FC<JoinButtonProps> = ({ roomId }) => {
  // const history = useHistory();

  const routeToPage = (route: string) => {
    // history.push(`/${route}`);
  };

  return (
    <button
      type="button"
      className="rounded-[30px] bg-[#222121] px-6 py-1 hover:bg-[#0F0F0F] focus:outline-none focus:ring-2 focus:ring-gray-500 active:bg-[#0F0F0F]"
      onClick={() => routeToPage(`room/${roomId}`)}
    >
      <span className="text-lg font-bold leading-[18px] text-white">
        {" "}
        JOIN{" "}
      </span>
    </button>
  );
};

export default JoinButton;
