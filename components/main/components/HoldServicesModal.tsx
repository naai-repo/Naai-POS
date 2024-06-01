import React, { act, useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
} from "@nextui-org/react";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { holdDataAtom } from "@/lib/atoms/holdData";
import { HoldDataInterface } from "@/lib/types";
import { customerInfoAtom } from "@/lib/atoms/customerInfo";

const HoldServicesModal = ({
  isOpen,
  setOpenHoldModal,
}: {
  isOpen: boolean;
  setOpenHoldModal: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [cachedData, setCachedData] = useRecoilState(holdDataAtom);
  const [holdData, setHoldData] = useState<any[]>([]);
  const [activeRow, setActiveRow] = useState<number | null>(null);
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const setCustomer = useSetRecoilState(customerInfoAtom);

  useEffect(() => {
    let newHoldData = cachedData.map((item: any) => {
      return JSON.parse(item);
    });
    setHoldData(newHoldData);
  }, [cachedData]);

  const handleLoadFunction = () => {
    if(holdData.length > 0 && activeRow !== null){
      let services: HoldDataInterface = holdData[activeRow];
      setSelectedServices(services.selectedServices);
      setCustomer(services.customerInfo);
      holdData.splice(activeRow, 1);
      setHoldData(holdData);
      let newHoldData = holdData.map((item: any) => {
        return JSON.stringify(item);
      });
      setCachedData(newHoldData);
      localStorage.setItem("holdData", JSON.stringify(newHoldData));
    }
    setOpenHoldModal(false);
    setActiveRow(null);
  };

  const handleCancelFunction = () => {
    if(holdData.length > 0 && activeRow !== null){
      holdData.splice(activeRow, 1);
      setHoldData(holdData);
      let newHoldData = holdData.map((item: any) => {
        return JSON.stringify(item);
      });
      setCachedData(newHoldData);
      localStorage.setItem("holdData", JSON.stringify(newHoldData));
    }
    if(activeRow === null){
      setOpenHoldModal(false);
    }
    setActiveRow(null);
  };

  return (
    <Modal size={"xl"} isOpen={isOpen} onClose={() => {setOpenHoldModal(false),setActiveRow(null)}}>
      <ModalContent>
        {(onClose) => (
          <>
            <ModalHeader className="flex flex-col gap-1">
              Modal Title
            </ModalHeader>
            <ModalBody>
              <div>
                <Table hideHeader isStriped>
                  <TableHeader>
                    <TableColumn>Title</TableColumn>
                  </TableHeader>
                  <TableBody emptyContent={"No Hold Bookings to display."}>
                    {holdData?.map((item: any, index: number) => (
                      <TableRow
                        key={index}
                        className={activeRow === index ? "bg-yellow-200 cursor-pointer" : "cursor-pointer"}
                        onClick={() => setActiveRow(index)}
                      >
                        <TableCell>{item?.title}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={handleCancelFunction}>
                Cancel
              </Button>
              {activeRow !== null ? (
                <Button color="primary" onPress={handleLoadFunction}>
                  Load
                </Button>
              ) : (
                <Button color="primary" isDisabled>
                  Load
                </Button>
              )}
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default HoldServicesModal;
