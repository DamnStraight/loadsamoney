'use client';

import { MainNav } from "@/components/ui/main-nav"

export default function HomeLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main>
      <div className="flex flex-row h-screen">
        <div className="flex border-r w-48">
          <MainNav />
        </div>
        <div className="w-full">
          {children}
        </div>
      </div>
    </main>
  );
}
