"use client";
import React, { useEffect, useState } from "react";
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
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import OnScreenKeyboardModal from "./components/OnScreenKeyboardModal";
import { PaymentsInterface } from "@/lib/types";
import RemarksModal from "./components/RemarksModal";
import { useRecoilState, useRecoilValue } from "recoil";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";

const DisplayBillInfo = ({
  title,
  value,
  money = false,
}: {
  title: string;
  value: number | string;
  money?: boolean;
}) => {
  return (
    <div className="display-bill-info-component flex justify-between items-center px-4">
      <div className="title-name text-xs capitalize">{title}</div>
      <div className="value">
        {money ? value.toLocaleString("en-In", currencyOptions) : value}
      </div>
    </div>
  );
};

const DisplayInfoWithInbox = ({
  title,
  dropDown = false,
  options = [],
  setState,
}: {
  title: string;
  dropDown?: boolean;
  options?: string[];
  setState: React.Dispatch<React.SetStateAction<number | string>>;
}) => {
  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setState(e.target.value);
  };
  const handleOnChangeSelect = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };
  return (
    <div className="display-info-with-inbox flex items-center mb-4">
      <div className="title-name text-md font-semibold capitalize w-1/3">
        {title}
      </div>
      <div className="value w-2/3 bg-white">
        {dropDown ? (
          <select onChange={handleOnChangeSelect}>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </select>
        ) : (
          <input type="number" min={0} onChange={handleOnChange} />
        )}
      </div>
    </div>
  );
};

