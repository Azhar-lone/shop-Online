import { useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { ColorRing } from "react-loader-spinner"


// importing components
import { useToast } from "@/components/ui/use-toast"
import { Button } from "@/components/ui/button"
import {
    Form,
    // FormDescription,
    FormField,
    FormItem,
    FormMessage,
} from "@/components/ui/form"
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

// Custom Comonents
import { ModeToggle } from '@/components/myUi/mode-toggle'

const VerifyCode = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    let navigate = useNavigate()
    const location = useLocation()
    const { toast } = useToast()


    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            otp: "",
        }
    })


    async function onSubmit(values: z.infer<typeof Schema>) {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/users/forgot-password", {
                body: JSON.stringify({
                    email: location.state,
                    otp: values.otp
                }),
                method: "POST"
            })

            let json = await res.json()
            setIsLoading(false)
            if (res.ok) {
                return navigate("/")

            }
            toast({
                title: "error",
                description: json.msg,
                variant: "destructive"
            })

        } catch (error: any) {
            setIsLoading(false)
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            })
        }
    }

    return (
        <div className='lg:w-[60%] w-[90%] mt-[10vh] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl shadow-primary items-center'>
            <ModeToggle />

            <h3>verify otp</h3>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name={"otp"}
                        render={({ field }) => (
                            <FormItem>
                                <InputOTP maxLength={6} {...field}>
                                    <InputOTPGroup>
                                        <InputOTPSlot index={0} />
                                        <InputOTPSlot index={1} />
                                        <InputOTPSlot index={2} />
                                    </InputOTPGroup>
                                    <InputOTPSeparator />
                                    <InputOTPGroup>
                                        <InputOTPSlot index={3} />
                                        <InputOTPSlot index={4} />
                                        <InputOTPSlot index={5} />
                                    </InputOTPGroup>
                                </InputOTP>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {!isLoading ?
                        <Button
                            type="submit"
                        >Verify Code </Button>
                        :
                        <Button >Sending otp ... <ColorRing height={"200%"} /> </Button>}
                </form>
            </Form>



        </div>
    )
}

export default VerifyCode




const Schema = z.object({
    otp: z.string({ message: "invalid opt" }).min(6, { message: "not valid otp" })

})


