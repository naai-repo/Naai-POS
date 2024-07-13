import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import Invoice from "@/components/invoice/Invoice";

const ViewInvoiceModal = ({
  booking,
  isOpen,
  setIsOpen,
}: {
  booking: any;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={() => setIsOpen(false)} size="lg">
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">Invoice</ModalHeader>
              <ModalBody>
                <Invoice booking={booking} invoice={btoa(booking._id)} />
              </ModalBody>
              <ModalFooter></ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ViewInvoiceModal;
