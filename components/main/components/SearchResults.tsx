import { ServiceSelectedInterface } from "@/lib/types";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import MenIcon from "../../../public/imgs/men_icon.png";
import WomenIcon from "../../../public/imgs/women_icon.png";
import Image from "next/image";
import { Package, Slack } from "lucide-react";
import { dateOptions } from "@/lib/helper";

const SearchResults = ({
  searchData,
  setPage,
  setSearchValue,
  setServiceSelected,
  onOpen,
  setOpenVariablesTable,
  hasMore,
  setType,
  category = "service",
}: {
  searchData: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setServiceSelected: React.Dispatch<
    React.SetStateAction<ServiceSelectedInterface>
  >;
  setOpenVariablesTable: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  setType: React.Dispatch<React.SetStateAction<string>>;
  category?: string;
  onOpen: () => void;
}) => {
  console.log("DATA HERE :", searchData);
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setPage((prev) => prev + 1);
    }
  }, [isInView]);

  const handleSelectService = (data: any) => {
    if (category === "service") {
      setServiceSelected({
        serviceId: data._id,
        serviceTitle: data.serviceTitle,
        basePrice: data.basePrice,
        cutPrice: data.cutPrice,
        targetGender: data.targetGender,
        avgTime: data.avgTime,
        category: data.category,
        productsUsed: data.productsUsed,
        variables: data.variables,
        type: "service",
      });
      setType("service");
    } else if (category === "membership") {
      setServiceSelected({
        serviceId: data.membershipId,
        serviceTitle: data.membershipTitle,
        basePrice: data.membershipCost,
        cutPrice: data.membershipCost,
        targetGender: "",
        avgTime: 0,
        category: "",
        productsUsed: [],
        variables: [],
        type: "membership",
      });
      setType("membership");
    }else if(category === "product"){
      setServiceSelected({
        serviceId: data._id,
        serviceTitle: data.name,
        basePrice: data.price,
        cutPrice: data.price,
        targetGender: "",
        avgTime: 0,
        category: "",
        productsUsed: [],
        variables: [],
        type: "product",
      });
      setType("product");
    }
    onOpen();
    setSearchValue("");
  };

  const containsVariables = (data: any) => {
    if (category === "service") {
      if (data?.variables?.length > 0) {
        setServiceSelected({
          serviceId: data._id,
          serviceTitle: data.serviceTitle,
          basePrice: data.basePrice,
          cutPrice: data.cutPrice,
          targetGender: data.targetGender,
          avgTime: data.avgTime,
          category: data.category,
          productsUsed: data.productsUsed,
          variables: data.variables,
          type: "service",
        });
        setType("service");
        setOpenVariablesTable(true);
        return true;
      }
    }
    handleSelectService(data);
    return false;
  };

  return (
    <div className="search-results bg-white rounded-md mt-1 p-2 absolute w-full shadow-md h-[200px] overflow-y-scroll z-20">
      {searchData.map((data, index) => (
        <div
          className="search-result-row flex justify-between py-1 items-center cursor-pointer"
          key={index}
          onClick={() => containsVariables(data)}
        >
          <div className="left flex items-center">
            <div className="search-result-row__gender">
              {category === "service" ? (
                data.targetGender === "male" ? (
                  <Image className="h-8" src={MenIcon} alt="men_icon" />
                ) : (
                  <Image className="h-8" src={WomenIcon} alt="women_icon" />
                )
              ) : category === "membership" ? (
                <Slack />
              ) : (
                <Package />
              )}
            </div>
            <div className="search-result-row__name capitalize ml-2">
              {category === "service" ? (
                data.serviceTitle
              ) : category === "membership" ? (
                <>
                  <p>{data.membershipTitle}</p>
                  <p className="text-xs">{data.membershipDesc}</p>
                  <p className="text-xs">
                    {data.validity_unit === "DAY"
                      ? data.validity_in_days
                      : data.validity_unit === "MONTH"
                      ? Math.ceil(data.validity_in_days / 30)
                      : Math.ceil(data.validity_in_days / 365)}{" "}
                    {data.validity_unit}
                  </p>
                </>
              ) : (
                <>
                  <p>{data.name}</p>
                  <p className="text-xs">
                    {new Date(data.mfgDate).toLocaleString("en-In", {
                      timeZone: "Asia/Kolkata",
                      year: "numeric",
                      month: "numeric",
                      day: "numeric",
                    })} - 
                    {
                      new Date(data.expDate).toLocaleString("en-In", {
                        timeZone: "Asia/Kolkata",
                        year: "numeric",
                        month: "numeric",
                        day: "numeric",
                      })
                    }
                  </p>
                </>
              )}
            </div>
          </div>
          <div className="search-result-row__price">
            {category === "service"
              ? data.basePrice
              : category === "membership"
              ? data.membershipCost
              : data.price}
          </div>
        </div>
      ))}
      {hasMore && (
        <div className="flex justify-center">
          <div
            className="h-4 w-4 inline-block rounded-full border-2 border-r-black border-solid animate-spin"
            role="status"
            ref={ref}
          ></div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
