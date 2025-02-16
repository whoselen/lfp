import { Option } from "@/components/ui/multiselect";
import { Headphones, Headset, Speaker } from "lucide-react";
import { FaDiscord } from "react-icons/fa6";

const frameworks: Option[] = [
  {
    value: "sea",
    label: "SEA",
  },
  {
    value: "europe-west",
    label: "Europe-West",
  },
  {
    value: "europe-east",
    label: "Europe-East",
  },
  {
    value: "na-east",
    label: "NA-East",
  },
  {
    value: "na-west",
    label: "NA-West",
  },
  {
    value: "sa",
    label: "South America",
  },
  {
    value: "oce",
    label: "Oceania",
  },
  {
    value: "asia",
    label: "Asia",
  },
  {
    value: "africa",
    label: "Africa",
  },
];

const player_tags: Option[] = [
  {
    value: "chill",
    label: "Chill",
  },
  {
    value: "play-for-fun",
    label: "Play for Fun",
  },
  {
    value: "serious",
    label: "Serious",
  },
  {
    value: "pma",
    label: "Positive Mental Attitude (PMA)",
  },
  {
    value: "competitive",
    label: "Competitive",
  },
  {
    value: "casual",
    label: "Casual",
  },
  {
    value: "team-player",
    label: "Team Player",
  },
  {
    value: "solo",
    label: "Solo",
  },
  {
    value: "newbie-friendly",
    label: "Newbie Friendly",
  },
];

const accessibility_tools = [
  {
    value: "discord",
    label: "Discord",
    Icon: FaDiscord,
    defaultChecked: true,
    backgroundColor: "#7289da",
    foregroundColor: "",
    iconColor: "#7289da",
  },
  {
    value: "microphone",
    label: "Microphone only",
    Icon: Speaker,
    backgroundColor: "",
    foregroundColor: "",
  },
  {
    value: "headphone",
    label: "Headphone only",
    Icon: Headphones,
    backgroundColor: "",
    foregroundColor: "",
  },
  {
    value: "headset",
    label: "Headset",
    Icon: Headset,
    backgroundColor: "",
    foregroundColor: "",
  },
];

const games = [
  {
    name: "League of Legends",
    description: "MOBA strategy gamers",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
  },
  {
    name: "Valorant",
    description: "Tactical shooter enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Apex Legends",
    description: "Battle Royale enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Overwatch",
    description: "Team-based shooter enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Fortnite",
    description: "Battle Royale enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Call of Duty: Warzone",
    description: "Battle Royale enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Hearthstone",
    description: "Card game enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "World of Warcraft",
    description: "MMORPG enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Minecraft",
    description: "Sandbox game enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Among Us",
    description: "Social deduction game enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Rust",
    description: "Survival game enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Genshin Impact",
    description: "Open-world action RPG enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Cyberpunk 2077",
    description: "Open-world action RPG enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "The Witcher 3",
    description: "Open-world action RPG enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQHC99xWZ-J68zo80KcsGmBo5zLFsIiaHlnfw&s",
  },
  {
    name: "Dota 2",
    description: "MOBA strategy gamers",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
  },
  {
    name: "Counter-Strike 2",
    description: "Tactical shooter enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
  },
  {
    name: "Teamfight Tactics",
    description: "Auto-battler enthusiasts",
    avatarSrc:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR-hsVM9oKXRHEDHAIo-W975OpKeCa0OeIiOg&s",
  },
];
export { frameworks, player_tags, accessibility_tools, games };
