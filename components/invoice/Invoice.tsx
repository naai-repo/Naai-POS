import { Urls } from "@/lib/api";
import { dateOptions } from "@/lib/helper";
import { CustomerInfoInterface } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NaaiLogo from "../../public/imgs/logo.svg";

const Invoice = ({ booking, invoice }: { booking: any; invoice: String }) => {
  const [customer, setCustomer] = useState<CustomerInfoInterface>({
    id: "",
    gender: "",
    name: "",
    phoneNumber: "",
    dues: [],
    email: "",
    birthDate: "",
    aniversary: "",
  });
  useEffect(() => {
    async function fetchCustomer() {
      if (!booking || !booking.userId) return;
      let response = await axios.get(Urls.GetSingleUser + booking.userId);
      console.log(response.data.data);
      setCustomer(response.data.data);
    }
    fetchCustomer();
  }, [booking]);
  console.log(booking);
  return (
    <>
      <div className="parent-invoice w-fit m-auto border-2 border-black py-4">
        <div className="image-title flex justify-center mb-4">
          <Image src={NaaiLogo} alt="naai-logo" height={55} />
        </div>
        <div className="customer-info border-b-2 border-black border-t-2 p-4">
          <div className="flex justify-between">
            <div className="title font-semibold">Customer Name</div>
            <div className="value font-normal text-sm">: {customer.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Mobile No.</div>
            <div className="value font-normal text-sm">
              : {customer.phoneNumber}
            </div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Invoice No.</div>
            <div className="value font-normal text-sm">: {invoice}</div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Invoice Date.</div>
            <div className="value font-normal text-sm">
              :{" "}
              {new Date(booking?.createdAt).toLocaleString("en-In", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
        <div className="border-black border-b-2 p-2">
          <center>
            <table className="capitalize border-b-2 border-black text-sm">
              <tr className="border-y-2 border-black text-[0.95rem]">
                <th className="px-2 border-x-2 border-black">Service & Product</th>
                <th className="px-2 border-x-2 border-black">Provider</th>
                <th className="px-2 border-x-2 border-black">Rate</th>
                <th className="px-2 border-x-2 border-black">Dis</th>
                <th className="px-2 border-x-2 border-black">Qty</th>
                <th className="px-2 border-x-2 border-black">Total</th>
              </tr>
              {booking?.artistServiceMap.map((service: any) => (
                <tr key={service._id}>
                  <td className="px-2 border-x-2 border-black">{service.serviceName}</td>
                  <td className="px-2 border-x-2 border-black">{service.artistName}</td>
                  <td className="px-2 border-x-2 border-black">{(service.qty * service.discountedPrice).toFixed(2)}</td>
                  <td className="px-2 border-x-2 border-black">
                    {(
                      service.qty *
                      (service.servicePrice - service.discountedPrice)
                    ).toFixed(2)}
                  </td>
                  <td className="px-2 border-x-2 border-black">{service.qty}</td>
                  <td className="px-2 border-x-2 border-black">
                    {(
                      service.qty *
                      (service.discountedPrice + service.tax)
                    ).toFixed(2)}
                  </td>
                </tr>
              ))}
            </table>
          </center>
        </div>
        <div className="totalAmount border-b-2 border-black p-4">
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Amount</div>
            <div className="value font-normal text-sm">
              : {(booking?.paymentAmount + booking?.amountDue).toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Discount</div>
            <div className="value font-normal text-sm">
              : {(booking?.amount - booking?.paymentAmount).toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Tax</div>
            <div className="value font-normal text-sm">
              :{" "}
              {(booking?.paymentAmount - booking?.paymentAmount / 1.18).toFixed(
                2
              )}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Amount Paid</div>
            <div className="value font-normal text-sm">
              : {booking?.paymentAmount?.toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Amount Due</div>
            <div className="value font-normal text-sm">
              : {booking?.amountDue?.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-title m-auto w-fit">
            *****Thank You for Visiting Us!*****
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
