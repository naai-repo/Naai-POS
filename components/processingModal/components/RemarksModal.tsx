import React, { useRef } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { PaymentsInterface } from "@/lib/types";
const RemarksModal = ({
  isOpen,
  setOpenRemarksModal,
  activeKey,
  payments,
  setPayments
}: {
  isOpen: boolean;
  setOpenRemarksModal: React.Dispatch<React.SetStateAction<boolean>>;
  activeKey: string | number | bigint;
  payments: PaymentsInterface[];
  setPayments: React.Dispatch<React.SetStateAction<PaymentsInterface[]>>
}) => {
  const remarks = useRef<HTMLTextAreaElement | null>(null);
  const { onOpenChange } = useDisclosure();
  const handleSetRemarks = () => {
    const remarksValue = remarks.current?.value;
    if (remarksValue) {
      const updatedPayments = payments.map((payment) => {
        if (payment.id.toString() === activeKey) {
          return { ...payment, remarks: remarksValue };
        }
        return payment;
      });
      setPayments(updatedPayments);
      setOpenRemarksModal(false);
    }
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      onClose={() => setOpenRemarksModal(false)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Add Remarks
            </ModalHeader>
            <ModalBody>
              <div className="flex flex-col gap-2">
                <label htmlFor="remarks">Remarks</label>
                <textarea
                  name="remarks"
                  id="remarks"
                  ref={remarks}
                  className="border border-gray-300 rounded-md p-2"
                  placeholder="Enter remarks here"
                />
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                Close
              </Button>
              <Button
                color="primary"
                variant="light"
                onClick={handleSetRemarks}
              >
                Set Remarks
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default RemarksModal;
