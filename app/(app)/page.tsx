'use client'

import { useEffect } from "react";
import { getAllUsers } from "@/types/bindings";
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();

  useEffect(() => {
    // TODO: This should be moved to middleware once we have users set up:
    https://nextjs.org/docs/app/building-your-application/routing/redirecting
    async function fetchUsers() {
      try {
        const users = await getAllUsers();

        if (users.length == 0) {
          router.push("/users/create");
        }
      } catch (e) {
        console.log(e);
      }
    }

    fetchUsers();
  }, []);

  return (
    <></>
  )
}