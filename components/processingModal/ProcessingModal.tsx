"use client";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/modal";
import { currencyOptions } from "@/lib/helper";
import Price_display from "../pricing/components/Price_display";
import { Input } from "@nextui-org/input";
import { Check, X } from "lucide-react";
import { Button } from "@nextui-org/button";

const DisplayBillInfo = ({
  title,
  value,
  money=false,
}: {
  title: string;
  value: number;
  money?: boolean;
}) => {
  return (
    <div className="display-bill-info-component flex justify-between items-center px-4">
      <div className="title-name text-xs capitalize">{title}</div>
      <div className="value">
        {
          money ? value.toLocaleString("en-In", currencyOptions) : value
        }
      </div>
    </div>
  );
};

const DisplayInfoWithInbox = ({title} : {title : string}) => {
  return (
    <div className="display-info-with-inbox flex items-center mb-4">
      <div className="title-name text-md font-semibold capitalize w-1/3">{title}</div>
      <div className="value w-2/3 bg-white">
      <Input
        type="number"
        min={0}
      />
      </div>
    </div>
  );
}

const ProcessingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  return (
    <Modal size={"3xl"} isOpen={true} onClose={onClose}>
      <ModalContent className="bg-naai-pos-500 rounded-2xl shadow-inner">
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Payment</ModalHeader>
            <ModalBody>
              <Price_display align="center" />
              <div className="bill-information grid grid-cols-3 grid-rows-2 border-b-black border-b">
                <DisplayBillInfo title="Original Bill Value" value={6375} money={true} />
                <DisplayBillInfo title="item Total" value={5623.68} money={true} />
                <DisplayBillInfo title="total GST" value={144.68} money={true} />
                <DisplayBillInfo title="% disc Amount" value={628.8} money={true} />
                <DisplayBillInfo title="cash Disc Amount" value={36} money={true} />
                <DisplayBillInfo title="final invoice amount" value={5700} money={true} />
              </div>
              <div className="coupon-code-container flex items-center">
                <div className="coupon-code flex items-center w-1/2 border border-black">
                  <div className="input-tag w-[80%] mr-4">
                    <Input
                      type="email"
                      label="Coupon Code"
                      placeholder="Enter Coupon Code"
                    />
                  </div>
                  <div className="action-buttons-coupons flex justify-between items-center w-[20%]">
                    <div className="tick-mark h-7 w-7 grid place-items-center shadow-md ">
                      <Check color="green" />
                    </div>
                    <div className="cross-mark h-7 w-7 grid place-items-center shadow-md">
                      <X color="red" />
                    </div>
                  </div>
                </div>
                <div className="extra-info-tab grid grid-cols-2 grid-rows-1 w-1/2 border border-black py-4">
                  <DisplayBillInfo title="Unique Items" value={3} />
                  <DisplayBillInfo title="Total Quantity" value={3} />
                </div>
              </div>
              <div className="discount-container relative border border-black px-4 pt-4 w-1/2">
                <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                  discount
                </div>
                <DisplayInfoWithInbox title="Percent %"/>
                <DisplayInfoWithInbox title="cash"/>
              </div>
              <div className="discount-container relative border border-black px-4 pt-4 w-1/2">
                <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                  Payment Options
                </div>
                <DisplayInfoWithInbox title="Cash Amount: "/>
                <DisplayInfoWithInbox title="Payment Type: "/>
                <div className="button-div flex content-end w-full">
                  <Button size="md" className="shadow-xl border border-black rounded-md">Add</Button>
                </div>
              </div>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ProcessingModal;

