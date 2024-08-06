import { currencyOptions } from '@/lib/helper';
import React from 'react'

const DisplayBillInfo = ({
    title,
    value,
    money = false,
    text = "xs"
  }: {
    title: string;
    value: number | string;
    money?: boolean;
    text?: String;
  }) => {
    return (
      <div className="display-bill-info-component flex justify-between items-center px-4">
        <div className={`title-name text-${text} capitalize`}>{title}</div>
        <div className="value">
          {money ? value.toLocaleString("en-In", currencyOptions) : value}
        </div>
      </div>
    );
  };

export default DisplayBillInfo