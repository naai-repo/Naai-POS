import React from "react";
import Home from "./components/CardDisplay";
import { titleArr } from "@/lib/helper";

const Main_Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-[calc(100vh-1.5rem)] bg-naai-pos-300 w-[65%]">
      {children}
    </div>
  );
};

export default Main_Section;
