// importing dependencies
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// components
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

// icons
import { Edit2, Plus, MessageCircle, CameraIcon } from "lucide-react";

// custom components
import Container from "@/components/myUi/Container";
import ProductsList from "../Products/ProductsList";
import Product from "@/components/myUi/Product";
import Hint from "@/components/myUi/Hint";
// importing context
import useLoading from "@/components/context/loading-provider";
import useUser from "@/components/context/user-provider";

// types
import { UserFull } from "@/types/user";
import { productCardType } from "@/types/product";

const ProfilePage = () => {
  // all states here
  const { toast } = useToast();
  const navigate = useNavigate();
  const { isLoading, setIsLoading } = useLoading();
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [products, setProducts] = useState<productCardType[]>([]);
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const { user, isLogin } = useUser();
  const [thisUser, setThisUser] = useState<UserFull>(user);
  const { username } = useParams();

  useEffect(() => {
    document.title = "Profile|Shop-Online";

    // if it is current logged in user
    setIsLoading(true);

    if (
      localStorage.getItem("userName") === username ||
      user.userName === username
    ) {
      alert();
      setThisUser(user);
      setIsLoading(false);
      return;
    } else {
      setIsSelf(false);
      getProfile();
      if (!isLogin) {
        return;
      }
      let found = user.following.find((value) => thisUser!._id === value);
      if (found) {
        setFollowing(true);
        return;
      }
      setFollowing(false);
      setIsLoading(false);
    }
  }, [username]);

  async function getProfile() {
    try {
      const baseUrl = import.meta.env.VITE_BaseUrl;
      interface JsonType {
        msg: string;
        user: UserFull;
      }

      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/users/" + username
      );
      let json: JsonType = await response.json();
      setIsLoading(false);

      if (response.ok) {
        json.user.createdAt = new Date(json.user.createdAt);
        return setThisUser(json.user);
      }

      return toast({
        title: " error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function FollowUser() {
    try {
      interface JsonType {
        msg: string;
      }
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        import.meta.env.VITE_BackendUrl +
          baseUrl +
          "/users/follow/" +
          thisUser._id,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      let json: JsonType = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setFollowing((prev) => !prev);
        return toast({
          title: "Message",
          description: json.msg,
        });
      }
      return toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  async function getUsersProducts() {
    try {
      interface JsonType {
        msg: string;
        products: productCardType[];
      }
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        import.meta.env.VITE_BackendUrl +
          baseUrl +
          "/products/user/" +
          thisUser._id
      );
      let json: JsonType = await response.json();
      setIsLoading(false);
      if (response.ok) {
        setProducts(json.products);
        return;
      }
      return toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      setIsLoading(false);
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <Container>
      {!isLoading ? (
        <div className=" w-[99%]  p-4 mx-auto flex flex-col gap-6 justify-center">
          <>
            <div className="w-[100%]  flex items-center md:flex-row flex-col gap-3  sm:gap-10">
              {/* <div className="md:w-64 md:h-60 w-36 h-32 rounded-full relative border"> */}
              {/* <img src={thisUser.profilePic} alt="Profile image" /> */}
              <Avatar className="lg:size-96  size-64 relative">
                <AvatarFallback>{thisUser.firstName}</AvatarFallback>
                <AvatarImage src={thisUser.profilePic} />
                {isSelf && (
                  <>
                    <label htmlFor="inp">
                      <CameraIcon className="absolute bottom-2 right-6 hover:cursor-pointer hover:scale-105" />
                    </label>
                    <input
                      type="file"
                      multiple
                      id="inp"
                      className="hidden"
                      // onChange={imageHandler}
                    />
                  </>
                )}
              </Avatar>

              <div className="flex gap-5">
                <div className="flex items-center flex-col md:text-xl">
                  <h1>Followers</h1>
                  <h1>{thisUser.followers.length}</h1>
                </div>
                <div className="flex items-center flex-col md:text-xl">
                  <h1>Following</h1>
                  <h1>{thisUser.following.length}</h1>
                </div>
                <div className="flex items-center flex-col md:text-xl">
                  <h1>products</h1>
                  <h1>{thisUser.products.length}</h1>
                </div>
              </div>
            </div>
            <h1 className="text-foreground/80">{thisUser.userName}</h1>
            <h1 className="text-2xl">
              {thisUser.firstName + " " + thisUser.lastName}
            </h1>
            <h1 className="text-2xl  font-bold">
              Joined {thisUser.createdAt.toDateString()}
            </h1>

            {isSelf ? (
              <div className="flex gap-5">
                {thisUser.role === "seller" && (
                  <Button
                    className="flex gap-1"
                    onClick={() => navigate("/products/upload")}
                  >
                    Add Product <Plus />
                  </Button>
                )}
                <Button
                  className="flex gap-1"
                  onClick={() => navigate("/settings")}
                >
                  Edit Profile <Edit2 />
                </Button>
              </div>
            ) : (
              <div className="flex gap-5">
                {isLogin && (
                  <>
                    <Button onClick={FollowUser} variant={"outline"}>
                      {isFollowing === false ? (
                        <Hint label={"Follow"}>Follow </Hint>
                      ) : (
                        <Hint label={"unFollow"}> Following</Hint>
                      )}
                    </Button>
                    <Button variant={"outline"}>
                      message <MessageCircle />
                    </Button>
                  </>
                )}
              </div>
            )}

            <h1
              className="mx-auto text-center text-2xl border-b w-[fit] p-4 font-extrabold"
              onClick={getUsersProducts}
            >
              Products
            </h1>
            <ProductsList>
              <></>
              {products.length > 0 &&
                products.map((product, index) => (
                  <Product product={product} key={index} />
                ))}
            </ProductsList>
          </>
        </div>
      ) : (
        <>
          <div className="w-[100%]  flex items-center gap-3 md:gap-24">
            <Skeleton className="w-[55%] h-[30vh] rounded-xl" />
            <Skeleton className="h-20 w-[30%]" />
            <Skeleton className="h-20 w-[30%]" />
          </div>
          <Skeleton className="h-10 w-[30%]" />
          <Skeleton className="h-10" />
        </>
      )}
    </Container>
  );
};

export default ProfilePage;

// const page =

// function MonthNumberToName(number: number): string {
//   const monthNames = [
//       "January", "February", "March", "April", "May", "June",
//       "July", "August", "September", "October", "November", "December"
//   ];

//   if (number < 1 || number > 12) {
//       throw new Error("Invalid month number. Please enter a number between 1 and 12.");
//   }

//   return monthNames[number - 1];
// }
