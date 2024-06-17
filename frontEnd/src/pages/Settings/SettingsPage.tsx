import React, { useState } from 'react'

// Icons
import { ArrowDown } from "lucide-react"
// shadcn Components
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"

// custom components
import Container from "@/components/myUi/Container"

// sub pages
import EditPersonalInfo from './EditPersonalInfo'
import EditProfileInfo from './EditProfileInfo'
import DeleteAcount from './DeleteAcount'

const SettingsPage = () => {
    let [isActive, setIsActive] = useState<boolean>(false)

    return (
        <Container>
            <div
                className='flex items-center flex-col p-10 gap-10 '
            >
                <h1
                    className='w-[100%] text-center text-3xl '
                >
                    Account Settings
                </h1>
                <EditPersonalInfo />
                <EditProfileInfo />
                <DeleteAcount />
                <div className='flex w-[100%] gap-4 justify-center'>
                    <h1 >Active Status</h1> <Switch onClick={() => setIsActive(current => !current)} /> {
                        isActive ? "ON" : "OFF"}
                </div>
            </div>
        </Container>
    )
}

export default SettingsPage