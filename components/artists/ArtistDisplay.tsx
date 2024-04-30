import { ArtistDisplayProps } from '@/lib/types'
import React from 'react'

const ArtistDisplay:React.FC<ArtistDisplayProps> = ({name, price, basePrice}) => {
  return (
    <div className="flex content-between">
      <div className="flex-1">{name}</div>
      {price !== basePrice && <div className="flex-1">{price}</div>}
    </div>
  )
}

export default ArtistDisplay