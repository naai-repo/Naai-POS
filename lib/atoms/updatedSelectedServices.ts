import { atom } from "recoil";
import { UpdatedSelectedServicesEnum } from "../enums";

export const updatedSelectedServicesAtom = atom<UpdatedSelectedServicesEnum>({
    key: "updatedSelectedServicesAtom",
    default: UpdatedSelectedServicesEnum.Initial
});