

export interface productCardType {
    name: String
    price: number,
    imgs: string[],
    _id: String,
    likes: number
}


export default interface productType extends productCardType {
    discription: String;
    category: String;
    owner: {
        name: String,
        userName: String,
        profilePic: string
    };
    inStock: Number;
}
