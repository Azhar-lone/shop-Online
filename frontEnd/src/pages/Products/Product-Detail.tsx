import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


// components
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// custom Components
import Container from "@/components/myUi/Container"
//Types 
import productType, { productCardType } from "@/types/product"
import reviewType from "@/types/Review"

// context
import useProducts from "@/components/context/products-provider"
// pages
import Reviews from "@/pages/Reviews/Reviews"

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const [reviews, setRevews] = useState<reviewType[]>([])
    const { setProducts } = useProducts()
    const [product, setProduct] = useState<productType>({
        name: "",
        price: 0,
        imgs: ["", "", ""],
        _id: "",
        likes: 0,
        category: "",
        discription: "",
        inStock: 0,
        owner: {
            name: "",
            userName: "",
            profilePic: ""
        }

    })
    const [bannerImg, setBannerImg] = useState<string>(product.imgs[0])

    useEffect(() => {
        getProduct()
    }, [])

    async function getProduct() {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            interface JsonType {
                msg: string,
                product: productType
            }
            let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/products/' + id)
            let json: JsonType = await response.json()
            setIsLoading(false)

            if (response.ok) {

                setProduct(json.product)
                return
            }


            return toast({
                title: "error",
                description: json.msg,
                variant: "destructive"
            })

        } catch (error: any) {
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            })
            setIsLoading(false)

        }
    }
    async function getRelatedProducts() {
        try {
            setIsLoading(true)
            const baseUrl = import.meta.env.VITE_BaseUrl
            interface JsonType {
                msg: string,
                products: productCardType
            }
            let response = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + '/products/related/' + id)
            let json: JsonType = await response.json()
            setIsLoading(false)

            if (response.ok) {

                setProducts((prev) => [...prev, json.products])
                return
            }


            return toast({
                title: "error",
                description: json.msg,
                variant: "destructive"
            })

        } catch (error: any) {
            toast({
                title: "error",
                description: error.message,
                variant: "destructive"
            })
            setIsLoading(false)

        }
    }


    return (
        <Container>
            {product.name !== '' && !isLoading ?
                <div className="flex flex-col gap-4 p-5 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-2">

                        {/* Image Section */}
                        <div className="flex gap-4 flex-col md:w-[60%] ">
                            <img src={bannerImg} alt="Banner Image" className="w-[100%] h-96 rounded transition-all hover:scale-105 border" />
                            <div className="flex gap-2 md:w-[100%]">
                                {product.imgs.map((img: string, i: number) => (
                                    <img src={img} alt={"img"} key={i} className="w-44 h-20 md:h-32 rounded transition-all hover:scale-105 border  hover:cursor-pointer" onClick={() => setBannerImg(img)} />
                                ))}
                            </div>
                        </div>
                        {/* Product Info section */}
                        <div className="flex mx-auto flex-col gap-4 md:w-[39%] md:p-24">
                            <h1 className="text-3xl">{product.name}</h1>
                            <h1 className="text-2xl font-light">{product.category}</h1>
                            <h1 className="text-2xl  w-fit">In Stock : {product.inStock.toString()} Items</h1>
                        </div>
                    </div>
                    {/* Owner Info */}
                    <div className="flex md:gap-8 gap-3 items-center">
                        <Avatar className="size-16">
                            <AvatarFallback  >{product.owner.name.charAt(0)}</AvatarFallback>
                            <AvatarImage src={product.owner.profilePic} onClick={() => navigate("/" + product.owner.userName)} />
                        </Avatar>
                        <h1>{product.owner.name}</h1>

                    </div>
                    {/* product discription */}
                    <div>
                        <h3 className="text-3xl">Description</h3>
                        <p className="md:p-4 pt-2">{product.discription}</p>
                    </div>

                    {/* Reviews */}
                    <Reviews reviews={reviews} />

                </div>
                :
                <div>



                    <div className="flex flex-col md:flex-row gap-2 p-5  ">

                        {/* images*/}
                        <div className="flex gap-4 flex-col md:w-[60%]">
                            <Skeleton className="w-[100%] h-96 " />
                            <div className="flex gap-2 md:w-[100%]">
                                {Array(5).fill(0).map((_, i) => (
                                    <Skeleton className="w-44 h-20 md:h-32" key={i} />
                                ))
                                }
                            </div>
                        </div>
                        {/* product info */}
                        <div className="flex  flex-col gap-4 md:w-[39%]">
                            {/* product Name */}
                            <Skeleton className=" w-[100%] h-16" />
                            {/* price */}
                            <Skeleton className=" w-[100%] h-16" />
                            {/* category */}
                            <Skeleton className=" w-[100%] h-16" />
                            {/* in stock */}
                            <Skeleton className=" w-[100%] h-16" />
                            <Skeleton className=" w-[100%] h-16" />
                        </div>

                    </div>
                    {/* owner Info */}
                    <div className="flex gap-2 items-center">
                        <Skeleton className=" md:h-24 md:w-24 w-16 h-16 rounded-full" />
                        <Skeleton className=" h-12 w-[40%] " />
                    </div>
                    {/* product discription */}
                    <div className="flex flex-col gap-5 p-2">
                        {/* Title */}
                        <Skeleton className=" w-[100%] h-16" />
                        {/* discription */}
                        <Skeleton className="w-[100%] h-96" />

                    </div>
                    {/* Related Products */}
                    <div className="flex gap-2 justify-center">
                        <Skeleton className=" h-48 w-[24%] " />
                        <Skeleton className=" h-48 w-[24%] " />
                        <Skeleton className=" h-48 w-[24%] " />
                        <Skeleton className=" h-48 w-[24%] " />

                    </div>
                    {/* product reviews */}
                    <div className="flex flex-wrap gap-4  p-2 ">
                        {Array(6).fill(0).map((_, i: number) => (
                            <div className="flex flex-col gap-2 w-[100%]" key={i}>
                                {/* userInfo */}
                                <div className="flex justify-between md:w-[20%]">
                                    {/* Profile picture */}
                                    <Skeleton className="h-16 w-16 rounded-full" />
                                    {/* starts or rating */}
                                    <div className="flex gap-1 items-center">
                                        <Skeleton className=" h-6 w-6 rounded-full " />
                                        <Skeleton className=" h-6 w-6 rounded-full" />
                                        <Skeleton className=" h-6 w-6 rounded-full" />
                                        <Skeleton className=" h-6 w-6 rounded-full" />
                                        <Skeleton className=" h-6 w-6 rounded-full" />
                                    </div>
                                </div>
                                {/* userName */}
                                <Skeleton className=" h-10 w-[40%] " />
                                {/* review line 1 */}
                                <Skeleton className=" h-16 w-[90%] " />
                                {/* review line 2 */}
                                <Skeleton className=" h-28 w-[95%]" />

                            </div>
                        ))
                        }
                    </div>


                </div>
            }
        </Container>
    )

}
export default ProductDetail