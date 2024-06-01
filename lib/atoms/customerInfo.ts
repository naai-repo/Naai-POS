import { atom } from "recoil";
import { CustomerInfoInterface } from "../types";

export const customerInfoAtom = atom<CustomerInfoInterface>({
    key: "customerInfoAtom",
    default: {name: "", phoneNumber: ""},
});