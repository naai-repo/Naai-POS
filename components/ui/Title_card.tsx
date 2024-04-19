'use client'
import { title_cardProps } from '@/lib/types'
import React from 'react'

const Title_card:React.FC<title_cardProps> = ({title, navigate}) => {
    const handleClick:React.MouseEventHandler<HTMLDivElement> = (e) => {
        let value:string = e.currentTarget.innerText.toLowerCase();
        window.location.href = `${navigate}/${title}`;
    }
  return (
    <div className="w-32 h-20 bg-naai-pos-500 flex items-center justify-center rounded-lg capitalize font-medium text-sm cursor-pointer" onClick={handleClick}>
        <div className="title">{title}</div>
    </div>
  )
}

export default Title_card