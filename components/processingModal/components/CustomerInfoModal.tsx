import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  DatePicker,
  DateValue,
} from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { parseDate } from "@internationalized/date";
import { Urls } from "@/lib/api";
import axios from "axios";

const CustomerInfoModal = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const customer = useRecoilValue(customerInfoAtom);

  const [birthDate, setBirthDate] = useState<DateValue>();
  const [aniversary, setAniversary] = useState<DateValue>();
  const [email, setEmail] = useState<string>("");
  const emailRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    console.log("HELLOW: ", customer);
    if (customer.birthDate === "") setBirthDate(undefined);
    else setBirthDate(parseDate(customer.birthDate));
    if (customer.aniversary === "") setAniversary(undefined);
    else setAniversary(parseDate(customer.aniversary));
    if(emailRef.current) emailRef.current.value = customer.email;
    setEmail(customer.email);
  }, [customer, isOpen]);

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handleUpdateUser = async () => {
    let userAniversary = customer.aniversary;
    let userBirthDate = customer.birthDate;
    console.log("Clicked on update user");
    if(aniversary){
        userAniversary = `${aniversary.year}-${(aniversary.month).toString().padStart(2, "0")}-${aniversary.day.toString().padStart(2, "0")}`;
    }
    if(birthDate){
        userBirthDate = `${birthDate.year}-${birthDate.month.toString().padStart(2, "0")}-${birthDate.day.toString().padStart(2, "0")}`;
    }
    let user = await axios.post(Urls.UpdateCustomerInfo, {
      userId: customer.id,
      data: {
        aniversary: userAniversary,
        birthDate: userBirthDate,
        email: email || customer.email,
      },
    });
    setIsOpen(false);
  };
  return (
    <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Customer Info
            </ModalHeader>
            <ModalBody>
              <div className="parent-div-customer-info grid grid-cols-2 gap-2">
                <div className="single-component flex items-center">
                  <div className="title">Name: </div>&nbsp;
                  <div className="value capitalize">{customer.name}</div>
                </div>
                <div className="single-component flex items-center">
                  <div className="title">Phone Number: </div>&nbsp;
                  <div className="value">{customer.phoneNumber}</div>
                </div>
                <div className="single-component flex items-center">
                  <div className="title">Gender: </div>&nbsp;
                  <div className="value capitalize">{customer.gender}</div>
                </div>
                <div className="single-component flex items-center">
                  <div className="title">Email: </div>&nbsp;
                  <div className="value capitalize">
                    <input
                      type="text"
                      className="border-1 border-black pl-2 w-full"
                      onChange={handleEmailChange}
                      ref = {emailRef}
                    />
                  </div>
                </div>
                <div className="single-component flex items-center">
                  {customer.birthDate !== "" ? (
                    <DatePicker
                      label="Birth date"
                      defaultValue={parseDate(customer.birthDate)}
                      className="max-w-[284px]"
                      onChange={setBirthDate}
                      showMonthAndYearPickers
                    />
                  ) : (
                    <DatePicker
                      label="Birth date"
                      className="max-w-[284px]"
                      onChange={setBirthDate}
                      showMonthAndYearPickers
                    />
                  )}
                </div>
                <div className="single-component flex items-center">
                  {customer.aniversary !== "" ? (
                    <DatePicker
                      label="Aniversary"
                      className="max-w-[284px]"
                      defaultValue={parseDate(customer.aniversary)}
                      onChange={setAniversary}
                      showMonthAndYearPickers
                    />
                  ) : (
                    <DatePicker
                      label="Aniversary"
                      className="max-w-[284px]"
                      onChange={setAniversary}
                      showMonthAndYearPickers
                    />
                  )}
                </div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button color="primary" onClick={handleUpdateUser}>
                Update
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default CustomerInfoModal;
