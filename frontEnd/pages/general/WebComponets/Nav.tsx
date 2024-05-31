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

        if (userName && typeof id === "string") {
            getUserByUserName(userName, setUser)
            setIsLogin(true)
        }
    }, [])




    return (
        <>
            <div className=" w-full shadow-2xl   top-0 fixed  border-b  flex justify-around items-center gap-2  backdrop-blur-md h-[10vh] bg-background"
            >
                <div className="flex gap-5">
                    <Button className="flex gap-1">
                        <ShoppingBasket />
                        <h1>Shop-Online</h1>

                    </Button>
                    <Search
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
                    <div className="flex gap-2 ">
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
                            <ModeToggle />

                        </Hint>

                        <ProfileButton />

                    </div>
                    : <div className="flex gap-2 ">
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
                            variant={"ghost"}
                            className="flex gap-1"

                        >
                            <NavLink
                                to={"/signup"}
                            >
                                Signup
                            </NavLink >
                        </Button>

                    </div>}
            </div >
            <div className="bottom-0 fixed border-t w-full h-[8vh] lg:hidden md:w-[10%] md:h-[88vh] bg-background border-r  md:left-0 md:top-[10vh] flex gap-4   justify-center backdrop-blur-sm md:items-start items-center">
                <ul
                    className=" flex  md:flex-col justify-around md:justify-start md:gap-5  md:p-8"
                >

                    {navItems.map((element, index) => (
                        <Button
                            variant={"ghost"}
                            className="  h-[8%] flex sm:flex-col  gap-1"
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

            </div>

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