export interface productCardType {
  name: String;
  price: number;
  images: string[];
  _id: String;
  likes: number;
  category: String;
}

export default interface productType extends productCardType {
  discription: String;
  owner: {
    firstName: string;
    lastName: string;
    userName: string;
    profilePic: string;
    _id: string;
  };
  inStock: number;
  createdAt: Date;
  updatedAt: Date;
}
