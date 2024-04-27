import { atom } from "recoil";

export const breadcrumbsAtom = atom({
    key: "breadcrumbsAtom",
    default: [{ name: "Home", navigate: "" }],
});