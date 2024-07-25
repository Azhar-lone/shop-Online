// import React, { useState } from 'react'

// // icons
// import { Edit2 } from "lucide-react"

// // Components
// import { Button } from "@/components/ui/button"
// import {
//     Tabs,
//     TabsContent,
//     TabsList,
//     TabsTrigger,
// } from "@/components/ui/tabs"
// // importing subComponents
// import Container from '../components/container'
// // Types
// import { ObjectString } from '../../../types/General'


// const General = () => {
//     const [countries, setCountries] = useState<Array<ObjectString>>(countries1)
//     const [catogaries, setCatogaries] = useState<Array<ObjectString>>()

//     return (
//         <Container
//             className='flex flex-col items-center gap-8 md:p-6 p-2'
//         >

//             <Tabs defaultValue="Countries"
//                 className='flex flex-col bg-background shadow-2xl md:w-[80%] w-[100%] items-center p-4 border rounded-xl gap-5'

//             >
//                 <div className="flex items-center">
//                     <TabsList>
//                         <TabsTrigger value="Countries">Countries</TabsTrigger>
//                         <TabsTrigger value="Categories">Categories</TabsTrigger>
//                     </TabsList>
//                     <div className="ml-auto flex items-center gap-2">

//                         <Button
//                             size="sm"
//                             variant="outline"
//                             className="h-7 gap-1 text-sm"
//                         >
//                         </Button>
//                     </div>
//                 </div>
//                 <TabsContent value="Countries"
//                     className='flex gap-5 w-[100%]  items-center flex-col'
//                 >
//                     <div
//                         className='flex gap-5 w-[100%]  items-center'
//                     >
//                         <input type="text" placeholder='Enter country to include ...' className='p-6' />
//                         <Button>Add</Button>
//                     </div>

//                     {countries.map((value, i) => (
//                         <div className='flex gap-5 w-[100%]  items-center' key={i}>
//                             {/* <input type="text" placeholder='Enter country to include ...' className='p-6' /> */}
//                             <h3 className='w-[70%] p-3 bg-muted'>{value.value}</h3>
//                             <Button>Remove</Button>
//                             <Button>Edit <Edit2 /> </Button>
//                         </div>
//                     ))}

//                 </TabsContent>
//             </Tabs>

//         </Container>
//     )
// }

// export default General

// let countries1: ObjectString[] = [
//     {
//         value: "pakistan"
//     },
//     {
//         value: "pakistan"
//     }, {
//         value: "pakistan"
//     }, {
//         value: "pakistan"
//     }, {
//         value: "pakistan"
//     }, {
//         value: "pakistan"
//     },

// ]