"use client"
import React,{ useState } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  Bolt,
  ChevronRight,
  Clock,
  Cylinder,
  FileText,
  HandCoins,
  HandPlatter,
  Home,
  LineChart,
  Menu,
  MessageCircleMore,
  Package,
  Package2,
  Percent,
  Plus,
  ShoppingCart,
  Slack,
  TrendingUp,
  User,
  Users,
  Users2,
  WatchIcon,
  X,
} from "lucide-react"
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider
} from "@/components/ui/tooltip";
import AlertDialog from '@/components/alertDialog/AlertDialog';
import { Button, buttonVariants } from "../ui/button";
import { cn } from "@/lib/utils";

type MenuType = {
  title : string,
  icon : React.JSX.Element,
  redirectUrl? : string,
  path? : string
};

const SideNavigation : React.FC<{navigationMenus : MenuType[],isCollapsed : boolean}> = ({navigationMenus,isCollapsed}) => {
  const [open, setOpen] = useState(false);

  return (
    <>
        <AlertDialog open={open} setOpen={setOpen} title={"ALERT"} discription={"This Feature Will Be Live in 15 Days"}></AlertDialog>
        <TooltipProvider>
            {
              navigationMenus.map((item,idx) => {
                let redirectPath = item?.path;
                if(redirectPath == null) redirectPath = item?.redirectUrl;
                let isSelected = "POS" == item.title!;
                return (
                  <Tooltip key={idx} delayDuration={0}>
                    <TooltipTrigger asChild>
                    {/* <div onClick={(e)=>{
                          if(redirectPath == undefined){
                              callBackValue.showAlert("ALERT","This Feature Will Be Live In 15 Days");
                          }
                      }}> */}
                  
                        <Link
                          onClick={(e) => {
                            if(redirectPath == undefined){
                                 setOpen(true);
                            }
                          }}
                          href={redirectPath ?? ""}
                          className={cn(
                            buttonVariants({ variant: (isSelected) ? "default" : "outline", size: "icon" }),
                            "h-8 w-full border-none shadow-none rounded-md",
                            (isCollapsed) ? "justify-center" : "justify-start p-4",
                            (isSelected) ? "bg-[#000000] hover:bg-[#000000]/85 text-primary-foreground" : "hover:bg-[#f1f5f9] text-muted-foreground transition-colors hover:text-foreground"
                            // "default" === "default" &&
                            //   "dark:bg-muted dark:text-muted-foreground dark:hover:bg-muted dark:hover:text-white"
                          )}
                        >
                          <div className="flex flex-row gap-3">
                            {item.icon}
                            {(!isCollapsed) ? item.title : null}
                          </div>
                          {/* {(!isCollapsed) ? <span className="sr-only">{item.title}</span> : null} */}
                        </Link>
                      {/* </div> */}
                    </TooltipTrigger>
                    {/* <TooltipContent side="right">{item.title}</TooltipContent> */}
                </Tooltip>
                )
              })
            }
          </TooltipProvider>
    </>

  )
}

export const ExpandableNavigation : React.FC = () => {
  const [data,setData] = useState({isCollapsed : true});

  const navigationMenus : MenuType[] = [
    {
      title : "Dashboard",
      icon : <Home className="h-5 w-5" />,
      path : "https://partner.naai.in/dashboard"
    },
    {
      title : "POS",
      icon : <Cylinder className="h-5 w-5" />,
      redirectUrl : "#"
    },
    {
      title : "Analytics",
      icon : <LineChart className="h-5 w-5" />,
      path : "https://partner.naai.in/analytics"
    },
    {
      title : "Reviews",
      icon : <MessageCircleMore className="h-5 w-5" />,
      path : "https://partner.naai.in/profile"
    },
    {
      title : "Add Staff",
      icon : <Plus className="h-5 w-5"/>,
      path : "https://partner.naai.in/staff-management"
    },
    {
      title : "Manage Time",
      icon : <Clock className="h-5 w-5"/>,
      path : "https://partner.naai.in/time-management"
    },
    {
      title : "Discounts",
      icon : <Percent className="h-5 w-5"/>,
      path : "https://partner.naai.in/discount"
    },
    {
      title : "Customers",
      icon : <Users2 className="h-5 w-5" />,
      path : "https://partner.naai.in/profile/customer-list"
    },
    {
      title : "Settings",
      icon : <Bolt className="h-5 w-5"/>,
      path : "https://partner.naai.in/profile"
    },
    // {
    //   title : "Subscriptions",
    //   icon : <TrendingUp className="h-5 w-5"/>,
    //   path : router.routes.subscriptionsScreen
    // },
    {
      title : "Products",
      icon : <Package className="h-5 w-5" />,
    },
    {
      title : "Services",
      icon : <HandPlatter className="h-5 w-5" />,
    },
    {
      title : "Memberships",
      icon : <Slack className="h-5 w-5"/>,
    },
    {
      title : "Invoice",
      icon : <FileText className="h-5 w-5"/>,
    },
    {
      title : "Expenses",
      icon : <HandCoins className="h-5 w-5"/>,
    }
  ]

  return (
    <>
      <aside onMouseEnter={(e) => {
        setData({...data, isCollapsed : false })
      }} onMouseLeave={(e) => {
        setData({...data, isCollapsed : true })
      }} className={cn(
        "fixed inset-y-0 left-0 z-[50] hidden flex-col border-r bg-background sm:flex transition-all",
         (data.isCollapsed) ? "w-14" : "h-full shadow-lg w-48"
      )}>
        <nav className={cn(
          "flex flex-col h-full w-full transition-all",
          (data.isCollapsed) ? "items-start gap-4 px-2 sm:py-4" : "items-start gap-4 px-2 sm:py-4 overflow-y-scroll scrollbar-hide",
        )}>
          {
            //items-start gap-4 px-0 sm:py-0
              // (data.isCollapsed) ? 
              //   <Button variant="outline" className="py-4 px-2" size="sm" onClick={(e) => {
              //     setData({...data,isCollapsed : false});
              //   }}>
              //     <Menu size={18} ></Menu>
              //   </Button>
              // : null
         }
          {
            <SideNavigation navigationMenus={navigationMenus} isCollapsed={data.isCollapsed}></SideNavigation>
          }
        </nav>
      </aside>
    </>
  )
}