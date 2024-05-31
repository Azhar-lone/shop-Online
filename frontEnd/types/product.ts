


export default interface productType {
    name: String;
    discription?: String;
    category: String;
    price: Number;
    owner?: String;
    likes?: String[];
    inStock?: Number;
    imgs: string[];
}
export interface CategorizedProducts {
    category: string,
    products: productType[]
}