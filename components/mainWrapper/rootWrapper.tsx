"use client"
import React,{ HTMLAttributes } from "react"
import MainHeader from "./mainHeader"

interface MainWrapperProps {
  children?: React.ReactNode;
  parentWrapper: React.HTMLAttributes<HTMLDivElement>;
  mainWrapper: React.HTMLAttributes<HTMLDivElement>;
}

const rootWrapper :React.FC<{children? : React.ReactNode}> = ({children}) => {
  return (
    <div className="flex h-full w-full flex-col bg-muted/40">
      <aside className="fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <nav className="flex flex-col items-center gap-4 px-2 sm:py-4">
        </nav>
      </aside>

       {children}
    </div>
  )
}
export default rootWrapper;