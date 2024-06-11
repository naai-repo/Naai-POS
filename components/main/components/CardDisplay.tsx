"use client";
import Title_card from "@/components/ui/Title_card";
import { HomeProps } from "@/lib/types";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import { MoveLeft, MoveRight } from "lucide-react";
import React from "react";

const CardDisplay: React.FC<HomeProps> = ({
  titles,
  breadcrumbs,
  selectable = false,
  extraInfo = [],
  comingSoon = [] as boolean[]
}) => {
  const moveBack = () => {
    window.history.back();
  };
  const moveForward = () => {
    window.history.forward();
  }
  return (
    <div className="home-parent px-4 py-6 h-2/3">
      {/* <div className="breadcrumbs text-sm font-bold mb-4 h-4">
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => {
            return (
              <BreadcrumbItem key={index} href={breadcrumb.navigate}>
                {breadcrumb.name}
              </BreadcrumbItem>
            );
          })}
        </Breadcrumbs>
      </div> */}
      <div className="backAndForwardButtons w-full flex justify-between">
        <div className="back bg-white px-8 py-4 mb-8 rounded-lg shadow-lg" onClick={moveBack}><MoveLeft /></div>
        <div className="forward bg-white px-8 py-4 mb-8 rounded-lg shadow-lg" onClick={moveForward}><MoveRight /></div>
      </div>
      <div className="title-cards grid grid-cols-auto gap-4 h-[calc(100%-6rem)] overflow-y-auto">
        {titles.map((title, index) => {
          return (
            <Title_card
              key={index}
              title={title}
              navigate={breadcrumbs[breadcrumbs.length - 1].navigate}
              selectable={selectable}
              serviceDetails={extraInfo[index]}
              displayModal={extraInfo[index]?.variables?.length === 0}
              comingSoon={comingSoon[index]}
            />
          );
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
