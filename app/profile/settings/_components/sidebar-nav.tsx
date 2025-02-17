"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";
import LogOut from "@/components/auth/logout";

interface SidebarNavProps extends React.HTMLAttributes<HTMLElement> {
  items: {
    href: string;
    title: string;
  }[];
}

export function SidebarNav({ className, items, ...props }: SidebarNavProps) {
  const pathname = usePathname();

  return (
    <nav
      className={cn(
        "flex gap-x-2 lg:flex-col lg:gap-x-0 lg:gap-y-1 h-full",
        className
      )}
      {...props}
    >
      {items.map((item) => (
        <Link
          key={item.href + item.title}
          href={item.href}
          className={cn(
            buttonVariants({ variant: "outline" }),
            pathname === item.href
              ? "bg-muted hover:bg-muted"
              : "hover:bg-transparent hover:underline",
            "justify-start"
          )}
        >
          {item.title}
        </Link>
      ))}
      <div className="lg:flex-1 flex items-end ml-auto lg:ml-0">
        <LogOut />
      </div>
    </nav>
  );
}
