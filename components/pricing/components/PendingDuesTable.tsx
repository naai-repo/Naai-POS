import React from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { currencyOptions, dateOptions } from "@/lib/helper";
import { Eye } from "lucide-react";

const PendingDuesTable = () => {
    const customer = useRecoilValue(customerInfoAtom);
  return (
    <Table isHeaderSticky aria-label="Example table with dynamic content" className="h-[250px]">
      <TableHeader>
        <TableColumn>Booking Id</TableColumn>
        <TableColumn>Due Amount</TableColumn>
        <TableColumn>Date</TableColumn>
        <TableColumn>Invoice</TableColumn>
      </TableHeader>
      <TableBody items={customer.dues}>
        {(item) => (
          <TableRow key={item.bookingId}>
            <TableCell><span className="block w-[100px] truncate">{item.bookingId}</span></TableCell>
            <TableCell>
              {item.amount.toLocaleString("en-In", currencyOptions)}
            </TableCell>
            <TableCell>{new Date(item.bookingDate).toLocaleString("en-In", dateOptions)}</TableCell>
            <TableCell className="cursor-pointer">
              <Eye />
            </TableCell>
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
};

export default PendingDuesTable;
