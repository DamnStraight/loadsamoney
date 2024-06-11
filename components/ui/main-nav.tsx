import Link from "next/link"

import { cn } from "@/lib/utils"

import { HomeIcon, LucideIcon } from "lucide-react";
import { buttonVariants } from "./button";

type LinkItem = {
  title: string
  icon: LucideIcon
}

// TODO: Seperate this into a file and import
const links: LinkItem[] = [
  {
    title: "Dashboard",
    icon: HomeIcon
  },
  {
    title: "Test",
    icon: HomeIcon
  },
];

export function MainNav({
  className,
  ...props
}: React.HTMLAttributes<HTMLElement>) {
  //TODO: Highlight button if the link matches the current page

  return (
    <div className="group flex flex-col gap-4 py-2 w-full">
      <nav
        className={cn("grid gap-1 px-2", className)}
        // className={cn("flex flex-col space-y-2 h-full w-full px-2 py-2", className)}
        {...props}
      >
        {links.map((link, index) => (
          <Link
            key={index}
            href="/dashboard"
            className={cn(
              buttonVariants({ variant: "ghost", size: "icon" }),
              "h-9 w-full justify-start px-2",
              // "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
            )}
          >
            <link.icon className="mr-2 h-4 w-4" />
            {link.title}
          </Link>
        ))}
      </nav>
    </div>
  )
}