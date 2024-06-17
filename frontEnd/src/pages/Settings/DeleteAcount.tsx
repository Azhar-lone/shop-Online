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
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"


const DeleteAcount = () => {
    return (
        <Accordion type="single" collapsible
            className=" mx-auto w-[90%]"
        >
            <AccordionItem value="item-1">
                <AccordionTrigger>Delete Acount </AccordionTrigger>
                <AccordionContent>
                    <Input
                        placeholder='Password '
                    // onChange={setValues}
                    // value={user.email}
                    />
                </AccordionContent>
                <AccordionContent>
                    <h1
                        className='font-medium p-2 '
                    >we will send otp to your email or phone number</h1>
                </AccordionContent>
                <AccordionContent>
                    <Input
                        placeholder="phone Number or email"
                    />
                </AccordionContent>
                <AccordionContent>

                    <Button
                    >
                        Send OTP
                    </Button>
                </AccordionContent>

                <AccordionContent>
                    <InputOTP maxLength={6}>
                        <InputOTPGroup>
                            <InputOTPSlot index={0} />
                            <InputOTPSlot index={1} />
                            <InputOTPSlot index={2} />
                        </InputOTPGroup>
                        <InputOTPSeparator />
                        <InputOTPGroup>
                            <InputOTPSlot index={3} />
                            <InputOTPSlot index={4} />
                            <InputOTPSlot index={5} />
                        </InputOTPGroup>
                    </InputOTP>
                </AccordionContent>

                <AccordionContent>
                    <Button
                        variant="destructive"
                        className="w-[100%]"
                    >
                        Delete Account
                    </Button>
                </AccordionContent>
            </AccordionItem>

        </Accordion>

    )
}

export default DeleteAcount