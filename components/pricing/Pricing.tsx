"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Price_display from "./components/Price_display";
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import ItemsTable from "../tables/ItemsTable";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { pricingAtom } from "@/lib/atoms/pricing";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import DropDownMenu from "./components/DropDownMenu";
import axios from "axios";

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
  const  [customer, setCustomer] = useRecoilState(customerInfoAtom);
  const searchCustomer = useRef<HTMLInputElement>(null);
  const resetCustomer = useResetRecoilState(customerInfoAtom);
  
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (searchCustomer.current) {
      if(customer.phoneNumber !== "" && customer.name !== ""){
        searchCustomer.current.value = `${customer.phoneNumber} - ${customer.name}`;
      }else{
        searchCustomer.current.value = customer.phoneNumber  || "";
      }
      if(searchCustomer.current.value === ""){
        setShowDropDown(false);
      }
    }
  },[customer])
  const handlePhoneNumberChange = (e : React.ChangeEvent<HTMLInputElement>) => {   
    
    if(!("inputType" in e.nativeEvent)){
      return;
    }

    if(e.nativeEvent.inputType === "deleteContentBackward"){
      setCustomer({
          name: "",
          gender: "",
          id: "",
          phoneNumber: e.target.value
        })
      return;    
    }
    setShowDropDown(true);
    if(e.target.value === ""){
      resetCustomer();
      setShowDropDown(false);
      return;
    }
    setCustomer((prev) => {
      return {
        ...prev,
        phoneNumber: e.target.value
      }
    })
  }
  return (
    <div className="h-[calc(100vh-1.5rem)] bg-naai-pos-200 w-[25%] relative">
      <Price_display align = "right"/>
      <ItemsTable />
      <div className="w-full bottom-0 absolute p-2">
        <input
          className="bg-white min-h-3 h-6 rounded-md p-2 text-sm w-full"
          placeholder="Search Customer (Phone No.)"
          onChange={handlePhoneNumberChange}
          id="search-customer"
          ref={searchCustomer}
          autoComplete="off"
        />
        {showDropDown && <DropDownMenu setShowDropDown={setShowDropDown} />}
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
