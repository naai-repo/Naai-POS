import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody
} from "@nextui-org/react";
import { useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import { currencyOptions } from "@/lib/helper";
import { Eye } from "lucide-react";
import PendingDuesTable from "./PendingDuesTable";

const PendingDuesModal = ({
  isOpen,
  setIsOpen,
  setOpenPopover,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setOpenPopover: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const customer = useRecoilValue(customerInfoAtom);
  const [totalDues, setTotalDues] = useState(0);
  useEffect(() => {
    if (customer.dues.length === 0) return;
    let dues = customer.dues.reduce((acc, { amount }) => acc + amount, 0);
    setTotalDues(dues);
  }, [customer]);
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={() => {
        setIsOpen(false), setOpenPopover(true);
      }}
      size="2xl"
      className="pb-4"
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="title flex justify-between pt-4">
                <div className="subtitle">Pending History</div>
                <div className="total-amount-due">
                  {totalDues.toLocaleString("en-In", currencyOptions)}
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <PendingDuesTable/>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default PendingDuesModal;
