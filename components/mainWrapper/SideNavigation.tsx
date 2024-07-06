"use client"
import React,{ useState } from "react"
import Link from "next/link"
import {
  Clock,
  Cylinder,
  Home,
  LineChart,
  MessageCircleMore,
  Package,
  Package2,
  Percent,
  ShoppingCart,
  User,
  Users,
  Users2,
  WatchIcon,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import AlertDialog from '@/components/alertDialog/AlertDialog';

type MenuType = {
  title : string,
  icon : React.JSX.Element,
  redirectUrl? : string,
  path? : string
};

function SideNavigation() {
  const [open, setOpen] = useState(false);
   
  const navigationMenus : MenuType[] = [
    {
      title : "Dashboard",
      icon : <Home className="h-5 w-5" />,
      redirectUrl : "https://partner.naai.in/dashboard"
    },
    {
      title : "POS",
      icon : <Cylinder className="h-5 w-5" />,
      redirectUrl : "#"
    },
    {
      title : "Analytics",
      icon : <LineChart className="h-5 w-5" />,
      redirectUrl : "https://partner.naai.in/analytics"
    },
    {
      title : "Profile",
      icon : <User className="h-5 w-5" />,
      redirectUrl : "https://partner.naai.in/profile"
    },
    {
      title : "Reviews",
      icon : <MessageCircleMore className="h-5 w-5" />,
      redirectUrl : "https://partner.naai.in/reviews"
    },
    {
      title : "Add Staff",
      icon : <Users className="h-5 w-5"/>,
      redirectUrl : "https://partner.naai.in/staff-management"
    },
    {
      title : "Manage Time",
      icon : <Clock className="h-5 w-5"/>,
      redirectUrl : "https://partner.naai.in/time-management"
    },
    {
      title : "Discounts",
      icon : <Percent className="h-5 w-5"/>,
      redirectUrl : "https://partner.naai.in/discount"
    },
    {
      title : "Customers",
      icon : <Users2 className="h-5 w-5" />,
      redirectUrl : "https://partner.naai.in/profile/customer-list"
    },
    {
      title : "Products",
      icon : <Package className="h-5 w-5" />,
    },
    {
      title : "Orders",
      icon : <ShoppingCart className="h-5 w-5" />,
    },
  ]


  return (
    <>
       <AlertDialog open={open} setOpen={setOpen} title={"ALERT"} discription={"This Feature Will Be Live in 15 Days"}></AlertDialog>
       <TooltipProvider>
          {
            navigationMenus.map((item,idx) => {
              let redirectPath = item?.path;
              if(redirectPath == null) redirectPath = item?.redirectUrl;

              return (
                <Tooltip key={idx}>
                  <TooltipTrigger asChild >
                    <div onClick={(e)=>{
                         if(redirectPath == undefined){
                            setOpen(true);
                         }
                    }}>
                       <MenuIcon isSelected={item.title === "POS"!} value={item}></MenuIcon>
                    </div>
                  </TooltipTrigger>
                  <TooltipContent side="right">{item.title}</TooltipContent>
               </Tooltip>
              )
            })
          }
        </TooltipProvider>
    </>
  )
}

const MenuIcon = React.forwardRef<HTMLSpanElement,{isSelected : boolean,value : MenuType}>(({isSelected,value},ref) => {
  let redirectPath = value?.path;
  if(redirectPath == null) redirectPath = value?.redirectUrl;
  if(redirectPath == null) redirectPath = "#";

  return (
    <>
    {
      (isSelected) ? (
        <Link href="#" className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base">
          {value.icon}
          <span ref={ref} className="sr-only">{value.title}</span>
        </Link>
      ) : (
        <Link
          href={redirectPath}
          // onClick={(e) => {
          //   if(redirectPath == null) return;
          //   router.push(redirectPath);
          // }}
          className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
        >
          {value.icon}
          <span ref={ref} className="sr-only">{value.title}</span>
        </Link>
      )
    }
    </>
  )
})

MenuIcon.displayName = 'MenuIcon'; 

export default SideNavigation