"use client";
import { CalendarDate, getLocalTimeZone, today } from "@internationalized/date";
import { Button } from "@nextui-org/button";
import { Calendar } from "@nextui-org/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@nextui-org/popover";
import { useState } from "react";
import { Calendar as CalenderIcon } from "lucide-react";

const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };
  return date.toLocaleDateString("en-US", options);
};

const DateInput = () => {
  const defaultValue = today(getLocalTimeZone());
  return (
    <div>
        <Button
          startContent={<CalenderIcon size={"20px"} />}
          className="bg-white border-solid border border-gray-200 shadow-sm rounded-lg"
        >
          <h1 className="font-medium">
            {formatDate(defaultValue.toString())}
          </h1>
        </Button>
    </div>
  );
};

export default DateInput;
