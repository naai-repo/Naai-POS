import { atom } from "recoil";
import { CustomerInfoInterface, Membership } from "../types";

export const customerInfoAtom = atom<CustomerInfoInterface>({
  key: "customerInfoAtom",
  default: {
    id: "",
    gender: "",
    name: "",
    phoneNumber: "",
    dues: [],
    email: "",
    birthDate: "",
    aniversary: "",
    membership: {} as Membership
  },
});
