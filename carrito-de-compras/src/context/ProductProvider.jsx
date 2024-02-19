import { data } from "../data"
import { ProductContext } from "./ProductContext"
import { useState } from "react";


export const ProductProvider = ({children}) => {
  const [selectedProduct, setSelectedProduct] = useState(null);
  return (
    <ProductContext.Provider value={{data,selectedProduct,setSelectedProduct}}>{children}</ProductContext.Provider>
    
  )
}
