import React from 'react'
import { NavLink } from 'react-router-dom'

// Icons
import {
    Boxes,
    HomeIcon,
    SettingsIcon,
    Earth
} from "lucide-react"

// components
import Hint from '@/components/myUi/Hint'
let navItems = [

    {
        To: "/admin",
        Icon: <HomeIcon />,
        Text:"Admin Home"

    },
    {
        To: "/admin/general",
        Icon: <Earth />,
        Text:"general"

    },
    {
        To: "/products",
        Icon: <Boxes />,
        Text:"products"

    },

]





const SideBar = () => {
    return (

        // <aside className=" fixed inset-y-0 left-0 z-10 hidden w-14 flex-col border-r bg-background sm:flex">
        <aside className=" fixed  hidden  w-[8%] lg:w-[6%] h-[88vh] bg-background border-r  left-0 top-[10vh] sm:flex gap-4 flex-col items-center justify-between ">

            <div className='flex flex-col gap-8 p-2  '>
                {navItems.map((element, index) => (

                    <Hint
                        key={index}
                        label={element.Text}
                    >
                        <NavLink
                            to={element.To}
                            className={"flex flex-col gap-1 items-center"}
                        >
                            {element.Icon}
                        </NavLink >
                    </Hint>
                ))}

            </div>
            <SettingsIcon className='pb-10 size-16' />

        </aside>

    )
}

export default SideBar