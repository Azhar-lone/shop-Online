

export interface productCardType {
    name: String
    price: number,
    images: string[],
    _id: String,
    likes: number
}


export default interface productType extends productCardType {
    discription: String;
    category: String;
    owner: {
        firstName: String,
        lastName: String,
        userName: String,
        profilePic: string
    };
    inStock: Number;
}
