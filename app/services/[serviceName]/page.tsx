import CardDisplay from '@/components/main/components/CardDisplay'
import React from 'react'

const page = ({params}: {params: {serviceName:string}}) => {
  return (
    <CardDisplay titles={["nail color"]} breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "service Categories", navigate: "/services" },
        { name: decodeURIComponent(params.serviceName), navigate: `/services/${params.serviceName}` },
    ]}/>
  )
}

export default page