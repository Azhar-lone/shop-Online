import React from 'react'
import { Link } from 'react-router-dom'
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
            phoneNumber: undefined,
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
                                <FormLabel>email or phone</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter phone number or email"} {...field} className="bg-input" />
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


            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>code</FormLabel>
                                <FormControl>
                                    <Input placeholder={"enter code you received here"} {...field} className="bg-input" disabled />
                                </FormControl>

                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-between w-[100%]'>
                        <p></p>
                        <Button
                            type="submit"
                            className="md:ml-[10%] ml-[30%]"
                        >Verify Code </Button>
                        <Link
                            to={"/login"}
                        >
                            go to login page
                        </Link>
                    </div>
                </form>
            </Form>

        </div>
    )
}

export default ForgotPassword


const Schema = z.object({
    email: z.string().email({ message: 'Invalid email format' }).optional(), // Optional email with email format validation and message
    phoneNumber: z
        .number({ message: 'Invalid phone number (must be a number)' }).optional(), // Optional phone number (type safety) and message

})



async function onSubmit(values: z.infer<typeof Schema>) {

}