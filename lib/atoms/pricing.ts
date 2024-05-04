import { atom } from "recoil";
import { PricingAtomInterface } from "../types";

export const pricingAtom = atom<PricingAtomInterface>({
    key: "pricingAtom",
    default: {
        Qty: undefined,
        Price: undefined,
        GST: undefined,
        Disc: undefined
    },
});