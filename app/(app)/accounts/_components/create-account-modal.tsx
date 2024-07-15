import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createAccount } from "@/types/bindings";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface Props {
  defaultOpen?: boolean
  open?: boolean
}

const AccountTypeSchema = z.union([
  z.literal('TFSA'),
  z.literal('RRSP'),
  z.literal('CHEQUING'),
  z.literal('SAVINGS'),
], { invalid_type_error: "Must select an account type"});
type AccountType = z.infer<typeof AccountTypeSchema>;

const schema = z.object({
  name: z.string()
    .min(2, { message: "Username must contain at least 2 characters."})
    .max(20, { message: "Username cannot exceed 20 characters."}),
  type: AccountTypeSchema,
  amount: z.preprocess((val) => {
    if (typeof val === 'string') 
      return parseFloat(val)
    return val
  }, z.number()),
});

type FormSchema = z.infer<typeof schema>;

const currencyFormatter = new Intl.NumberFormat('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2  })

export function CreateAccountModal() {
  const [open, setOpen] = useState<boolean>(false);

  const form = useForm<FormSchema>({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      type: "" as FormSchema['type'], // Trick TypeScript into allowing an empty value
      amount: "0.00",
    }
  });

  async function onSubmit({ name, type, amount }: FormSchema) {
    try {
      await createAccount({ account_type: type, amount: parseFloat(amount), name });
      form.reset();
      setOpen(false);
    } catch (e) {
      console.error(e);
    }
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement, Element>) {
    const formattedAmount = currencyFormatter
      .format(Number(event.target.value))
      .replace(",", "");
    form.setValue("amount", formattedAmount as any)
  }

  function handleInput(event: React.FormEvent<HTMLInputElement>) {
    if (event.currentTarget.value.indexOf('.') == -1) { 
      currencyFormatter.format(parseFloat(event.currentTarget.value)).replace(",", "")
      // return; 
    }
    if ((event.currentTarget.value.length - event.currentTarget.value.indexOf('.')) > 2) {
      event.currentTarget.value = parseFloat(event.currentTarget.value).toFixed(2);
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Add Account</Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader className="mb-4">
          <DialogTitle>Create a new Account</DialogTitle>
        </DialogHeader>
        <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full flex justify-center">
        <div className="flex flex-col self-center gap-y-6">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Account Name:</FormLabel>
                  <FormControl className="col-span-3">
                    <Input placeholder="Personal Savings" {...field} />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Type:</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl className="col-span-3">
                      <SelectTrigger>
                        <SelectValue placeholder="Select an account type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="TFSA">TFSA</SelectItem>
                      <SelectItem value="RRSP">RRSP</SelectItem>
                      <SelectItem value="Chequing">Chequing</SelectItem>
                      <SelectItem value="Savings">Savings</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <div className="grid grid-cols-4 items-center gap-4">
                  <FormLabel>Amount:</FormLabel>
                  <FormControl className="col-span-3">
                    <Input 
                      type="text" 
                      placeholder="0.00" 
                      step="0.01" 
                      {...field}
                      onInput={handleInput}
                       />
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button type="submit">Create Account</Button>
        </div>
      </form>
    </Form>
      </DialogContent>
    </Dialog>
  )
}