import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { Modal, ModalContent, ModalHeader, ModalBody } from "@nextui-org/modal";
import {
    Table,
    TableHeader,
    TableBody,
    TableColumn,
    TableRow,
    TableCell,
  } from "@nextui-org/table";
import axios from "axios";
import { Urls } from "@/lib/api";
import ArtistDisplay from "../artists/ArtistDisplay";

export const getArtistsForService = async (
  serviceDetails: any,
  SALONID: string
) => {
  const response = await axios.post(Urls.GetArtistList, {
    salonId: SALONID,
    services: [
      serviceDetails?.serviceId.toString()
    ],
  });
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.artistsProvidingServices;
  data = data.map((e: any) => {
    let service = e.serviceList.filter(
      (ele: any) =>
        ele.serviceId.toString() === serviceDetails?.serviceId.toString()
    );
    let price = service[0].price;
    if (serviceDetails.variableType) {
      let variable = service[0]?.variables?.filter(
        (ele: any) =>
          ele.variableId.toString() === serviceDetails._id.toString()
      );
      if (variable?.length > 0) {
        price = variable[0].price;
      }
    }
    return {
      artistId: e.artistId,
      artistName: e.artist,
      rating: e.rating,
      price: price,
    };
  });
  return data;
};

export const getStaffOfSalon = async (
  serviceDetails: any,
  SALONID: string
) => {
  const response = await axios.post(Urls.GetAllStaff, {
    salonId: SALONID,
  });
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.data;
  data = data.map((e: any) => {
    return {
      artistId: e._id,
      artistName: e.name,
      rating: 0,
      price: serviceDetails?.cutPrice,
    };
  });
  return data;
};

const ModalComponentForServices = ({
  isOpen,
  onOpenChange,
  serviceDetails,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  serviceDetails?: any;
}) => {
  const [artists, setArtists] = useState([]);
  const SALONID = useRecoilValue(salonIdAtom);
  useEffect(() => {
    const getArtists = async () => {
      const data = await getArtistsForService(serviceDetails, SALONID);
      setArtists(data);
    };
    const getStaff = async () => {
      const data = await getStaffOfSalon(serviceDetails, SALONID);
      setArtists(data);
    };
    if(serviceDetails?.type === "service"){
      getArtists();
    }else{
      getStaff();
    }
  }, [SALONID, serviceDetails]);

  const currencyOptions = {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 2,
  };

  return (
    <Modal
      isOpen={isOpen}
      onOpenChange={onOpenChange}
      isDismissable={true}
      className=" bg-white rounded-lg border border-gray-500 h-3/4 max-w-[50%] overflow-auto"
    >
      <ModalContent>
        <ModalHeader className="flex flex-col gap-1">
          Service Details
        </ModalHeader>
        <ModalBody>
          <div className="artist-details">
            <div className="service-details">
              <Table
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
                  <TableRow key="1">
                    <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                      service title
                    </TableCell>
                    <TableCell className="font-normal border border-slate-400">
                      {serviceDetails?.serviceTitle}
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                      Base Price
                    </TableCell>
                    <TableCell className="font-normal border border-slate-400 ">
                      {serviceDetails?.cutPrice.toLocaleString(
                        "en-In",
                        currencyOptions
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>

            {artists.map(
              (artist: {
                artistId: string;
                artistName: string;
                rating: number;
                price: number;
              }) => (
                <ArtistDisplay
                  key={artist.artistId}
                  name={artist.artistName}
                  price={artist.price}
                  basePrice={serviceDetails?.cutPrice}
                  serviceId={serviceDetails?.serviceId}
                  variableId={
                    serviceDetails?._id === serviceDetails?.serviceId
                      ? null
                      : serviceDetails._id
                  }
                  serviceName={serviceDetails?.serviceTitle}
                  artistId={artist.artistId}
                  onOpenChange={onOpenChange}
                  type={serviceDetails?.type}
                />
              )
            )}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ModalComponentForServices;
