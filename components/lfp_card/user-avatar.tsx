import clsx from "clsx";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";

type UserAvatarProps = {
  username: string;
  profilePictureSrc: string;
  isOnline: boolean;
};

export const UserAvatar: React.FC<UserAvatarProps> = ({
  username,
  profilePictureSrc,
  isOnline,
}) => {
  return (
    <div className="relative">
      <Avatar className="border-1 border-border">
        <AvatarImage src={profilePictureSrc} alt={username} />
        <AvatarFallback>{username}</AvatarFallback>
      </Avatar>
      <span
        className={clsx(
          "absolute bottom-0 end-0 size-3 rounded-full border-2 border-background ",
          isOnline && "bg-emerald-500"
        )}
      >
        <span className="sr-only">{isOnline ? "Online" : "Offline"}</span>
      </span>
    </div>
  );
};
