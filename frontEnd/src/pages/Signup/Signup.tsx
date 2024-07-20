import { useEffect } from "react";

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import userSchema from "./schama";
import { ColorRing } from "react-loader-spinner";

// Icons
import { Eye, EyeOff } from "lucide-react";

// importing components
import { useToast } from "@/components/ui/use-toast";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Custom components
import { ModeToggle } from "@/components/myUi/mode-toggle";

// Types
// import { ObjectString } from '../../types/General';

const Signup = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] =
    useState<boolean>(false);

  let [countries, setCountries] = useState<string[]>([]);

  const form = useForm<z.infer<typeof userSchema>>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
      firstName: "",
      lastName: "",
      country: "",
      userName: "",
    },
  });

  useEffect(() => {
    document.title = "SignUp|Shop-Online";
    getContries();
  }, []);

  async function getContries() {
    try {
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let res = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/general/countries"
      );
      let json = await res.json();
      if (res.ok) {
        setCountries(json.countries);
        return;
      }

      toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
      // call yourself until you don't get 200 ok

      getContries();
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleSubmit(values: z.infer<typeof userSchema>) {
    try {
      setIsLoading(true);
      interface JsonType {
        msg: string;
        userName: string;
      }

      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/users/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      let json: JsonType = await response.json();
      setIsLoading(false);

      if (response.ok) {
        localStorage.setItem("userName", json.userName);
        navigate("/");
      }
      return toast({
        title: "signUp error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "signUp error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="md:w-[60%] w-[100%] mx-auto mt-5 p-5 flex flex-col gap-5  bg-background shadow-2xl shadow-primary">
      <ModeToggle />

      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
        Create An Account
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Email */}
          <FormField
            control={form.control}
            name={"email"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input placeholder="YourEmail@domain.com" {...field} />
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
              <FormItem className="relative">
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    type={!showPassword ? "password" : "text"}
                  />
                </FormControl>
                <div
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="absolute right-3 bottom-3"
                >
                  {!showPassword ? <Eye /> : <EyeOff />}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* confirmPassword */}

          <FormField
            control={form.control}
            name={"confirmPassword"}
            render={({ field }) => (
              <FormItem className="relative">
                <FormLabel>Confirm Password </FormLabel>
                <FormControl>
                  <Input
                    placeholder="*********"
                    {...field}
                    type={!showConfirmPassword ? "password" : "text"}
                  />
                </FormControl>
                <div
                  onClick={() => setShowConfirmPassword((prev) => !prev)}
                  className="absolute right-3 bottom-3"
                >
                  {!showConfirmPassword ? <Eye /> : <EyeOff />}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* firstName */}

          <FormField
            control={form.control}
            name={"firstName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>First Name </FormLabel>
                <FormControl>
                  <Input placeholder="john" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* lastName */}

          <FormField
            control={form.control}
            name={"lastName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Last Name </FormLabel>
                <FormControl>
                  <Input placeholder="doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* userName */}

          <FormField
            control={form.control}
            name={"userName"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>User Name</FormLabel>
                <FormControl>
                  <Input placeholder="john-doe" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          {/* Countries */}
          {countries.length < 1 ? (
            <Button>
              fetching countries... <ColorRing height={"200%"} />
            </Button>
          ) : (
            <FormField
              control={form.control}
              name={"country"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Country</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
            />
          )}

          {countries.length > 0 && (
            <>
              {!isLoading ? (
                <Button
                  type="submit"
                  // onClick={() => setStep(true)}
                  className="w-[100%]"
                >
                  Sign Up
                </Button>
              ) : (
                <Button>
                  Signing Up ... <ColorRing height={"200%"} />{" "}
                </Button>
              )}
            </>
          )}
          <div>
            already have an account
            <Link
              to={"/login"}
              className="text-blue-500 p-2 hover:text-blue-400"
            >
              login
            </Link>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default Signup;
