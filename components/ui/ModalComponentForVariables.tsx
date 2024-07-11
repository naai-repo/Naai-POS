import React, { useEffect, useState } from "react";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import { getVariablesData } from "@/lib/helper";
import { ServiceSelectedInterface } from "@/lib/types";

const ModalComponentForVariables = ({
  isOpen,
  onOpenChange,
  serviceDetails,
  openArtistModal,
  setSearchValue,
  setServiceSelected,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  serviceDetails?: any;
  openArtistModal: () => void;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setServiceSelected: React.Dispatch<
    React.SetStateAction<ServiceSelectedInterface>
  >;
}) => {
  const [variables, setVariables] = useState([]);

  useEffect(() => {
    async function fetchData(serviceId: string) {
      if (serviceId === "" || !serviceId) return;
      let data = await getVariablesData(serviceId);
      
      setVariables(data.data.sort((a: any, b: any) => a.variableCutPrice - b.variableCutPrice));
    }
    fetchData(serviceDetails.serviceId);
  }, [serviceDetails]);
  const currencyOptions = {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  };

  const handleVariableSelect = (variable: any) => {
    onOpenChange();
    setServiceSelected(variable);
    setSearchValue("");
    openArtistModal();
    console.log("Variable Clicked");
  };
  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={true}
      className=" bg-white rounded-lg border border-gray-500 h-3/4 max-w-[50%] overflow-auto"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1 capitalize">
          Variable Selection {`(${serviceDetails?.serviceTitle})`}
        </ModalHeader>
        <ModalBody>
          <div className="service-details grid grid-cols-2 gap-4 text-center capitalize">
            {variables.map(
              (
                variable: {
                  _id: string;
                  variableName: string;
                  variableCutPrice: number;
                },
                index
              ) => (
                <div
                  className="card-display-for-modal rounded-lg shadow-lg p-4 bg-gray-400 text-white cursor-pointer"
                  key={variable._id}
                  onClick={() => handleVariableSelect(variable)}
                >
                  <div className="card-name mb-2">{variable.variableName}</div>
                  <div className="card-price">
                    {variable.variableCutPrice.toLocaleString(
                      "en-In",
                      currencyOptions
                    )}
                  </div>
                </div>
              )
            )}
            {/* <Table
                isStriped
                aria-label="Service Details Table"
                hideHeader
                removeWrapper
                className="capitalize"
              >
                <TableHeader>
                  <TableColumn>Key</TableColumn>
                  <TableColumn>Value</TableColumn>
                </TableHeader>
                <TableBody>
                  {variables.map((variable:{
                    _id: string;
                    variableName: string;
                  }, index) => (
                      <TableRow key={index} onClick={() => handleClick(variable)}>
                        <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                          service title
                        </TableCell>
                        <TableCell className="font-normal border border-slate-400">
                          {variable.variableName}
                        </TableCell>
                      </TableRow>
                  ))}
                </TableBody>
              </Table> */}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponentForVariables;
