// importing dependencies
import React from "react";
import {
    HomeIcon, InfoIcon, ShoppingCart, ShoppingBasket, UserCircle2,
    Boxes
} from "lucide-react";

// importing Shadcn Components
import { Button } from "@/components/ui/button";
import { NavLink } from "react-router-dom"
// import { Skeleton } from "@/components/ui/skeleton";

//My components 
import { ModeToggle } from "@/components/myUi/mode-toggle";
import ProfileButton from "../../Profile/ProfileButton"
import Hint from "@/components/myUi/Hint"
import Search from "@/components/myUi/Search";





let navItems = [{
    To: "/home",
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
    // {
    //     To: "/aboutus",
    //     Text: "About Us",
    //     Icon: <InfoIcon />
    // },


]


const Nav: React.FC = () => {


    return (
        <>
            <div className=" w-full shadow-2xl   top-0 fixed  border-b  flex justify-around items-center gap-2  backdrop-blur-md h-[10vh] "
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
                <div className="flex gap-2 ">
                    <Button
                        variant="outline"
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

            </div >
            <div className="bottom-0 fixed border-t w-full h-[8vh] lg:hidden md:w-[10%] md:h-[88vh] bg-background border-r  md:left-0 md:top-[10vh] flex gap-4   justify-center backdrop-blur-sm ">
                <ul
                    className=" flex  md:flex-col justify-around md:justify-end md:gap-5 md:items-center md:p-8"
                >

                    {navItems.map((element, index) => (
                        <div
                            key={index}
                        >
                            <Button variant={"ghost"}
                                className="flex  flex-col"
                            >
                                {element.Icon}
                                <h1
                                    className="h-[20%] "
                                >
                                    {element.Text}
                                </h1 >
                            </Button>
                        </div>

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