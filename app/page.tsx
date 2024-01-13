"use client";

import LeftBar from "@/components/LeftBar";
import MainContent from "./MainContent";
import RightBar from "@/components/RightBar";

export default function Home() {
  return (
    <main className="flex gap-6 h-[calc(100vh-6rem)]" suppressHydrationWarning>
      <LeftBar className="w-72 h-full overflow-auto" />
      <MainContent className="flex-grow" />
      <RightBar className="w-96 " />
    </main>
  );
}
