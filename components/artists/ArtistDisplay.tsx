"use client";
import { Urls } from "@/lib/api";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { selectedServiceAtom } from "@/lib/atoms/selectedServices";
import { ArtistDisplayProps, SelectedServicesInterface } from "@/lib/types";
import axios from "axios";
import React from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

interface ExtendedArtistDisplay extends ArtistDisplayProps{
  onOpenChange: () => void;
}

const ArtistDisplay: React.FC<ExtendedArtistDisplay> = ({
  name,
  price,
  basePrice,
  serviceId,
  variableId,
  serviceName,
  artistId,
  onOpenChange,
}) => {
  const setSelectedServices = useSetRecoilState(selectedServiceAtom);
  const salonId = useRecoilValue(salonIdAtom);
  const handleClick = async () => {
    let salonData = await axios.get(`${Urls.GetSalonData}/${salonId}`);
    let taxIncluded = salonData.data.data.data.taxIncluded;
    let tax = 0;
    console.log("TAX: ", salonData.data.data.data.taxIncluded);
    if(taxIncluded){
      let priceExcludingTax = price / 1.18;
      tax = Math.round((price - priceExcludingTax)*100)/100;
      price = Math.round(priceExcludingTax*100)/100;
    }
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
              tax,
              qty: 1,
              disc: 0,
            },
          ];
    });
    onOpenChange();
  };
  return (
    <div className="flex content-between cursor-pointer" onClick={handleClick}>
      <div className="flex-1">{name}</div>
      {price !== basePrice && <div className="flex-1">{price}</div>}
    </div>
  );
};

export default ArtistDisplay;
