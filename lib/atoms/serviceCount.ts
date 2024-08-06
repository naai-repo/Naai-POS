import { atom } from "recoil";
import { ServiceCountInterface } from "../types";

export const serviceCountAtom = atom<ServiceCountInterface>({
    key: "serviceCountAtom",
    default: {
        type_of_discount: null,
        customerCount: 0
    },
});