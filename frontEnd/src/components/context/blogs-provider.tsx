import React, { createContext, useContext, useState } from "react";

// context
import useLoading from "./loading-provider";
import { useToast } from "../ui/use-toast";
// Types
import { blogType } from "@/types/General";

interface ContextType {
  getBlog: (
    slug: string,
    setBlog: React.Dispatch<React.SetStateAction<blogType>>
  ) => void;
}

const initialState: ContextType = {
  getBlog: () => {},
};

const BlogsContext = createContext<ContextType>(initialState);

export default function useBlogs() {
  return useContext(BlogsContext);
}

interface Provderprops {
  children: React.ReactNode;
}

export const BlogProvider: React.FC<Provderprops> = ({ children }) => {
  const [blogsCache, setBlogsCache] = useState<blogType[]>([]);
  let { setIsLoading } = useLoading();
  const { toast } = useToast();

  async function getBlog(
    slug: string,
    setBlog: React.Dispatch<React.SetStateAction<blogType>>
  ) {
    try {
      // Check if the blog is in the cache
      const cachedBlog = blogsCache.find((blog) => blog.slug === slug);
      if (cachedBlog) {
        setBlog(cachedBlog);
        setIsLoading(false);
        return;
      }
      // what function is going to return
      setIsLoading(false);
      interface blogJsonType {
        msg: string;
        blog: blogType;
      }
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let res = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/blogs/" + slug
      );
      let data: blogJsonType = await res.json();
      if (res.ok) {
        // Update the cache
        setBlogsCache((prevCache) => [...prevCache, data.blog]);
        // Set the blog data
        setBlog(data.blog);
        return;
      }

      setIsLoading(false);
      return toast({
        title: "error",
        description: data.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      return toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <BlogsContext.Provider value={{ getBlog }}>
      {children}
    </BlogsContext.Provider>
  );
};
