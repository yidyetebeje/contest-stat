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
  
  
  export function DivPromotion({
    title, data
  }: {
    title:string,
    data: any[],
  }) {
    data = data.sort((a, b) => b.count - a.count);
    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>school</TableHead>
            <TableHead>generation</TableHead>
            <TableHead>count</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((invoice, index) => (
            <TableRow key={index}>
              <TableCell className="font-medium">{invoice.school}</TableCell>
              <TableCell>{invoice.generation}</TableCell>
              <TableCell>{invoice.count}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    )
  }
  