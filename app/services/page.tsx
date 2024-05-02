"use client";
import CardDisplay from "@/components/main/components/CardDisplay";
import { breadcrumbsAtom } from "@/lib/atoms/breadcrumbs";
import React from "react";
import { useRecoilValue } from "recoil";

const Gender = () => {
  const breadcrumbs = useRecoilValue(breadcrumbsAtom);
  return (
    <CardDisplay
      titles={["men", "women"]}
      breadcrumbs={[
        { name: "Home", navigate: "/" },
        { name: "gender", navigate: "/services" },
      ]}
    />
  );
};

export default Gender;
