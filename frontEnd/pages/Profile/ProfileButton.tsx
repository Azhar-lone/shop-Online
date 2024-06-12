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


// api's 
import logout from '../../api\'s/auth/logout';

// imoprting static Data for Testing 
import { user  } from "../../StaticData/userData"

// context
import useUser from "@/components/context/user-provider"

const ProfileButton: React.FC = () => {
    let navigate = useNavigate()
    // const { user } = useUser()

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Avatar>
                    <AvatarFallback>{user.userName.charAt(0)}</AvatarFallback>
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