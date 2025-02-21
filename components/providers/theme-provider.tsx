"use client";

import * as React from "react";
import dynamic from "next/dynamic";
import { CookiesProvider } from "react-cookie";

const NextThemesProvider = dynamic(
  () => import("next-themes").then((e) => e.ThemeProvider),
  {
    ssr: false,
  }
);

export function ThemeProvider({
  children,
  ...props
}: React.ComponentProps<typeof NextThemesProvider>) {
  return (
    <NextThemesProvider {...props}>
      <CookiesProvider defaultSetOptions={{ path: "/" }}>
        {children}
      </CookiesProvider>
    </NextThemesProvider>
  );
}
