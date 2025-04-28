import axios from "axios";
import { API_URL } from "../utils/constants";

export const isUserLoggedIn =async function () {
    // const {userEmail}= useAuth();
    const res=await axios.get(`${API_URL}/api/v1/users/isloggedin`,{
        withCredentials:true
    })
    // console.log(res.data);
    // const x=res.data
    // if(res===undefined) return false;
    return res;
}

export const signUser = async function (params) {
    console.log(params);
    let obj={};
    obj.name=params.username
    obj.email=params.emailId
    obj.password=params.password
    obj.passwordConfirm=params.passwordConfirm
    const res=await axios.post(`${API_URL}/api/v1/users/signup`,obj,{
        withCredentials:true
    })
    
    return res;
}

export const updateUser = async function (params){
    console.log(params);
    let obj={};
    obj.name=params.username;
    obj.email=params.emailId;
    const res=await axios.patch(`${API_URL}/api/v1/users/updateMe`,obj,{
        withCredentials:true
    })
    
    return res;
}

export const changeCredentials = async function (obj) {
    
    console.log(obj);
    // console.log(params);
    // let obj={};
    // obj.name=params.username
    // obj.email=params.emailId
    // obj.password=params.password
    // obj.passwordConfirm=params.passwordConfirm
    const res=await axios.patch(`${API_URL}/api/v1/users/updateMyPassword`,obj,{
        withCredentials:true
    })
    
    return res;
}


export const checkDuplicateEmail=async function (params) {
    console.log(params);
    const res=await axios.post(`${API_URL}/api/v1/users/checkDuplicateEmail`,{
        email:params.emailId
    },{
        withCredentials:true
    })
    
    return res;
}

export const forgotPassword = async function (params) {
    console.log(params);
    const res = await axios.post(`${API_URL}/api/v1/users/forgotPassword`,{
        email:params.emailId
    },{
        withCredentials:true
    })
    return res;
}

export const resetPassword=async function (params){
    console.log(params);
    let token=params.token;
    // console.log(token);
    const res = await axios.patch(`${API_URL}/api/v1/users/resetPassword/${token}`,params,{
        withCredentials:true
    })
    return res;
}
export const logoutUser=async function (){
    // console.log(params);
    // let token=params.token;
    // console.log(token);
    console.log("✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅✅✅✅🔴🔴🔴🔴✅✅✅✅")
    const res = await axios.post(`${API_URL}/api/v1/users/logout`,{},{
        withCredentials:true
    })
    console.log(res?.data);
    return res;
}

export const getUserSavedAddresses = async function (userId){
    console.log(userId);
    const res=await axios.get(`${API_URL}/api/v1/users/${userId}/getSavedAddresses`,{
        withCredentials:true
    })
    
    const data=res?.data?.data;
    return data;
}

export const updateUserSavedAddresses = async function (obj){
    const{userId,addresses,action}=obj;
    // console.log(userId,addresses,action);
    const res=await axios.patch(`${API_URL}/api/v1/users/${userId}/updateSavedAddresses/${action}`,{addresses},{
        withCredentials:true
    })
    
    // console.log(res,"(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)")
    const data=res?.data;
    console.log(data)
    return data;
}

export const test = async function (obj){
    console.log(obj);
    const res=await axios.get(`${API_URL}/api/v1/users/hello`,{
        withCredentials:true
    })
    
    console.log(res,"(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)")
}


export const editUserSavedAddresses = async function (obj){
    const{userId,editedAddressData}=obj;
    
    // console.log(userId,addresses,action);
    const res=await axios.patch(`${API_URL}/api/v1/users/${userId}/editSavedAddresses`,editedAddressData,{
        withCredentials:true
    })
    
    // console.log(res,"(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)")
    const data=res?.data;
    console.log(data)
    return data;
}


export const deleteUserSavedAddresses = async function (obj){
    const{userId,addressId}=obj;
    
    // console.log(userId,addresses,action);
    const res=await axios.patch(`${API_URL}/api/v1/users/${userId}/deleteSavedAddresses`,{addressId},{
        withCredentials:true
    })
    
    // console.log(res,"(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)(❁´◡`❁)")
    const data=res?.data;
    console.log(data)
    return data;
}

