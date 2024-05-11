
import React, { ChangeEvent, useState, useRef } from 'react';
import { Link, useNavigate } from "react-router-dom"


// importing components
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';











interface user {
    email: string;
    // phoneNumber?: Number ;
    password: string
}


const Login = () => {
    const [user, setUser] = useState<user>({
        email: '',
        // phoneNumber: 0,
        password: ''
    })
    const navigate = useNavigate()
    function setValues(e: ChangeEvent<HTMLInputElement>) {
        setUser({ email: e.target.value, password: user.password })
        console.log(e.target.value)

    }



    return (
        <div className='md:w-[80%] mx-auto p-5 flex flex-col gap-5 items-center bg-background md:border mt-10'>
            <Input
                placeholder=' Email'
                onChange={setValues}
                value={user.email}

            />


            <Input
                placeholder=' Password'
            // value={user.email}

            />
            <div className='flex justify-between w-[100%]'>
                <p></p>
                <Button
                    className="md:ml-[10%] ml-[30%]"
                >Login </Button>
                <Button
                    variant="ghost"
                    onClick={()=>navigate("/forgot-password") }
                >
                    forgot password
                </Button>
            </div>
            <div>did'nt have an account
                <Link to={"/signup"}
                    className='text-blue-500 p-2 hover:text-blue-400'
                >SignUp</Link></div>
        </div>
    )
}

export default Login