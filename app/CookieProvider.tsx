import React from "react";
import ClientProvider from "./ClientProvider";
import RecoilContextProvider from "./RecoilContextProvider";
import { cookies } from "next/headers";

async function getCookies(){
  return new Promise((resolve, reject) => {
    const cookieStore = cookies();
    const cookie = cookieStore.get("userId");
    resolve(cookie?.value as string);
  });
}

const CookieProvider = async({ children }: { children: React.ReactNode }) => {
  const salonId = await getCookies();
  return (
    <RecoilContextProvider>
      <ClientProvider salonId={salonId as string}>{children}</ClientProvider>
    </RecoilContextProvider>
  );
};

export default CookieProvider;
