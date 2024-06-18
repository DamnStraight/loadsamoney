import "@/styles/globals.css";
import { cn } from "@/lib/utils";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className={cn("bg-red-500 ")}>
        {children}
    </div>
  );
}
