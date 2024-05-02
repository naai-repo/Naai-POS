"use client";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";
import { useRecoilValue } from "recoil";

const columns = [
  { name: "Item Name", key: "itemName" },
  { name: "Qty", key: "qty" },
  { name: "Rate", key: "rate" },
  { name: "GST", key: "gst" },
  { name: "Amount", key: "amount" },
];

const ItemsTable = () => {
  const selectedServices = useRecoilValue(selectedServiceAtom);
  return (
    <div className="flex items-start justify-center w-full overflow-auto overflow-y-hidden">
      <Table
        isStriped
        removeWrapper
        isCompact
        fullWidth={false}
        className="capitalize"
        classNames={{
          td: "truncate",
        }}
      >
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>
              <h1 className="text-sm">{column.name}</h1>
            </TableColumn>
          )}
        </TableHeader>
        <TableBody>
          {selectedServices.map((service, id) => {
            return (
              <TableRow key={id}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell className="flex justify-center">{1}</TableCell>
                <TableCell>{service.price}</TableCell>
                <TableCell>{service.price * 0.18}</TableCell>
                <TableCell>{service.price * 1.18}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
