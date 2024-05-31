
import React, { useEffect } from 'react';
import { useState } from 'react';
import { Link } from "react-router-dom"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { userSchema1, userSchema2 } from './schama';

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
import signUp, { getContries } from '../../api\'s/signUp';








const Signup = () => {

  let [step, setStep] = useState<boolean>(false)
  let [countries, setCountries] = useState<Array<string>>(countriesArr)
  let [formData, setFormData] = useState(
    {
      email: '',
      password: '',
      confirmPassword: '',
      firstName: '',
      lastName: '',
      country: '',
      userName: ''

    }
  )

  // 1. Define your form.
  const form1 = useForm<z.infer<typeof userSchema1>>({
    resolver: zodResolver(userSchema1),
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  })

  const form2 = useForm<z.infer<typeof userSchema2>>({
    resolver: zodResolver(userSchema2),
    defaultValues: {
      firstName: '',
      lastName: '',
      country: '',
      userName: ''
    }
  })


  useEffect(() => {
    getContries(setCountries)
  }, [])







  function handleFirstPageSubmit(values: z.infer<typeof userSchema1>) {

    setStep(true)

  }


  // 3. Define a submit handler for the entire form (after completing both pages).
  function handleFullFormSubmit(values: z.infer<typeof userSchema2>) {
    console.log('Submitting full form data:', values); // Access complete user data


    signUp(formData)
    // Replace with your actual backend logic for data submission

    // You can clear the form or redirect to a confirmation page after successful submission
  }




  return (


    <div className='md:w-[60%] w-[100%] mx-auto p-5 flex flex-col gap-5  bg-background shadow-2xl md:border'>
      <h3>Create An Account</h3>

      {!step ?

        <Form {...form1}>
          <form onSubmit={form1.handleSubmit(handleFirstPageSubmit)} className="space-y-8">

            {formArrayPage1.map((field1, i) => (
              <FormField
                key={i}
                control={form1.control}
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
            <Button
              type="submit"
            // onClick={() => setStep(true)}
            >
              next
            </Button>

            <div>already have an account
              <Link to={"/login"}
                className='text-blue-500 p-2 hover:text-blue-400'
              >login</Link></div>


          </form>
        </Form>
        :
        <Form {...form2}>
          <form onSubmit={form2.handleSubmit(handleFullFormSubmit)} className="space-y-8">

            {formArrayPage2.map((name, i) => (

              <FormField
                control={form2.control}
                name={name}
                key={i}
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>{name}</FormLabel>
                    <FormControl>
                      <Input placeholder={name} {...field} className="bg-input" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            ))}
            {step &&
              <FormField
                control={form2.control}
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
                          <SelectItem value={country} key={i}>
                            {country}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>

                    <FormMessage />
                  </FormItem>
                )}
              />}
            <Button type="submit" className="w-[100%]" >Submit</Button>

          </form>
        </Form>}



    </div >

  )
}

export default Signup













const formArrayPage1 = [
  { name: "email", placeHolder: "email@domain.com " },
  { name: "password", placeHolder: "*********" },
  { name: "confirmPassword", placeHolder: "*********" },
]
const formArrayPage2 = [
  "firstName", "lastName", "userName",
]

const countriesArr = [
  "pakistan", "india", "usa", "Afghanistan",

]















