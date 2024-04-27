'use client'
import CardDisplay from "@/components/main/components/CardDisplay";
import { breadcrumbsAtom } from "@/lib/atoms/breadcrumbs";
import { titleArr } from "@/lib/helper";
import { useRecoilValue } from "recoil";

export default function Home() {
  const breadcrumbs = useRecoilValue(breadcrumbsAtom);
  return (
    <CardDisplay titles={titleArr} breadcrumbs={breadcrumbs} />
  );
}
