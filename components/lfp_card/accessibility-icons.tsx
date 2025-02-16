import { Headphones, Headset, Mic, Database, Monitor } from "lucide-react";

interface AccessibilityIconsProps {
  name: string;
}

const iconClass = "h-3 w-3";

const AccessibilityIcons: React.FC<AccessibilityIconsProps> = ({ name }) => {
  return (
    <span>
      {name === "headset" && <Headset className={iconClass} />}
      {name === "microphone" && <Mic className={iconClass} />}
      {name === "discord" && <Database className={iconClass} />}
      {name === "headphones" && <Headphones className={iconClass} />}
      {name === "pc" && <Monitor className={iconClass} />}
    </span>
  );
};

export default AccessibilityIcons;
