'use client'
import Invoice from '@/components/invoice/Invoice';
import { Urls } from '@/lib/api';
import axios from 'axios';
import { useSearchParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'

const Page = () => {
    const searchParams = useSearchParams();
    const encryptedBookingId = searchParams.get("booking") || "";
    const bookingId = atob(encryptedBookingId);
    const [booking, setBooking] = useState();
    
    useEffect(() => {
        async function fetchBooking() {
            if(!bookingId || bookingId === "") return
            let response = await axios.get(`${Urls.GetSingleBookingInfo}?id=${bookingId}`);
            setBooking(response.data.data);
        }
        fetchBooking();
    }, [bookingId])
  return (
    <>
      <div className="invoice-wrapper w-fit h-screen">
          <Invoice booking={booking} invoice={encryptedBookingId}/>
      </div>
    </>
  )
}

export default Page