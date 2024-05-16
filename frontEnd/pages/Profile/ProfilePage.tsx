// importing dependencies
import React from 'react'

// components
import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
// icons
import { Edit2, Plus } from "lucide-react"

// custom components
import Container from "@/components/myUi/Container"
import ProductsList from '../Products/ProductsList'
import Product from "@/components/myUi/Product"


// imoprting static Data for Testing 
import { user } from "../../StaticData/userData"
import { products } from "/StaticData/productData"


const ProfilePage = () => {
    let loading = false

    return (
        <Container>
            <div
                className=' w-[99%]  p-4 mx-auto flex flex-col gap-6 justify-center h-[100vh]'
            >
                {!loading ? <>
                    <div className='w-[100%]  flex items-center gap-3  sm:gap-10'>
                        <img src={user.profileImg} alt="Profile image"
                            className='w-[60%] h-[60vh] rounded-xl '

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


                    <div className='flex gap-5'>
                        <Button
                            className='flex gap-3'

                        >
                            Add Product <Plus /> </Button>
                        <Button
                            className='flex gap-3'

                        >
                            Edit Profile <Edit2 /> </Button>

                    </div>

                </> : (
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
            </div>
            {/* users products */}
            <h1 className='mx-auto text-center text-2xl border-b w-[50%] p-4'   >Users Products</h1>
            <ProductsList 
            
            >
                {products.map((product, index) => (
                    <Product product={product} key={index} />

                ))}

            </ProductsList>
        </Container>
    )
}

export default ProfilePage





