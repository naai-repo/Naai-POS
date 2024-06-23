"use client";
import CardDisplay from "@/components/main/components/CardDisplay";
import { breadcrumbsAtom } from "@/lib/atoms/breadcrumbs";
import { salonIdAtom } from "@/lib/atoms/salonIdAtom";
import { titleArr } from "@/lib/helper";
import { useEffect } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";

function getCookie(name: string) {
  return new Promise((resolve, reject) => {
    console.log("DATA HERE");
    var nameEQ = name + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) == " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) == 0) resolve(c.substring(nameEQ.length, c.length));
    }
    resolve("");
  });
}

export default function Home() {
  const breadcrumbs = useRecoilValue(breadcrumbsAtom);
  const setSalonId = useSetRecoilState(salonIdAtom);
  useEffect(() => {
    async function settingSalonId() {
      let salonId = await getCookie("userId");
      if (!salonId) {
        throw new Error("Authentication Error: Salon Id not found in cookies");
      }
      // setSalonId(salonId as string);
    }
    settingSalonId();
  }, []);
  return (
    <CardDisplay
      titles={titleArr}
      breadcrumbs={breadcrumbs}
      comingSoon={[false, true, true, true]}
    />
  );
}
