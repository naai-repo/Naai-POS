import { atom } from "recoil";

export const selectedTableIndexAtom = atom<null | number>({
    key: "selectedTableIndexAtom",
    default: null,
});