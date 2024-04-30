import { atom } from "recoil";

export const genderAtom = atom<null | string>({
    key: "genderAtom",
    default: null,
});