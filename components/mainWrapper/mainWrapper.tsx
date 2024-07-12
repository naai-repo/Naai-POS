"use client"
import React,{ HTMLAttributes } from "react"
import { ExpandableNavigation } from "./SideNavigation"
import MainHeader from "./mainHeader"

interface MainWrapperProps {
  children?: React.ReactNode;
  parentWrapper: React.HTMLAttributes<HTMLDivElement>;
  mainWrapper: React.HTMLAttributes<HTMLDivElement>;
  name:string
}

const MainWrapper :React.FC<MainWrapperProps> = ({children,parentWrapper,mainWrapper,name}) => {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-50 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
          <ExpandableNavigation></ExpandableNavigation>
        </nav>
      </aside>

      <div {...parentWrapper}>
        <MainHeader name={name}></MainHeader>
        <main {...mainWrapper}>
           {children}
        </main>
      </div>
    </div>
  )
}
export default MainWrapper;