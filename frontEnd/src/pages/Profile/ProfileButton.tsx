import React from 'react'
import { useNavigate } from 'react-router-dom';

//import Icons
import { User, Upload, LayoutDashboard } from "lucide-react"

//shadcn  components
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu";
import { useToast } from "@/components/ui/use-toast"



// Icons
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"

// context
import useUser from "@/components/context/user-provider"

const ProfileButton: React.FC = () => {
    let navigate = useNavigate()
    const { user } = useUser()
    const { toast } = useToast()

    async function logout() {
        try {
            const baseUrl = import.meta.env.VITE_BaseUrl
            let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/users/logout', {
                method: 'POST',
                credentials: 'include'
            })
            if (response.ok) {
                localStorage.clear()
                location.reload()
                return
            }
            let json = await response.json()

            toast({
                title: " server error",
                description: json.msg,
                variant: "destructive"
            })




        } catch (error: any) {
            toast({
                title: "client error",
                description: error.message,
                variant: "destructive"
            })
        }




    }


    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>{user.userName.charAt(0).toUpperCase()}</AvatarFallback>
                    <AvatarImage
                        src={user.profilePic}
                    />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.userName}</DropdownMenuLabel>
                <  DropdownMenuSeparator />

                <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                    onClick={() => navigate(`/${user.userName}`)}
                >
                    <User />   Profile

                </DropdownMenuItem>
                {user && user.role === "seller" || user.role === "admin" &&
                    <DropdownMenuItem
                        className='gap-2 cursor-pointer'
                        onClick={() => navigate(`/products/upload`)}
                    >
                        <Upload />   Upload Product

                    </DropdownMenuItem>
                }

                {user && user.role === "admin" &&
                    <DropdownMenuItem
                        className='gap-2 cursor-pointer'
                        onClick={() => navigate(`/admin`)}
                    >
                        <LayoutDashboard />   Admin DashBoard

                    </DropdownMenuItem>
                }
                <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                    onClick={() => navigate("/settings")}
                >
                    <Settings />   Account Settings

                </DropdownMenuItem>
                <  DropdownMenuSeparator />
                <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                    onClick={() => logout()}
                ><LogOut /> Logout</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileButton