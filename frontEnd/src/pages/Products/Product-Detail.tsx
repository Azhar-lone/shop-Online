import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"


// components
import { useToast } from "@/components/ui/use-toast"
import { Skeleton } from "@/components/ui/skeleton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// custom Components
import Container from "@/components/myUi/Container"
//Types 
import productType from "@/types/product"
import reviewType from "@/types/Review"

// pages
import Reviews from "@/pages/Reviews/Reviews"

const ProductDetail = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const { toast } = useToast()
    const [reviews, setRevews] = useState<reviewType[]>([
        {
            owner: {
                name: "Linux Torvard Linux",
                userName: "linus-torvards",
                profilePic: "/StaticData/imgs/linux.jpg"
            },
            rating: 4.5,
            review: "this is a review",
            date: (new Date(Date.now()))

        },
        {
            owner: {
                name: "Linux Torvard Linux",
                userName: "linus-torvards",
                profilePic: "/StaticData/imgs/linux.jpg"
            },
            rating: 2.5,
            review: "this is a review  ipsum dolor sit amet consectetur adipisicing elit. Labore, esse consequuntur?"
            , date: (new Date(Date.now()))

        },
        {
            owner: {
                name: "Linux Torvard Linux",
                userName: "linus-torvards",
                profilePic: "/StaticData/imgs/linux.jpg"
            },
            rating: 1.5,
            review: "this is a review  ipsum dolor sit amet consectetur adipisicing elit. Labore, esse consequuntur?"
            , date: (new Date(Date.now()))

        },
        {
            owner: {
                name: "Spider Man",
                userName: "spiderman",
                profilePic: "/StaticData/imgs/spiderman.jpg"
            },
            rating: 5,
            review: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Natus amet animi quos repudiandae dicta cum esse molestias consequatur ratione tempora obcaecati accusantium, dolorem id tenetur eligendi architecto unde. Blanditiis ratione veritatis itaque iste ducimus sed omnis aliquam ipsam, molestias quisquam praesentium maxime tempora deserunt, corrupti tenetur reiciendis saepe voluptatem fugiat qui quasi cum autem illo! Fugit dolorem neque natus? Dolor alias dolorem ab ea doloremque autem tenetur corrupti repudiandae blanditiis, minima quam necessitatibus inventore odio molestiae, dolores tempore doloribus adipisci quisquam? Alias laudantium a unde, dolorem, reiciendis nobis accusantium maxime nesciunt esse vero officiis aliquam fuga corporis aliquid modi beatae nulla ullam, assumenda fugiat. Eos sapiente quia consectetur, repudiandae sunt nemo! Vel tenetur corrupti assumenda, expedita dignissimos accusamus libero? Ullam, numquam. Nobis eos doloribus ut, eum officiis at dolore! Neque necessitatibus reprehenderit magni veniam eveniet ratione quisquam, harum repudiandae amet libero! Asperiores illo quidem exercitationem. Odit nihil quam pariatur, sequi earum nulla ipsa magni soluta, quae atque officiis sapiente! Voluptate cum magnam odio fugiat, unde itaque culpa minus architecto consequatur beatae rerum quos sint non id incidunt cupiditate. Inventore, eius sunt ab illo nam tenetur dignissimos, quaerat ratione in nobis deserunt quibusdam maxime, quidem autem laborum quas labore magnam. Omnis"
            , date: (new Date())


        },

    ])
    const [product, setProduct] = useState<productType>({
        name: "Nodejs Notes for professionals",
        price: 10,
        imgs:
            [
                "/StaticData/imgs/test1.png",
                "/StaticData/imgs/11.jpg",
                "/StaticData/imgs/12.jpg",
                "/StaticData/imgs/13.jpg",

            ],
        _id: "2",
        likes: 10,
        category: "Books",
        discription: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, esse consequuntur? Natus dolorum, corrupti, commodi eius nisi fuga neque placeat ipsum vero pariatur consequuntur voluptas distinctio suscipit hic sint provident culpa! Odit natus molestias ad aspernatur recusandae. Corrupti blanditiis, odio obcaecati earum unde labore ad temporibus optio, perferendis iusto molestias vero nihil culpa excepturi sed numquam modi amet dolore consequatur maxime dolor nemo eveniet aliquid? Quaerat, provident perferendis! Voluptatibus dolor, et repellendus architecto hic aut quae aperiam ab? Harum quasi eaque magnam ipsam natus assumenda sunt sapiente mollitia ducimus similique voluptatem ab eligendi distinctio, iure eius modi. Explicabo delectus ratione facilis ea consequuntur. Veniam, quisquam magnam. Dolorum omnis iusto consequatur sint suscipit, sapiente perferendis fuga quas, totam molestias veritatis repellendus! Error, sunt in? Dolorum incidunt voluptatem praesentium velit suscipit neque nulla rem assumenda eos cumque fugiat amet doloremque illum itaque quam saepe possimus, beatae veritatis minus officia voluptate dolore, nobis autem nemo. Iste non mollitia voluptatem facere tenetur quaerat assumenda veritatis facilis optio! Animi, ea ullam suscipit voluptates tempora earum. Consequatur, velit commodi! Magnam, laboriosam maiores doloribus accusantium exercitationem aut? Velit repellendus voluptatem quo unde necessitatibus excepturi, officia quia minus deleniti, eius nesciunt hic eveniet impedit obcaecati reiciendis ab omnis?",
        inStock: 124,
        owner: {
            name: "Linux Torvard Linux",
            userName: "linus-torvards",
            profilePic: "/StaticData/imgs/linux.jpg"
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
            {!isLoading ?
                <div className="flex flex-col gap-4 p-5 overflow-hidden">
                    <div className="flex flex-col md:flex-row gap-2">

                        {/* Image Section */}
                        <div className="flex gap-4 flex-col md:w-[60%] ">
                            <img src={bannerImg} alt="Banner Image" className="w-[100%] h-96 rounded transition-all hover:scale-105 " />
                            <div className="flex gap-2 md:w-[100%]">
                                {product.imgs.map((img: string, i: number) => (
                                    <img src={img} alt={"img"} key={i} className="w-44 h-20 md:h-32 rounded transition-all hover:scale-105  hover:cursor-pointer" onClick={() => setBannerImg(img)} />
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