'use client'
import { currencyOptions } from '@/lib/helper';
import React, { useEffect, useState } from 'react'

const Price_display = ({align} : {align: "left" | "right" | "center"}) => {
  const [price, setPrice] = useState<number>(10000);
  const [orientation, setOrientation] = useState<string>("justify-end");

  useEffect(() => {
    if(align.toLowerCase() === "center"){
      setOrientation("justify-center")
    }else if(align.toLowerCase() === "right"){
      setOrientation("justify-end");
    }
  }, [align])

  return (
    <div className="bg-naai-secondary h-16 w-full">
      <div className={`flex ${orientation} items-center h-full px-2`}>
        <div className="text-amber-500 text-4xl">{price.toLocaleString("en-In", currencyOptions)}</div>
      </div>
    </div>
  )
}

export default Price_display