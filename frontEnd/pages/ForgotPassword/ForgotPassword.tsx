import React from 'react'
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"



// importing components
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

    const form = useForm<z.infer<typeof Schema>>({
        resolver: zodResolver(Schema),
        defaultValues: {
            email: '',
        }
    })


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

                    <Button
                        type="submit"
                    >Send Code </Button>
                </form>
            </Form>



        </div>
    )
}

export default ForgotPassword


const Schema = z.object({
    email: z.string().email({ message: 'Invalid email address' }) // email format validation and message

})



async function onSubmit(values: z.infer<typeof Schema>) {
    try {

        let res = await fetch("", {
            body: JSON.stringify({
                email: values.email,
            }),
            credentials: "include",
            method: "POST"
        })
        if (res.ok) {
            return 200
        }


    } catch (error) {
        console.log(error)
    }
}