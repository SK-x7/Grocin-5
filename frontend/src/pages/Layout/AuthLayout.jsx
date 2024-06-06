import { Outlet} from "react-router-dom"
import { useNavigate} from "react-router-dom"
import { useUser } from "../../hooks/useUser";


function AuthLayout() {
    const navigate = useNavigate();
    // let isAuthenticated = false;
    const {value,isLoading,isFetching}=useUser();
    console.log(value,isLoading,isFetching);
    if(value&&isFetching===false&&isLoading===false)   navigate("/home");
    // if((isLoading===false)&&(isFetching===false)){
    //     console.log("x");
    //     // let status=value.data.status
    //     // let loggedIn=value.data.loggedIN
    //     // console.log(status,"⬇️");
    //     // console.log(loggedIn,"⬆️")
    //     if((value.data.status==="success")&&(value.data.loggedIN===true)){
    //         isAuthenticated=true;
    //         if(isAuthenticated===true)  navigate("/home");
    //     }
        
    // }
    
    
    // console.log(value.data.status);
    // isAuthenticated=
    // console.log(isAuthenticated);
    // const navigate=useNavigate();
    // if(data!==undefined) {
    //     // navigate("/login");
    //     navigate("/home");
    // }
    // if(isAuthenticated)    navigate("/home");
    // console.log(error);
  
    return (
        <div>
            <Outlet></Outlet>
        </div>
    )
}

export default AuthLayout
