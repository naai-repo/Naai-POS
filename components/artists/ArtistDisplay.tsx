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
  artistId,
}) => {
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const handleClick = () => {
    setSelectedServices((prev: SelectedServicesInterface[]) => {
      return prev.some(
        (item) =>
          item.serviceId === serviceId &&
          item.artistId === artistId &&
          item.variableId === variableId
      )
        ? prev
        : [
            ...prev,
            {
              serviceId,
              variableId,
              serviceName,
              name,
              price,
              basePrice,
              artistId,
              qty: 1,
              disc: 0,
            },
          ];
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
