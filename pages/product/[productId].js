import ProductDetail from "@/components/product/product-detail"
import { ProductContext } from "../../store/products-context";
import { useContext} from "react";
function DetailedProduct (){
    const store = useContext(ProductContext);
    const prt = store.products[0];
   
return(<ProductDetail props={prt}/>)

}


export default DetailedProduct