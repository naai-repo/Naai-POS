"use client";

import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const ClientProvider = ({salonId, children }: { salonId: string, children: React.ReactNode }) => {
  const setSalonId = useSetRecoilState(salonIdAtom);
  useEffect(() => {
    console.log(salonId);
    setSalonId(salonId);
  }, [salonId]);
  return <>{children}</>;
};

export default ClientProvider;
