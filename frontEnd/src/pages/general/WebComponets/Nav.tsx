// importing dependencies
import React, { useEffect, useState } from "react";
import {
    HomeIcon, ShoppingCart, ShoppingBasket,
    Boxes, InfoIcon
} from "lucide-react";

// importing Shadcn Components
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom"
// import { Skeleton } from "@/components/ui/skeleton";

//My components 
import { ModeToggle } from "@/components/myUi/mode-toggle";
import ProfileButton from "../../Profile/ProfileButton"
import Hint from "@/components/myUi/Hint"
import Slider from "@/components/myUi/Slider"
import { SideBar, TopBar } from "@/components/myUi/NavComponents";
import FullSearch from "./FullSearch";


// context
import useUser from "@/components/context/user-provider"
import useLoading from "@/components/context/loading-provider";
import { useToast } from "@/components/ui/use-toast";

// types
import User from "@/types/user";



interface navItemsType {
    To: string,
    Text: string,
    Icon: React.ReactNode
}


const Nav: React.FC = () => {
    let { isLogin, setIsLogin, setUser, cart } = useUser()
    let navigate = useNavigate()
    const { toast } = useToast()
    const { setIsLoading } = useLoading()
    const [navItems, setNavItems] = useState<navItemsType[]>([

        {
            To: "/",
            Text: "Home",
            Icon: <HomeIcon />
        },
        {
            To: "/aboutus",
            Text: "AboutUs",
            Icon: <InfoIcon />
        },
        {
            To: "/products",
            Text: "Products",
            Icon: <Boxes />
        },

    ])

    useEffect(() => {

        let userName = localStorage.getItem("userName")

        if (userName && typeof userName === "string") {
            getProfile(userName)
            setIsLogin(true)
        }



    }, [])
    async function getProfile(username: string) {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            interface JsonType {
                msg: string,
                user: User
            }

            let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/' + username)
            let json: JsonType = await response.json()
            setIsLoading(false)

            if (response.ok) {
                return setUser(json.user)
            }


            return toast({
                title: " error",
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


        <>
            <TopBar>
                <div className="flex justify-around items-center gap-2  sm:h-[100%] "
                >

                    <div className="flex gap-5">
                        <Button className="flex gap-1">
                            <ShoppingBasket />
                            <h1 className="hidden sm:block" >Shop-Online</h1>
                        </Button>
                        <FullSearch />
                    </div>

                    <ul
                        className=" lg:flex hidden justify-around gap-5"
                    >
                        {navItems.map((element, index) => (


                            <NavLink
                                className="flex gap-2 items-center    hover:pb-2 "
                                key={index}

                                to={element.To}
                            >
                                {element.Icon}

                                {element.Text}
                            </NavLink >

                        ))}


                    </ul>
                    {isLogin ?
                        <div className="flex gap-2">
                            <div className="  sm:flex  gap-2 ">
                                <Button
                                    variant="outline"

                                    onClick={() => navigate("/cart")}
                                >
                                    <ShoppingCart />
                                    <h1 className="bg-red-500 px-2 rounded-full mb-5 text-white">{cart.length}</h1>
                                </Button>
                                <Hint
                                    label={"Change Theme"}
                                >
                                    <ModeToggle />

                                </Hint>


                            </div>

                            <ProfileButton />

                        </div>
                        : <div className="flex gap-2 ">
                            <ModeToggle />

                            <Button
                                variant={"ghost"}
                                className="flex gap-1"

                            >
                                <NavLink
                                    to={"/login"}
                                >
                                    Login
                                </NavLink >
                            </Button>
                            <Button
                                // variant={"ghost"}
                                className="flex gap-1"

                            >
                                <NavLink
                                    to={"/signup"}
                                >
                                    Signup
                                </NavLink >
                            </Button>
                        </div>}


                        <Slider side="right">
                    <div className="flex items-center flex-col gap-5">
                        {navItems.map((element, index) => (
                            <NavLink
                                className="flex gap-2 items-center    hover:pb-2 "
                                key={index}

                                to={element.To}
                            >
                                {element.Icon}

                                {element.Text}
                            </NavLink >
                        ))}
                    </div>
                </Slider>
                </div >

             


            </TopBar>


            <SideBar>
                <ul
                    className=" flex  flex-col justify-start gap-5  p-8"
                >

                    {navItems.map((element, index) => (
                        <Hint label={element.Text} key={index}   >
                            <NavLink
                                className="flex flex-col gap-2 items-center   hover:border-b-4 border-primary hover:pt-2  "


                                to={element.To}
                            >
                                {element.Icon}
                            </NavLink >
                        </Hint>
                    ))}


                </ul>
            </SideBar>



        </>
    )
}

export default Nav




// const NavSkeleton: React.FC = () => {
//     return (
//         <div
//             className="top-[20vh] fixed w-full  border-b p-2 flex justify-around items-center"
//         >
//             <Skeleton
//                 className="w-36 h-10 "
//             />
//             <ul
//                 className=" flex justify-around gap-2"
//             >

//                 {navItems.map((element, index) => (
//                     <Skeleton
//                         className="w-24 h-10"
//                     />

//                 ))
//                 }
//             </ul >
//             <div className="flex gap-2">
//                 <Skeleton
//                     className="w-16 h-10"
//                 />
//                 <Skeleton
//                     className="w-16 h-10"
//                 />
//             </div>
//             <Skeleton
//                 className="w-12 h-12 rounded-full"
//             />

//         </div >
//     )
// }