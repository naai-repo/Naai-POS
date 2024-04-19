import React from 'react'
import { Button } from '../ui/button'

const Header = () => {
  return (
    <div className="flex justify-between px-2 bg-naai-pos-100 shadow-xl h-6">
        <div className="">Naai</div>
        <div className="login-status">login info here</div>
    </div>
  )
}

export default Header