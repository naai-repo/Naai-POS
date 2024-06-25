import React from "react";
import ClientProvider from "./ClientProvider";
import RecoilContextProvider from "./RecoilContextProvider";
import { cookies } from "next/headers";
import axios from "axios";
import { Urls } from "@/lib/api";

async function getCookies() {
  return new Promise((resolve, reject) => {
    const cookieStore = cookies();
    const cookie = cookieStore.get("salonId");
    resolve(cookie?.value as string);
  });
}

// async function getSalonData(salonId: string) {
//   let salonData = await axios.get(Urls.GetSalonData + `/${salonId}`);
//   let requiredSalonData = {
//     id: salonData.data.data.data._id,
//     name: salonData.data.data.data.name,
//     img: salonData.data.data.data.images[0].url,
//     address: salonData.data.data.data.address,
//     phoneNumber: salonData.data.data.data.phoneNumber,
//     instagram: salonData.data.data.data.links.instagram,
//     taxIncluded: salonData.data.data.data.taxIncluded,
//   };
//   return requiredSalonData;
// }

const CookieProvider = async ({ children }: { children: React.ReactNode }) => {
  const salonId = await getCookies();
  // const salonData = await getSalonData(salonId as string);
  return (
    <RecoilContextProvider>
      <ClientProvider salonId={salonId as string}>
        {children}
      </ClientProvider>
    </RecoilContextProvider>
  );
};

export default CookieProvider;
