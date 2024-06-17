import React from "react"

import { Skeleton } from "@/component/ui/skeleton"


import useLoading from "@/components/context/loading-provider"

const ProductsSkeleton: React.FC = () => {


    
    return (
        <div
            className="top-[20vh] fixed w-full  border-b p-2 flex justify-around items-center"
        >
            <Skeleton
                className="w-36 h-10 "
            />
            <ul
                className=" flex justify-around gap-2"
            >

                {Array(20).fill(0).map((element, index) => (
                    <Skeleton
                        className="w-24 h-10"
                    />

                ))
                }
            </ul >
            <div className="flex gap-2">
                <Skeleton
                    className="w-16 h-10"
                />
                <Skeleton
                    className="w-16 h-10"
                />
            </div>
            <Skeleton
                className="w-12 h-12 rounded-full"
            />

        </div >
    )
}