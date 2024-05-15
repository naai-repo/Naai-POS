import { atom } from "recoil";
import { SelectedServicesInterface } from "../types";

export const selectedServiceAtom = atom<SelectedServicesInterface[]>({
    key: "selectedServiceAtom",
    default: [] as SelectedServicesInterface[],
});