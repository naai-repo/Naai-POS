import { atom } from "recoil";
import { SalonData } from "../types";

export const salonAtom = atom<SalonData>({
  key: "salonAtom",
  default: {
    id: "000000000000000000000000",
    name: "",
    img: "",
    address: "",
    phoneNumber: 0,
    instagram: "",
    taxIncluded: false,
  },
});
