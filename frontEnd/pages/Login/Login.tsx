
import React from "react"
import { Link, Navigate, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

// importing components
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"

// importing context
import useUser from "@/components/context/user-provider"

// apis

import login from "../../api's/auth/login"



const Login = () => {
    const { setUser, setIsLogin } = useUser()
    const navigate = useNavigate()

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {

        let ret = await login(values)
        if (ret !== 1) {
            setUser(ret)
            setIsLogin(true)
            navigate("/")
        }

    }

    return (
        // <div className='md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5 items-center bg-background shadow-2xl md:border  mt-[20vh]'>
        <div className='md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl md:border mt-[5vh]'>

            <h3>Log in to your Account</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    {loginFormArray.map((field1, i) => (
                        <FormField
                            control={form.control}
                            name={field1.name}
                            key={i}
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>{field1.name}</FormLabel>
                                    <FormControl>
                                        <Input placeholder={field1.placeHolder} {...field} className="bg-input" />
                                    </FormControl>

                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ))}

                    <div className='flex justify-between w-[100%]'>
                        <p></p>
                        <Button
                            type="submit"
                            className="md:ml-[10%] ml-[30%]"
                        >Login </Button>
                        <Button
                            variant="ghost"
                            onClick={() => navigate("/forgot-password")}
                        >
                            Forgot Password
                        </Button>
                    </div>
                </form>
            </Form>

            <div>did'nt have an account
                <Link to={"/signup"}
                    className='text-blue-500 p-2 hover:text-blue-400'
                >SignUp</Link></div>
        </div>
    )
}

export default Login



const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(16, { message: 'Password cannot exceed 16 characters' })
})






const loginFormArray = [
    { name: "email", placeHolder: "email@domain.com " },
    { name: "password", placeHolder: "*********" }
]