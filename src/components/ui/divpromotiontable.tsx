import {
    Table,
    TableBody,
    TableCaption,
    TableCell,
    TableFooter,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
  
  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ]
  
  export function DivPromotion({
    title, data
  }: {
    title:string,
    data: any[],
  }) {
    return (
      <Table>
        <TableCaption>{title}</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">school</TableHead>
            <TableHead>generation</TableHead>
            <TableHead className="text-right">count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.school}</TableCell>
              <TableCell>{invoice.generation}</TableCell>
              <TableCell className="text-right">{invoice.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  