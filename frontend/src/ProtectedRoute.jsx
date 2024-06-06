import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useUser } from "./hooks/useUser"

function ProtectedRoute({children}) {
    // get user
    const navigate=useNavigate();
    let isAuthenticated = false;
    const {isLoading,data,isFetching}=useUser();
    console.log(data);
    if(data===undefined)  isAuthenticated=false;
    if(!isLoading&&(isFetching===false)&&data)
      isAuthenticated=true;
    
    // show spinner if is loading
    // console.log(data.data);
    useEffect(() => {
      if(!isLoading&&(isFetching===false)&&data===null){
        navigate("/login");
      }
    
      return () => {
        
      }
    }, [isLoading,isAuthenticated,isFetching,navigate]);
    
    ''
    //ANCHOR - find a way to set isauthenticated in server
    if(isAuthenticated) return children;
}

export default ProtectedRoute




