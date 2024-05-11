import React from 'react'
import { useNavigate } from 'react-router-dom'
// importing components
import { Button } from "@/components/ui/button"

const ForgotPassword = () => {
let navigate=useNavigate()

    return (
        <div className='text-center md:w-[80%] mx-auto p-5 flex flex-col gap-5 items-center bg-background md:border mt-10'>
            <h1 className='text-xl font-bold'>Verify its you</h1>
            <h1>Send code by</h1>
            <Button
            onClick={()=>navigate("/forgot-password?select=email")}
>
                email
            </Button>
            <h1
            className='text-4xl '
            >OR</h1>
            <Button
            onClick={()=>navigate("/forgot-password?select=phone-number")}
            
            >
                Phone Number
            </Button>
        </div>
    )
}

export default ForgotPassword