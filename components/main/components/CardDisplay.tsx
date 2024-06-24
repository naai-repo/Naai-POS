"use client";
import Title_card from "@/components/ui/Title_card";
import { Urls } from "@/lib/api";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { HomeProps, ServiceSelectedInterface } from "@/lib/types";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import axios from "axios";
import { MoveLeft, MoveRight, Search } from "lucide-react";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue } from "recoil";
import SearchResults from "./SearchResults";
import ModalComponentForServices from "@/components/ui/ModalComponentForServices";
import { useDisclosure } from "@nextui-org/modal";
import ModalComponentForVariables from "@/components/ui/ModalComponentForVariables";

const CardDisplay: React.FC<HomeProps> = ({
  titles,
  breadcrumbs,
  selectable = false,
  extraInfo = [],
  comingSoon = [] as boolean[],
}) => {
  const [searchValue, setSearchValue] = useState<string>("");
  const [searchData, setSearchData] = useState([]);
  const salonId = useRecoilValue(salonIdAtom);
  const [page, setPage] = useState<number>(1);
  const limit = 5;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openVariablesTable, setOpenVariablesTable] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const [serviceSelected, setServiceSelected] =
    useState<ServiceSelectedInterface>({
      serviceId: "",
      serviceTitle: "",
      basePrice: 0,
      cutPrice: 0,
      targetGender: "",
      avgTime: 0,
      category: "",
      productsUsed: [],
      variables: [],
    });

  useEffect(() => {
    if (searchValue === "" || salonId === "000000000000000000000000") {
      setSearchData([]);
      setPage(1);
      if (searchBarRef.current) {
        searchBarRef.current.value = "";
      }
      return;
    }
    async function fetchData() {
      try {
        const response = await axios.get(
          `${Urls.SearchingServices}?salonId=${salonId}&name=${searchValue}&page=${page}&limit=${limit}`
        );
        setSearchData(response.data.data.services);
        console.log(response.data.data.services);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [page, salonId, searchValue]);

  const moveBack = () => {
    window.history.back();
  };
  const moveForward = () => {
    window.history.forward();
  };

  const handleChangeForSearchValue = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let debounce = setTimeout(() => {
      setSearchValue(e.target.value);
    }, 200);
    return () => clearTimeout(debounce);
  };

  return (
    <div className="home-parent px-4 py-6 pt-2 h-full">
      {/* <div className="breadcrumbs text-sm font-bold mb-4 h-4">
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <BreadcrumbItem key={index} href={breadcrumb.navigate}>
                {breadcrumb.name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div> */}
      <div className="backAndForwardButtons w-full flex items-center mb-8">
        <div className="search-bar mr-4 w-[65%] relative">
          <div className="search-bar-parent bg-white flex items-center px-2 rounded-md"> 
            <Search />
            <input
              type="text"
              className="w-full rounded-md p-2"
              onChange={handleChangeForSearchValue}
              ref={searchBarRef}
              placeholder="Search for services..."
            />
          </div>
          {searchData.length > 0 && (
            <SearchResults
              searchData={searchData}
              setPage={setPage}
              setSearchValue={setSearchValue}
              setServiceSelected={setServiceSelected}
              onOpen={onOpen}
              setOpenVariablesTable={setOpenVariablesTable}
            />
          )}
          <ModalComponentForServices
            isOpen={isOpen}
            onOpenChange={onOpenChange}
            serviceDetails={serviceSelected}
          />
          <ModalComponentForVariables
            isOpen={openVariablesTable}
            onOpenChange={() => setOpenVariablesTable(false)}
            serviceDetails={serviceSelected}
            openArtistModal={onOpen}
            setSearchValue={setSearchValue}
            setServiceSelected={setServiceSelected}
          />
        </div>
        <div className="buttons w-[35%] flex items-center">
          <div
            className="back bg-white px-8 py-4 rounded-lg shadow-lg mr-4"
            onClick={moveBack}
          >
            <MoveLeft />
          </div>
          <div
            className="forward bg-white px-8 py-4 rounded-lg shadow-lg"
            onClick={moveForward}
          >
            <MoveRight />
          </div>
        </div>
      </div>
      <div className="title-cards grid grid-cols-auto gap-4 h-[calc(100%-6rem)] overflow-y-auto">
        {titles.map((title, index) => {
          return (
            <Title_card
              key={index}
              title={title}
              navigate={breadcrumbs[breadcrumbs.length - 1].navigate}
              selectable={selectable}
              serviceDetails={extraInfo[index]}
              displayModal={extraInfo[index]?.variables?.length === 0}
              comingSoon={comingSoon[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
