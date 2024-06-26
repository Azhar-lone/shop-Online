import { useEffect, useState } from "react"
import parse from "html-react-parser"

// Icons
import { ArrowBigUp } from "lucide-react"
//components 
import {
    Avatar,
    AvatarFallback,
    AvatarImage
} from "@/components/ui/avatar"
import { Skeleton } from "@/components/ui/skeleton"
import { ScrollArea } from "@/components/ui/scroll-area"
// context
import useLoading from "@/components/context/loading-provider"
// custom Compoents
import Container from "@/components/myUi/Container"
import { toast } from "@/components/ui/use-toast"

// importing aboutUs css

// import Static Data

interface ourTeamType {
    picture?: string,
    name: string,
    role: string,
    links: {
        facebook?: string,
        instagram?: string,
        gitHub?: string,
        stackOverFlow?: string,
        linkedIn?: string,
        others?: Array<String>
    },
    discription: string
}

export default function AboutUs() {


    document.title = "About us"

    let [aboutusBlog, setAboutusBlog] = useState<string>(``)
    let [ourTeam, setOurTeam] = useState<ourTeamType[]>([])
    const { setIsLoading, isLoading } = useLoading()
    useEffect(() => {
        getAboutUsInfo()
    }, [])

    async function getAboutUsInfo() {

        try {

            // what function is going to return
            setIsLoading(true)
            interface OurteamJsonType {
                msg: string
                ourTeam: ourTeamType[]

            }
            interface blogJsonType {
                msg: string
                blog: string

            }

            const baseUrl = import.meta.env.VITE_BaseUrl
            let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/general/aboutus")
            let blogRes = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "/blogs/about-us")

            let toJson: OurteamJsonType = await res.json()
            let blogJson: blogJsonType = await blogRes.json()

            setIsLoading(false)
            if (res.ok) {
                setOurTeam(toJson.ourTeam)
            }
            else {
                toast({
                    title: "error while fetching our team info",
                    description: toJson.msg,
                    variant: "destructive"
                })
            }
            if (blogRes.ok) {
                setAboutusBlog(blogJson.blog)
                return
            }

            setIsLoading(false)
            return toast({
                title: "error while fetching blog",
                description: blogJson.msg,
                variant: "destructive"
            })

        } catch (error: any) {
            setIsLoading(false)
            return toast({
                title: "error while fetching ourteam",
                description: error.message,
                variant: "destructive"
            })
        }
    }





    return (
        <Container
            className="flex flex-col p-5"
        >
            {aboutusBlog !== '' && !isLoading ? <>
                <div className="blog">
                    {parse(aboutusBlog, {
                        htmlparser2:
                            { lowerCaseAttributeNames: true, withEndIndices: true, withStartIndices: true }


                    })}
                </div>
                <>
                    <h1 className="border-b-4 p-3 w-[50%] mx-auto text-4xl font-extrabold text-center">OurTeam</h1>


                    <div className="flex flex-wrap gap-4  p-2 ">

                        {ourTeam.map((element: ourTeamType, i: number) => (
                            <div className=" flex flex-col items-center text-center bg-background sm:w-[48%] shadow-2xl  lg:w-[23%] xl:w-[24%] h-96 rounded-2xl border hover:scale-105   duration-75" key={i}>
                                {/* <img src={element.memberPic} className="  w-[0%] h-[40%] rounded-full" alt="Image" /> */}
                                <Avatar
                                    className="size-36 "
                                >
                                    <AvatarFallback>{element.name.charAt(0)}</AvatarFallback>
                                    <AvatarImage
                                        src={element.picture}
                                    />
                                </Avatar>
                                <h1 className="text-xl p-1 border-b-2">{element.name}</h1>
                                <h1 className="text-2xl p-1  " >{element.role}</h1>
                                <ScrollArea className="h-36 overflow-auto text-light">{element.discription}</ScrollArea>
                                <ArrowBigUp className="left-10 text-red-600 relative p-3 size-5" />
                            </div>
                        ))
                        }
                    </div>
                </>
            </>
                :
                <AboutUsSkeleton />
            }
        </Container>
    )
}



function AboutUsSkeleton() {

    return (<div className="flex gap-4 flex-col">
        <Skeleton className=" h-24 " />
        <Skeleton className=" h-56 " />
        <Skeleton className=" h-14 w-[50%] " />
        <Skeleton className=" h-8 w-[80%] " />
        <Skeleton className=" h-96 " />
        <Skeleton className=" h-14 w-[50%] mx-auto" />

        <div className="flex flex-wrap gap-4  p-2 ">
            {Array(6).fill(0).map((_, i: number) => (
                <div className=" flex flex-col items-center gap-2 sm:w-[48%]   lg:w-[23%] xl:w-[24%] h-96   hover:scale-105   duration-75" key={i}>
                    <Skeleton className=" h-32 w-32 rounded-full" />
                    <Skeleton className=" h-10 w-[90%] " />
                    <Skeleton className=" h-16 w-[90%] " />
                    <Skeleton className=" h-28 w-[95%]" />

                </div>
            ))
            }
        </div>

    </div>)
}