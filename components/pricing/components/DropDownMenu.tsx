import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { CustomerInfoInterface } from "@/lib/types";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { Urls } from "@/lib/api";
import EnterUserDetails from "./EnterUserDetails";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { User } from "lucide-react";
import menLogo from "../../../public/imgs/men_icon.png"
import womenLogo from "../../../public/imgs/women_icon.png"

import Image from "next/image";

const GenderLogo = ({ gender }: { gender: string }) => {
  if(gender.toLowerCase() === "male"){
    return <Image src={menLogo} alt="men-logo" />
  }else if(gender.toLowerCase() === "female"){
    return <Image src={womenLogo} alt="women-logo" />
  }else{
    return <User />
  }
};

const DropDownMenu = ({
  setShowDropDown,
}: {
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [customer, setCustomer] = useRecoilState(customerInfoAtom);
  const [customerList, setCustomerList] = useState<
    CustomerInfoInterface[] | []
  >([]);
  const [showInputModal, setShowInputModal] = useState(false);
  const SALONID = useRecoilValue(salonIdAtom);
  useEffect(() => {
    async function getCustomersList() {
      let response = await axios.get(
        `${Urls.GetCustomerList}?number=${customer.phoneNumber}&salonId=${SALONID}`
      );
      response = response.data;
      if (response.data.length === 0) {
        setCustomerList([]);
        if (customer.phoneNumber.length === 10) setShowInputModal(true);
        else setShowInputModal(false);
      } else {
        setCustomerList(response.data);
        setShowInputModal(false);
      }
    }
    getCustomersList();
  }, [customer, setShowDropDown]);

  const handleClick = (customer: CustomerInfoInterface) => {
    setCustomer(customer);
    setShowDropDown(false);
  };

  return (
    <div className="w-full h-3/4 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 bg-white absolute overflow-y-scroll scrollbar-hide z-40">
      {showInputModal ? (
        <EnterUserDetails
          setShowInputModal={setShowInputModal}
          setShowDropDown={setShowDropDown}
        />
      ) : (
        <Listbox aria-label="Actions">
          {customerList.map((customer) => (
            <ListboxItem
              key={customer.id}
              onClick={() => handleClick(customer)}
              startContent={<GenderLogo gender={customer.gender} />}
            >
              {customer.phoneNumber}{" "}
              {`(${customer.name})`}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};

export default DropDownMenu;
