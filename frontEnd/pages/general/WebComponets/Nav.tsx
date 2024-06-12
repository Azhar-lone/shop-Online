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

// import apis
import getUserByUserName from "../../../api's/userInfo";

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
    let { isLogin, setIsLogin, setUser } = useUser()
    let navigate = useNavigate()

    if (isLogin) {
        navItems = [
            {
                To: "/",
                Text: "Home",
                Icon: <HomeIcon />
            },
            {
                To: "/AzharLone",
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

    useEffect(() => {

        let userName = localStorage.getItem("userName")

        if (userName && typeof userName === "string") {
            // getUserByUserName(userName, setUser)
            setIsLogin(true)
        }
    }, [])




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
                    className=" lg:flex hidden justify-around"
                >
                    {navItems.map((element, index) => (

                        <Button
                            variant={"ghost"}
                            className="flex gap-1"
                            key={index}

                        >
                            {element.Icon}
                            <NavLink
                                to={element.To}
                            >
                                {element.Text}
                            </NavLink >
                        </Button>

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
                                <h1 className="bg-red-500 px-2 rounded-full mb-5 text-white">1</h1>
                            </Button>
                            <Hint
                                label={"Change Theme"}
                            >

                            </Hint>


                        </div>
                        <ModeToggle />

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
                            <Button
                                variant={"ghost"}
                                className="  h-[8%] flex flex-col  gap-1"
                                key={index}

                            >
                                {element.Icon}
                                <NavLink
                                    to={element.To}
                                >

                                    {element.Text}
                                </NavLink >

                            </Button>))}
                        <div className="flex  gap-2 ">
                            <div
                                onClick={() => navigate("/cart")}
                                className="flex flex-col h-[20%]"
                            >
                                <h1 className="bg-red-500 px-2 rounded-full  text-white">1</h1>
                                <ShoppingCart />
                                <h1 className="mt-2">Cart</h1>
                            </div>



                        </div>
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
                            {element.Icon}
                            <NavLink
                                to={element.To}
                                className="md:block hidden"
                            >

                                {element.Text}
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