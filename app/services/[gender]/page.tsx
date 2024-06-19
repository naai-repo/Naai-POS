'use client'
import CardDisplay from "@/components/main/components/CardDisplay";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { Gender } from "@/lib/enums";
import { genderType } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";

async function getServiceCategories(gender: genderType, salonId: string) {
  if(!gender){
    throw new Error("Please select a valid gender")
  }
  let sex: Gender;
  if (gender === "men") {
    sex = Gender.MEN;
  } else if (gender === "women") {
    sex = Gender.WOMEN;
  } else {
    sex = Gender.UNISEX;
  }
  const response = await axios.get(
    `https://m.naai.in/partner/service/category/all?salonId=${salonId}&sex=${sex}`
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }

  let data = response.data.data;
  data.sort();
  return data;
}

const Page = ({ params }: { params: { gender: genderType } }) => {
  const salonId = useRecoilValue(salonIdAtom);
  const [serviceCategories, setServiceCategories] = useState([]);
  // const serviceCategories = await getServiceCategories(params.gender, salonId);
  useEffect(() => {
    async function fetchData() {
      const data = await getServiceCategories(params.gender, salonId);
      setServiceCategories(data);
    }
    fetchData();
  }, [params.gender, salonId]);
  
  return (
    <CardDisplay
      titles={serviceCategories}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "gender", navigate: "/services" },
        {
          name: "service Categories",
          navigate: `/services/${params.gender?.toLowerCase()}`,
        },
      ]}
    />
  );
};

export default Page;
