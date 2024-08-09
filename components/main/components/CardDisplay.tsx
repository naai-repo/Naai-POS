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
  const [searchData, setSearchData] = useState<any[]>([]);
  const [searchValueProducts, setSearchValueProducts] = useState<string>("");
  const [searchDataProducts, setSearchDataProducts] = useState<any[]>([]);
  const [searchValueMembership, setSearchValueMembership] =
    useState<string>("");
  const [searchDataMembership, setSearchDataMembership] = useState<any[]>([]);
  const salonId = useRecoilValue(salonIdAtom);
  const [page, setPage] = useState<number>(1);
  const [pageProducts, setPageProducts] = useState<number>(1);
  const [pageMembership, setPageMembership] = useState<number>(1);
  const limit = 5;
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [openVariablesTable, setOpenVariablesTable] = useState<boolean>(false);
  const searchBarRef = useRef<HTMLInputElement>(null);
  const searchBarProductsRef = useRef<HTMLInputElement>(null);
  const searchBarMembershipRef = useRef<HTMLInputElement>(null);
  const [hasMore, setHasMore] = useState<boolean>(false);
  const [hasMoreProducts, setHasMoreProducts] = useState<boolean>(false);
  const [hasMoreMembership, setHasMoreMembership] = useState<boolean>(false);
  const [type, setType] = useState<string>("");
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
      console.log("Empty HERE!");
      setSearchData([]);
      setPage(1);
      if (searchBarRef.current) {
        searchBarRef.current.value = "";
      }
      return;
    }
    async function fetchData() {
      try {
        if (searchValue === "") {
          console.log("Empty here!");
          return;
        }
        const response = await axios.get(
          `${Urls.SearchingServices}?salonId=${salonId}&name=${searchValue}&page=${page}&limit=${limit}`
        );
        if (response.data.data.services.length === 0) setHasMore(false);
        else setHasMore(true);
        setSearchData((prev: any[]) => [
          ...prev,
          ...response.data.data.services,
        ]);
      } catch (err) {
        console.log(err);
      }
    }
    fetchData();
  }, [page, salonId, searchValue]);

  useEffect(() => {
    if (searchValueProducts === "" || salonId === "000000000000000000000000") {
      setSearchDataProducts([]);
      setPageProducts(1);
      if (searchBarProductsRef.current) {
        searchBarProductsRef.current.value = "";
      }
      return;
    }
    async function fetchDataProducts() {
      try {
        if (searchValueProducts === "") return;
        setType("product");
        const response = await axios.get(
          `${Urls.GetProducts}?salon=${salonId}&name=${searchValueProducts}&page=${pageProducts}&limit=${limit}`
        );
        if (response.data.products.length === 0) setHasMoreProducts(false);
        else setHasMoreProducts(true);
        if (hasMoreProducts) {
          setSearchDataProducts((prev: any[]) => [
            ...prev,
            ...response.data.products,
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataProducts();
  }, [pageProducts, salonId, searchValueProducts]);

  useEffect(() => {
    if (
      searchValueMembership === "" ||
      salonId === "000000000000000000000000"
    ) {
      setSearchDataMembership([]);
      setPageMembership(1);
      if (searchBarMembershipRef.current) {
        searchBarMembershipRef.current.value = "";
      }
      return;
    }
    async function fetchDataMembership() {
      try {
        if (searchValueMembership === "") return;
        setType("membership");
        const response = await axios.get(
          `${Urls.GetMemberships}/${salonId}?name=${searchValueMembership}&page=${pageMembership}&limit=${limit}&response_type=search`
        );
        if (response.data.data.memberships.length === 0)
          setHasMoreMembership(false);
        else setHasMoreMembership(true);
        if (hasMoreMembership) {
          setSearchDataMembership((prev: any[]) => [
            ...prev,
            ...response.data.data.memberships,
          ]);
        }
      } catch (err) {
        console.log(err);
      }
    }
    fetchDataMembership();
  }, [pageMembership, salonId, searchValueMembership]);

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

  const handleChangeForSearchValueProducts = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let debounce = setTimeout(() => {
      setSearchValueProducts(e.target.value);
    }, 200);
    return () => clearTimeout(debounce);
  };

  const handleChangeForSearchValueMembership = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    let debounce = setTimeout(() => {
      setSearchValueMembership(e.target.value);
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
        <div className="search-bar mr-4 w-[100%] relative">
          <div className="search-bar-wrapper relative">
            <div className="search-bar-parent bg-white flex items-center px-2 shadow-md rounded-xl border border-[#e4e8eb]">
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
                hasMore={hasMore}
                setType={setType}
              />
            )}
          </div>
          <div className="search-bar-wrapper relative">
            <div className="mt-4 search-bar-parent bg-white flex items-center px-2 shadow-md rounded-xl border border-[#e4e8eb]">
              <Search />
              <input
                type="text"
                className="w-full rounded-md p-2"
                onChange={handleChangeForSearchValueProducts}
                ref={searchBarProductsRef}
                placeholder="Search for Products..."
              />
            </div>
            {searchDataProducts.length > 0 && (
              <SearchResults
                searchData={searchDataProducts}
                setPage={setPageProducts}
                setSearchValue={setSearchValueProducts}
                setServiceSelected={setServiceSelected}
                onOpen={onOpen}
                setOpenVariablesTable={setOpenVariablesTable}
                hasMore={hasMoreProducts}
                setType={setType}
                category="product"
              />
            )}
          </div>
          <div className="search-bar-wrapper relative">
            <div className="mt-4 search-bar-parent bg-white flex items-center px-2 shadow-md rounded-xl border border-[#e4e8eb]">
              <Search />
              <input
                type="text"
                className="w-full rounded-md p-2"
                onChange={handleChangeForSearchValueMembership}
                ref={searchBarMembershipRef}
                placeholder="Search for Membership..."
              />
            </div>
            {searchDataMembership.length > 0 && (
              <SearchResults
                searchData={searchDataMembership}
                setPage={setPageMembership}
                setSearchValue={setSearchValueMembership}
                setServiceSelected={setServiceSelected}
                onOpen={onOpen}
                setOpenVariablesTable={setOpenVariablesTable}
                hasMore={hasMoreMembership}
                setType={setType}
                category="membership"
              />
            )}
          </div>
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
            type={type}
          />
        </div>
        {/* <div className="buttons w-[35%] flex items-center justify-evenly">
          <div
            className="back bg-white p-3 rounded-full shadow-lg"
            onClick={moveBack}
          >
            <MoveLeft size={20} />
          </div>
          <div
            className="forward bg-white p-3 rounded-full shadow-lg"
            onClick={moveForward}
          >
            <MoveRight size={20} />
          </div>
        </div> */}
      </div>
      <div className="title-cards grid grid-cols-auto gap-4 h-[calc(100%-6rem)] overflow-y-auto">
        {/* {titles.map((title, index) => {
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
        })} */}
      </div>
    </div>
  );
};

export default CardDisplay;
