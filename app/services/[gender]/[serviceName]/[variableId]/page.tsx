'use client'
import CardDisplay from '@/components/main/components/CardDisplay';
import { getVariablesData } from '@/lib/helper';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

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