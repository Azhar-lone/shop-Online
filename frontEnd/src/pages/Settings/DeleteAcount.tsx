
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { ColorRing } from "react-loader-spinner";
import { useLocation } from "react-router-dom";
import { z } from "zod";

// Icons

// Shadcn components
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"
import { useToast } from "@/components/ui/use-toast"
import {
    Form,
    FormControl,
    // FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { useState } from "react";

// context


const DeleteAcount = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const location = useLocation()
    const { toast } = useToast()
    const form = useForm<z.infer<typeof EmailSchema>>({
        resolver: zodResolver(EmailSchema),
        defaultValues: {
            email: location.state,
        }
    })
    const form1 = useForm<z.infer<typeof PasswordSchema>>({
        resolver: zodResolver(PasswordSchema),
        defaultValues: {
            password: '',
            otp: ''
        }
    })
    async function onSendCode(values: z.infer<typeof EmailSchema>) {
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
                    description: "otp sent to your email",
                })
                return
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

    async function onDelete(values: z.infer<typeof PasswordSchema>) {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/users/", {
                body: JSON.stringify({
                    password: values.password,
                    otp: values.otp
                }),
                method: "DELETE",
                credentials: "include"

            })
            let json = await res.json()
            setIsLoading(false)

            if (res.ok) {
                toast({
                    title: "Success",
                    description: "otp sent to your email",
                })
                return
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
        <Accordion type="single" collapsible
            className=" mx-auto w-[90%] border rounded md:p-8 p-2 shadow "
        >
            <AccordionItem value="item-1">
                <AccordionTrigger className='text-3xl '>Delete Acount </AccordionTrigger>

                <AccordionContent>
                    <h1
                        className='font-medium p-2 '
                    >We Will Send OTP To Your Email </h1>
                </AccordionContent>

                <AccordionContent>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSendCode)} className="relative" >

                            <FormField
                                control={form.control}
                                name={"email"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <input placeholder={"enter Your email"} {...field} className="p-8" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div
                                className="right-5 bottom-3 absolute"
                            >
                                {!isLoading ?
                                    <Button
                                        type="submit"
                                        variant={"outline"}

                                    >Send Code </Button>
                                    :
                                    <Button
                                        variant={"outline"}
                                    >Sending otp ... <ColorRing height={"200%"} /> </Button>}
                            </div>
                        </form>
                    </Form>
                </AccordionContent>


                <AccordionContent>
                    <Form {...form1} >
                        <form onSubmit={form1.handleSubmit(onDelete)} className="flex flex-col gap-5" >

                            <FormField
                                control={form1.control}
                                name={"password"}
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <input placeholder={"enter Password to confirm"} {...field} className="p-8" />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form1.control}
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
                            <Button
                                variant="destructive"
                                className="w-[100%]"
                            >
                                Delete Account
                            </Button>

                        </form>
                    </Form>
                </AccordionContent>


            </AccordionItem>

        </Accordion >

    )
}

export default DeleteAcount


const EmailSchema = z.object({
    email: z.string().email({ message: 'Invalid email address' }) // email format validation and message

})

const PasswordSchema = z.object({
    password: z.string({ message: "must be a string" }).min(8, { message: "must be atleast 8 charactors" })
    , otp: z.string({ message: "invalid opt" }).min(6, { message: "not valid otp" })

})