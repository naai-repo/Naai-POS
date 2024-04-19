import React from 'react'
import Pricing from '../pricing/Pricing'
import Main_Section from '../main/Main_Section'
import Action_Buttons from '../action-buttons/Action_Buttons'

const Layout = () => {
  return (
    <div className="flex w-screen">
        <Pricing />
        <Action_Buttons />
    </div>
  )
}

export default Layout