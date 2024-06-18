'use client';

import { MainNav } from "@/components/ui/main-nav"
import { DatePicker } from "@/components/ui/date-picker";
import { useEffect } from "react";
import { getAllUsers } from "@/types/bindings";

export default function Home() {
  useEffect(() => {
    async function onInit() {
      try {
        const users = await getAllUsers()
        console.log(`Users = ${users}`);
      } catch (e) {
        console.log(e);
      }
    }

    onInit();
  }, []);

  return (
    <main>
      <div className="flex flex-row h-screen">
        <div className="flex border-r w-48">
          <MainNav />
        </div>
        <div className="flex justify-between px-6 w-full py-6">
            <h2 className="text-3xl font-bold tracking-tight">Title?</h2>
            <DatePicker />
        </div>
      </div>
    </main>
  );
}
