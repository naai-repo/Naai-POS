"use client";
import { title_cardProps } from "@/lib/types";
import React, { useState } from "react";
import {
  useDisclosure,
} from "@nextui-org/modal";
import { usePathname, useRouter } from "next/navigation";
import ComingSoonModal from "./ComingSoonModal";
import ModalComponentForServices from "./ModalComponentForServices";

const Title_card: React.FC<title_cardProps> = ({
  title,
  navigate,
  selectable,
  serviceDetails,
  displayModal,
  comingSoon = false,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const router = useRouter();
  const pathname = usePathname();
  const [openComingSoon, setOpenComingSoon] = useState(false);

  const handleClick: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if(title.toLowerCase() === "men" || title.toLowerCase() === "women"){
      router.push(`${pathname}/${title}?gender=${title.toLowerCase()}`);
      return;
    }
    if (serviceDetails?.variables.length ?? 0 > 0) {
      router.push(`${pathname}/${title}?service=${serviceDetails?.serviceId}`);
      return;
    }
    pathname === "/"
      ? router.push(`/${title}`)
      : router.push(`${pathname}/${title}`);
  };

  const handleComingSoon = () => {
    setOpenComingSoon(true);
  };

  return (
    <>
      <div
        className="w-32 h-20 bg-naai-pos-500 flex items-center justify-center rounded-lg capitalize font-medium text-sm cursor-pointer text-center"
        onClick={comingSoon ? handleComingSoon : (selectable || displayModal ? onOpen : handleClick)}
      >
        <div className="title">{title}</div>
      </div>
      <ModalComponentForServices
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        serviceDetails={serviceDetails}
      />
      <ComingSoonModal openComingSoon={openComingSoon} setOpenComingSoon={setOpenComingSoon}/>
    </>
  );
};

export default Title_card;
