import { Metadata } from "next";
import Image from "next/image";

import { Separator } from "@/components/ui/separator";
import { SidebarNav } from "./_components/sidebar-nav";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AppLogo } from "@/components/common/app-logo";
import UserDropdown from "@/components/auth/user-dropdown";
import Notification from "@/components/user/notification";

export const metadata: Metadata = {
  title: "Forms",
  description: "Advanced form example using react-hook-form and Zod.",
};

const sidebarNavItems = [
  {
    title: "Profile",
    href: "/profile/settings",
  },
  //   {
  //     title: "Account",
  //     href: "/profile/settings",
  //   },
  //   {
  //     title: "Appearance",
  //     href: "/profile/settings",
  //   },
  //   {
  //     title: "Notifications",
  //     href: "/profile/settings",
  //   },
  //   {
  //     title: "Display",
  //     href: "/profile/settings",
  //   },
  //   {
  //     title: "asdasd",
  //     href: "/profile/settingss",
  //   },
];

interface SettingsLayoutProps {
  children: React.ReactNode;
}

export default function SettingsLayout({ children }: SettingsLayoutProps) {
  return (
    <>
      {/* <div className="md:hidden">
        <Image
          src="/examples/forms-light.png"
          width={1280}
          height={791}
          alt="Forms"
          className="block dark:hidden"
        />
        <Image
          src="/examples/forms-dark.png"
          width={1280}
          height={791}
          alt="Forms"
          className="hidden dark:block"
        />
      </div> */}
      <div className="hidden space-y-6 p-10 pt-6 pb-16 md:block h-screen max-h-screen container mx-auto">
        <div className="flex gap-6 items-center justify-between">
          <div className="flex space-x-10 items-center">
            <AppLogo />
            <div className="space-y-0.5">
              <h2 className="text-2xl font-bold tracking-tight">Settings</h2>
              <p className="text-muted-foreground">Manage your account.</p>
            </div>
          </div>
          <div className="flex gap-3">
            <UserDropdown />
            <Notification />
          </div>
        </div>
        <Separator className="my-6" />
        <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
          <aside className="lg:w-1/6 overflow-auto">
            <SidebarNav items={sidebarNavItems} />
          </aside>
          <div className="flex-1 lg:max-w-2xl">
            {/* <ScrollArea className="h-[calc(100vh-20rem)]"> */}
            {children}
            {/* </ScrollArea> */}
          </div>
        </div>
      </div>
    </>
  );
}
