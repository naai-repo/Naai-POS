import { Urls } from "@/lib/api";
import { dateOptions } from "@/lib/helper";
import { CustomerInfoInterface } from "@/lib/types";
import axios from "axios";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import NaaiLogo from "../../public/imgs/logo.svg";

const ServiceRow = ({ service, excludeGst }: { service: any, excludeGst: any }) => {
  return (
    <tr key={service._id} className="border-b-1 border-black">
      <td className="px-2 border-x-2 border-black">{service.serviceName}</td>
      <td className="px-2 border-x-2 border-black">{service.artistName}</td>
      {excludeGst ? (
        <td className="px-2 border-x-2 border-black">
          {(service.qty * (service.discountedPrice + service.tax)).toFixed(2)}
        </td>
      ) : (
        <td className="px-2 border-x-2 border-black">
          {(service.qty * service.discountedPrice).toFixed(2)}
        </td>
      )}
      <td className="px-2 border-x-2 border-black">
        {(
          service.qty *
          (service.servicePrice - service.discountedPrice)
        ).toFixed(2)}
      </td>
      <td className="px-2 border-x-2 border-black">{service.qty}</td>
      <td className="px-2 border-x-2 border-black">
        {(service.qty * (service.discountedPrice + service.tax)).toFixed(2)}
      </td>
    </tr>
  );
};

const ProductRow = ({ service, excludeGst }: { service: any, excludeGst: any }) => {
  return (
    <tr key={service._id} className="border-b-1 border-black">
      <td className="px-2 border-x-2 border-black">{service.name}</td>
      <td className="px-2 border-x-2 border-black">{service.staffName}</td>
      {excludeGst ? (
        <td className="px-2 border-x-2 border-black">
          {(service.qty * (service.discountCost + service.tax)).toFixed(2)}
        </td>
      ) : (
        <td className="px-2 border-x-2 border-black">
          {(service.qty * service.discountCost).toFixed(2)}
        </td>
      )}
      <td className="px-2 border-x-2 border-black">
        {(
          service.qty *
          (service.cost - service.discountCost)
        ).toFixed(2)}
      </td>
      <td className="px-2 border-x-2 border-black">{service.qty}</td>
      <td className="px-2 border-x-2 border-black">
        {(service.qty * (service.discountCost + service.tax)).toFixed(2)}
      </td>
    </tr>
  );
};

const MembershipRow = ({ service, excludeGst }: { service: any, excludeGst: any }) => {
  return (
    <tr key={service?.id} className="border-b-1 border-black">
      <td className="px-2 border-x-2 border-black">{service?.name}</td>
      <td className="px-2 border-x-2 border-black">{service?.staffName}</td>
      {excludeGst ? (
        <td className="px-2 border-x-2 border-black">
          {(service?.qty * (service?.discountCost + service?.tax)).toFixed(2)}
        </td>
      ) : (
        <td className="px-2 border-x-2 border-black">
          {(service?.qty * service?.discountCost).toFixed(2)}
        </td>
      )}
      <td className="px-2 border-x-2 border-black">
        {(
          service?.qty *
          (service?.cost - service?.discountCost)
        ).toFixed(2)}
      </td>
      <td className="px-2 border-x-2 border-black">{service?.qty}</td>
      <td className="px-2 border-x-2 border-black">
        {(service?.qty * (service?.discountCost + service?.tax)).toFixed(2)}
      </td>
    </tr>
  );
};

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
    membership: null,
  });
  const excludeGst = booking?.excludeGst;
  const [totalDiscount, setTotalDiscount] = useState(0);
  useEffect(() => {
    async function fetchCustomer() {
      if (!booking || !booking.userId) return;
      let response = await axios.get(Urls.GetSingleUser + booking.userId);
      console.log(response.data.data);
      setCustomer(response.data.data);
    }
    let discount = 0;
    booking?.artistServiceMap.map((service: any) => {
      discount +=
        service.qty * (service.servicePrice - service.discountedPrice);
    });
    setTotalDiscount(discount);
    fetchCustomer();
  }, [booking]);
  console.log(booking);
  return (
    <>
      <div className="p-4">
        <div className="parent-invoice w-fit m-auto border-2 border-black py-4">
          <div className="image-title flex justify-center mb-4">
            <Image src={NaaiLogo} alt="naai-logo" height={55} />
          </div>
          <div className="customer-info border-b-2 border-black border-t-2 py-4 px-6">
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
                <thead>
                  <tr className="border-y-2 border-black text-[0.95rem]">
                    <th className="px-2 border-x-2 border-black">
                      Service & Product
                    </th>
                    <th className="px-2 border-x-2 border-black">Provider</th>
                    <th className="px-2 border-x-2 border-black">Rate</th>
                    <th className="px-2 border-x-2 border-black">Dis</th>
                    <th className="px-2 border-x-2 border-black">Qty</th>
                    <th className="px-2 border-x-2 border-black">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {booking?.artistServiceMap.map((service: any) => (
                    <ServiceRow key={service._id} service={service} excludeGst={excludeGst} />
                  ))}
                  {booking?.products.map((service: any) => (
                    <ProductRow key={service._id} service={service} excludeGst={excludeGst} />
                  ))}
                  {booking?.membership.name !== "" && (
                    <MembershipRow key={booking?.membership.id} service={booking?.membership} excludeGst={excludeGst} />
                  )}
                </tbody>
              </table>
            </center>
          </div>
          <div className="totalAmount border-b-2 border-black py-4 px-6">
            <div className="info-wrapper flex justify-between">
              <div className="title font-semibold">Total Amount</div>
              <div className="value font-normal text-sm">
                : {(booking?.paymentAmount + booking?.amountDue).toFixed(2)}
              </div>
            </div>
            <div className="info-wrapper flex justify-between">
              <div className="title font-semibold">Total Discount</div>
              <div className="value font-normal text-sm">
                : {totalDiscount.toFixed(2)}
              </div>
            </div>
            <div className="info-wrapper flex justify-between">
              <div className="title font-semibold">Total Tax</div>
              {excludeGst ? (
                <div className="value font-normal text-sm">
                  : {(0.0).toFixed(2)}
                </div>
              ) : (
                <div className="value font-normal text-sm">
                  :{" "}
                  {(
                    booking?.paymentAmount -
                    booking?.paymentAmount / 1.18
                  ).toFixed(2)}
                </div>
              )}
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
            <div className="info-wrapper flex justify-between">
              <div className="title font-semibold">Dues Cleared</div>
              <div className="value font-normal text-sm">
                : {booking?.bill?.duesCleared?.toFixed(2)}
              </div>
            </div>
          </div>
          <div className="footer">
            <div className="footer-title m-auto w-fit">
              *****Thank You for Visiting Us!*****
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Invoice;
