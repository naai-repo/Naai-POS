import React, { useEffect, useState } from "react";
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
import { Urls } from "@/lib/api";
import axios from "axios";
import ViewInvoiceModal from "./ViewInvoiceModal";

const PendingDuesTable = () => {
  const customer = useRecoilValue(customerInfoAtom);
  const [booking, setBooking] = useState<any>();
  const [isOpen, setIsOpen] = useState(false);

  const handleViewinvoice = async (bookingId: string) => {
    if (!bookingId || bookingId === "") return;
    let response = await axios.get(
      `${Urls.GetSingleBookingInfo}?id=${bookingId}`
    );
    setBooking(response.data.data);
    setIsOpen(true);
  };
  return (
    <>
      <ViewInvoiceModal
        booking={booking}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <Table
        isHeaderSticky
        aria-label="Example table with dynamic content"
        className="h-[250px]"
      >
        <TableHeader>
          <TableColumn>Booking Id</TableColumn>
          <TableColumn>Due Amount</TableColumn>
          <TableColumn>Date</TableColumn>
          <TableColumn>Invoice</TableColumn>
        </TableHeader>
        <TableBody items={customer.dues}>
          {(item) => (
            <TableRow key={item.bookingId}>
              <TableCell>
                <span className="block w-[100px] truncate">
                  {item.bookingId}
                </span>
              </TableCell>
              <TableCell>
                {item.amount.toLocaleString("en-In", currencyOptions)}
              </TableCell>
              <TableCell>
                {new Date(item.bookingDate).toLocaleString(
                  "en-In",
                  dateOptions
                )}
              </TableCell>
              <TableCell className="cursor-pointer">
                <Eye onClick={() => handleViewinvoice(item.bookingId)} />
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default PendingDuesTable;
