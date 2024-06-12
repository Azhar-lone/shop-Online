// importing dependencies
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
// icons
import { Edit2, Plus, MessageCircle } from "lucide-react"

// custom components
import Container from "@/components/myUi/Container"
import ProductsList from '../Products/ProductsList'
import Product from "@/components/myUi/Product"

// importing context
import useLoading from "@/components/context/loading-provider"
import useUser from "@/components/context/user-provider"

// importing Types
import productType from "../../types/product"
import User from '../../types/user'
// importing api's
import { userProducts } from '../../api\'s/profile'
import getUserByUserName from '../../api\'s/userInfo'

// imoprting static Data for Testing 
import { user as userData } from "../../StaticData/userData"
import { products as productsData } from "/StaticData/productData"






const ProfilePage = () => {
    // all states here
    let { user: loggedInUser } = useUser()
    const { isLoading } = useLoading()
    const [isSelf, setIsSelf] = useState<boolean>(false)
    const [isFollowing, setIsFollowing] = useState<boolean>(false)
    const [products, setProducts] = useState<productType[]>(productsData)
    const [user, setUser] = useState<User>(userData)
    let params = useParams()








    useEffect(() => {

        //    check if it is current user
        // if (loggedInUser.userName === params.userName) {
            // setIsSelf(true)
        // }
        // Check the following array of loggedIn user
        // if user is not following this user then 
        // show follow button else show unfollow button

        // else if (!isFollowing) {

            // setIsFollowing(true)
        // }

        // getUserByUserName((params.userName), setUser)

        // userProducts(setProducts, 1)
    }, [])



    return (
        <Container>
            {!isLoading ? (<div
                className=' w-[99%]  p-4 mx-auto flex flex-col gap-6 justify-center'
            >
                <>
                    <div className='w-[100%]  flex items-center gap-3  sm:gap-10'>
                        <img src={user.profileImg} alt="Profile image"
                            className='w-[20%] h-[20%] rounded-full '

                        />
                        <div className='flex items-center flex-col md:text-xl'>
                            <h1>Followers</h1>
                            <h1>0</h1>
                        </div>
                        <div className='flex items-center flex-col md:text-xl'>
                            <h1>Following</h1>
                            <h1>0</h1>
                        </div>
                    </div>
                    <h1>{user.userName}</h1>


                    {isSelf ? <div className='flex gap-5'>
                        <Button
                            className='flex gap-1'

                        >
                            Add Product <Plus /> </Button>
                        <Button
                            className='flex gap-1'

                        >
                            Edit Profile <Edit2 /> </Button>

                    </div> : <div className='flex gap-5'>
                        {isFollowing ?
                            <Button>Follow</Button>

                            : <Button>unFollow</Button>
                        }<Button>message <MessageCircle /> </Button>               </div>}

                    <h1 className='mx-auto text-center text-2xl border-b w-[50%] p-4'   >Users Products</h1>
                    <ProductsList

                    >
                        {products.map((product, index) => (
                            <Product product={product} key={index} />

                        ))}

                    </ProductsList>
                </>
            </div>)

                : (
                    <>
                        <div className='w-[100%]  flex items-center gap-3 md:gap-24'>
                            <Skeleton
                                className='w-[55%] h-[30vh] rounded-xl'

                            />
                            <Skeleton className="h-20 w-[30%]" />
                            <Skeleton className="h-20 w-[30%]" />

                        </div>
                        <Skeleton className="h-10 w-[30%]" />
                        <Skeleton className="h-10" />
                    </>
                )
            }
        </Container>
    )
}

export default ProfilePage




// const page =
