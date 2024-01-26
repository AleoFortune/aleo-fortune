"use client";

import LeftBar from "@/components/LeftBar";
import MainContent from "./MainContent";
import RightBar from "@/components/RightBar";

export default function Home() {
  return (
    <main className="flex flex-col xl:flex-row gap-2 xl:gap-6 h-full px-10 xl:px-0" suppressHydrationWarning>
      <LeftBar className="w-60 overflow-auto max-h-screen" />
      <MainContent className="flex-grow order-2 xl:order-1" />
      <RightBar className="w-full xl:w-80 order-1 xl:order-2" />
    </main>
  );
}
