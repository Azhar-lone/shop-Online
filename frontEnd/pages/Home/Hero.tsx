// this component will render hero part of homePage
import React from 'react'

// components
import { Button } from "@/components/ui/button"


const Hero = () => {
  return (
    <div className={`h-[80vh] w-[99%] m-auto bg-green-100 mb-4 flex items-center justify-center`}    >
      <Button>
        hero
      </Button >

    </div >
  )
}

export default Hero