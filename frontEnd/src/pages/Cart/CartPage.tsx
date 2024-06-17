

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

// Static data
import { products } from "../../../StaticData/productData"

const CartPage: React.FC = () => {
  const [totalPrice, setTotalPrice] = useState<number>(0)
  const navigate = useNavigate()

  useEffect(() => {
    CalculateTatalPrice()
  }, [])
  function CalculateTatalPrice() {
    products.forEach((product) => {
      return setTotalPrice((prev) => (
        product.price + prev
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


          {products.map((product, i: number) => (
            <TableRow key={i} onClick={() => navigate(`/products/${product._id}`)}>
              <TableCell >
                {product.name}
              </TableCell>
              <TableCell
                className='md:table-cell w-[10%]  hidden h-10'

              >
                <img src={product.imgs[0]} alt=""
                />
              </TableCell>
              <TableCell>
                12-20-2024
              </TableCell>
              <TableCell>
                <>
                  {"$"}{product.price}
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
        <h1 className="text-2xl">Total Items: {products.length}</h1>
        <h1 className="text-2xl">Total Price: {"$"}{totalPrice}</h1>
      </div>

    </Container>
  )
}

export default CartPage