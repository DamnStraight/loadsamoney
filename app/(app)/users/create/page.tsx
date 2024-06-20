import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

export default function CreateUserDialog() {
  return(
    <div className="w-full h-full flex justify-center">
      <div className="flex flex-col self-center gap-y-6">
        <h1 className="text-2xl font-bold">Create a new User</h1>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="name">Name</Label>
          <Input type="text" id="name" placeholder="Name" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="password">Password</Label>
          <Input type="password" id="password" placeholder="Password" />
        </div>
        <div className="grid w-full max-w-sm items-center gap-1.5">
          <Label htmlFor="verify-password">Confirm Password</Label>
          <Input type="password" id="verify-password" placeholder="Confrm Password" />
        </div>
        <Button type="submit">Create User</Button>
      </div>
    </div>
  );
}