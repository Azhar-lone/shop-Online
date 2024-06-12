
import React, { useEffect } from 'react';

import { useState } from 'react';
import { Link, useNavigate } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import userSchema from './schama';
import useUser from "@/components/context/user-provider"



// importing components
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


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

// Api's
import signUp, { getContries } from '../../api\'s/auth/signUp';



import { ObjectString } from '../../types/General';




const Signup = () => {
  const { setUser } = useUser()
  const navigate = useNavigate()
  let [countries, setCountries] = useState<Array<ObjectString>>([{ value: "test" }])

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      country: '',
      userName: ''
    }
  })


  useEffect(() => {
    getContries(setCountries)

  }, [])







  async function handleSubmit(values: z.infer<typeof userSchema>) {
    let ret = await signUp(values)
    if (ret !== 1) {
      setUser(ret)
      navigate("/")
    }
  }


  return (


    <div className='md:w-[60%] w-[100%] mx-auto mt-5 p-5 flex flex-col gap-5  bg-background shadow-2xl md:border'>
      <h3>Create An Account</h3>


      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">

          {formArrayPage.map((field1, i) => (
            <FormField
              key={i}
              control={form.control}
              name={field1.name}
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

          <FormField
            control={form.control}
            name={"country"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Country</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a Country" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {countries.map((country, i) => (
                      <SelectItem value={country.value} key={i}>
                        {country.value}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>

                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            // onClick={() => setStep(true)}
            className="w-[100%]"
          >
            Sign Up
          </Button>

          <div>already have an account
            <Link to={"/login"}
              className='text-blue-500 p-2 hover:text-blue-400'
            >login</Link></div>


        </form>
      </Form>





    </div >

  )
}

export default Signup













const formArrayPage = [
  { name: "email", placeHolder: "email@domain.com " },
  { name: "password", placeHolder: "*********" },
  { name: "confirmPassword", placeHolder: "*********" },
  { name: "firstName", placeHolder: "Your First Name  " },
  { name: "lastName", placeHolder: "Your Last Name" },
  { name: "userName", placeHolder: "userName should be slug" },
]

const countriesArr = [
  "pakistan", "india", "usa", "Afghanistan",

]















