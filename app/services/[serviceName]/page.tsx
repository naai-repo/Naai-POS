import CardDisplay from '@/components/main/components/CardDisplay'
import axios from 'axios';
import React from 'react'

const salonId = "65e28c422ebce658ad29fdb0";

async function getServicesFromCategories(serviceName: string) {
  try{
    const response = await axios.get(`https://m.naai.in/pos/service/${decodeURIComponent(serviceName)}?salonId=${salonId}`);
    let data = response.data.data.services;
    data = data.map( (e: { serviceTitle: string; }) => e.serviceTitle);
    data.sort();
    return data;
  }catch(err : any) {
    console.log(err);
  }
}

const page = async ({params}: {params: {serviceName:string}}) => {
  const titles = await getServicesFromCategories(params.serviceName);
  return (
    <CardDisplay titles={titles} breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
        { name: decodeURIComponent(params.serviceName), navigate: `/services/${params.serviceName}` },
    ]}/>
  )
}

export default page