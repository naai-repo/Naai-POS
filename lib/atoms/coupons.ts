import { atom } from "recoil";
import { CouponInterface } from "../types";

export const couponAtom = atom<CouponInterface>({
  key: "couponAtom",
  default: {
    id: "",
    code: "",
    discount: 0,
    expiryDate: new Date(),
    salonId: "string",
    min_cart_value: 0,
    max_value: 0,
    isActive: false,
    couponDiscount: 0,
  },
});
