import Main_Section from '@/components/main/Main_Section'
import MainWrapper from '@/components/mainWrapper/mainWrapper'
import Pricing from '@/components/pricing/Pricing'
import React from 'react'

const layout = ({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) => {
  return (
    <MainWrapper
            name="POS"
            parentWrapper={{
              className: "flex flex-col sm:gap-4 sm:py-4 sm:pl-14 h-full bg-[#FAFBFD]",
            }}
            mainWrapper={{
              className:
                "grid flex-1 items-start gap-4 p-2 sm:px-6 sm:py-0 md:gap-8 h-full bg-[#FAFBFD]",
            }}
          >
            <div className="flex w-full overflow-hidden h-[calc(100vh-6rem)]">
              {/* <Action_Buttons /> */}
              <Main_Section>{children}</Main_Section>
              <Pricing />
            </div>
          </MainWrapper>
  )
}

export default layout