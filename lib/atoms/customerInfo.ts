import { atom } from "recoil";
import { CustomerInfoInterface } from "../types";

export const customerInfoAtom = atom<CustomerInfoInterface>({
    key: "customerInfoAtom",
    default: {id: "", gender: "", name: "", phoneNumber: "", dues: [], email: "", birthDate: "", aniversary: ""},
});