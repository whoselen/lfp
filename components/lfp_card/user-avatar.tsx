import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  username: string;
  profilePictureSrc: string;
  isOnline: boolean;
  size?: "sm" | "md" | "lg";
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  username,
  profilePictureSrc,
  isOnline,
  size = "md",
}) => {
  return (
    <div className="relative">
      <Avatar
        className={clsx(
          "border-1 border-border ring ring-secondary",
          size === "sm" && "size-8",
          size === "md" && "size-10",
          size === "lg" && "size-16"
        )}
      >
        <AvatarImage src={profilePictureSrc} alt={username} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span
        className={clsx(
          "absolute bottom-0 end-0 size-3 rounded-full border-2 border-background ",
          isOnline ? "bg-emerald-500" : "bg-gray-200"
        )}
      >
        <span className="sr-only">{isOnline ? "Online" : "Offline"}</span>
      </span>
    </div>
  );
};
