// this component will render hero part of homePage
import { useEffect, useState } from 'react'
import parse from "html-react-parser"
// components
import { toast } from "@/components/ui/use-toast"
import { Skeleton } from '@/components/ui/skeleton'
// context 
import useLoading from '@/components/context/loading-provider'

const Hero = () => {

  const [homeBlog, setHomeBlog] = useState<string>(``)
  const { setIsLoading, isLoading } = useLoading()


  useEffect(() => {
    getHomeBlog()
  }, [])

  async function getHomeBlog() {

    try {

      // what function is going to return
      setIsLoading(false)
      interface blogJsonType {
        msg: string
        blog: string

      }
      const baseUrl = import.meta.env.VITE_BaseUrl
      let res = await fetch(import.meta.env.VITE_BackendUrl + baseUrl + "blogs/home")
      let toJson: blogJsonType = await res.json()
      if (res.ok) {
        setHomeBlog(toJson.blog)
        return
      }
      setIsLoading(false)
      return toast({
        title: "error",
        description: toJson.msg,
        variant: "destructive"
      })

    } catch (error: any) {
      setIsLoading(false)
      return toast({
        title: "error",
        description: error.message,
        variant: "destructive"
      })
    }
  }


  return (
    <div>
      {((homeBlog !== ``) && !isLoading) ?
        <div className="blog">
          {parse(homeBlog!)}
        </div>
        :
        // Loading skeleton
        <div className='flex flex-col gap-5'>
          <Skeleton className=" h-24 " />
          <Skeleton className=" h-56 " />
          <Skeleton className=" h-14 w-[50%] " />
          <Skeleton className=" h-8 w-[80%] " />
          <Skeleton className=" h-96 " />
          <Skeleton className=" h-14 w-[50%] mx-auto" />
        </div>

      }
    </div >
  )
}


export default Hero


