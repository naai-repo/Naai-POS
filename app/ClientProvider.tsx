"use client";
import RecoilContextProvider from "./RecoilContextProvider";

const ClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <RecoilContextProvider>{children}</RecoilContextProvider>;
};

export default ClientProvider;
