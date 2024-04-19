'use client'
import CardDisplay from "@/components/main/components/CardDisplay";
import axios from "axios";
import React, { useEffect, useState } from "react";

const Page = () => {
  const [serviceCategories, setServiceCategories] = useState([]);
  useEffect(() => {
    async function getServiceCategories(){
      try{
        const response = await axios.get("https://m.naai.in/partner/service/category/all");
        let data = response.data.data;
        data.sort();
        setServiceCategories(data);
      }catch(err : any | undefined){
        console.log(err);
      }
    }
    getServiceCategories();
  }, []);
  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
      ]}
    />
  );
};

export default Page;
