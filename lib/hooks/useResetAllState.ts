import React from 'react'
import { useResetRecoilState } from 'recoil';
import { selectedServiceAtom } from '../atoms/selectedServices';
import { pricingAtom } from '../atoms/pricing';
import { customerInfoAtom } from '../atoms/customerInfo';
import { couponAtom } from '../atoms/coupons';

const useResetAllState = () => {
  const resetSelectedServices = useResetRecoilState(selectedServiceAtom);
  const resetPricing = useResetRecoilState(pricingAtom);
  const resetCustomer = useResetRecoilState(customerInfoAtom);
  const resetSelectedCoupon = useResetRecoilState(couponAtom);

  const resetAllState = () => {
    resetSelectedServices();
    resetPricing();
    resetCustomer();
    resetSelectedCoupon();
  }

  return {resetAllState};
}

export default useResetAllState