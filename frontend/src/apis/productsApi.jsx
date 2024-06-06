import axios from "axios";
import { API_URL } from "../utils/constants";

export const getProduct= async (id)=>{
    console.log(id,"👿")
    // let  productId="660d207552c6376d66e3a257"
    // for test productId🔽
    // let  productId="65eed1f45c4135f673a102dc" 
    
    
    
    const res=await axios.get(`${API_URL}/api/v1/product/${id}`,{
        withCredentials:true
    })
    return res;
}