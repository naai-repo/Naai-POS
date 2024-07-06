"use client"
import React from 'react'
import Image from "next/image"
import Link from "next/link"
import {
  Search,
  User,
} from "lucide-react"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
} from "@/components/ui/card"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import logo from '../../public/imgs/logo.svg';
import DateInput from '@/components/ui/DateInput';

interface MainHeaderProps  {
  name:string
}

const  MainHeader : React.FC<MainHeaderProps> =  ({name}) => {
  return (
    <header className="sticky top-0 z-30 py-4 sm:py-0 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">

        <Breadcrumb className="hidden md:flex">
        <BreadcrumbList>
            <BreadcrumbItem>
            <Card>
                <CardContent className="flex items-center px-2 py-2">
                    <Image src={logo} alt="naai_logo" height={40} width={40}></Image>
                </CardContent>
            </Card>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
            <BreadcrumbLink asChild>
                <Link href="#">{name}</Link>
            </BreadcrumbLink>
            </BreadcrumbItem>
        </BreadcrumbList>
        </Breadcrumb>

        <div className="relative ml-auto flex-1 md:grow-0">
        <div className="flex bg-[#F4F6FB] p-1 box-border rounded-lg">
          <DateInput />
        </div>
        </div>

        <DropdownMenu>
        <DropdownMenuTrigger asChild>
            <Button
            variant="outline"
            size="icon"
            className="overflow-hidden rounded-full"
            >
                <User size={20}/>
            {/* <Image
                src="/placeholder-user.jpg"
                width={36}
                height={36}
                alt="Avatar"
                className="overflow-hidden rounded-full"
            /> */}
            </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
        </DropdownMenuContent>
        </DropdownMenu>
  </header>
  )
}

export default MainHeader