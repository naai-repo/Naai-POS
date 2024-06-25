'use client';
import React, { useRef } from 'react'
import DateInput from '../ui/DateInput';
import Image from 'next/image';
import logo from '../../public/imgs/logo.svg';
import { Menu } from 'lucide-react';
import { Button } from '../ui/button'
import { Drawer } from '../ui/Drawer';

const Header = () => {
  const drawerRef = useRef<{ openDrawer: () => void }>(null);
  const handleOnClick = () => {
    console.log("HELLO");
    drawerRef.current?.openDrawer();
  }
  return (
    <>
      <Drawer ref={drawerRef} />
      <div className="flex justify-between px-3 py-4 items-center">
        <div className='flex flex-row items-center gap-4'>
          <Button variant="outline" size="icon" onClick={handleOnClick}>
            <Menu size={20}></Menu>
          </Button>
          <Image src={logo} alt="naai_logo"/>
        </div>
        <div className="flex bg-[#F4F6FB] p-1 box-border rounded-lg">
          <DateInput />
        </div>
      </div>
    </>
  )
}

export default Header