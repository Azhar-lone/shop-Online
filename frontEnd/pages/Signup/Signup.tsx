
import React from 'react';
import { ChangeEvent, useState, useRef } from 'react';
import { Link } from "react-router-dom"


// importing components
// import { input

import { Button } from '@/components/ui/button';
// import { Select  SelectContent,se } from "@/components/ui/select"


interface user {
    email?: string;
    phoneNumber?: number;
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    country: string,
}


const Signup = () => {
    let [step, setStep] = useState<number>(0)
    const [user, setUser] = useState<user>({
        email: undefined,
        phoneNumber: undefined,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        country: '',
    })

    function setValues(e: ChangeEvent<HTMLInputElement>) {
       

    }



    return (

        <div className='md:w-[80%] mx-auto p-5 flex flex-col gap-5  bg-background md:border mt-10'>
            {step === 0 ?
                <div className='  flex flex-col gap-5  '>

                    {/* use Select to choose between phone or email */}
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='email'
                        placeholder=' Email or Phone'
                        type={"text" || "number"}
                        onChange={setValues}
                        value={user.email ? user.email : user.phoneNumber}

                    />


                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='password'
                        placeholder=' Password'
                        value={user.password}
                        onChange={setValues}
                        type='password'
                    />
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='confirmPassword'
                        placeholder=' Confirm password'
                        value={user.confirmPassword}
                        onChange={setValues}
                        type='password'

                    />
                    <Button
                        className="mx-auto"

                        onClick={() => {
                            setStep((prev) => (
                                prev + 1
                            ))
                        }}
                    >Next </Button>

                </div>
                :
                <div className=' flex flex-col gap-5  '>

                    {/* use Select to choose between phone or email */}
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='firstName'
                        placeholder=' First name'
                        onChange={setValues}
                        value={user.firstName}

                    />


                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='lastName'
                        placeholder=' Last name'
                        value={user.lastName}
                        onChange={setValues}

                    />
                    <input
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-6 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        id='country'
                        type="text"
                        placeholder=' Country'
                        value={user.country}
                        onChange={setValues}

                    />

                    <div className='flex '>
                        <Button
                            onClick={() => {
                                setStep((prev) => (
                                    prev - 1
                                ))
                            }}
                        > Back </Button>

                        <Button className="md:ml-[40%] ml-[30%]">SignUp </Button>
                    </div>

                </div>
            }
            {step === 0 && <div>already have account
                <Link to={"/"}
                    className='text-blue-500 p-2 hover:text-blue-400'
                >login</Link></div>}
        </div>

    )
}

export default Signup

