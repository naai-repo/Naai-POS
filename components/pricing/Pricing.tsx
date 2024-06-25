"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Price_display from "./components/Price_display";
import { Autocomplete, AutocompleteItem } from "@nextui-org/react";
import ItemsTable from "../tables/ItemsTable";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { pricingAtom } from "@/lib/atoms/pricing";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import DropDownMenu from "./components/DropDownMenu";
import axios from "axios";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { User } from "lucide-react";
import OnScreenKeyboard from "../main/components/OnScreenKeyboard";

const PricingInputArray = ["Qty", "Price", "Disc"];

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

  return (
    <div className="flex gap-2 items-center">
      <div className="w-1/4">{name}</div>
      <input
        onChange={handleOnchange}
        // onInputCapture={handleInputChange}
        ref={inputRef}
        className="w-3/4 rounded-md shadow-md border-2 border-gray-400"
      />
    </div>
  );
};

const Pricing = () => {
  const pricing = useRecoilValue(pricingAtom);
  const [customer, setCustomer] = useRecoilState(customerInfoAtom);
  const searchCustomer = useRef<HTMLInputElement>(null);
  const resetCustomer = useResetRecoilState(customerInfoAtom);
  const selectedServices = useRecoilValue(selectedServiceAtom);
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [showDropDown, setShowDropDown] = useState(false);

  useEffect(() => {
    if (selectedServices.length > 0) {
      let price = selectedServices.reduce((acc, curr) => {
        return acc + (curr.price * curr.qty);
      }, 0);
      setServicePrice(price * 1.18);
    } else {
      setServicePrice(0);
    }
  }, [selectedServices]);

  useEffect(() => {
    if (searchCustomer.current) {
      if (customer.phoneNumber !== "" && customer.name !== "") {
        searchCustomer.current.value = `${customer.phoneNumber} - ${customer.name}`;
      } else {
        searchCustomer.current.value = customer.phoneNumber || "";
      }
      if (searchCustomer.current.value === "") {
        setShowDropDown(false);
      }
    }
  }, [customer]);
  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!("inputType" in e.nativeEvent)) {
      return;
    }

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setCustomer({
        name: "",
        gender: "",
        id: "",
        phoneNumber: e.target.value,
      });
      return;
    }
    setShowDropDown(true);
    if (e.target.value === "") {
      resetCustomer();
      setShowDropDown(false);
      return;
    }
    setCustomer((prev) => {
      return {
        ...prev,
        phoneNumber: e.target.value,
      };
    });
  };
  return (
    <div className="h-[calc(100vh-5rem)] bg-white w-[60%] relative">
      <ItemsTable />
      <div className="parent-div w-full absolute bottom-0">
        <div className="w-full relative bottom-0 p-2 pb-7">
          <Price_display align="right" price={servicePrice} />
          <div className="search-customer-parent flex mt-2">
            <div className="profile-pic border-2 rounded-s-md bg-white border-black p-1 border-r-1">
              <User />
            </div>
            <input
              className="bg-white min-h-3 h-6 rounded-e-md p-2 py-4 text-sm w-full border-2 border-l-1 border-black"
              placeholder="Search Customer (Phone No.)"
              onChange={handlePhoneNumberChange}
              id="search-customer"
              ref={searchCustomer}
              autoComplete="off"
            />
          </div>
          {showDropDown && <DropDownMenu setShowDropDown={setShowDropDown} />}
          {/* <div className="grid p-3 grid-rows-2 grid-cols-2">
            <CustomerDetail detail="Pending" value="--" />
            <CustomerDetail detail="Advance" value="--" />
            <CustomerDetail detail="Last Visit" value="--" />
            <CustomerDetail detail="Membership" value="--" />
          </div> */}
          <div className="grid mt-6 p-3 grid-rows-1 grid-cols-3 gap-y-2 gap-x-2">
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
        <div className="action-buttons-pricing w-full py-4 bg-naai-pos-300">
          <OnScreenKeyboard />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
