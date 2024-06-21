

import React, { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"


// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

// custom components
import Container from "@/components/myUi/Container"

// Context
import useUser from "@/components/context/user-provider"

const CartPage: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const navigate = useNavigate()
  const { cart } = useUser()
  useEffect(() => {
    CalculateTatalPrice()
  }, [])
  function CalculateTatalPrice() {
    cart.forEach((cartItem) => {
      return setTotalPrice((prev) => (
        cartItem.price + prev
      ))
    })
  }


  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden md:table-cell">
              Picture
            </TableHead>
            <TableHead className=" md:table-cell">
              Inclusion Date
            </TableHead>
            <TableHead className=" md:table-cell">
              Price
            </TableHead>
            <TableHead className=" md:table-cell">
              Remove
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>


          {cart.map((cartItem, i: number) => (
            <TableRow key={i} onClick={() => navigate(`/products/${cartItem._id}`)}>
              <TableCell >
                {cartItem.name}
              </TableCell>
              <TableCell
                className='md:table-cell w-[10%]  hidden h-10'

              >
                <img src={cartItem.img[0]} alt=""
                />
              </TableCell>
              <TableCell>
                {cartItem.AddedOn.toLocaleString()}
              </TableCell>
              <TableCell>
                <>
                  {"$"}{cartItem.price}
                </>
              </TableCell>
              <TableCell>
                <Button variant={"destructive"} >
                  remove
                </Button>
              </TableCell>
            </TableRow>
          ))}






        </TableBody>
      </Table>
      <div className="mt-5  border p-10 bg-background rounded md-w-[56%] md:ml-[40%] flex flex-col gap-5 ">
        <h3 className="font-bold text-3xl ">Cart Summary</h3>
        <h1 className="text-2xl">Total Items: {cart.length}</h1>
        <h1 className="text-2xl">Total Price: {"$"}{totalPrice}</h1>
      </div>

    </Container>
  )
}

export default CartPage