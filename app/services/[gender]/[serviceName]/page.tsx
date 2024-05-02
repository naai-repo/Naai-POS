import CardDisplay from "@/components/main/components/CardDisplay";
import { SALONID } from "@/lib/api";
import { Gender } from "@/lib/enums";
import { genderType } from "@/lib/types";
import axios from "axios";
import React from "react";

const salonId = SALONID;

async function getServicesFromCategories(serviceName: string , gender: genderType) {
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
    `https://m.naai.in/pos/service/${decodeURIComponent(
      serviceName
    )}?salonId=${salonId}&sex=${sex}`
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.data.services;
  data.sort((a: any, b: any) => a.serviceTitle.localeCompare(b.serviceTitle));
  let extraInfo = data.map((e: any) => {
    return {
      serviceId: e._id,
      category: e.category,
      serviceTitle: e.serviceTitle,
      targetGender: e.targetGender,
      avgTime: e.avgTime,
      variables: e.variables,
      basePrice: e.basePrice,
      cutPrice: e.cutPrice,
      productsUsed: e.productsUsed,
    }
  });
  data = data.map((e: any) => e.serviceTitle);
  return { data, extraInfo };
}

const page = async ({ params }: { params: { serviceName: string, gender: genderType } }) => {
  const { data, extraInfo } = await getServicesFromCategories(
    params.serviceName,
    params.gender
  );

  return (
    <CardDisplay
      titles={data}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "gender", navigate: "/services" },
        { name: "service Categories", navigate: "/services" },
        {
          name: decodeURIComponent(params.serviceName),
          navigate: `/services/${params.serviceName}`,
        },
      ]}
      extraInfo={extraInfo}
    />
  );
};

export default page;
