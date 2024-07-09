import { Urls } from "@/lib/api";
import { dateOptions } from "@/lib/helper";
import { CustomerInfoInterface } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NaaiLogo from "../../public/imgs/logo.svg"

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
            <Image src={NaaiLogo} alt="naai-logo" height={55}/>
        </div>
        <div className="customer-info border-b-2 border-black border-t-2">
          <div className="flex justify-between">
            <div className="title font-semibold">Customer Name</div>
            <div className="value font-normal">: {customer.name}</div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Mobile No.</div>
            <div className="value font-normal">: {customer.phoneNumber}</div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Invoice No.</div>
            <div className="value font-normal">: {invoice}</div>
          </div>
          <div className="flex justify-between">
            <div className="title font-semibold">Invoice Date.</div>
            <div className="value font-normal">
              :{" "}
              {new Date(booking?.createdAt).toLocaleString("en-In", {
                timeZone: "Asia/Kolkata",
                dateStyle: "medium",
                timeStyle: "short",
              })}
            </div>
          </div>
        </div>
        <div className="serviceTableHeader flex justify-evenly border-b-2 border-black">
          <div className="serviceTitle">Service & Product</div>
          <div className="serviceArtist">Provider</div>
          <div className="serviceRate">Rate</div>
          <div className="serviceDiscount">Dis</div>
          <div className="serviceQty">Qty</div>
          <div className="serviceTotal">Total</div>
        </div>
        <div className="serviceTableBody border-b-2 border-black">
          {booking?.artistServiceMap.map((service: any) => (
            <div
              className="serviceTableRow flex justify-between mb-2"
              key={service._id}
            >
              <div className="serviceTitle">{service.serviceName}</div>
              <div className="serviceArtist">{service.artistName}</div>
              <div className="serviceRate">
                {(service.qty * service.discountedPrice).toFixed(2)}
              </div>
              <div className="serviceDiscount">
                {(
                  service.qty *
                  (service.servicePrice - service.discountedPrice)
                ).toFixed(2)}
              </div>
              <div className="serviceQty">{service.qty}</div>
              <div className="serviceTotal">
                {(
                  service.qty *
                  (service.discountedPrice + service.tax)
                ).toFixed(2)}
              </div>
            </div>
          ))}
        </div>
        <div className="totalAmount border-b-2 border-black">
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Amount</div>
            <div className="value font-normal">
              : {(booking?.paymentAmount + booking?.amountDue).toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Discount</div>
            <div className="value font-normal">
              : {(booking?.amount - booking?.paymentAmount).toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Total Tax</div>
            <div className="value font-normal">
              :{" "}
              {(booking?.paymentAmount - booking?.paymentAmount / 1.18).toFixed(
                2
              )}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Amount Paid</div>
            <div className="value font-normal">
              : {(booking?.paymentAmount)?.toFixed(2)}
            </div>
          </div>
          <div className="info-wrapper flex justify-between">
            <div className="title font-semibold">Amount Due</div>
            <div className="value font-normal">
              : {(booking?.amountDue)?.toFixed(2)}
            </div>
          </div>
        </div>
        <div className="footer">
          <div className="footer-title m-auto w-fit">*****Thank You for Visiting Us!*****</div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
