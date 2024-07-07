"use client";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/modal";
import { currencyOptions } from "@/lib/helper";
import Price_display from "../pricing/components/Price_display";
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
import {
  CouponInterface,
  PaymentsInterface,
  SelectedServicesInterface,
} from "@/lib/types";
import RemarksModal from "./components/RemarksModal";
import {
  useRecoilState,
  useRecoilValue,
  useResetRecoilState,
  useSetRecoilState,
} from "recoil";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import axios from "axios";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { Urls } from "@/lib/api";
import { couponAtom } from "@/lib/atoms/coupons";
import useResetAllState from "@/lib/hooks/useResetAllState";
import { updatedSelectedServicesAtom } from "@/lib/atoms/updatedSelectedServices";
import { UpdatedSelectedServicesEnum } from "@/lib/enums";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import ClearDuesModal from "./components/ClearDuesModal";
import CustomerInfoModal from "./components/CustomerInfoModal";

const DisplayBillInfo = ({
  title,
  value,
  money = false,
  text = "xs",
}: {
  title: string;
  value: number | string;
  money?: boolean;
  text?: String;
}) => {
  return (
    <div className="display-bill-info-component flex justify-between items-center px-4">
      <div className={`title-name text-${text} capitalize`}>{title}</div>
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
  id = undefined,
  inputRef = undefined,
}: {
  title: string;
  dropDown?: boolean;
  options?: string[];
  setState: React.Dispatch<React.SetStateAction<number | string>>;
  id?: string;
  inputRef?: React.RefObject<HTMLInputElement>;
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
          <input
            type="number"
            min={0}
            onChange={handleOnChange}
            id={id ? id : undefined}
            ref={inputRef}
            className="pl-2"
          />
        )}
      </div>
    </div>
  );
};

