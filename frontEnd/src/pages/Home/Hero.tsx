// this component will render hero part of homePage
import { useEffect, useState } from "react";
import parse from "html-react-parser";
// components
import { Skeleton } from "@/components/ui/skeleton";
// context
import useLoading from "@/components/context/loading-provider";
import useBlogs from "@/components/context/blogs-provider";
import { blogType } from "@/types/General";
const Hero = () => {
  // set Title

  const [homeBlog, setHomeBlog] = useState<blogType>({
    blog: "",
    createdAt: new Date(Date.now()),
    updatedAt: new Date(Date.now()),
    owner: {
      firstName: "",
      lastName: "",
      profilePic: "",
      userName: "",
    },
    slug: "home-blog",
  });
  const { isLoading } = useLoading();
  const { getBlog } = useBlogs();
  useEffect(() => {
    document.title = "Home|Shop-online";
    getBlog("home-blog", setHomeBlog);
  }, []);

  return (
    <div>
      {homeBlog.blog !== `` && !isLoading ? (
        <div className="blog">{parse(homeBlog.blog!)}</div>
      ) : (
        // Loading skeleton
        <div className="flex flex-col gap-5">
          <Skeleton className=" h-24 " />
          <Skeleton className=" h-56 " />
          <Skeleton className=" h-14 w-[50%] " />
          <Skeleton className=" h-8 w-[80%] " />
          <Skeleton className=" h-96 " />
          <Skeleton className=" h-14 w-[50%] mx-auto" />
        </div>
      )}
    </div>
  );
};

export default Hero;
