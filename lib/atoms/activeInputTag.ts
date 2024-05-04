import { atom } from "recoil";

export const activeInputTagAtom = atom({
    key: "activeInputTagAtom",
    default: null as HTMLInputElement | null,
})