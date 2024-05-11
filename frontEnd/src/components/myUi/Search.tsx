import { SearchIcon, SearchX } from "lucide-react"
import { Input } from "../ui/input";
import { useState } from "react";


interface PropsTypes {
    className?: String;
hidden?:string
}

const Search: React.FC<PropsTypes> = ({
    className,
    hidden="hidden"
}) => {
    const [term, setTerm] = useState<String>("")


    return (
        <div className={` flex gap-2 items-center ${className}`}>
            {/* replace this input with shadcn input comp */}
            <Input
                type="text"
                placeholder="Search product here"
                className={`md:block ${hidden} py-4`}
                onChange={(e) => setTerm(e.target.value)}
            />
            {(term.length > 0) ?
                < SearchX />
                : < SearchIcon />
            }
        </div>
    )
}

export default Search