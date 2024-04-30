"use client";
import { ArtistDisplayProps, title_cardProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  useDisclosure,
} from "@nextui-org/modal";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
} from "@nextui-org/table";
import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import ArtistDisplay from "../artists/ArtistDisplay";
import { Urls } from "@/lib/api";

const getArtistsForService = async (serviceDetails: any) => {
  const response = await axios.post(
    Urls.GetArtistList,
    {
      salonId: "65e28c422ebce658ad29fdb0",
      services: [serviceDetails?.serviceId.toString()],
    }
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.artistsProvidingServices;
  data = data.map((e: any) => {
    let service = e.serviceList.filter((ele : any) => ele.serviceId.toString() === serviceDetails?.serviceId.toString());
    let price = service[0].price;
    if(serviceDetails.variableType){
      let variable = service[0]?.variables?.filter((ele : any) => ele.variableId.toString() === serviceDetails._id.toString());
      if(variable?.length > 0){
        price = variable[0].price
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

const ModalComponent = ({
  isOpen,
  onOpenChange,
  serviceDetails,
}: {
  isOpen: boolean;
  onOpenChange: () => void;
  serviceDetails?: any;
}) => {
  const [artists, setArtists] = useState([]);
  useEffect(() => {
    const getArtists = async () => {
      const data = await getArtistsForService(serviceDetails);
      setArtists(data);
    };
    getArtists();
  }, [serviceDetails]);

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
                    <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                      {serviceDetails?.serviceTitle}
                    </TableCell>
                  </TableRow>
                  <TableRow key="2">
                    <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                      Base Price
                    </TableCell>
                    <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                      {serviceDetails?.cutPrice.toLocaleString(
                        "en-In",
                        currencyOptions
                      )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
            
            {artists.map((artist: {
              artistId: string;
              artistName: string;
              rating: number;
              price: number;
            }) => (

              <ArtistDisplay key={artist.artistId} name={artist.artistName} price={artist.price} basePrice={serviceDetails.cutPrice}/>
            ))}
            {/* <Table
              isStriped
              aria-label="Artist Details Table"
              removeWrapper
              className="capitalize"
            >
              <TableHeader>
                <TableColumn>Artist</TableColumn>
              </TableHeader>
              <TableBody>
                {artists.map((artist: any) => {
                  return (
                    <TableRow key={artist.artistId}>
                      <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                        {artist.artistName}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table> */}
          </div>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

const Title_card: React.FC<title_cardProps> = ({
  title,
  navigate,
  selectable,
  serviceDetails,
  displayModal
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (serviceDetails?.variables.length ?? 0 > 0) {
      router.push(`${pathname}/${title}?service=${serviceDetails?.serviceId}`);
      return;
    }
    pathname === "/"
      ? router.push(`/${title}`)
      : router.push(`${pathname}/${title}`);
  };

  return (
    <>
      <div
        className="w-32 h-20 bg-naai-pos-500 flex items-center justify-center rounded-lg capitalize font-medium text-sm cursor-pointer"
        onClick={
          selectable || displayModal ? onOpen : handleClick
        }
      >
        <div className="title">{title}</div>
      </div>
      <ModalComponent
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        serviceDetails={serviceDetails}
      />
    </>
  );
};

export default Title_card;
