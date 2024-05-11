import React from 'react'

// importing Components
import {Button} from "@/components/ui/button"

function Form() {
  return (
    <div>
       <div className='text-center md:w-[80%] mx-auto p-5 flex flex-col gap-5  bg-background md:border mt-10'>
            <h1 className='text-xl font-bold'>Verify its you</h1>
            <h1>Send code by</h1>
            <Button
            variant="ghost"
            >
                email
            </Button>
            <h1
            className='text-4xl '
            >OR</h1>
            <Button>
                Phone Number
            </Button>
        </div>
        </div>
  )
}

export default Form