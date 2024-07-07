import { ServiceSelectedInterface } from "@/lib/types";
import { useInView } from "framer-motion";
import React, { useEffect, useRef } from "react";
import MenIcon from "../../../public/imgs/men_icon.png"
import WomenIcon from "../../../public/imgs/women_icon.png"
import Image from "next/image";

const SearchResults = ({
  searchData,
  setPage,
  setSearchValue,
  setServiceSelected,
  onOpen,
  setOpenVariablesTable,
  hasMore,
}: {
  searchData: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setServiceSelected: React.Dispatch<
    React.SetStateAction<ServiceSelectedInterface>
  >;
  setOpenVariablesTable: React.Dispatch<React.SetStateAction<boolean>>;
  hasMore: boolean;
  onOpen: () => void;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref);

  useEffect(() => {
    if (isInView) {
      setPage((prev) => prev + 1);
    }
  }, [isInView]);

  const handleSelectService = (data: any) => {
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
    });
    onOpen();
    setSearchValue("");
  };

  const containsVariables = (data: any) => {
    if (data.variables.length > 0) {
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
      });
      setOpenVariablesTable(true);
      return true;
    }
    handleSelectService(data);
    return false;
  };

  return (
    <div className="search-results bg-white rounded-md mt-1 p-2 absolute w-full shadow-md h-[200px] overflow-y-scroll">
      {searchData.map((data, index) => (
        <div
          className="search-result-row flex justify-between py-1 items-center cursor-pointer"
          key={index}
          onClick={() => containsVariables(data)}
        >
          <div className="left flex items-center">
            <div className="search-result-row__gender">
              {data.targetGender === "male" ? (
                <Image className="h-8" src={MenIcon} alt="men_icon" />
              ) : (
                <Image
                  className="h-8"
                  src={WomenIcon}
                  alt="women_icon"
                />
              )}
            </div>
            <div className="search-result-row__name capitalize ml-2">
              {data.serviceTitle}
            </div>
          </div>
          <div className="search-result-row__price">{data.basePrice}</div>
        </div>
      ))}
      {hasMore && (
        <div className="flex justify-center">
          <div
            className="h-4 w-4 inline-block rounded-full border-2 border-r-black border-solid animate-spin"
            role="status"
            ref={ref}
          >
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
