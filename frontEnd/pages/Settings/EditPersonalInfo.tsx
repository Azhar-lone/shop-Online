import React from 'react'

// Icons

// Shadcn components
import { Input } from "@/components/ui/input"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"
import { Button } from '@/components/ui/button';



const EditPersonalInfo = () => {
    return (
        <Accordion type="single" collapsible
            className=" mx-auto w-[90%]"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Edit Personal Information </AccordionTrigger>
                <AccordionContent>
                    <Input
                        placeholder='Old Password '
                    // onChange={setValues}
                    // value={user.email}
                    />
                </AccordionContent>
                <AccordionContent>
                    <Input
                        placeholder="new Email (Optional)"
                    />
                </AccordionContent>
                <AccordionContent>
                    <Input
                        placeholder="new  userName (Optional)"
                    />
                </AccordionContent>
                <AccordionContent>
                    <Input
                        placeholder="new password (Optional)"
                    />
                </AccordionContent>
                <AccordionContent>
                    <Input
                        placeholder="confirm new password (Optional)"
                    />
                </AccordionContent>
                <AccordionContent>
                    <Button
                        className=" w-[100%]"
                    >Update</Button>
                </AccordionContent>
            </AccordionItem>

        </Accordion>

    )
}

export default EditPersonalInfo