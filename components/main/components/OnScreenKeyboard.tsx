"use client";
import { activeInputTagAtom } from "@/lib/atoms/activeInputTag";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { Delete, HandCoins, PackageOpen, RefreshCcw, SquarePen, X } from "lucide-react";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { pricingAtom } from "@/lib/atoms/pricing";
import { selectedTableIndexAtom } from "@/lib/atoms/selectedTableIndex";
import { Button } from "@nextui-org/button";
import ProcessingModal from "@/components/processingModal/ProcessingModal";
import HoldServicesModal from "./HoldServicesModal";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { holdDataAtom } from "@/lib/atoms/holdData";
import { HoldDataInterface } from "@/lib/types";
import { updatedSelectedServicesAtom } from "@/lib/atoms/updatedSelectedServices";
import { UpdatedSelectedServicesEnum } from "@/lib/enums";
import useResetAllState from "@/lib/hooks/useResetAllState";

const OnScreenKeyboard = () => {
  const keysArr = [
    // "7",
    // "8",
    // "9",
    "update",
    "close",
    // "4",
    // "5",
    // "6",
    // "backspace",
    // "cancel",
    // "1",
    // "2",
    // "3",
    // "0",
  ];

  const [openProcessModal, setOpenProcessModal] = useState(false);
  const [openHoldModal, setOpenHoldModal] = useState(false);
  
  // ATOMS to hold state
  const [activeInputTag, setActiveInputTag] =
    useRecoilState(activeInputTagAtom);
  const selectedServices = useRecoilValue(selectedServiceAtom);
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const resetSelectedServices = useResetRecoilState(selectedServiceAtom);
  const [pricing, setPricing] = useRecoilState(pricingAtom);
  const resetPricing = useResetRecoilState(pricingAtom);
  const selectedTableIndex = useRecoilValue(selectedTableIndexAtom);
  const resetSelectedTableIndex = useResetRecoilState(selectedTableIndexAtom)
  const customer = useRecoilValue(customerInfoAtom);
  const resetCustomer = useResetRecoilState(customerInfoAtom);
  const setHoldData = useSetRecoilState(holdDataAtom);
  const setUpdatedSelectedServices = useSetRecoilState(updatedSelectedServicesAtom);
  const {resetAllState} = useResetAllState();
  useEffect(() => {
    const inputs = document.querySelectorAll("input");
    function selectInputTags() {
      inputs.forEach((input) => {
        input.addEventListener("click", () => {
          setActiveInputTag(input);
        });
      });
    }
    selectInputTags();
    setHoldData(JSON.parse(localStorage.getItem("holdData") || "[]"));
  }, [setActiveInputTag, setHoldData]);

  const handleNumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.dataset.key;
    if (value === "close") {
      resetAllState();
      return;
    } else if (value === "update") {
      setUpdatedSelectedServices(UpdatedSelectedServicesEnum.Updated);
      setSelectedServices((prev) => {
        const newSelectedServices = prev.map((item, index) => {
          if (index === selectedTableIndex) {
            return {
              ...item,
              qty: pricing.Qty ?? 0,
              price: (pricing.Price ?? item.price) - (pricing.Disc ?? 0),
              tax: ((pricing.Price ?? item.price) - (pricing.Disc ?? 0)) * 0.18,
              disc: pricing.Disc ?? 0,
            };
          }
          return item;
        });
        console.log("NEW: ", newSelectedServices);
        return newSelectedServices;
      });
      resetPricing();
      
      resetSelectedTableIndex();
      return;
    }

    if (activeInputTag) {
      if (
        value !== "backspace" &&
        value !== "close" &&
        value !== "update" &&
        value !== "cancel"
      ) {
        activeInputTag.value += value;
        activeInputTag.focus();
      } else if (value === "backspace") {
        activeInputTag.value = activeInputTag.value.slice(0, -1);
        activeInputTag.focus();
      }
    }
  };

  const handleHoldFunction = () => {
    if(customer.phoneNumber === "") 
      return alert("Please fill the customer details");

    let holdData: Array<string> = JSON.parse(localStorage.getItem("holdData") || "[]");
    let date = new Date().toLocaleString("en-in", {timeZone: "Asia/Kolkata"});
    let title = `${customer.name} - ${customer.phoneNumber} - ${date} - ${selectedServices.length}`;
    const data: HoldDataInterface = {
      title,
      selectedServices,
      customerInfo: customer,
    }
    holdData.push(JSON.stringify(data));
    console.log("HOLDDATA: ", holdData);
    console.log("DATA: ", data);
    setHoldData(holdData);
    localStorage.setItem("holdData", JSON.stringify(holdData));
    resetSelectedServices();
    resetPricing();
    resetCustomer();
    let searchCustomer = document.getElementById("search-customer") as HTMLInputElement;
    searchCustomer.value = "";
  }

  const handleProcessButton = () => {
    console.log(customer);
    if(customer.phoneNumber === "")
      return alert("Please fill the customer details");

    setOpenProcessModal(true);
  }

  // CSS for full keyboard
  // on-screen-keyboard-container grid grid-rows-[repeat(3,minmax(0,4rem))] grid-cols-[repeat(5,minmax(0,4rem))] gap-4 relative bottom-4 ml-4

  return (
    <div className="flex w-full justify-between relative bottom-0">
      <div className="on-screen-keyboard-parent w-full pr-4">
        <div className="on-screen-keyboard-container text-white flex justify-between relative ml-4">
          <HoldServicesModal isOpen={openHoldModal} setOpenHoldModal={setOpenHoldModal}/>
          <ProcessingModal isOpen={openProcessModal} setOpenProcessModal={setOpenProcessModal} /> 
          <Button className="h-[4rem] w-[7.5rem] rounded-md flex text-white justify-center items-center bg-[#db5a11] drop-shadow-md cursor-pointer" onClick={() => setOpenHoldModal(true)}>
            <RefreshCcw /> Load{" "}
          </Button>
          <Button className="h-[4rem] w-[7.5rem] rounded-md flex text-white justify-center items-center bg-[#db11a2] drop-shadow-md cursor-pointer" onClick={handleHoldFunction}>
            <PackageOpen /> Hold{" "}
          </Button>
          {keysArr.map((key) => (
            <div
              key={key}
              className={`flex justify-center capitalize font-normal text-small items-center w-[7.5rem] drop-shadow-md cursor-pointer rounded-md h-[4rem]" + ${(key === "close" ? "bg-[#db1111]" : key === "update" ? "bg-[#1192db]" : "")}`}
              onClick={handleNumClick}
              data-key={key}
            >
              {key === "backspace" ? (
                <Delete size={24} className="pointer-events-none" />
              ) : key === "close" ? (
                <>
                  <X size={24} className="pointer-events-none" />
                  Clear All
                </>
              ) : key === "update" ? (
                <>
                <SquarePen /> &nbsp;
                update
                </>
              ) :(
                key
              )}
            </div>
          ))}
          <Button className="h-[4rem] w-[7.5rem] text-white rounded-md flex justify-center items-center bg-[#189c09] drop-shadow-md cursor-pointer" onClick={() => handleProcessButton()}>
            <HandCoins /> Process{" "}
          </Button>
        </div>
      </div>
      <div className="loading-buttons-container flex">
      </div>
    </div>
  );
};

export default OnScreenKeyboard;
