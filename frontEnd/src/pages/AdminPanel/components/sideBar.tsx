import React from 'react'
import { NavLink } from 'react-router-dom'

// Icons
import {
    Boxes,
    HomeIcon,
    InfoIcon,
    SettingsIcon,
    Earth
} from "lucide-react"

// components

let navItems = [

    {
        To: "/admin",
        Text: "Home",
        Icon: <HomeIcon />
    },
    {
        To: "/admin/general",
        Text: "web Setting",
        Icon: <Earth />
    },
    {
        To: "/products",
        Text: "Products",
        Icon: <Boxes />
    },

]





const SideBar = () => {
    return (

        // <aside className=" fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <aside className=" fixed  hidden  w-[8%] lg:w-[6%] h-[88vh] bg-background border-r  left-0 top-[10vh] sm:flex gap-4 flex-col items-center justify-between ">

            <div className='flex flex-col gap-8 p-2  '>
                {navItems.map((element, index) => (


                    <NavLink
                        to={element.To}
                        className={"flex flex-col gap-1 items-center"}
                    >
                        {element.Icon}

                        <h1 className='hidden lg:block text-center'>
                            {element.Text}
                        </h1>
                    </NavLink >

                ))}

            </div>
            <SettingsIcon className='pb-10 size-16' />

        </aside>

    )
}

export default SideBar