const ProcessingModal = ({
  isOpen,
  setOpenProcessModal,
}: {
  isOpen: boolean;
  setOpenProcessModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [activeKey, setActiveKey] = useState<string | number | bigint>("");
  const [openClearDuesModal, setOpenClearDuesModal] = useState<boolean>(false);
  const [openCustomerInfo, setOpenCustomerInfo] = useState<boolean>(false);
  const [amountToBePaid, setAmountToBePaid] = useState(0);
  const [payments, setPayments] = useState<PaymentsInterface[]>([]);
  const [cashAmount, setCashAmount] = useState<number | string>(0);
  const [percentDisc, setPercentDisc] = useState<number | string>(0);
  const [percentCashDisc, setPercentCashDisc] = useState<number>(0);
  const [cashDisc, setCashDisc] = useState<number | string>(0);
  const [paymentMethod, setPaymentMethod] = useState<number | string>("cash");
  const [openRemarksModal, setOpenRemarksModal] = useState<boolean>(false);
  const [originalBillValue, setOriginalBillValue] = useState<number>(0);
  const [itemTotal, setItemTotal] = useState<number>(0);
  const [totalGst, setTotalGst] = useState<number>(0);
  const [finalAmount, setFinalAmount] = useState<number>(0);
  const [uniqueItems, setUniqueItems] = useState<number>(0);
  const [totalQty, setTotalQty] = useState<number>(0);
  const [coupon, setCoupon] = useState("");
  const selectedServices = useRecoilValue(selectedServiceAtom);
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const customer = useRecoilValue(customerInfoAtom);
  const [selectedCoupon, setSelectedCoupon] = useRecoilState(couponAtom);
  const [amountPaid, setAmountPaid] = useState(0);
  const resetSelectedCoupon = useResetRecoilState(couponAtom);
  const { resetAllState } = useResetAllState();
  const couponRef = React.useRef<HTMLInputElement>(null);
  const [initialSelectedServices, setInitialSelectedServices] = useState<
    SelectedServicesInterface[]
  >([]);
  const [updatedSelectedServices, setUpdatedSelectedServices] = useRecoilState(
    updatedSelectedServicesAtom
  );
  const percentDiscRef = useRef<HTMLInputElement>(null);
  const cashDiscRef = useRef<HTMLInputElement>(null);
  const cashAmountRef = useRef<HTMLInputElement>(null);
  const SALONID = useRecoilValue(salonIdAtom);
  // const [salonDiscount, setSalonDiscount] = useState<number | string>(0);

  useEffect(() => {
    if (couponRef.current) {
      couponRef.current.value = selectedCoupon.code;
    }
  }, [selectedCoupon, isOpen]);

  useEffect(() => {
    if(cashAmountRef.current){
      cashAmountRef.current.value = cashAmount.toString();
    }
  }, [cashAmount, isOpen]);

  useEffect(() => {
    let total: number = 0;
    payments.forEach((payment) => {
      total += Number(payment.amount);
    });
    setAmountPaid(total);
  }, [payments]);

  useEffect(() => {
    if (!percentDiscRef.current || !cashDiscRef.current) return;
    percentDiscRef.current.value = percentDisc.toString();
    cashDiscRef.current.value = cashDisc.toString();
  }, [percentDiscRef, cashDiscRef, percentDisc, cashDisc, isOpen]);

  // itemprice -> excluding gst
  // first calculate totalItemPrice
  // price after discount = totalItemPrice - discount
  // tax = (price after discount) * 0.18
  // final price = price after discount + tax
  // propotionally calculate price for each service

  useEffect(() => {
    function divideCashDiscount() {
      let totalItemPrice = 0;
      initialSelectedServices.map((service) => {
        totalItemPrice += service.price * service.qty; //total item price excluding gst
      });
      let totalItemPriceWithGst = totalItemPrice * 1.18;
      let totalDiscount =
        Number(cashDisc) +
        Number(percentCashDisc) +
        selectedCoupon.couponDiscount;
      let priceAfterDiscount = totalItemPriceWithGst - totalDiscount;
      setFinalAmount(Math.round(priceAfterDiscount * 100) / 100);
      priceAfterDiscount = priceAfterDiscount / 1.18;
      let totalTax = priceAfterDiscount * 0.18;
      setTotalGst(totalTax);

      setSelectedServices((prev) => {
        const newSelectedServices = prev.map((_, index) => {
          let item = initialSelectedServices[index];
          let discount =
            item.price - (item.price / totalItemPrice) * priceAfterDiscount;
          let newService = {
            ...item,
            price: item.price - discount,
            disc: item.disc + discount,
            tax: (item.price - discount) * 0.18,
          };
          return newService;
        });
        return newSelectedServices;
      });
    }
    divideCashDiscount();
  }, [
    cashDisc,
    percentCashDisc,
    selectedCoupon.couponDiscount,
    initialSelectedServices,
  ]);

  // useEffect(() => {
  //   function divideCashDiscount() {
  //     let totalDiscount: number =
  //       Number(cashDisc) +
  //       Number(percentCashDisc) +
  //       selectedCoupon.couponDiscount;
  //     let totalItemPrice = 0;

  //     initialSelectedServices.map((service) => {
  //       totalItemPrice += service.price * service.qty;
  //     });

  //     setSelectedServices((prev) => {
  //       const newSelectedServices = prev.map((service, index) => {
  //         let item = initialSelectedServices[index];
  //         let discount = (item.price / totalItemPrice) * totalDiscount;
  //         let newService = {
  //           ...item,
  //           price: item.price - discount,
  //           disc: item.disc + discount,
  //           tax: (item.price - discount) * 0.18,
  //         };
  //         return newService;
  //       });
  //       return newSelectedServices;
  //     });
  //   }
  //   divideCashDiscount();
  // }, [cashDisc, percentCashDisc, selectedCoupon.couponDiscount]);

  // console.log("DATA: ", selectedServices);

  // useEffect(() => {
  //   let newAmount = itemTotal + totalGst - selectedCoupon.couponDiscount - Number(cashDisc || 0) - amountPaid - percentCashDisc;
  //   setFinalAmount(newAmount - Number(salonDiscount));
  // }, [salonDiscount]);

  useEffect(() => {
    if (updatedSelectedServices !== UpdatedSelectedServicesEnum.NotUpdated) {
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
    let totalBasePrice = 0;
    let totalItemPrice = 0;
    let totalGST = 0;
    let totalQuantity = 0;
    selectedServices.map((service) => {
      totalBasePrice += service.basePrice * service.qty;
      totalItemPrice += service.price * service.qty;
      totalGST += service.price * service.qty * 0.18;
      totalQuantity += service.qty;
    });
    setOriginalBillValue(totalBasePrice);
    setItemTotal(totalItemPrice);
    // setTotalGst(totalGST);
    setFinalAmount(Math.round((totalItemPrice + totalGST) * 100) / 100);
    setTotalQty(totalQuantity);
    setUniqueItems(selectedServices.length);
    if (selectedServices.length === 0) {
      setFinalAmount(0);
      setCashDisc(0);
      setPercentCashDisc(0);
      setPercentDisc(0);
      setPayments([]);
      setAmountPaid(0);
      resetSelectedCoupon();
    }
  }, [selectedServices]);

  useEffect(() => {
    let newAmount =
      itemTotal +
      totalGst -
      selectedCoupon.couponDiscount -
      percentCashDisc -
      amountPaid;
    setFinalAmount(Math.round((newAmount - Number(cashDisc)) * 100) / 100);
  }, [cashDisc]);

  useEffect(() => {
    const debounceTime = setTimeout(() => {
      setFinalAmount(
        (prev) => (
          console.log(prev),
          setPercentCashDisc((Number(percentDisc) * prev) / 100),
          Math.round((prev - (Number(percentDisc) * prev) / 100) * 100) / 100
        )
      );
    }, 500);
    return () => clearTimeout(debounceTime);
  }, [percentDisc]);

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
    setFinalAmount((prev) => {
      console.log(prev - Number(cashAmount));
      return Math.round((prev - Number(cashAmount)) * 100) / 100;
    });
    let cashInput = document.getElementById("cash-amt") as HTMLInputElement;
    cashInput.value = "";
  };

  const handleRowSelection = (key: string | number | bigint) => {
    console.log("KEY: ", key)
    setActiveKey(key);
  };

  const handleDeleteRow = () => {
    if (activeKey !== "") {
      let newPayments = [];
      for (let index in payments) {
        if (payments[index].id.toString() !== activeKey) {
          newPayments.push(payments[index]);
        } else {
          setFinalAmount(
            (prev) =>
              Math.round((prev + Number(payments[index].amount)) * 100) / 100
          );
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
    setFinalAmount((prev) => Math.round((prev + totalPrice) * 100) / 100);
  };

  const handleProcessButton = async () => {
    if (customer.phoneNumber === "") {
      alert("Please Enter Customer Details");
      setOpenProcessModal(false);
      return;
    }
    let data = await axios.post(Urls.AddWalkinBooking, {
      salon: SALONID,
      selectedServices: selectedServices,
      customer: customer,
      bill: {
        originalAmount: originalBillValue * 1.18,
        finalInvoiceAmount: finalAmount,
        cashDisc: cashDisc,
        percentDisc: percentDisc,
        gst: totalGst,
        percentCashDisc: percentCashDisc,
        amountDue: finalAmount,
        duesCleared: amountToBePaid,
      },
      payments: payments,
      coupon: selectedCoupon,
    });
    console.log("Processing Payments");
    if (data) {
      console.log("Payment Procesed Successfully");
      let userDuesCleared = await axios.post(Urls.ClearDues, {
        userId: customer.id,
        salonId: SALONID,
        amountPaid: amountToBePaid,
      });
      console.log(userDuesCleared.data);
    }
    resetAllState(); // Reset all states
    setFinalAmount(0);
    setCashDisc(0);
    setPercentCashDisc(0);
    setPercentDisc(0);
    setPayments([]);
    setAmountPaid(0);
    setCashAmount(0);
    setAmountToBePaid(0);
    setOpenProcessModal(false);
    setInitialSelectedServices([]);
  };

  const handleAddingCoupons = async () => {
    try {
      if (selectedCoupon.code) {
        alert("Coupon Already Applied");
        return;
      }
      let res = await axios.get(
        `${Urls.FetchCoupon}?code=${coupon}&salonId=000000000000000000000000`
      );
      let data = res.data.data;
      if (data.count === 0) {
        alert("Invalid Coupon Code");
        return;
      }
      let newCoupon = {
        id: data.coupons[0]._id,
        code: data.coupons[0].code,
        discount: data.coupons[0].discount,
        expiryDate: data.coupons[0].expiryDate,
        salonId: data.coupons[0].salonId,
        min_cart_value: data.coupons[0].min_cart_value,
        max_value: data.coupons[0].max_value,
        isActive: data.coupons[0].isActive,
        couponDiscount: 0,
      };
      if (newCoupon.min_cart_value > finalAmount) {
        alert("Minimum Cart Value not met");
        return;
      }
      if (!newCoupon.isActive) {
        alert("Coupon Expired");
        return;
      }
      let discountValue = finalAmount * (newCoupon.discount / 100);
      if (discountValue > newCoupon.max_value) {
        setFinalAmount(
          Math.round((finalAmount - newCoupon.max_value - amountPaid) * 100) /
            100
        );
        newCoupon = {
          ...newCoupon,
          couponDiscount: newCoupon.max_value,
        };
      } else {
        setFinalAmount(
          Math.round((finalAmount - discountValue - amountPaid) * 100) / 100
        );
        newCoupon = {
          ...newCoupon,
          couponDiscount: discountValue,
        };
      }
      console.log(newCoupon.couponDiscount);
      setSelectedCoupon(newCoupon);
    } catch (err) {
      console.log(err);
      alert("Invalid Coupon Code");
    }
  };

  const handleCancelingCoupons = () => {
    setFinalAmount(
      Math.round((finalAmount + selectedCoupon.couponDiscount) * 100) / 100
    );
    resetSelectedCoupon();
    setCoupon("");
  };

  return (
    <>
      <CustomerInfoModal isOpen={openCustomerInfo} setIsOpen={setOpenCustomerInfo} />
      <ClearDuesModal
        isOpen={openClearDuesModal}
        setIsOpen={setOpenClearDuesModal}
        amountToBePaid={amountToBePaid}
        setAmountToBePaid={setAmountToBePaid}
      />
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
          base: "h-[100%] max-h-[98%]",
        }}
        scrollBehavior="inside"
      >
        <ModalContent className="bg-naai-pos-500 rounded-2xl shadow-inner">
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Payment</ModalHeader>
              <ModalBody>
                <Price_display align="center" price={finalAmount} />
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
                        onChange={(e) => setCoupon(e.target.value)}
                        ref={couponRef}
                      />
                    </div>
                    <div className="action-buttons-coupons flex justify-between items-center w-[20%]">
                      <div
                        className="tick-mark h-7 w-7 grid place-items-center shadow-md "
                        onClick={handleAddingCoupons}
                      >
                        <Check color="green" />
                      </div>
                      <div
                        className="cross-mark h-7 w-7 grid place-items-center shadow-md"
                        onClick={handleCancelingCoupons}
                      >
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
                        inputRef={percentDiscRef}
                      />
                      <DisplayInfoWithInbox
                        title="cash"
                        setState={setCashDisc}
                        inputRef={cashDiscRef}
                      />
                      {/* <DisplayInfoWithInbox
                        title="Roundoff"
                        setState={setSalonDiscount}
                      /> */}
                    </div>
                    <div className="discount-container relative border border-black px-4 pt-4 pb-12 mt-4">
                      <div className="absolute capitalize top-[-12px] w-fit bg-naai-pos-200 text-sm">
                        Payment Options
                      </div>
                      <DisplayInfoWithInbox
                        title="Cash Amount: "
                        setState={setCashAmount}
                        inputRef={cashAmountRef}
                        id="cash-amt"
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
                    {/* <div className="balance-tab px-6 py-8">
                      <div className="display-bill-info-component flex justify-between items-center px-4">
                        <div className="title-name text-lg font-semibold capitalize">
                          balance
                        </div>
                        <div className="value">
                          {(0).toLocaleString("en-In", currencyOptions)}
                        </div>
                      </div>
                    </div> */}
                  </div>
                  <div className="right-container p-2 relative">
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
                    <div className="parent-div absolute bottom-0 w-full">
                      <div className="amount-paid border w-[90%] border-black py-2 mb-2">
                        <DisplayBillInfo
                          title="amount paid"
                          value={amountPaid}
                          money={true}
                          text="md"
                        />
                      </div>
                      {amountToBePaid > 0 ? (
                        <div className="amount-paid border w-[90%] border-black py-2 ">
                          <DisplayBillInfo
                            title="Dues Cleared"
                            value={amountToBePaid}
                            money={true}
                            text="md"
                          />
                        </div>
                      ) : null}
                    </div>
                    {/* <div className="keyboard-container relative mt-2">
                      <OnScreenKeyboardModal />
                    </div> */}
                  </div>
                  <div className="action-buttons w-[18%] flex flex-col justify-end items-end">
                  <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md"
                      onClick={() => setOpenCustomerInfo(true)}
                    >
                      Customer Info
                    </Button>
                    <Button
                      size="lg"
                      className="w-full bg-naai-primary text-white rounded-md mt-2"
                      onClick={() => setOpenClearDuesModal(true)}
                    >
                      Clear Dues
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
                      onClick={handleProcessButton}
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
                    classNames={{
                      
                      tr: `rounded-lg data-[val="${activeKey}"]:bg-yellow-200`,
                    }}
                  >
                    <TableHeader>
                      <TableColumn>Payment Type</TableColumn>
                      <TableColumn>Amount</TableColumn>
                      <TableColumn>Remarks</TableColumn>
                    </TableHeader>
                    <TableBody emptyContent={"No rows to display."}>
                      {payments.map((payment: PaymentsInterface) => (
                        <TableRow key={payment.id} data-val={payment.id}>
                          <TableCell className="rounded-l-lg">{payment.type}</TableCell>
                          <TableCell>
                            {payment.amount.toLocaleString(
                              "en-In",
                              currencyOptions
                            )}
                          </TableCell>
                          <TableCell className="rounded-r-lg">{payment.remarks}</TableCell>
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
