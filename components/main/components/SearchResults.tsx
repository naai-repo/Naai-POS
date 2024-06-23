import ModalComponentForServices from "@/components/ui/ModalComponentForServices";
import { ServiceSelectedInterface } from "@/lib/types";
import { useDisclosure } from "@nextui-org/modal";
import React, { useEffect, useState } from "react";

const SearchResults = ({
  searchData,
  setPage,
  setSearchValue,
  setServiceSelected,
  onOpen,
  setOpenVariablesTable,
}: {
  searchData: any[];
  setPage: React.Dispatch<React.SetStateAction<number>>;
  setSearchValue: React.Dispatch<React.SetStateAction<string>>;
  setServiceSelected: React.Dispatch<
    React.SetStateAction<ServiceSelectedInterface>
  >;
  setOpenVariablesTable: React.Dispatch<React.SetStateAction<boolean>>;
  onOpen: () => void;
}) => {
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
    <div className="search-results bg-white rounded-md mt-1 p-2 absolute w-full shadow-md">
      {searchData.map((data, index) => (
        <div
          className="search-result-row flex justify-between py-1 items-center cursor-pointer"
          key={index}
          onClick={() => containsVariables(data)}
        >
          <div className="left flex items-center">
            <div className="search-result-row__gender">
              {data.targetGender === "male" ? (
                <img className="h-8" src="/imgs/men_icon.png" alt="men_icon" />
              ) : (
                <img
                  className="h-8"
                  src="/imgs/women_icon.png"
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
      <div
        className="load-more w-full text-center font-normal text-xs text-blue-500 cursor-pointer"
        onClick={() => setPage((prev) => prev + 1)}
      >
        Load More
      </div>
    </div>
  );
};

export default SearchResults;
