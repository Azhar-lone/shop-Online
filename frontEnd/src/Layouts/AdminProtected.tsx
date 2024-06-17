import useUser from "@/components/context/user-provider"
import React from "react"
import { Navigate } from "react-router-dom"
import { useToast } from "@/components/ui/use-toast"
interface ProtectedTypes {
    children: React.ReactNode
}

export default function AdminProtected({ children }: ProtectedTypes) {
    let { user } = useUser()
    const { toast } = useToast()
    if (!user || user.role !== "admin") {
        toast({
            title: "NOT Autherized",
            description: "invalid requested route",
        })
        return <Navigate to='/' />
    }
    return children
}

// Also create Not Autherized page