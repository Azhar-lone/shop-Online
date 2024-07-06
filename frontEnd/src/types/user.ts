export default interface User {
  userName: string;
  firstName: string;
  lastName: string;
  country: string;
  profilePic: string;
  products: string[];
  cartItems: string[];
  followers: string[];
  following: string[];
  role: string;
  _id: string;
  createdAt: Date;
}

export interface CartType {
  name: string;
  img: [string];
  price: number;
  createdAt: Date;
  _id: string;
}
