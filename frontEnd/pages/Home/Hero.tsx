// this component will render hero part of homePage
import React from 'react'

// components
import { Button } from "@/components/ui/button"

const image = "../../src/assets/hero1.jpg"

const Hero = () => {
  return (
    <div className={`h-[80vh] w-[99%] m-auto mb-4 flex items-center justify-center`}
      style={{
        backgroundImage: `url(${image})`,
        backgroundSize: "100% 100%"
      }}
    >
      <Button

      >
        Featured product
      </Button >

    </div >
  )
}

export default Hero