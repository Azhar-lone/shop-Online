export default interface User {
  userName: string;
  firstName: string;
  lastName: string;
  profilePic: string;
  _id: string;
}

export interface UserFull extends User {
  createdAt: Date;
  products: string[];
  cartItems: string[];
  followers: string[];
  following: string[];
  role: string;
  country: string;
}

export interface CartType {
  name: string;
  img: [string];
  price: number;
  createdAt: Date;
  _id: string;
}
