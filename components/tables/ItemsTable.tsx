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
import { Trash2 } from "lucide-react";
import React, { useEffect } from "react";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";

const columns = [
  { name: "Item Name", key: "itemName" },
  { name: "Qty", key: "qty" },
  { name: "Rate", key: "rate" },
  { name: "GST", key: "gst" },
  { name: "Amount", key: "amount" },
];

const ItemsTable = () => {
  const setSelectedTableIndex = useSetRecoilState(selectedTableIndexAtom);
  const resetSetSelectedTableIndex = useResetRecoilState(selectedTableIndexAtom);
  const setPricing = useSetRecoilState(pricingAtom);
  const resetPricing = useResetRecoilState(pricingAtom);
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
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const handleTrashIcon = (id: number) => {
    resetPricing();
    resetSetSelectedTableIndex();
    setSelectedServices((prev) => {
      const newSelectedServices = [...prev];

      // Remove the item at the specified index
      newSelectedServices.splice(id, 1);

      // Return the new array to update the state
      return newSelectedServices;
    });
  };

  return (
    <div className="flex items-start justify-center w-full overflow-auto overflow-y-hidden p-2">
      <Table
        removeWrapper
        isCompact
        color="warning"
        selectionMode="single"
        className="capitalize"
        classNames={{
          td: "truncate",
          base: "max-h-[520px] overflow-y-auto",
          tr: "mb-2",
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
              <TableRow
                key={id}
                onClick={() => handleRowClick(id)}
                className="bg-white"
              >
                <TableCell className="rounded-s-md">
                  <div className="flex items-center">
                    <Trash2
                      className="h-4 mr-2"
                      onClick={() => handleTrashIcon(id)}
                    />
                    {service.serviceName}&nbsp;
                    {`(${service.name})`}
                  </div>
                </TableCell>
                <TableCell className="flex justify-center">
                  {service.qty}
                </TableCell>
                <TableCell>
                  {Math.round(service.price * service.qty * 100) / 100}
                </TableCell>
                <TableCell>
                  {(service.price * service.qty * 0.18).toFixed(2)}
                </TableCell>
                <TableCell className="rounded-e-md">
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
