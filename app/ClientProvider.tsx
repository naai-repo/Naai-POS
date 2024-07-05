"use client";

import { Urls } from "@/lib/api";
import { salonAtom } from "@/lib/atoms/salonAtom";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { SalonData } from "@/lib/types";
import axios from "axios";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";

const ClientProvider = ({salonId, children }: { salonId: string, children: React.ReactNode }) => {
  const setSalonId = useSetRecoilState(salonIdAtom);
  const setSalon = useSetRecoilState(salonAtom);
  useEffect(() => {
    async function getSalonData(salonId: string) {
      if(!salonId) return;
      let salonData = await axios.get(Urls.GetSalonData + `/${salonId}`);
      console.log("SALONDATA: ", salonId, salonData);
      let requiredSalonData = {
        id: salonData.data.data.data._id,
        name: salonData.data.data.data.name,
        img: salonData.data.data.data.images[0]?.url,
        address: salonData.data.data.data.address,
        phoneNumber: salonData.data.data.data.phoneNumber,
        instagram: salonData.data.data.data.links.instagram,
        taxIncluded: salonData.data.data.data.taxIncluded,
      };
      setSalon(requiredSalonData);
    }
    getSalonData(salonId)
    setSalonId(salonId);
  }, [salonId]);
  return <>{children}</>;
};

export default ClientProvider;
