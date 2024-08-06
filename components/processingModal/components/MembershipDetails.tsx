import React, { useEffect, useState } from "react";
import DisplayBillInfo from "./DisplayBillInfo";
import { useRecoilState, useRecoilValue, useResetRecoilState } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { membershipAtom } from "@/lib/atoms/membershipAtom";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import MembershipDiscount from "@/lib/MembershipDiscountClass";

const MembershipDetails = () => {
    const SALONID = useRecoilValue(salonIdAtom);
    const customer = useRecoilValue(customerInfoAtom);
    const selectedServices = useRecoilValue(selectedServiceAtom);
    // disc_type_services can have the below possible values
    // 0: No discount
    // 1: Discount on total bill
    // 2: Discount on all services including or excluding selected services
    // 3: Discount on selected services
    // disc_type_products can have the below possible values
    // 0: No discount
    // 1: Discount on all products including or excluding selected products
    // 2: Discount on selected products
    const [membership, setMembership] = useRecoilState(membershipAtom);
    useEffect(() => {
      if(customer?.membership?.salonId?.toString() === SALONID.toString() && customer?.membership?.status){
        setMembership(customer.membership);
      }
    }, [SALONID, customer]);
    
    useEffect(() => {
      if(membership.discount_type){
        MembershipDiscount.discountTotalBill(selectedServices, membership);
      }else if(membership.all_services_discount_type){
        // discountAllServices();
      }else if(membership.services.length){
        // discountParticularServices();
      }
      if(membership.all_products_discount_type){
        // discountAllProducts();
      }else if(membership.products.length){
        // discountParticularProducts();
      }
    }, [membership]);

  return (
    <>
      <div className="membership-details">
        <DisplayBillInfo title="Membership Disc: " value={0} money={true} />
        <DisplayBillInfo title="customer name" value={customer.name} />
        <DisplayBillInfo title="pending amount" value={0} money={true} />
        <DisplayBillInfo title="wallet amount" value={0} money={true} />
        <DisplayBillInfo title="wallet mem. amount" value={0} money={true} /> 
      </div>
    </>
  );
};

export default MembershipDetails;
