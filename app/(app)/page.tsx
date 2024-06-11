import { MainNav } from "@/components/ui/main-nav"
import { DatePicker } from "../../components/ui/date-picker";

export default function Home() {
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
