import React, { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { ColorRing } from "react-loader-spinner"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



// importing components
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
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


const ForgotPassword = () => {
    let navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const location = useLocation()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            email: location.state,
        }
    })

    async function onSubmit(values: z.infer<typeof Schema>) {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/users/send-otp", {
                body: JSON.stringify({
                    email: values.email,
                }),
                method: "POST"
            })
            let json = await res.json()
            setIsLoading(false)

            if (res.ok) {
                toast({
                    title: "Success",
                    description: json.msg,
                })
                navigate("/verify-otp", { state: values.email })
            }

            toast({
                title: "error",
                description: json.msg,
                variant: "destructive"
            })
        } catch (error) {
            setIsLoading(false)
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div className='md:w-[60%] w-[100%] mt-[10vh] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl md:border'>
            <h3>Send code </h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter Your email"} {...field} className="bg-input" />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {!isLoading ?
                        <Button
                            type="submit"
                        >Send Code </Button>
                        :
                        <Button >Sending otp ... <ColorRing height={"200%"} /> </Button>}
                   
                </form>
            </Form>



        </div>
    )
}

export default ForgotPassword


const Schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }) // email format validation and message

})


