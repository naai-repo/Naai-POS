import { Phone } from "lucide-react";
import Image from "next/image";
import React from "react";

const page = () => {
  return (
    <div className="h-screen w-screen z-10 bg-naai-pos-300 absolute top-0 left-0">
      <div className="center-container h-1/2 w-1/2 bg-red-400 absolute top-1/2 left-1/2 translate-x-[-50%] translate-y-[-50%] flex justify-center flex-col items-center text-center">
        <h1 className="text-4xl mb-4 font-medium">Upgrade to Naai plus</h1>
        <p className="text-xl font-normal mb-4">
          Contact us to get access to India's Faster, Smarter and Better
          software.
        </p>
        <div className="number-logo mb-4">
          <div className="number flex flex-row font-semibold">
            <Phone /> &nbsp; +91 92053 28688
          </div>
          <div className="logo">
          <Image src="https://drive.google.com/file/d/15SyzJ-iBoIWgpoNrU4prLBmNgawzkjHM/view?usp=drive_link" alt="naai-logo" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default page;
