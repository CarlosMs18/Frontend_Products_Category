import { Category} from "./category.interface";

export interface Product{
    id? : number,
    nombre: string,
    price : number,
    account : number,
    category: Category,
}
