'use client'

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const schema = z.object({
  username: z.string()
    .min(2, { message: "Username must contain at least 2 characters."})
    .max(20, { message: "Username cannot exceed 20 characters."}),
  password: z.string()
    .min(8, { message: "Password must contain at least 8 characters."})
    .max(64, { message: "Password cannot exceed 20 characters."}),
  confirm: z.string()
    .min(8, { message: "Password must contain at least 8 characters."})
    .max(64, { message: "Password cannot exceed 20 characters."}),
}).refine((data) => data.password === data.confirm, {
  message: "Passwords do not match!",
  path: ["confirm"]
});

type FormSchema = z.infer<typeof schema>;

export default function CreateUserPage() {
  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      username: "",
      password: "",
      confirm: ""
    }
  });

  function onSubmit(formData: FormSchema) {
    
  }

  return(
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex justify-center">
        <div className="flex flex-col self-center gap-y-6">
          <h1 className="text-2xl font-bold">Create a new User</h1>
          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="Username" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input placeholder="Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Confirm Password</FormLabel>
                <FormControl>
                  <Input placeholder="Confirm Password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create User</Button>
        </div>
      </form>
    </Form>
  );
}

