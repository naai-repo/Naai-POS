import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Accordion,
  AccordionItem,
} from "@nextui-org/react";
import { currencyOptions } from "@/lib/helper";
import { useRecoilValue } from "recoil";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";
import PendingDuesTable from "@/components/pricing/components/PendingDuesTable";

const ClearDuesModal = ({
  isOpen,
  setIsOpen,
  amountToBePaid,
  setAmountToBePaid,
}: {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  amountToBePaid: number;
  setAmountToBePaid: React.Dispatch<React.SetStateAction<number>>;
}) => {
  const customer = useRecoilValue(customerInfoAtom);
  const [totalDue, setTotalDue] = useState(0);
  const amountToBePaidRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    let totalDues = 0;
    if (customer.dues.length === 0) {
      setTotalDue(0);
      return;
    }
    totalDues = customer.dues.reduce((acc, { amount }) => acc + amount, 0);
    setTotalDue(totalDues);
  }, [customer, isOpen]);

  useEffect(() => {
    if (amountToBePaidRef.current) {
      amountToBePaidRef.current.value = amountToBePaid.toString();
    }
  }, [amountToBePaid, isOpen]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseFloat(e.target.value);
    if (value > totalDue) {
      alert("Amount to be paid cannot be greater than total due");
      setAmountToBePaid(totalDue);
      return;
    }
    setAmountToBePaid(parseInt(e.target.value));
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} size="xl">
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              <div className="title flex justify-between pt-4">
                <div className="subtitle">Pending History</div>
                <div className="amount-due">
                  {totalDue.toLocaleString("en-In", currencyOptions)}
                </div>
              </div>
            </ModalHeader>
            <ModalBody>
              <div className="amount-to-be-paid flex justify-between">
                <div>Amount to be paid</div>
                <input
                  type="number"
                  className="shadow-md border-2 border-black px-2"
                  onChange={handleOnChange}
                  ref={amountToBePaidRef}
                />
              </div>
              <Accordion variant="shadow">
                <AccordionItem
                  key="1"
                  aria-label="Pending Dues"
                  title="Pending Dues"
                >
                  <PendingDuesTable />
                </AccordionItem>
              </Accordion>
            </ModalBody>
            <ModalFooter>
              <Button color="primary" onClick={() => setIsOpen(false)}>
                Clear
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ClearDuesModal;
