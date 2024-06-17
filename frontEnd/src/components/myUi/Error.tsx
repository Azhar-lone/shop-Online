import { useRouteError, useNavigate, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
export default function ErrorPage() {
  const error = useRouteError();
  let navigate = useNavigate()
  let [counter, SetCounter] = useState<number>(30)




  useEffect(() => {
    setTimeout(() => {
      SetCounter(counter = counter - 1)
      if (counter === 0)
        navigate("/")
    })
  }, [])


  return (
    <div className="w-[90%] rounded-lg flex-col items-center m-auto gap-5 h-screen flex justify-center bg-background ">
      <h1 className="text-red-500 font-medium text-4xl">Oops!</h1>
      <p className="text-blue-700">  Sorry, an unexpected error has occurred.</p>
      <h1 className="text-red-700 text-6xl">{error.status}</h1>
      <i className="text-green-700 text-xl ">{error.statusText || error.message}</i>
      <p  >Back to Home in:<i className="text-red-700 text-xl">{counter}</i>secs</p>
      <NavLink to="/">Go Now</NavLink>
    </div>
  );
}
