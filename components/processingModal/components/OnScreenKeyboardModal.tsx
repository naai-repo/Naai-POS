"use client";
import { activeInputTagAtom } from "@/lib/atoms/activeInputTag";
import React, { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { Delete, X } from "lucide-react";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { pricingAtom } from "@/lib/atoms/pricing";
import { selectedTableIndexAtom } from "@/lib/atoms/selectedTableIndex";

const OnScreenKeyboardModal = () => {
  const keysArr = [
    "7",
    "8",
    "9",
    "4",
    "5",
    "6",
    "1",
    "2",
    "3",
    ".",
    "0",
    "backspace",
  ];
  const [activeInputTag, setActiveInputTag] =
    useRecoilState(activeInputTagAtom);
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
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
    if (activeInputTag) {
      if (value !== "backspace") {
        activeInputTag.value += value;
        console.log(activeInputTag.value)
        activeInputTag.focus();
      } else if (value === "backspace") {
        activeInputTag.value = activeInputTag.value.slice(0, -1);
        activeInputTag.focus();
      }
    }
  };
  return (
    <div className="on-screen-keyboard-container grid grid-rows-[repeat(4,minmax(0,3rem))] grid-cols-[repeat(3,minmax(0,3rem))] gap-4">
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
  );
};

export default OnScreenKeyboardModal;
