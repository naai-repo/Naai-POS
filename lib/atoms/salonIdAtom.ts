import { atom } from "recoil";

export const salonIdAtom = atom<string>({
    key: "salonIdAtom",
    default: "000000000000000000000000",
});