import axios from "axios";
import { API_URL } from "../utils/constants";

export const getCategories= async ()=>{
    
    const res=await axios.get(`${API_URL}/api/v1/category`,{
        withCredentials:true
    })
    return res;
}

export const getCategory= async (categoryId)=>{
    
    const res=await axios.get(`${API_URL}/api/v1/category/${categoryId}`,{
        withCredentials:true
    })
    return res;
}