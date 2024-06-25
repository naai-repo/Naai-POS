"use client";

import { salonAtom } from "@/lib/atoms/salonAtom";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { SalonData } from "@/lib/types";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const ClientProvider = ({salonId, salonData, children }: { salonId: string, salonData: SalonData, children: React.ReactNode }) => {
  const setSalonId = useSetRecoilState(salonIdAtom);
  const setSalon = useSetRecoilState(salonAtom);
  useEffect(() => {
    console.log(salonData);
    setSalonId(salonId);
    setSalon(salonData);
  }, [salonId]);
  return <>{children}</>;
};

export default ClientProvider;
