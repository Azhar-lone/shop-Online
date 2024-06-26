

interface propsType {
    children: React.ReactNode
    className?: string
}

export function SideBar(props: propsType) {

    return (
        <div className={` fixed   hidden sm:flex lg:hidden w-[8%] 
            h-[88vh] shadow-lg bg-background shadow-foreground  left-0 top-[10vh]  gap-4  
         justify-center backdrop-blur-sm items-start
         ${props.className}
         `}>
            {props.children}
        </div>
    )

}

export function TopBar(props: propsType) {

    return (
        <div className={` bg-background w-full h-[10vh] shadow-foreground
         flex gap-2 flex-col shadow-2xl  top-0 fixed sm:justify-start justify-around pt-2 ${props.className}`} >

            {props.children}
        </div>
    )

}