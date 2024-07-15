'use client'

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { MouseEvent, MouseEventHandler, useEffect, useState } from "react"
import { Account, getAccount } from "../../types/bindings";
import { Button } from "../../components/ui/button";
import { CreateAccountModal } from "./accounts/_components/create-account-modal";

function EmptyDashboard() {
  const [open, setOpen] = useState<boolean>(false);

  function handleClick(event: React.MouseEvent) {
    setOpen(true);
  }

  return (
    <>
      <div className="flex flex-col justify-center content-center h-full">
        <h1>No accounts</h1>
        <CreateAccountModal />
      </div>
    </>
  )
}

export default function Dashboard() {
  const [accounts, setAccounts] = useState<Account[]>([]);

  useEffect(() => {
    async function fetchAccounts() {

    }

    fetchAccounts();
  }, []);

  return accounts.length == 0 ?
  <EmptyDashboard /> :
  (
    <div className="m-4 grid grid-cols-3 gap-4">
      <Card className="">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
              </div>
              <div className="flex flex-col space-y-1.5">

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
              </div>
              <div className="flex flex-col space-y-1.5">

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
      <Card className="">
        <CardHeader>
          <CardTitle>Create project</CardTitle>
          <CardDescription>Deploy your new project in one-click.</CardDescription>
        </CardHeader>
        <CardContent>
          <form>
            <div className="grid w-full items-center gap-4">
              <div className="flex flex-col space-y-1.5">
              </div>
              <div className="flex flex-col space-y-1.5">

              </div>
            </div>
          </form>
        </CardContent>
        <CardFooter className="flex justify-between">
        </CardFooter>
      </Card>
    </div>
  )
}