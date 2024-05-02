"use client";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { ArtistDisplayProps, SelectedServicesInterface } from "@/lib/types";
import React from "react";
import { useSetRecoilState } from "recoil";

const ArtistDisplay: React.FC<ArtistDisplayProps> = ({
  name,
  price,
  basePrice,
  serviceId,
  variableId,
  serviceName,
}) => {
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const handleClick = () => {
    setSelectedServices((prev: SelectedServicesInterface[]) => {
      if (variableId) {
        return [
          ...prev,
          {
            serviceId: serviceId,
            variableId: variableId,
            serviceName: serviceName,
            name: name,
            price: price,
            basePrice: basePrice,
          },
        ];
      } else {
        return [
          ...prev,
          {
            serviceId: serviceId,
            serviceName: serviceName,
            name: name,
            price: price,
            basePrice: basePrice,
          },
        ];
      }
    });
  };
  return (
    <div className="flex content-between" onClick={handleClick}>
      <div className="flex-1">{name}</div>
      {price !== basePrice && <div className="flex-1">{price}</div>}
    </div>
  );
};

export default ArtistDisplay;
