
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { ColorRing } from "react-loader-spinner"

// Icons
import { Eye, EyeOff } from "lucide-react"


// importing components
import { useToast } from "@/components/ui/use-toast"
import { Button } from '@/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
// imporring my components
import { ModeToggle } from "@/components/myUi/mode-toggle"


// importing context



const Login = () => {
    const navigate = useNavigate()
    const { toast } = useToast()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [showPassword, setShowPassword] = useState<boolean>(false)

    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            email: '',
            password: '',
        }
    })

    async function onSubmit(values: z.infer<typeof loginSchema>) {

        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            interface JsonType {
                msg: string,
                userName: string
            }

            let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(values),
                credentials: 'include'
            })
            let json: JsonType = await response.json()
            setIsLoading(false)

            if (response.ok) {
                localStorage.setItem("userName", json.userName)
                return navigate("/")
            }


            return toast({
                title: "login error",
                description: json.msg,
                variant: "destructive"
            })

        } catch (error: any) {
            setIsLoading(false)
            toast({
                title: "login error",
                description: error.message,
                variant: "destructive"
            })
        }

    }

    return (
        // <div className='md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5 items-center bg-background shadow-2xl md:border  mt-[20vh]'>
        <div className='md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl shadow-primary mt-[5vh]'>
            <ModeToggle />
            <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">Log in to your Account</h3>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

                    <FormField
                        control={form.control}
                        name={"email"}
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder={"YourEmail@domain.com"} {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Password */}

                    <FormField
                        control={form.control}
                        name={"password"}
                        render={({ field }) => (
                            <FormItem
                                className='relative'
                            >
                                <FormLabel>Password</FormLabel>
                                <FormControl>
                                    <Input placeholder="*********" {...field}
                                        type={!showPassword ? "password" : "text"}
                                    />
                                </FormControl>
                                <div
                                    onClick={() => setShowPassword((prev) => !prev)}
                                    className='absolute right-3 bottom-3'
                                >
                                    {!showPassword ? <Eye /> : <EyeOff />}
                                </div>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className='flex justify-between w-[100%]'>
                        <p></p>
                        {!isLoading ?
                            <Button
                                type="submit"
                                className="md:ml-[10%] ml-[30%]"
                            >Login </Button>
                            :
                            <Button >Loggin In ... <ColorRing height={"200%"} /> </Button>}

                        <Button
                            variant="ghost"
                            onClick={() => navigate("/forgot-password", { state: form.getValues("email") })}
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
        </div >
    )
}

export default Login



const loginSchema = z.object({
    email: z.string().email({ message: 'Invalid email format' }),
    password: z.string()
        .min(8, { message: 'Password must be at least 8 characters long' })
        .max(16, { message: 'Password cannot exceed 16 characters' })
})





