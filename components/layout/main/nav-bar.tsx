import { AnimatedBackground } from "@/components/ui/animated-background";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Activity, Radio } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export function SegmentedControl({
  setActiveTab,
}: {
  setActiveTab: (value: string | null) => void;
}) {
  const TABS = [
    {
      value: "lfp-feed",
      label: "Looking for party feed",
      icon: (
        <Radio
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      ),
    },
    {
      value: "community-feed",
      label: "Community feed",
      icon: (
        <Activity
          className="-ms-0.5 me-1.5 opacity-60"
          size={16}
          strokeWidth={2}
          aria-hidden="true"
        />
      ),
    },
  ];

  return (
    <div className="py-4 w-min">
      <div className="flex w-full space-x-2 rounded-full bg-muted py-1 px-1.5">
        <AnimatedBackground
          defaultValue={TABS[0].value}
          className="rounded-full bg-primary"
          transition={{
            type: "spring",
            bounce: 0.1,
            duration: 0.4,
          }}
          onValueChange={setActiveTab}
        >
          {TABS.map((tab) => (
            <Link
              key={tab.label}
              data-id={tab.value}
              href="/"
              rel="noopener noreferrer" // For security, it's a good practice when opening new tabs
              draggable={false}
              className={`${buttonVariants({
                variant: "outline",
              })} group rounded-full transition-colors duration-100 focus-visible:outline-2 data-[checked=true]:text-primary-foreground`}
            >
              <div className="flex items-center">
                {tab.icon}
                {tab.label}
                <Badge className="ms-1.5 transition-opacity group-data-[checked=true]:bg-primary-foreground group-data-[checked=true]:text-primary">
                  1 new
                </Badge>
              </div>
            </Link>
          ))}
        </AnimatedBackground>
      </div>
    </div>
  );
}
