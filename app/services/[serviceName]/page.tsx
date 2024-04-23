import CardDisplay from "@/components/main/components/CardDisplay";
import axios from "axios";
import React from "react";

const salonId = "65e28c422ebce658ad29fdb0";

async function getServicesFromCategories(serviceName: string) {
  const response = await axios.get(
    `https://m.naai.in/pos/service/${decodeURIComponent(
      serviceName
    )}?salonId=${salonId}`
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

const page = async ({ params }: { params: { serviceName: string } }) => {
  const { data, extraInfo } = await getServicesFromCategories(
    params.serviceName
  );
  return (
    <CardDisplay
      titles={data}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
        {
          name: decodeURIComponent(params.serviceName),
          navigate: `/services/${params.serviceName}`,
        },
      ]}
      selectable={true}
      extraInfo={extraInfo}
    />
  );
};

export default page;
