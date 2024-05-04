"use client";
import { activeInputTagAtom } from "@/lib/atoms/activeInputTag";
import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { Delete, X } from "lucide-react";

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
  const [activeInputTag, setActiveInputTag] =
    useRecoilState(activeInputTagAtom);
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
    console.log(value);
    if (activeInputTag) {
      if (value !== "backspace" && value !== "close") {
        activeInputTag.value += value;
        activeInputTag.focus();
      } else if (value === "backspace") {
        activeInputTag.value = activeInputTag.value.slice(0, -1);
        activeInputTag.focus();
      }else if(value === "close") {

      }
    }
  };
  return (
    <div
      className="on-screen-keyboard-container grid grid-rows-[repeat(3,minmax(0,4rem))] grid-cols-[repeat(5,minmax(0,4rem))] gap-4 absolute bottom-4 ml-4"
    >
      {keysArr.map((key) => (
        <div
          key={key}
          className="flex justify-center items-center bg-naai-pos-500 drop-shadow-md cursor-pointer"
          onClick={handleNumClick}
          data-key={key}
        >
          {key === "backspace" ? <Delete size={24} className="pointer-events-none"/> : key === "close" ? <X size={24} className="pointer-events-none" /> :  key}
        </div>
      ))}
    </div>
  );
};

export default OnScreenKeyboard;
