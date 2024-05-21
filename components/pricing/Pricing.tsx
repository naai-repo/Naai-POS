"use client";
import React, { use, useEffect, useRef } from "react";
import Price_display from "./components/Price_display";
import { Input } from "@nextui-org/input";
import ItemsTable from "../tables/ItemsTable";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { pricingAtom } from "@/lib/atoms/pricing";
import { input } from "@nextui-org/react";

const PricingInputArray = ["Qty", "Price", "GST", "Disc"];

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

const PricingInput = ({
  name,
  defaultValue,
}: {
  name: string;
  defaultValue: string;
}) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const setPricing = useSetRecoilState(pricingAtom);
  useEffect(() => {
    let input = inputRef.current;
    if (input) input.value = defaultValue;
  }, [defaultValue]);

  const handleOnchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPricing((prev) => {
      // console.log(prev, "prev pricing");
      return {
        ...prev,
        [name]: e.target.value,
      };
    });
  };

  // const handleInputChange = (e: React.FormEvent<HTMLInputElement>) => {
  //   console.log("CHECK from input ");
  //   setPricing((prev) => {
  //     // console.log(prev, "prev pricing");
  //     return {
  //       ...prev,
  //       [name]: e.currentTarget.value,
  //     };
  //   });
  // }
  
  return (
    <div className="flex gap-2 items-center">
      <div className="w-1/4">{name}</div>
      <input
        onChange={handleOnchange}
        // onInputCapture={handleInputChange}
        ref={inputRef}
        className="w-3/4"
      />
    </div>
  );
};

const Pricing = () => {
  const pricing = useRecoilValue(pricingAtom);
  return (
    <div className="h-[calc(100vh-1.5rem)] bg-naai-pos-200 w-[25%] relative">
      <Price_display align = "right"/>
      <ItemsTable />
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
          {PricingInputArray.map((input) => (
            <PricingInput
              key={input}
              name={input}
              defaultValue={
                pricing[input as keyof typeof pricing]?.toString() || ""
              }
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Pricing;
