import axios from "axios";
import { API_URL } from "../utils/constants";

export const getCategories= async ()=>{
    
    const res=await axios.get(`${API_URL}/api/v1/category`,{
        withCredentials:true
    })
    return res;
}

export const getSubCategory= async (id)=>{
    
    const res=await axios.get(`${API_URL}/api/v1/subcategory/${id}`,{
        withCredentials:true
    })
    console.log(res.data.data.subCategory.products);
    const products=res?.data?.data?.subCategory?.products
    console.log("............................//////////////////...................")
    return products;
}