const ProcessingModal = ({isOpen, setOpenProcessModal} : {isOpen: boolean, setOpenProcessModal: React.Dispatch<React.SetStateAction<boolean>>}) => {
  const [activeKey, setActiveKey] = useState<string | number | bigint>("");
  const [payments, setPayments] = useState<PaymentsInterface[]>([]);
  const [cashAmount, setCashAmount] = useState<number | string>(0);
  const [percentDisc, setPercentDisc] = useState<number | string>(0)
  const [percentCashDisc, setPercentCashDisc] = useState<number>(0)
  const [cashDisc, setCashDisc] = useState<number | string>(0)
  const [paymentMethod, setPaymentMethod] = useState<number | string>("cash");
  const [openRemarksModal, setOpenRemarksModal] = useState<boolean>(false);
  const [originalBillValue, setOriginalBillValue] = useState<number>(0);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [totalGst, setTotalGst] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [uniqueItems, setUniqueItems] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);
  const selectedServices = useRecoilValue(selectedServiceAtom);
  
  useEffect(() => {
    let totalBasePrice = 0;
    let totalItemPrice = 0;
    let totalGST = 0;
    let totalQuantity = 0;
    selectedServices.map((service) => {
      totalBasePrice += service.basePrice * service.qty;
      totalItemPrice += service.price * service.qty;
      totalGST += service.price * service.qty * 0.18;
      totalQuantity += service.qty;
    })
    setOriginalBillValue(totalBasePrice);
    setItemTotal(totalItemPrice);
    setTotalGst(totalGST);
    setFinalAmount((totalItemPrice + totalGST));
    setTotalQty(totalQuantity);
    setUniqueItems(selectedServices.length);
    if(Number(cashDisc) !== 0){
      setFinalAmount((prev) => prev - Number(cashDisc));
    }else{
      setCashDisc(0);
    }
    if(Number(percentDisc) !== 0){
      setFinalAmount((prev) => (
        setPercentCashDisc((Number(percentDisc) * prev) / 100),
        prev - (Number(percentDisc) * prev) / 100
      ));
    }else{
      setPercentCashDisc(0);
      setPercentDisc(0);
    }
  }, [selectedServices, cashDisc, percentDisc]);

  const handleAddingPayments = () => {
    setPayments([
      ...payments,
      {
        id: payments.length + 1,
        type: paymentMethod as string,
        amount: cashAmount as number,
        remarks: "",
      },
    ]);
    setFinalAmount((prev) => prev - Number(cashAmount));
  };

  const handleRowSelection = (key: string | number | bigint) => {
    setActiveKey(key);
  };

  const handleDeleteRow = () => {
    if (activeKey !== "") {
      let newPayments = [];
      for(let index in payments){
        if(payments[index].id.toString() !== activeKey){
          newPayments.push(payments[index]);
        }else{
          setFinalAmount((prev) => prev + Number(payments[index].amount));
        }
      }
      for (let index in newPayments) {
        newPayments[index].id = parseInt(index) + 1;
      }
      setPayments(newPayments);
    }
    setActiveKey("");
  };

  const handleCancelButton = () => {
    let totalPrice = 0;
    payments.map((payment) => {
      totalPrice += Number(payment.amount);
    });
    setPayments([]);
    setFinalAmount((prev) => prev + totalPrice);
  };

  return (
    <>
      <RemarksModal
        isOpen={openRemarksModal}
        setOpenRemarksModal={setOpenRemarksModal}
        activeKey={activeKey}
        payments={payments}
        setPayments={setPayments}
      />
      <Modal
        size={"3xl"}
        isOpen={isOpen}
        onClose={() => setOpenProcessModal(false)}
        classNames={{
          base: "h-[90%]",
        }}
        scrollBehavior="inside"
      >
        <ModalContent className="bg-naai-pos-500 rounded-2xl shadow-inner">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Payment</ModalHeader>
              <ModalBody>
                <Price_display align="center" price = {finalAmount}/>
                <div className="bill-information grid grid-cols-3 grid-rows-2 border-b-black border-b">
                  <DisplayBillInfo
                    title="Original Bill Value"
                    value={originalBillValue}
                    money={true}
                  />
                  <DisplayBillInfo
                    title="item Total"
                    value={itemTotal}
                    money={true}
                  />
                  <DisplayBillInfo
                    title="total GST"
                    value={totalGst}
                    money={true}
                  />
                  <DisplayBillInfo
                    title="% disc Amount"
                    value={percentCashDisc}
                    money={true}
                  />
                  <DisplayBillInfo
                    title="cash Disc Amount"
                    value={Number(cashDisc)}
                    money={true}
                  />
                  <DisplayBillInfo
                    title="final invoice amount"
                    value={finalAmount}
                    money={true}
                  />
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
                    <DisplayBillInfo title="Unique Items" value={uniqueItems} />
                    <DisplayBillInfo title="Total Quantity" value={totalQty} />
                  </div>
                </div>
                <div className="info-container flex">
                  <div className="left-container w-1/2">
                    <div className="discount-container relative border border-black px-4 pt-4">
                      <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                        discount
                      </div>
                      <DisplayInfoWithInbox
                        title="Percent %"
                        setState={setPercentDisc}
                      />
                      <DisplayInfoWithInbox
                        title="cash"
                        setState={setCashDisc}
                      />
                    </div>
                    <div className="discount-container relative border border-black px-4 pt-4 pb-12 mt-4">
                      <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                        Payment Options
                      </div>
                      <DisplayInfoWithInbox
                        title="Cash Amount: "
                        setState={setCashAmount}
                      />
                      <DisplayInfoWithInbox
                        title="Payment Type: "
                        dropDown={true}
                        options={["Cash", "Wallet", "UPI"]}
                        setState={setPaymentMethod}
                      />
                      <Button
                        onClick={handleAddingPayments}
                        size="md"
                        className="shadow-2xl bg-naai-primary text-white rounded-md absolute right-4"
                      >
                        Add
                      </Button>
                    </div>
                    <div className="balance-tab px-6 py-8">
                      <div className="display-bill-info-component flex justify-between items-center px-4">
                        <div className="title-name text-lg font-semibold capitalize">
                          balance
                        </div>
                        <div className="value">
                          {(0).toLocaleString("en-In", currencyOptions)}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="right-container p-2">
                    <div className="title capitalize text-lg text-gray-400 font-semibold flex">
                      <Checkbox defaultSelected size="sm"></Checkbox>
                      <div className="title-text">membership discount</div>
                    </div>
                    <div className="membership-details">
                      <DisplayBillInfo
                        title="Membership Disc: "
                        value={0}
                        money={true}
                      />
                      <DisplayBillInfo title="customer name" value={"--"} />
                      <DisplayBillInfo
                        title="pending amount"
                        value={0}
                        money={true}
                      />
                      <DisplayBillInfo
                        title="wallet amount"
                        value={0}
                        money={true}
                      />
                      <DisplayBillInfo
                        title="wallet mem. amount"
                        value={0}
                        money={true}
                      />
                    </div>
                    <div className="keyboard-container relative mt-2">
                      <OnScreenKeyboardModal />
                    </div>
                  </div>
                  <div className="action-buttons w-[18%] flex flex-col justify-end items-end">
                    <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md"
                    >
                      Details
                    </Button>
                    {activeKey !== "" ? (
                      <Button
                        size="lg"
                        className="w-full bg-naai-primary text-white rounded-md mt-2"
                        onClick={handleDeleteRow}
                      >
                        Delete Row
                      </Button>
                    ) : (
                      <Button
                        size="lg"
                        className="w-full bg-naai-primary text-white rounded-md mt-2"
                        isDisabled
                      >
                        Delete Row
                      </Button>
                    )}
                    <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md mt-2"
                      onClick={handleCancelButton}
                    >
                      Cancel
                    </Button>
                    <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md mt-2"
                      onClick={() => setOpenRemarksModal(true)}
                    >
                      Remarks
                    </Button>
                    <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md mt-2"
                    >
                      Process
                    </Button>
                  </div>
                </div>
                <div className="payments-table">
                  <Table
                    aria-label="Example empty table"
                    selectionMode="single"
                    selectionBehavior="toggle"
                    onRowAction={(key) => handleRowSelection(key)}
                  >
                    <TableHeader>
                      <TableColumn>Payment Type</TableColumn>
                      <TableColumn>Amount</TableColumn>
                      <TableColumn>Remarks</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {payments.map((payment: PaymentsInterface) => (
                        <TableRow key={payment.id} data-key={payment.id}>
                          <TableCell>{payment.type}</TableCell>
                          <TableCell>
                            {payment.amount.toLocaleString(
                              "en-In",
                              currencyOptions
                            )}
                          </TableCell>
                          <TableCell>{payment.remarks}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProcessingModal;
