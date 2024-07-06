"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Dispatch, SetStateAction, useState } from "react";

export default function AlertDialog({
  open,
  setOpen,
  title,
  discription,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  title: string;
  discription: string;
}) {
  return (
    <Dialog modal={true} open={open}>
      <DialogContent
        onInteractOutside={(e) => {
          e.preventDefault();
        }}
        className="bg-[#212121] rounded-2xl w-[75%] sm:max-w-[20%] border-none px-3 py-4 sm:px-4"
      >
        <DialogHeader>
          <DialogTitle className="text-white text-center">{title}</DialogTitle>
          <DialogDescription className="text-white pt-5 pb-5 font-poppins">
            {discription}
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button
            onClick={(e) => {
              setOpen(false);
            }}
            className="bg-white/40 hover:bg-white/20 py-6 w-full text-small font-semibold text-white"
            type="submit"
          >
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
