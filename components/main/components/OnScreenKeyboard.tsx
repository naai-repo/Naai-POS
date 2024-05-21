"use client";
import { activeInputTagAtom } from "@/lib/atoms/activeInputTag";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Delete, HandCoins, X } from "lucide-react";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { pricingAtom } from "@/lib/atoms/pricing";
import { selectedTableIndexAtom } from "@/lib/atoms/selectedTableIndex";
import { Button } from "@nextui-org/button";
import ProcessingModal from "@/components/processingModal/ProcessingModal";

const OnScreenKeyboard = () => {
  const keysArr = [
    "7",
    "8",
    "9",
    "close",
    "update",
    "4",
    "5",
    "6",
    "backspace",
    "cancel",
    "1",
    "2",
    "3",
    "0",
  ];

  const [openProcessModal, setOpenProcessModal] = useState(false);
  const [activeInputTag, setActiveInputTag] =
    useRecoilState(activeInputTagAtom);
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const [pricing, setPricing] = useRecoilState(pricingAtom);
  const selectedTableIndex = useRecoilValue(selectedTableIndexAtom);
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
  }, [setActiveInputTag]);

  const handleNumClick = (e: React.MouseEvent<HTMLDivElement>) => {
    const value = e.currentTarget.dataset.key;
    if (value === "close") {
      setSelectedServices([]);
      setPricing({
        Qty: undefined,
        Price: undefined,
        GST: undefined,
        Disc: undefined,
      });
      return;
    } else if (value === "update") {
      setSelectedServices((prev) => {
        const newSelectedServices = prev.map((item, index) => {
          if (index === selectedTableIndex) {
            return {
              ...item,
              qty: pricing.Qty ?? 0,
              price: (pricing.Price ?? item.price) - (pricing.Disc ?? 0),
              disc: pricing.Disc ?? 0,
            };
          }
          return item;
        });
        console.log("NEW: ", newSelectedServices);
        return newSelectedServices;
      });
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
  return (
    <div className="flex w-full justify-between">
      <div className="on-screen-keyboard-parent">
        <div className="on-screen-keyboard-container grid grid-rows-[repeat(3,minmax(0,4rem))] grid-cols-[repeat(5,minmax(0,4rem))] gap-4 relative bottom-4 ml-4">
          {keysArr.map((key) => (
            <div
              key={key}
              className="flex justify-center items-center bg-naai-pos-500 drop-shadow-md cursor-pointer"
              onClick={handleNumClick}
              data-key={key}
            >
              {key === "backspace" ? (
                <Delete size={24} className="pointer-events-none" />
              ) : key === "close" ? (
                <X size={24} className="pointer-events-none" />
              ) : (
                key
              )}
            </div>
          ))}
        </div>
      </div>
      <Button className="h-[4rem] rounded-md flex justify-center items-center bg-naai-pos-500 drop-shadow-md cursor-pointer mr-4" onClick={() => setOpenProcessModal(true)}>
        <HandCoins /> Process{" "}
        <ProcessingModal isOpen={openProcessModal} setOpenProcessModal={setOpenProcessModal} />
      </Button>
    </div>
  );
};

export default OnScreenKeyboard;
