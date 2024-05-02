"use client";
import React from "react";
import Price_display from "./components/Price_display";
import { Input } from "@nextui-org/input";

const CustomerDetail = ({
  detail,
  value,
}: {
  detail: string;
  value: string;
}) => {
  return (
    <div className="flex gap-2">
      <div>{detail}</div>
      <div>{value}</div>
    </div>
  );
};

const Pricing = () => {
  return (
    <div className="h-[calc(100vh-1.5rem)] bg-naai-pos-200 w-[25%] relative">
      <Price_display />
      <div className="w-full bottom-0 absolute p-2">
        <Input
          className="bg-white"
          placeholder="Search Customer (Phone No.)"
          classNames={{
            inputWrapper: "min-h-3",
            mainWrapper: "h-6",
          }}
        />
        <div className="grid p-3 grid-rows-2 grid-cols-2">
          <CustomerDetail detail="Pending" value="--" />
          <CustomerDetail detail="Advance" value="--" />
          <CustomerDetail detail="Last Visit" value="--" />
          <CustomerDetail detail="Membership" value="--" />
        </div>
        <div className="grid p-3 grid-rows-2 grid-cols-2 gap-y-2 gap-x-2">
          <div className="flex gap-2 items-center">
            <div>Qty.</div>
            <Input
              className="bg-white"
              classNames={{
                inputWrapper: "min-h-3",
                mainWrapper: "h-6",
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div>Price</div>
            <Input
              className="bg-white"
              classNames={{
                inputWrapper: "min-h-3",
                mainWrapper: "h-6",
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div>GST</div>
            <Input
              className="bg-white"
              classNames={{
                inputWrapper: "min-h-3",
                mainWrapper: "h-6",
              }}
            />
          </div>
          <div className="flex gap-2 items-center">
            <div>Disc</div>
            <Input
              className="bg-white"
              classNames={{
                inputWrapper: "min-h-3",
                mainWrapper: "h-6",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pricing;
