'use client'
import React, { useEffect, useState } from 'react'

const Price_display = () => {
  const [price, setPrice] = useState<number>(10000);

  const currencyOptions = {
    style: "currency",
    currency: "INR",
  };
  return (
    <div className="bg-naai-secondary h-16 w-full">
      <div className="flex justify-end items-center h-full px-2">
        <div className="text-amber-500 text-4xl">{price.toLocaleString("en-In", currencyOptions)}</div>
      </div>
    </div>
  )
}

export default Price_display