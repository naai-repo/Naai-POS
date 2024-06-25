import { atom } from "recoil";
import { SalonData } from "../types";

export const salonAtom = atom<SalonData>({
    key: "salonAtom",
    default: {} as SalonData,
});