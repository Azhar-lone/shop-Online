
import React from 'react';
import { ChangeEvent, useState, useRef } from 'react';
import { Link } from "react-router-dom"


// importing components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select } from "@/components/ui/select"


interface user {
    email?: string;
    phoneNumber?: Number;
    password: string
    confirmPassword: string
    firstName: string
    lastName: string
    birthDate: Number
}


const Signup = () => {
    let [step, setStep] = useState<number>(0)
    const [user, setUser] = useState<user>({
        email: '',
        phoneNumber: 0,
        password: '',
        confirmPassword: '',
        firstName: '',
        lastName: '',
        birthDate: Date.now()
    })

    function setValues(e: ChangeEvent<HTMLInputElement>) {
        console.log(e.target.value)

    }



    return (

        <div className='md:w-[80%] mx-auto p-5 flex flex-col gap-5  bg-background md:border mt-10'>
            {step === 0 ?
                <div className='  flex flex-col gap-5  '>

                    {/* use Select to choose between phone or email */}
                    <Input
                        placeholder=' Email'
                        onChange={setValues}
                        value={user.email}

                    />


                    <Input
                        placeholder=' Password'
                    // value={user.email}

                    />
                    <Input
                        placeholder=' Confirm password'
                    // value={user.email}

                    />
                    <Button 
className="mx-auto"

                      onClick={()=>{
                        setStep((prev)=>(
                            prev+1
                        ))
                    }}
                    >Next </Button>

                </div>
                :
                <div className=' flex flex-col gap-5  '>

                    {/* use Select to choose between phone or email */}
                    <Input
                        placeholder=' First name'
                        onChange={setValues}
                        value={user.email}

                    />


                    <Input
                        placeholder=' Last name'
                    // value={user.email}

                    />
                    <Input
                        type="date"
                        placeholder=' C'
                    // value={user.email}

                    />
                    
                    <div className='flex '>
                    <Button 
                    onClick={()=>{
                        setStep((prev)=>(
                            prev-1
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

