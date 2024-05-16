"use client";
import React, { useState } from "react";
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
import { Checkbox } from "@nextui-org/react";
import {Table, TableHeader, TableColumn, TableBody, TableRow, TableCell} from "@nextui-org/react";
import OnScreenKeyboardModal from "./components/OnScreenKeyboardModal";
import { PaymentsInterface } from "@/lib/types";

const DisplayBillInfo = ({
  title,
  value,
  money=false,
}: {
  title: string;
  value: number | string;
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

const DisplayInfoWithInbox = ({title, dropDown=false, options=[], setState} : {title : string, dropDown? : boolean, options?: string[], setState : React.Dispatch<React.SetStateAction<number | string>>}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setState(e.target.value);
  }
  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement> ) => {
    setState(e.target.value);
  }
  return (
    <div className="display-info-with-inbox flex items-center mb-4">
      <div className="title-name text-md font-semibold capitalize w-1/3">
        {title}
      </div>
      <div className="value w-2/3 bg-white">
        {dropDown ? (
          <select onChange={handleOnChangeSelect}>
            {
              options.map((option, index) => (
                <option key={index} value={option}>{option}</option>
              ))
            }
          </select>
        ) : (
          <input type="number" min={0} onChange={handleOnChange} />
        )}
      </div>
    </div>
  );
}

const ProcessingModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [payments, setPayments] = useState<PaymentsInterface[]>([]);
  const [cashAmount, setCashAmount] = useState<number | string>(0);
  const [paymentMethod, setPaymentMethod] = useState<number | string>("cash");

  const handleAddingPayments = () => {
    console.log("Payment: ", paymentMethod);
    console.log("cashAmount: ", cashAmount);
    setPayments([...payments, {
      id: payments.length + 1,
      type: paymentMethod as string,
      amount: cashAmount as number,
      remarks: "",
    }]);
  }
  return (
    <Modal size={"3xl"} isOpen={true} onClose={onClose} classNames={
      {
        base: "h-[90%]",
      } 
    }
    scrollBehavior="inside"
    >
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
                    <input
                      type="email"
                      placeholder="Enter Coupon Code"
                      className="p-4"
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
              <div className="info-container flex">
                <div className="left-container w-1/2">
                  <div className="discount-container relative border border-black px-4 pt-4">
                    <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                      discount
                    </div>
                    <DisplayInfoWithInbox title="Percent %" setState={setCashAmount}/>
                    <DisplayInfoWithInbox title="cash" setState={setCashAmount}/>
                  </div>
                  <div className="discount-container relative border border-black px-4 pt-4 pb-12 mt-4">
                    <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                      Payment Options
                    </div>
                    <DisplayInfoWithInbox title="Cash Amount: " setState={setCashAmount}/>
                    <DisplayInfoWithInbox title="Payment Type: " dropDown={true} options={["Cash", "Wallet", "UPI"]} setState={setPaymentMethod}/>
                    <Button onClick={handleAddingPayments} size="md" className="shadow-2xl bg-naai-primary text-white rounded-md absolute right-4">Add</Button>
                  </div>
                  <div className="balance-tab px-6 py-8">
                    <div className="display-bill-info-component flex justify-between items-center px-4">
                      <div className="title-name text-lg font-semibold capitalize">balance</div>
                      <div className="value">
                        {
                          (0).toLocaleString("en-In", currencyOptions)
                        }
                      </div>
                    </div>
                  </div>
                </div>
                <div className="right-container p-2">
                  <div className="title capitalize text-lg text-gray-400 font-semibold flex">
                    <Checkbox defaultSelected size="sm"></Checkbox>
                    <div className="title-text">
                      membership discount
                    </div>
                  </div>
                  <div className="membership-details">
                    <DisplayBillInfo title="Membership Disc: " value={0} money={true} />
                    <DisplayBillInfo title="customer name" value={"--"} />
                    <DisplayBillInfo title="pending amount" value={0} money={true}/>
                    <DisplayBillInfo title="wallet amount" value={0} money={true}/>
                    <DisplayBillInfo title="wallet mem. amount" value={0} money={true}/>
                  </div>
                  <div className="keyboard-container relative mt-2">
                    <OnScreenKeyboardModal />
                  </div>
                </div>
              </div>
              <div className="payments-table">
                <Table aria-label="Example empty table">
                  <TableHeader>
                    <TableColumn>Payment Type</TableColumn>
                    <TableColumn>Amount</TableColumn>
                    <TableColumn>Remarks</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No rows to display."}>{
                    payments.map((payment : PaymentsInterface) => (
                      <TableRow key={payment.id}>
                        <TableCell>{payment.type}</TableCell>
                        <TableCell>{payment.amount.toLocaleString("en-In", currencyOptions)}</TableCell>
                        <TableCell>{payment.remarks}</TableCell>
                      </TableRow>
                    ))
                  }</TableBody>
                </Table>
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

