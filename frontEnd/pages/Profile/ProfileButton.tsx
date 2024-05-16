import React from 'react'
import { useNavigate } from 'react-router-dom';


//shadcn  components
import {
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,

} from "@/components/ui/dropdown-menu";
// Icons
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { LogOut, Settings } from "lucide-react"

// imoprting static Data for Testing 
import { user } from "../../StaticData/userData"

const ProfileButton: React.FC = () => {
    let navigate = useNavigate()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
                    <AvatarImage
                        src={user.profileImg}
                    />
                </Avatar>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
                <DropdownMenuLabel>{user.userName}</DropdownMenuLabel>
                <  DropdownMenuSeparator />

                <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                    onClick={() => navigate("/settings")}
                >
                    <Settings />   Account Settings

                </DropdownMenuItem>
                <  DropdownMenuSeparator />
                <DropdownMenuItem
                    className='gap-2 cursor-pointer'
                ><LogOut /> Logout</DropdownMenuItem>

            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default ProfileButton