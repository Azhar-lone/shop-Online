// importing dependencies
import React, { useEffect } from "react";
import {
    HomeIcon, ShoppingCart, ShoppingBasket, UserCircle2,
    Boxes, InfoIcon,
} from "lucide-react";

// importing Shadcn Components
import { Button } from "@/components/ui/button";
import { NavLink, useNavigate } from "react-router-dom"
// import { Skeleton } from "@/components/ui/skeleton";

//My components 
import { ModeToggle } from "@/components/myUi/mode-toggle";
import ProfileButton from "../../Profile/ProfileButton"
import Hint from "@/components/myUi/Hint"
import Search from "@/components/myUi/Search";
import Slider from "@/components/myUi/Slider"

// context
import useUser from "@/components/context/user-provider"
import useLoading from "@/components/context/loading-provider";
import { useToast } from "@/components/ui/use-toast";

// types
import User from "@/types/user";


let navItems = [

    {
        To: "/",
        Text: "Home",
        Icon: <HomeIcon />
    },
    {
        To: "/aboutus",
        Text: "About Us",
        Icon: <InfoIcon />
    },
    {
        To: "/products",
        Text: "Products",
        Icon: <Boxes />
    },

]


const Nav: React.FC = () => {
    let { isLogin, setIsLogin, setUser, cart, user } = useUser()
    let navigate = useNavigate()
    const { toast } = useToast()
    const { setIsLoading } = useLoading()


    useEffect(() => {

        let userName = localStorage.getItem("userName")

        if (userName && typeof userName === "string") {
            getProfile(userName)
            setIsLogin(true)
        }

        if (isLogin) {
            navItems = [
                {
                    To: "/",
                    Text: "Home",
                    Icon: <HomeIcon />
                },
                {
                    To: `/${userName}`,
                    Text: "Profile",
                    Icon: <UserCircle2 />
                },
                {
                    To: "/products",
                    Text: "Products",
                    Icon: <Boxes />
                },

            ]
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
        <div className=" bg-background w-full h-[10vh]  border-b flex gap-2 flex-col shadow-2xl  top-0 fixed sm:justify-start justify-around pt-2" >


            {/* <Search
                className="sm:hidden  h-[4vh] ml-[30%] px-2 "
            /> */}

            <div className="     flex justify-around items-center gap-2  sm:h-[100%] "
            >

                <div className="flex gap-5">
                    <Button className="sm:flex hidden gap-1">
                        <ShoppingBasket />
                        <h1>Shop-Online</h1>

                    </Button>
                    <Search
                        // className="hidden sm:flex"
                        onClickSearch={() => alert("im clicked search")}

                    />
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
                        <div className="hidden sm:flex  gap-2 ">
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

                        {isLogin && <div className="flex  gap-2 ">
                            <div
                                onClick={() => navigate("/cart")}
                                className="flex flex-col h-[20%]"
                            >
                                <h1 className="bg-red-500 px-2 rounded-full  text-white">{cart.length}</h1>
                                <ShoppingCart />
                                <h1 className="mt-2">Cart</h1>
                            </div>


                        </div>}
                    </div>
                </Slider>
            </div >
            <div className=" fixed   hidden sm:flex lg:hidden w-[8%] h-[88vh] bg-background border-r  left-0 top-[10vh]  gap-4   justify-center backdrop-blur-sm items-start">
                <ul
                    className=" flex  flex-col justify-start gap-5  p-8"
                >

                    {navItems.map((element, index) => (
                        <Button
                            variant={"ghost"}
                            className="  h-[8%] flex flex-col  gap-1"
                            key={index}

                        >
                            <NavLink
                                to={element.To}
                            >
                                {element.Icon}

                                <div className="md:block hidden"> {element.Text}</div>
                            </NavLink >

                        </Button>

                    ))}


                </ul>

            </div>


        </div>
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