import React from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
// import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
// custom components
import Container from "@/components/myUi/Container"

// Static data
import { products } from "/StaticData/productData"

let table = [

]

const CartPage = () => {
  return (
    <Container>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead className="hidden sm:table-cell">
              Picture
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Date
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Price
            </TableHead>
            <TableHead className="hidden md:table-cell">
              Remove
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>











          {/* <TableRow>
            <TableCell>
              Iphone 12 pro
            </TableCell>
            <TableCell>
              <img src={products[0].imgs[0]} alt=""
                className='w-[20%] h-[10vh]'
              />
            </TableCell>
            <TableCell>
              12-20-2024
            </TableCell>
            <TableCell>
              $200
            </TableCell>
            <TableCell>
              <Button>
                remove
              </Button>
            </TableCell>
          </TableRow>

          <TableRow>
            <TableCell>
              one
            </TableCell>
            <TableCell>
              tets
            </TableCell>

          </TableRow> */}

        </TableBody>
      </Table>

    </Container>
  )
}

export default CartPage