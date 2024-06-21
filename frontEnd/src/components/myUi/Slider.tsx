import React from 'react'

import {

    PanelLeft,
    PanelRight
} from "lucide-react"

// importing components
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"

interface SliderTypes {
    children: React.ReactNode,
    side: "left" | "top" | "bottom" | "right"
}

const Slider: React.FC<SliderTypes> = ({
    children,
    side = "left"
}) => {
    return (
        <Sheet  >
            <SheetTrigger asChild>
                <Button size="icon" variant="outline" className="sm:hidden">
                    {side === "left" ?
                        <PanelLeft />
                        : <PanelRight />
                    }
                    <span className="sr-only">Toggle Menu</span>
                </Button>
            </SheetTrigger>
            <SheetContent side={side}>
                {children}
            </SheetContent>
        </Sheet>
    )
}

export default Slider