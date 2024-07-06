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
    firstName: String;
    lastName: String;
    userName: String;
    profilePic: string;
  };
  inStock: number;
  createdAt: Date;
  updatedAt: Date;
}
