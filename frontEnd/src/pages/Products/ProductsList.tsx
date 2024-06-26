import React from 'react'


interface props {
    children: React.ReactNode
}

const ProductsList: React.FC<props> = ({
    children
}) => {
    return (
        <div
            className={
                `flex flex-wrap gap-4 px-1  `
            }        >
            {children}
        </div>
    )
}

export default ProductsList

// do pagination for this component




