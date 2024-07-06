import React from "react";
import Home from "./components/CardDisplay";
import { titleArr } from "@/lib/helper";
import OnScreenKeyboard from "./components/OnScreenKeyboard";

const Main_Section = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="bg-[#FAFBFD] w-[40%]">
      {children}
      {/* <OnScreenKeyboard /> */}
    </div>
  );
};

export default Main_Section;
