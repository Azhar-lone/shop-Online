import useUser from "@/components/context/user-provider"
import React from "react"
import { Navigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"

interface ProtectedTypes {
    children: React.ReactNode
}

export default function UserProtected({ children }: ProtectedTypes) {
    let { isLogin } = useUser()
    const { toast } = useToast()
    if (!isLogin) {
        toast({
            title: "NOT Autherized",
            description: "invalid requested route",
        })
        return <Navigate to='/' />
    }
    return children
}


// Ensures user cant access 
// login ,signUp etc routes 
// because user is already login 
// no need to login again
export function NoLoginProtected({ children }: ProtectedTypes) {
    let { isLogin } = useUser()
    const { toast } = useToast()
    if (isLogin) {
        toast({
            title: "NOT Autherized",
            description: "invalid requested route",
        })
        return <Navigate to='/' />
    }
    return children
}