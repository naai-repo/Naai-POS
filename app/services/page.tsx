'use client'
import CardDisplay from "@/components/main/components/CardDisplay";
import { breadcrumbsAtom } from "@/lib/atoms/breadcrumbs";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";

async function getServiceCategories(){
  try{
    const response = await axios.get("https://m.naai.in/partner/service/category/all");
    let data = response.data.data;
    data.sort();
    return data;
  }catch(err : any ){
    console.log(err);
  }
}

const Page = () => {
  const [serviceCategories, setServiceCategories] = useState([]);
  // const serviceCategories = getServiceCategories();
  const [breadcrumbs, setBreadcrumbs] = useRecoilState(breadcrumbsAtom);

  useEffect(() => {
    getServiceCategories().then((data) => {
      setServiceCategories(data);
    });
    setBreadcrumbs([
      { name: "Home", navigate: "/" },
      { name: "service Categories", navigate: "/services" },
    ]);
  }, [])


  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={breadcrumbs}
    />
  );
};

export default Page;
