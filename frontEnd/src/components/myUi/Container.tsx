import React from 'react'


interface ContainerProps {
    children: React.ReactNode;

}

const Container: React.FC<ContainerProps> = ({
    children
}) => {
    return (

        // due to sidebar on medium screen move container from left 11% and 
        // also make it width 85% to have 5% margin from sidebar
        // top one is for all
        // first is for large screen
        // second is for medium screen
        // third is for small screen 
        <div
            className='
            mt-[11vh] mb-[11vh] mx-auto border
            lg:w-[94%] lg:ml-auto
            md:w-[88%] md:ml-[11%]  
            w-[99%] '
        >{children}</div>
    )
}

export default Container