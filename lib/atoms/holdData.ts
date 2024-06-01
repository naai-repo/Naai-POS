import { atom } from "recoil";

export const holdDataAtom = atom<string[]>({
    key: "holdDataAtom",
    default: [],
});