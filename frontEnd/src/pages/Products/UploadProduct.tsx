import { useEffect } from "react";

import { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { ColorRing } from "react-loader-spinner";

// Icons
import { ImageUpIcon } from "lucide-react";
// importing components
import { useToast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  // FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";

// Custom components
import Container from "@/components/myUi/Container";
// Types

const UploadProduct = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const { toast } = useToast();
  let [categories, setCategories] = useState<Array<string>>([]);

  const form = useForm<z.infer<typeof productSchema>>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      name: "",
      discription: "",
      category: "",
    },
  });

  useEffect(() => {
    getCategories();
  }, []);

  async function getCategories() {
    try {
      setIsLoading(true);

      const baseUrl = import.meta.env.VITE_BaseUrl;
      alert(1)
      let res = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/general/categories"
      );
     console.log(  import.meta.env.VITE_BackendUrl + baseUrl + "/general/categories")

      let json = await res.json();
      setIsLoading(false);

      if (res.ok) {
        setCategories(json.categories);
        return;
      }

      toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
      // call yourself until you don't get 200 ok

      getCategories();
    } catch (error: any) {
      setIsLoading(false);

      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function handleSubmit(values: z.infer<typeof productSchema>) {
    try {
      setIsLoading(true);
      interface JsonType {
        msg: string;
        userName: string;
      }
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/users/UploadProduct",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
          credentials: "include",
        }
      );
      let json: JsonType = await response.json();
      setIsLoading(false);

      if (response.ok) {
        localStorage.setItem("userName", json.userName);
      }
      return toast({
        title: "UploadProduct error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "UploadProduct error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Container>
      <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight text-center">
        Upload Product
      </h3>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-8">
          {/* Name */}
          <FormField
            control={form.control}
            name={"name"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Products Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* discription */}

          <FormField
            control={form.control}
            name={"discription"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Discription</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Products discription"
                    {...field}
                    draggable
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Price */}

          <FormField
            control={form.control}
            name={"price"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Price</FormLabel>
                <FormControl>
                  <Input placeholder="Product price" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* inStock */}

          <FormField
            control={form.control}
            name={"inStock"}
            render={({ field }) => (
              <FormItem>
                <FormLabel>inStock</FormLabel>
                <FormControl>
                  <Input placeholder="Product inStock" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* category */}

          {categories.length < 1 ? (
            <Button>
              fetching categories... <ColorRing height={"200%"} />
            </Button>
          ) : (
            <FormField
              control={form.control}
              name={"category"}
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {categories.map((category, i) => (
                        <SelectItem value={category} key={i}>
                          {category}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>

                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {/* images */}
          <ImagePicker></ImagePicker>

          {<Button className="w-full">Upload</Button>}

          {!isLoading ? (
            <Button
              type="submit"
              // onClick={() => setStep(true)}
              className="w-[100%]"
            >
              Upload
            </Button>
          ) : (
            <Button>
              Uploading ... <ColorRing height={"200%"} />
            </Button>
          )}
        </form>
      </Form>
    </Container>
  );
};

export default UploadProduct;

const productSchema = z.object({
  name: z.string().min(1, { message: "name is required" }),
  category: z.string().min(2, { message: "category is required" }),
  discription: z
    .string()
    .min(50, { message: "should be atleast 50 charactors long" })
    .max(450, { message: "should be atleast 50 charactors long" }),
  price: z.number().gt(0, { message: "price must be greater than than 0" }),
  inStock: z.number().gt(-1, { message: "inStock  cant be negative value" }),
});

const ImagePicker = () => {
  const [imgsPreview, setImgsPreview] = useState<string[]>([]);

  function imageHandler(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (files) {
      for (let i: number = 0; i < files.length; i++) {
        const file = files[i];
        const reader = new FileReader();
        reader.onloadend = () => {
          setImgsPreview((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      }
    }
  }

  return (
    <div className="border border-input">
      <label htmlFor="inp">
        <ImageUpIcon className="size-48 p-10 mx-auto hover:cursor-pointer " />
      </label>

      <input
        type="file"
        multiple
        id="inp"
        className="hidden"
        onChange={imageHandler}
      />

      <div className="flex gap-2 md:w-[100%]">
        {imgsPreview.map((src: string, i: number) => (
          <img
            src={src}
            alt={"img"}
            key={i}
            className="w-44 h-20 md:h-32 rounded transition-all hover:scale-105   hover:cursor-pointer"
          />
        ))}
      </div>
    </div>
  );
};
