import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
// components
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "../ui/button";

// Custom comonents
import Hint from "./Hint";

//Context
import useUser from "../context/user-provider";
import { useToast } from "../ui/use-toast";

// Types
import UserType from "@/types/user";

const User: React.FC<{ user: UserType }> = ({ user }) => {
  const navigate = useNavigate();
  const [isSelf, setIsSelf] = useState<boolean>(true);
  const [isFollowing, setFollowing] = useState<boolean>(false);
  const { user: loggedInUser, isLogin } = useUser();
  const { toast } = useToast();

  useEffect(() => {
    // if it is current logged in user
    if (!isLogin) {
      return;
    }
    if (localStorage.getItem("userName") === user.userName) {
      setIsSelf(false);
      return;
    } else {
      let found = loggedInUser.following.find((value) => user._id === value);
      if (found) {
        setFollowing(true);
      }
    }
  }, []);

  async function FollowUser() {
    try {
      interface JsonType {
        msg: string;
      }
      const baseUrl = import.meta.env.VITE_BaseUrl;
      let response = await fetch(
        import.meta.env.VITE_BackendUrl + baseUrl + "/users/follow/" + user._id,
        {
          method: "PUT",
          credentials: "include",
        }
      );
      let json: JsonType = await response.json();
      if (response.ok) {
        setFollowing((prev) => !prev);
        return toast({
          title: "error",
          description: json.msg,
        });
      }
      return toast({
        title: "error",
        description: json.msg,
        variant: "destructive",
      });
    } catch (error: any) {
      toast({
        title: "error",
        description: error.message,
        variant: "destructive",
      });
    }
  }

  return (
    <div className="flex gap-1 md:w-[60%] items-start">
      <div className="flex gap-5 items-center">
        <Avatar
          className="size-16 hover:cursor-pointer"
          onClick={() => navigate("/" + user.userName)}
        >
          <AvatarFallback>{user.firstName.charAt(0)}</AvatarFallback>
          <AvatarImage src={user.profilePic} />
        </Avatar>
        <div>
          <h1 className="text-2xl">{user.firstName + " " + user.lastName}</h1>
          <h1 className="text-foreground/60">{user.userName}</h1>
        </div>
      </div>
      {/* If not login show no button */}
      {/* If login and is himself show no button */}
      {/* If login and not himself show follow button if not following*/}
      {!isLogin ? null : (
        <>
          {isSelf ? null : (
            <>
              {" "}
              {isFollowing ? (
                <Hint label={"Follow"}>
                  <Button
                    onClick={FollowUser}
                    variant={"ghost"}
                    className="text-primary"
                  >
                    Follow
                  </Button>
                </Hint>
              ) : null}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default User;
