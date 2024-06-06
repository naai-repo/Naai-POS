import React, { useEffect, useState } from "react";
import { Listbox, ListboxItem } from "@nextui-org/react";
import { CustomerInfoInterface } from "@/lib/types";
import axios from "axios";
import { useRecoilState, useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { Urls } from "@/lib/api";
import EnterUserDetails from "./EnterUserDetails";

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
  useEffect(() => {
    async function getCustomersList() {
      let response = await axios.get(
        `${Urls.GetCustomerList}?number=${customer.phoneNumber}`
      );
      response = response.data;
      if (response.data.length === 0) {
        setCustomerList([]);        
        if(customer.phoneNumber.length === 10) setShowInputModal(true);
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
    <div className="w-full h-3/4 border-small px-1 py-2 rounded-small border-default-200 dark:border-default-100 bg-white absolute overflow-y-scroll scrollbar-hide">
      {showInputModal ? (
        <EnterUserDetails setShowInputModal = {setShowInputModal} setShowDropDown={setShowDropDown}/>
      ) : (
        <Listbox aria-label="Actions">
          {customerList.map((customer) => (
            <ListboxItem
              key={customer.id}
              onClick={() => handleClick(customer)}
            >
              {customer.phoneNumber} {`(${customer.name})`}
            </ListboxItem>
          ))}
        </Listbox>
      )}
    </div>
  );
};

export default DropDownMenu;
