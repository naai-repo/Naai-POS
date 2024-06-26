"use client";
import { Button } from "@/components/ui/button";
import logo from "../../public/imgs/logo.svg";
import Image from "next/image";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetOverlay,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Cross2Icon, DashboardIcon } from "@radix-ui/react-icons";
import {
  ChevronRight,
  Instagram,
  Phone,
  LayoutDashboard,
  BarChart3,
  User,
  MessageCircleMore,
} from "lucide-react";
import React, {
  useEffect,
  useImperativeHandle,
  useState,
  forwardRef,
  LegacyRef,
  memo,
  useCallback,
  useMemo,
} from "react";
import { useRecoilValue } from "recoil";
import { salonAtom } from "@/lib/atoms/salonAtom";
import { useRouter } from "next/navigation";

export const Drawer = forwardRef<{ openDrawer: () => void }, any>(({}, ref) => {
  const [open, setOpen] = useState(false);
  const [cnt, setCnt] = useState(1);

  const openDrawer = useCallback(() => {
    console.log("HELLO");
    setOpen(true);
  }, []);

  const closeDrawer = useCallback(() => {
    setOpen(false);
  }, []);

  useImperativeHandle(ref, () => {
    return { openDrawer };
  });

  return (
      <Sheet key={"left"} open={open}>
        <DrawerContent closeDrawer={closeDrawer}></DrawerContent>
      </Sheet>
  );
});

Drawer.displayName = "Drawer";

const DrawerContent = memo(({ closeDrawer }: { closeDrawer: () => void }) => {
  const router = useRouter();
  return (
    <SheetContent side={"left"} className="p-0 data-[state=open]:animate-pop-right data-[state=closed]:animate-pop-left">
      <SheetHeader className="bg-[#F4F6FB] p-0 w-full">
        <SalonProfileDrawerHeader
          callback={closeDrawer}
        ></SalonProfileDrawerHeader>
      </SheetHeader>
      <div className="w-full mt-4 p-0">
        <Button
          variant={"outline"}
          className="flex flex-row justify-between border items-center py-6 rounded w-full"
          onClick={() => router.push("https://partner.naai.in/dashboard")}
        >
          <div className="flex flex-row items-center font-xs font-semibold">
            <LayoutDashboard className="mr-3" />
            Dashboard
          </div>
          <div>
            <ChevronRight className="mx-2" />
          </div>
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row justify-between border items-center py-6 rounded w-full bg-[#0F172A] text-[#fff]"
        >
          <div className="flex flex-row items-center font-xs font-semibold">
            <BarChart3 className="mr-3" />
            POS
          </div>
          <div>
            <ChevronRight className="mx-2" />
          </div>
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row justify-between border items-center py-6 rounded w-full"
          onClick={() => router.push("https://partner.naai.in/profile")}
        >
          <div className="flex flex-row items-center font-xs font-semibold">
            <User className="mr-3" />
            Profile
          </div>
          <div>
            <ChevronRight className="mx-2" />
          </div>
        </Button>
        <Button
          variant={"outline"}
          className="flex flex-row justify-between border items-center py-6 rounded w-full"
          onClick={() => router.push("https://partner.naai.in/reviews")}
        >
          <div className="flex flex-row items-center font-xs font-semibold">
            <MessageCircleMore className="mr-3" />
            Reviews
          </div>
          <div>
            <ChevronRight className="mx-2" />
          </div>
        </Button>
      </div>
    </SheetContent>
  );
});

DrawerContent.displayName = "DrawerContent";

const SalonProfileDrawerHeader = memo(
  ({ callback }: { callback: () => void }) => {
    
    const salonData = useRecoilValue(salonAtom);
    const componentData = {
      imageUrl: (salonData.img ? salonData.img : `https://media.allure.com/photos/5890d754a08420c838db65e1/master/pass/WesWall1Edit.jpg?mbid=social_retweet`),
      salonName: salonData.name,
      address: salonData.address,
      phoneNumber: salonData.phoneNumber,
      instagram: salonData.instagram,
    };

    return (
      <>
        <div className="flex justify-between px-3 py-2 items-center">
          <Image src={logo} alt="naai_logo" />
          <Button
            variant="outline"
            size="icon"
            onClick={(e) => {
              callback();
            }}
          >
            <Cross2Icon className="h-4 w-4"></Cross2Icon>
          </Button>
        </div>
        <div className="bg-slate-400 h-[0.02rem] w-full mt-2"></div>
        <div className="flex flex-col items-start w-full px-1 pb-1 shadow-md">
          <div className="grid grid-cols-6 gap-2">
            <div className="flex col-span-2 h-full w-full">
              <img
                src={componentData.imageUrl}
                alt="salon image"
                className="rounded object-cover border-slate-600 border-medium"
              />
            </div>
            <div className="flex flex-col justify-between items-start col-span-4">
              <div className="flex flex-row justify-between text-xl w-full">
                <h1 className="font-semibold overflow-hidden text-ellipsis whitespace-nowrap uppercase">
                  {componentData.salonName}
                </h1>
              </div>
              <div className="text-start text-xs w-full overflow-hidden text-ellipsis overflow-cut-upto-2-line">
                {componentData.address}
              </div>
            </div>
          </div>
          <div className="bg-slate-400 h-[0.02rem] w-full mt-2"></div>
          <div className="flex flex-row w-full justify-between">
            {componentData.instagram.length ? (
              <div>
                <Button
                  variant={"outline"}
                  className="bg-transparent border-none hover:bg-transparent"
                >
                  <Instagram className="mr-2 h-4 w-4" />
                </Button>
              </div>
            ) : null}
            {componentData.phoneNumber != null ? (
              <div>
                <Button
                  variant={"outline"}
                  className="bg-transparent border-none hover:bg-transparent"
                >
                  <Phone className="mr-2 h-4 w-4" />
                  {componentData.phoneNumber}
                </Button>
              </div>
            ) : null}
          </div>
        </div>
      </>
    );
  }
);

SalonProfileDrawerHeader.displayName = "SalonProfileDrawerHeader";
