"use client";
import React, { use, useEffect, useRef, useState } from "react";
import Price_display from "./components/Price_display";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  Checkbox,
} from "@nextui-org/react";
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
import PendingDuesModal from "./components/PendingDuesModal";
import { Membership, SelectedServicesInterface } from "@/lib/types";
import { Urls } from "@/lib/api";
import { updatedSelectedServicesAtom } from "@/lib/atoms/updatedSelectedServices";
import { UpdatedSelectedServicesEnum } from "@/lib/enums";
import { serviceCountAtom } from "@/lib/atoms/serviceCount";

const PricingInputArray = ["Qty", "Amount", "Disc"];

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
  const pricing = useRecoilValue(pricingAtom);
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
    console.log("PRICE HERE: ", pricing);
  };

  return (
    <div className="flex gap-2 items-center">
      <div className="w-1/4">{name}</div>
      <input
        onChange={handleOnchange}
        // onInputCapture={handleInputChange}
        type="number"
        min="0"
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
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const [servicePrice, setServicePrice] = useState<number>(0);
  const [showDropDown, setShowDropDown] = useState(false);
  const [openPopover, setOpenPopover] = useState(false);
  const [openPendingModal, setOpenPendingModal] = useState(false);
  const [applyMembership, setApplyMembership] = useState(false);
  const [initialSelectedServices, setInitialSelectedServices] = useState<
    SelectedServicesInterface[]
  >([]);
  const [updatedSelectedServices, setUpdatedSelectedServices] = useRecoilState(
    updatedSelectedServicesAtom
  );
  const setServiceCount = useSetRecoilState(serviceCountAtom);
  const triggerRef = useRef(null);

  useEffect(() => {
    if (selectedServices.length > 0) {
      let price = selectedServices.reduce((acc, curr) => {
        return acc + curr.price * curr.qty;
      }, 0);
      let tax = selectedServices.reduce((acc, curr) => {
        return acc + curr.tax * curr.qty;
      }, 0);
      setServicePrice(price + tax);
    } else {
      setServicePrice(0);
    }
  }, [selectedServices]);

  useEffect(() => {
    if (searchCustomer.current) {
      if (customer.phoneNumber !== "" && customer.name !== "") {
        searchCustomer.current.value = `${customer.phoneNumber} - ${customer.name}`;
        if (customer.dues.length) {
          setOpenPopover(true);
        }
      } else {
        searchCustomer.current.value = customer.phoneNumber || "";
        setOpenPopover(false);
      }
      if (searchCustomer.current.value === "") {
        setShowDropDown(false);
        setOpenPopover(false);
      }
    }
  }, [customer]);

  // useEffect(() => {
  //   if(!applyMembership){
  //     setInitialSelectedServices(selectedServices);
  //   }
  // }, [applyMembership]);

  useEffect(() => {
    if (updatedSelectedServices !== UpdatedSelectedServicesEnum.NotUpdated && updatedSelectedServices !== UpdatedSelectedServicesEnum.MembershipDiscount) {
      console.log("INITITAL: ", selectedServices);
      setInitialSelectedServices(selectedServices);
    }
  }, [selectedServices.length, updatedSelectedServices]);

  useEffect(() => {
    if (updatedSelectedServices === UpdatedSelectedServicesEnum.Updated) {
      setUpdatedSelectedServices(UpdatedSelectedServicesEnum.NotUpdated);
    }
  }, [updatedSelectedServices]);

  useEffect(() => {
    const applyMembershipDiscount = async () => {
      let response = await axios.post(Urls.ApplyMembership, {
        userId: customer.id,
        selectedServices: selectedServices,
      });
      let newServices = response.data.data.data.services;
      let count = response.data.data.data.count;
      console.log("Count: ", count);
      if(count){
        setServiceCount(count);
      }
      setSelectedServices(newServices);
      setUpdatedSelectedServices(UpdatedSelectedServicesEnum.MembershipDiscount);
    };
    if(customer.id !== ""){
      console.log("DATA: ", initialSelectedServices);
      if (applyMembership) {
        applyMembershipDiscount();
      }else{
        setSelectedServices(initialSelectedServices);
      }
    }
  }, [applyMembership, customer]);

  const handlePhoneNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!("inputType" in e.nativeEvent)) {
      return;
    }

    if (e.nativeEvent.inputType === "deleteContentBackward") {
      setOpenPopover(false);
      setCustomer({
        name: "",
        email: "",
        birthDate: "",
        aniversary: "",
        gender: "",
        id: "",
        phoneNumber: e.target.value,
        dues: [],
        membership: {} as Membership, // Add the missing membership property
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
    <div className="bg-white w-[60%] relative rounded-xl border-2 border-[#e4e8eb] shadow-xl flex flex-col">
      <PendingDuesModal
        isOpen={openPendingModal}
        setIsOpen={setOpenPendingModal}
        setOpenPopover={setOpenPopover}
      />
      <ItemsTable />
      <div className="parent-div w-full top-full rounded-xl shadow">
        <div className="w-full relative bottom-0 p-2 pb-7">
          <Price_display align="right" price={servicePrice} />
          <Popover
            placement="top"
            showArrow={true}
            isOpen={openPopover}
            triggerRef={triggerRef}
            onOpenChange={() => setOpenPopover(false)}
          >
            <div className="search-customer-parent flex mt-2" ref={triggerRef}>
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
            <PopoverContent
              onClick={() => {
                setOpenPendingModal(true), setOpenPopover(false);
              }}
              className="cursor-pointer"
            >
              <div className="px-1 py-2">
                <div className="text-tiny font-bold">
                  Pending Dues: {customer.dues.length}
                </div>
              </div>
            </PopoverContent>
          </Popover>
          {showDropDown && <DropDownMenu setShowDropDown={setShowDropDown} />}
          {/* <div className="grid p-3 grid-rows-2 grid-cols-2">
            <CustomerDetail detail="Pending" value="--" />
            <CustomerDetail detail="Advance" value="--" />
            <CustomerDetail detail="Last Visit" value="--" />
            <CustomerDetail detail="Membership" value="--" />
          </div> */}
          <div className="grid mt-6 p-3 grid-rows-1 grid-cols-4 gap-y-2 gap-x-2">
            {PricingInputArray.map((input) => (
              <PricingInput
                key={input}
                name={input}
                defaultValue={
                  pricing[input as keyof typeof pricing]?.toString() || ""
                }
              />
            ))}
            {customer?.membership?.status && (
              <Checkbox
                isSelected={applyMembership}
                onValueChange={setApplyMembership}
                size="sm"
              >
                Apply Membership Discount?
              </Checkbox>
            )}
          </div>
        </div>
        <div className="action-buttons-pricing w-full py-4 bg-[#fff] rounded-b-xl">
          <OnScreenKeyboard />
        </div>
      </div>
    </div>
  );
};

export default Pricing;
