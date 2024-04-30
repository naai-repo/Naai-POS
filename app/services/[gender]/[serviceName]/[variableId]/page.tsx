'use client'
import CardDisplay from '@/components/main/components/CardDisplay';
import { Urls } from '@/lib/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'


const getVariablesData = async (serviceId: string) => {
  const response = await axios.get(
    Urls.GetSingleService + serviceId
  );
  if (response.status !== 200) {
    throw new Error("Not Found!");
  }
  let data = response.data.data;
  for(let variable of data.variables){
   variable["serviceId"] = data._id,
   variable["serviceTitle"] = data.serviceTitle
   variable["cutPrice"] = variable.variableCutPrice
  }
  console.log(data);
  data.variables.sort((a : any, b : any) => {
    return a.variableName.localeCompare(b.variableName)
  })
  let titles = data.variables.map((ele : any) => ele.variableName)
  titles.sort();
  return {data: data.variables, titles};
}

const Variables = ({params} : {params: {variableId : string}}) => {
  const searchParams = useSearchParams();
  const serviceId = searchParams.get("service");
  const [data, setData] = useState([]);
  const [titles, setTitles] = useState([]);
  useEffect(() => {
    async function getVariables(serviceId: string) {
      let data = await getVariablesData(serviceId);
      setData(data.data);
      setTitles(data.titles);
    }
    getVariables(serviceId as string);
  }, [serviceId])

  return (
    <CardDisplay
      titles={titles}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
        {
          name: decodeURIComponent(params.variableId),
          navigate: `/services/${params.variableId}`,
        },
      ]}
      selectable={true}
      extraInfo={data}
    />
  )
}

export default Variables