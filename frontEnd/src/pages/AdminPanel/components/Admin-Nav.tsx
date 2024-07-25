// // importing dependencies
// import React from "react";
// import { BarChart4, Boxes, LayoutDashboard } from "lucide-react";

// // importing Shadcn Components
// import { Button } from "@/components/ui/button";
// import { NavLink } from "react-router-dom";
// // import { Skeleton } from "@/components/ui/skeleton";

// //My components
// import { ModeToggle } from "@/components/myUi/mode-toggle";
// import ProfileButton from "../../Profile/ProfileButton";
// import Hint from "@/components/myUi/Hint";
// import Slider from "@/components/myUi/Slider";
// import { SideBar, TopBar } from "@/components/myUi/NavComponents";
// import FullSearch from "@/pages/general/WebComponets/FullSearch";

// // context

// // types

// interface navItemsType {
//   To: string;
//   Text: string;
//   Icon: React.ReactNode;
// }

// const navItems: navItemsType[] = [
//   {
//     To: "/admin",
//     Text: "Stats",
//     Icon: <BarChart4 />,
//   },
//   {
//     To: "/products",
//     Text: "Products",
//     Icon: <Boxes />,
//   },
// ];

// const AdminNav: React.FC = () => {
//   return (
//     <>
//       <TopBar>
//         <div className="flex justify-around items-center gap-2  sm:h-[100%] ">
//           <div className="flex gap-5">
//             <Button className="flex gap-1">
//               <LayoutDashboard />
//               <h1 className="hidden sm:block">DashBoard</h1>
//             </Button>
//             <FullSearch />
//           </div>

//           <ul className=" lg:flex hidden justify-around gap-5">
//             {navItems.map((element, index) => (
//               <NavLink
//                 className="flex gap-2 items-center    hover:pb-2 "
//                 key={index}
//                 to={element.To}
//               >
//                 {element.Icon}

//                 {element.Text}
//               </NavLink>
//             ))}
//           </ul>

//           <Hint label={"Change Theme"}>
//             <ModeToggle />
//           </Hint>

//           <ProfileButton />
//           <div className="flex gap-2 ">
//             <ModeToggle />

//             <Button variant={"ghost"} className="flex gap-1">
//               <NavLink to={"/login"}>Login</NavLink>
//             </Button>
//             <Button
//               // variant={"ghost"}
//               className="flex gap-1"
//             >
//               <NavLink to={"/signup"}>Signup</NavLink>
//             </Button>
//           </div>

//           <Slider side="right">
//             <div className="flex items-center flex-col gap-5">
//               {navItems.map((element, index) => (
//                 <NavLink
//                   className="flex gap-2 items-center    hover:pb-2 "
//                   key={index}
//                   to={element.To}
//                 >
//                   {element.Icon}

//                   {element.Text}
//                 </NavLink>
//               ))}
//             </div>
//           </Slider>
//         </div>
//       </TopBar>

//       <SideBar>
//         <ul className=" flex  flex-col justify-start gap-5  p-8">
//           {navItems.map((element, index) => (
//             <Hint label={element.Text} key={index}>
//               <NavLink
//                 className="flex flex-col gap-2 items-center   hover:border-b-4 border-primary hover:pt-2  "
//                 to={element.To}
//               >
//                 {element.Icon}
//               </NavLink>
//             </Hint>
//           ))}
//         </ul>
//       </SideBar>
//     </>
//   );
// };

// export default AdminNav;
