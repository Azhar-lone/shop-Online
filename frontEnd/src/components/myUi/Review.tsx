import React from 'react'
import { useNavigate } from 'react-router-dom'

// Icons
import { Star } from 'lucide-react'
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


// types
import reviewType from '@/types/Review'

interface review {
    review: reviewType
}
const Review: React.FC<review> = ({ review }) => {
    const navigate = useNavigate()
    return (
        <div className="flex md:gap-8 gap-2 flex-col w-[100%]">

            {/* Owner Info */}

            <div className='flex justify-between md:w-[60%]'>
                {/* profile Picture */}
                <div className='flex gap-5 flex-col'>
                    <Avatar className="size-16">
                        <AvatarFallback  >{review.owner.name.charAt(0)}</AvatarFallback>
                        <AvatarImage src={review.owner.profilePic} onClick={() => navigate("/" + review.owner.userName)} />
                    </Avatar>
                    <div>
                        <h1 className='text-2xl'>{review.owner.name}</h1>
                        <h1 className='font-serif '>{review.date.toLocaleString()}</h1>
                    </div>
                </div>
                {/* Stars */}
                {review.rating &&
                    <div className="flex gap-1 items-center">

                        {Array(5).fill(0).map((_, i: number) => (
                            <>
                                {review.rating && ((review.rating - 0.5) > i) && < Star key={i} />}

                            </>
                        ))}
                    </div>
                }
            </div>
            <p>{review.review}</p>
        </div>
    )
}

export default Review