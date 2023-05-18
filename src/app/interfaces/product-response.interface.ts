import { Product } from "./product.interface"
/* import { Producto } from "./productito.interface" */

export interface ProductResponse{
    metadata : [
        {
            type : string,
            code: string,
            date : string
        }
    ],
    productResponse : {
        product : Product[]
    }
}