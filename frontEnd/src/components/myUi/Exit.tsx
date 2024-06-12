import React from 'react'

import { LogOut } from "lucide-react"


interface ExitTypes {
    mode: string
}
const Exit: React.FC<ExitTypes> = ({
    mode
}) => {
    return (
        <div className='flex gap-1 border p-2 rounded-lg hover:cursor-pointer'>
            <h1 className='hidden md:block'>Exit {mode}</h1>
            <LogOut />
        </div>
    )
}

export default Exit