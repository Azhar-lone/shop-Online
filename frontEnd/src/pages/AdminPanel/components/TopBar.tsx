import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom"


// Icons
import {
    Home,
    LineChart,
    Package,
    Package2,
    ShoppingCart,
    Users2,
} from "lucide-react"
// Components
import {
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbPage,
    BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"

// custom components
import Exit from "@/components/myUi/Exit"
import Slider from "@/components/myUi/Slider"
import { ModeToggle } from "@/components/myUi/mode-toggle";


const TopBar = () => {
    let [breadLogic, setBreadLogic] = useState<string[]>(window.location.toString().split("/").slice(3))
    useEffect(() => {
        setBreadLogic(window.location.toString().split("/").slice(3))
    })
    return (
        <header className=" bg-background w-full h-[10vh]  border-b flex gap-2  shadow-2xl  top-0 fixed  justify-around items-center pt-2 " >
            <Slider>
                <nav className="grid gap-6 text-lg font-medium">
                    <Link
                        to="#"
                        className="group flex h-10 w-10 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:text-base"
                    >
                        <Package2 className="h-5 w-5 transition-all group-hover:scale-110" />
                        <span className="sr-only">Acme Inc</span>
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Home className="h-5 w-5" />
                        Dashboard
                    </Link>
                    <Link
                        to="/home"
                        className="flex items-center gap-4 px-2.5 text-foreground"
                    >
                        <ShoppingCart className="h-5 w-5" />
                        Orders
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Package className="h-5 w-5" />
                        Products
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <Users2 className="h-5 w-5" />
                        Customers
                    </Link>
                    <Link
                        to="#"
                        className="flex items-center gap-4 px-2.5 text-muted-foreground hover:text-foreground"
                    >
                        <LineChart className="h-5 w-5" />
                        Settings
                    </Link>
                </nav>

            </Slider>

            <Breadcrumb className="hidden sm:flex">

                {/* <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/dashboard">Dashboard</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="#">Orders</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem> */}
                {/* <BreadcrumbItem> */}
                {breadLogic.map((value, i) => (
                    <BreadcrumbList>
                        <BreadcrumbSeparator />
                        {(i < breadLogic.length - 1) &&
                            <BreadcrumbItem>
                                <BreadcrumbLink asChild>
                                    <Link to={"/" + value}>{value.toUpperCase()}</Link>
                                </BreadcrumbLink>
                            </BreadcrumbItem>

                        }
                        {(i === breadLogic.length - 1) && < BreadcrumbPage > {value.toUpperCase()}</BreadcrumbPage>}

                    </BreadcrumbList>
                ))}

                {/* </BreadcrumbItem> */}
            </Breadcrumb>
            {/* <div className="relative ml-auto flex-1 md:grow-0">
                <Search className="
                 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search..."
                    className="w-full rounded-lg bg-background pl-8 md:w-[200px] lg:w-[336px]"
                />
            </div> */}
            <div className='flex gap-4'>
                <ModeToggle />
                <Exit mode="Admin" />
            </div>

        </header >


    )

}


export default TopBar