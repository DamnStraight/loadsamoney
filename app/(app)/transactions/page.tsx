import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

export default function Transactions() {
    return(
            <div className="px-10">
                <Table>
                    <TableCaption>A list of your recent transactions.</TableCaption>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-[100px]">Date</TableHead>
                            <TableHead>Security</TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Action (dropdown)</TableHead>
                            <TableHead>Quantity</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Total</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <TableRow>
                            <TableCell>2024-03-14</TableCell>
                            <TableCell>TD</TableCell>
                            <TableCell>Toronto-Dominion Bank</TableCell>
                            <TableCell>Buy</TableCell>
                            <TableCell>10</TableCell>
                            <TableCell>80</TableCell>
                            <TableCell>800</TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </div>
            )
}