"use client";
import Title_card from "@/components/ui/Title_card";
import { HomeProps } from "@/lib/types";
import { Breadcrumbs, BreadcrumbItem } from "@nextui-org/breadcrumbs";
import React from "react";

const CardDisplay: React.FC<HomeProps> = ({ titles, breadcrumbs }) => {
  return (
    <div className="home-parent px-4 py-6 h-2/3">
      <div className="breadcrumbs text-sm font-bold mb-4 h-4">
        <Breadcrumbs>
          {breadcrumbs.map((breadcrumb, index) => {
            return <BreadcrumbItem key={index} href={breadcrumb.navigate} >{breadcrumb.name}</BreadcrumbItem>;
          })}
        </Breadcrumbs>
      </div>
      <div className="title-cards grid grid-cols-auto gap-4 h-[calc(100%-1rem)] overflow-y-auto">
        {titles.map((title, index) => {
          return <Title_card key={index} title={title} navigate={breadcrumbs[breadcrumbs.length-1].navigate} />;
        })}
      </div>
    </div>
  );
};

export default CardDisplay;
