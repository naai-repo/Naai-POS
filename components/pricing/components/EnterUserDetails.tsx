import React, { useState } from "react";
import { RadioGroup, Radio, Button } from "@nextui-org/react";
import axios from "axios";
import { Urls } from "@/lib/api";
import { useRecoilState, useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";

const EnterUserDetails = ({
  setShowInputModal,
  setShowDropDown,
}: {
  setShowInputModal: React.Dispatch<React.SetStateAction<boolean>>;
  setShowDropDown: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [customer, setCustomer] = useRecoilState(customerInfoAtom);
  const SALONID = useRecoilValue(salonIdAtom);
  const handleAddingUser = async () => {
    let response = await axios.post(Urls.AddWalkinUser, {
      phoneNumber: customer.phoneNumber,
      name: userName,
      gender: gender,
      salonId : SALONID
    });
    let user = response.data.data;
    setCustomer({
      id: user._id,
      gender: user.gender,
      name: user.name,
      phoneNumber: user.phoneNumber,
      dues: [],
    });
    setShowInputModal(false);
    setShowDropDown(false);
  };
  return (
    <div className="p-2 overflow-y-scroll pb-8">
      <input
        type="text"
        className="px-2 border w-full mb-2"
        placeholder="Enter Name"
        onChange={(e) => setUserName(e.target.value)}
      />
      <div className="flex">
        <RadioGroup label="Gender" onChange={(e) => setGender(e.target.value)}>
          <Radio value="male">Male</Radio>
          <Radio value="female">Female</Radio>
        </RadioGroup>
        <div className="add-btn-container w-full flex flex-row justify-end items-end">
          <Button size="sm" color="primary" onClick={handleAddingUser}>
            Add
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EnterUserDetails;
