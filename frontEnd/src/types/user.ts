export default interface User {
    userName: string;
    firstName: string;
    lastName: string;
    country: string;
    profilePic: string;
    timeStamp: string;
    products: string[];
    cartItems: string[];
    followers: string[],
    following: string[]
    role: string
    _id: string
}

export interface CartType {
    name: string,
    img: [string]
    price: number
    AddedOn: Date
    _id: string
}