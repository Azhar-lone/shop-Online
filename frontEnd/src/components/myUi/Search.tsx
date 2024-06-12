import { SearchIcon, XIcon } from "lucide-react"
import { useState } from "react";


interface PropsTypes {
    className?: String;
    onClickSearch?: React.MouseEventHandler<SVGSVGElement>,

}

const Search: React.FC<PropsTypes> = ({
    className,
    onClickSearch,

}) => {
    const [term, setTerm] = useState<string>("")


    return (
        <div className={` flex gap-2 items-center ${className} relative`}>
            {/* replace this input with shadcn input comp */}
            <input
                type="text"
                placeholder="Search product here"
                className={`md:block py-4  p-2 bg-input`}
                onChange={(e) => setTerm(e.target.value)}
                value={term}

            />
            <div className="absolute right-8 " >
                {(term.length > 0) ?
                    <XIcon onClick={() => setTerm("")} />
                    : < SearchIcon />
                }
            </div>
            {term.length > 0 && < SearchIcon onClick={onClickSearch} />}


        </div>
    )
}

export default Search