
import { Category } from "./category.interface"

export interface CategoryResponse{
    metadata : [
        {
            type : string,
            code: string,
            date : string
        }
    ],
    categoryResponse : {
        category : Category[]
    }
}
