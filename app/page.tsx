"use client";

import LeftBar from "@/components/LeftBar";
import MainContent from "./MainContent";
import RightBar from "@/components/RightBar";

export default function Home() {
  return (
    <main className="flex gap-6 h-full" suppressHydrationWarning>
      <LeftBar className="w-60 overflow-auto max-h-screen" />
      <MainContent className="flex-grow" />
      <RightBar className="w-72 " />
    </main>
  );
}
