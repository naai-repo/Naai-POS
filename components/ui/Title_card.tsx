"use client";
import { title_cardProps } from "@/lib/types";
import React, { useEffect, useState } from "react";
import { variableProps } from "@/lib/types";
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

const getArtistsForService = async (serviceDetails: any) => {
  const response = await axios.post(
    `https://m.naai.in/appointments/singleArtist/list`,
    {
      salonId: "65e28c422ebce658ad29fdb0",
      services: [serviceDetails.serviceId.toString()],
    }
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.artistsProvidingServices;
  data = data.map((e: any) => {
    return {
      artistId: e.artistId,
      artistName: e.artist,
      rating: e.rating,
    };
  });
  return data;
};

const VariablesTable = ({ variables }: { variables: variableProps[] }) => {
  let result = variables.reduce(function (r: { [key: string]: variableProps[] }, a: variableProps) {
    r[a.variableType] = r[a.variableType] || [];
    r[a.variableType].push(a);
    return r;
  }, {});
  return (
    <div>
      <div className="variable-header text-lg font-medium capitalize">Variables</div>
      <div className="variable-table mt-1">
        {Object.keys(result).map((key) => {
          return (
            <div key={key} className="variable-type">
              <div className="variable-type-header capitalize font-semibold text-base">
                <li className="list-disc">{key}</li>
              </div>
              <Table
                isStriped
                aria-label="Variables Table"
                removeWrapper
                className="capitalize"
              >
                <TableHeader>
                  <TableColumn>Variable</TableColumn>
                  <TableColumn>Base Price</TableColumn>
                  <TableColumn>Discounted Price</TableColumn>
                  <TableColumn>Time</TableColumn>
                </TableHeader>
                <TableBody>
                  {result[key].map((variable) => {
                    return (
                      <TableRow key={variable.variableId}>
                        <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                          {variable.variableName}
                        </TableCell>
                        <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                          {variable.variableCutPrice.toLocaleString("en-In", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                          {variable.variablePrice.toLocaleString("en-In", {
                            style: "currency",
                            currency: "INR",
                            minimumFractionDigits: 2,
                          })}
                        </TableCell>
                        <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                          {variable.variableTime * 30} mins
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </div>
          );
        })}
      </div>
    </div>
  );
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
                <TableColumn>Key</TableColumn>
                <TableColumn>Value</TableColumn>
              </TableHeader>
              <TableBody>
                <TableRow key="1">
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    category
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.category}
                  </TableCell>
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    service title
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.serviceTitle}
                  </TableCell>
                </TableRow>
                <TableRow key="2">
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    Target Gender
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.targetGender}
                  </TableCell>
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    Time
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.avgTime * 30} mins
                  </TableCell>
                </TableRow>
                <TableRow key="1">
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    Base Price
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.cutPrice.toLocaleString(
                      "en-In",
                      currencyOptions
                    )}
                  </TableCell>
                  <TableCell className="font-semibold border border-slate-400 odd:bg-slate-200">
                    Discounted Price
                  </TableCell>
                  <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                    {serviceDetails?.basePrice.toLocaleString(
                      "en-In",
                      currencyOptions
                    )}
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </div>
          {serviceDetails?.variables.length ? (
            <VariablesTable variables={serviceDetails?.variables} />
          ) : null}
          <div className="artist-details">
            <Table
              isStriped
              aria-label="Artist Details Table"
              removeWrapper
              className="capitalize"
            >
              <TableHeader>
                <TableColumn>Artist</TableColumn>
                <TableColumn>Rating</TableColumn>
              </TableHeader>
              <TableBody>
                {artists.map((artist: any) => {
                  return (
                    <TableRow key={artist.artistId}>
                      <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                        {artist.artistName}
                      </TableCell>
                      <TableCell className="font-normal border border-slate-400 odd:bg-slate-200">
                        {artist.rating}
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
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
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    let value: string = e.currentTarget.innerText.toLowerCase();
    window.location.href = `${navigate}/${title}`;
  };
  return (
    <>
      <div
        className="w-32 h-20 bg-naai-pos-500 flex items-center justify-center rounded-lg capitalize font-medium text-sm cursor-pointer"
        onClick={selectable ? onOpen : handleClick}
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
