import { useState } from "react";
import { SearchIcon } from "lucide-react"
import { Input } from "@/components/ui/input";


import {
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandList,
    CommandDialog,
} from "@/components/ui/command"



interface PropsTypes {
    className?: String;
}

const FullSearch: React.FC<PropsTypes> = ({
    className,
}) => {
    const [open, setOpen] = useState<boolean>(false)



    return (
        <div className={` flex gap-2 items-center ${className} sm:relative `}>

            <Input placeholder="Search" className="py-0 hidden sm:block"  onClick={() => setOpen(true)}/>

            <CommandDialog open={open} onOpenChange={setOpen}>
                <CommandInput placeholder="Type a command or Fullsearch..." />
                <CommandList>
                    <CommandEmpty>No results found.</CommandEmpty>
                    <CommandGroup heading="Products">
                    </CommandGroup>
                    <CommandGroup heading="Users">
                    </CommandGroup>


                </CommandList>
            </CommandDialog>


            < SearchIcon onClick={() => setOpen(true)} className="absolute sm:right-3" />

        </div>


    )
}

export default FullSearch









