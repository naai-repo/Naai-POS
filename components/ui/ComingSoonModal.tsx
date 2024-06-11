"use client";
import { Phone } from "lucide-react";
import Image from "next/image";
import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

const ComingSoonModal = ({
  openComingSoon,
  setOpenComingSoon,
}: {
  openComingSoon: boolean;
  setOpenComingSoon: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  return (
    <Modal
      isOpen={openComingSoon}
      size="xl"
      onClose={() => setOpenComingSoon(false)}
    >
      <ModalContent>
        {(onClose) => (
          <>
            <ModalBody>
              <div className="center-container p-8 flex justify-center flex-col items-center text-center">
                <h1 className="text-4xl mb-4 font-medium">
                  Upgrade to Naai plus
                </h1>
                <p className="text-xl font-normal mb-4">
                  Contact us to get access to India&apos;s Faster, Smarter and
                  Better software.
                </p>
                <div className="number-logo mb-4">
                  <div className="number flex flex-row font-semibold mb-4">
                    <Phone /> &nbsp; +91 92053 28688
                  </div>
                  <div className="logo flex justify-center items-center">
                    {/* <img src="/imgs/logo.png" alt="naai-logo" /> */}
                    <Image
                      src="/imgs/logo.png"
                      alt="naai-logo"
                      width={65}
                      height={65}
                    />
                  </div>
                </div>
              </div>
            </ModalBody>
          </>
        )}
      </ModalContent>
    </Modal>
    // <div className="h-screen w-screen z-10 bg-black/50 absolute top-0 left-0">
    //
    // </div>
  );
};

export default ComingSoonModal;
