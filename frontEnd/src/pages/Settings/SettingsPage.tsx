import { useState } from 'react'

// Icons
// shadcn Components
import { Switch } from "@/components/ui/switch"

// custom components
import Container from "@/components/myUi/Container"

// sub pages
import EditPersonalInfo from './EditPersonalInfo'
import DeleteAcount from './DeleteAcount'

const SettingsPage = () => {
    let [isActive, setIsActive] = useState<boolean>(false)

    return (
        <Container
            className='flex items-center flex-col py-5 gap-5 '
        >


            <h1
                className='w-[100%] text-center text-3xl '
            >
                Account Settings
            </h1>
            <EditPersonalInfo />
            <DeleteAcount />
            <div className='flex w-[90%] p-8 gap-4  shadow border'>
                <h1 >Active Status</h1> <Switch onClick={() => setIsActive(current => !current)} /> {
                    isActive ? "ON" : "OFF"}
            </div>
        </Container>
    )
}

export default SettingsPage