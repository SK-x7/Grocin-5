import { useQuery } from "@tanstack/react-query"
import {  isUserLoggedIn } from "../apis/userApi"
export function useUser() {
    const{isLoading,data,error,isFetching,}=useQuery({
        queryKey:["isUserLoggedIn"],
        queryFn:isUserLoggedIn,
    })
    // console.log(data);
    // console.log(data.data);
    // const value=data.data;
// FIXME - query invalidate    
    // console.log(error)
    const currentUserId=data?.data?.data?.currentUserId;
    let value="";
    if(isLoading===false&&isFetching===false&&(data?.data?.status==="success")&&(data?.data?.loggedIN===true)) {
    value=true;
    }
    if(error) value=false;
    return {isLoading,isFetching,error,data,value,currentUserId};
}


