"use client";
import { pricingAtom } from "@/lib/atoms/pricing";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { selectedTableIndexAtom } from "@/lib/atoms/selectedTableIndex";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/table";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

const columns = [
  { name: "Item Name", key: "itemName" },
  { name: "Qty", key: "qty" },
  { name: "Rate", key: "rate" },
  { name: "GST", key: "gst" },
  { name: "Amount", key: "amount" },
];

const ItemsTable = () => {
  const setSelectedTableIndex = useSetRecoilState(selectedTableIndexAtom);
  const setPricing = useSetRecoilState(pricingAtom);
  const handleRowClick = (id: number) => {
    setSelectedTableIndex(id);
    setPricing({
      Qty: 1,
      Price: selectedServices[id].price,
      GST: parseFloat((selectedServices[id].price * 0.18).toFixed(2)),
      Disc: 0,
    });
  };
  const selectedServices = useRecoilValue(selectedServiceAtom);
  return (
    <div className="flex items-start justify-center w-full overflow-auto overflow-y-hidden">
      <Table
        removeWrapper
        isCompact
        color="warning"
        selectionMode="single"
        className="capitalize"
        classNames={{
          td: "truncate",
          base: "max-h-[520px] overflow-y-auto",
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
              <TableRow key={id} onClick={() => handleRowClick(id)}>
                <TableCell>{service.serviceName}</TableCell>
                <TableCell className="flex justify-center">
                  {service.qty}
                </TableCell>
                <TableCell>{service.price * service.qty}</TableCell>
                <TableCell>
                  {(service.price * service.qty * 0.18).toFixed(2)}
                </TableCell>
                <TableCell>
                  {(service.price * service.qty * 1.18).toFixed(2)}
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default ItemsTable;
