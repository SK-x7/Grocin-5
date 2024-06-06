/* eslint-disable react/prop-types */ 
import { useContext,createContext,useState} from "react";
import axios from "axios";
import { API_URL } from "./utils/constants";
import { toast } from "react-hot-toast";
import { checkDuplicateEmail, forgotPassword} from "./apis/userApi";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

function AuthProvider({children}) {
  const navigate=useNavigate();
  
  
  const {mutate:checkEmail}=useMutation({
    mutationFn:checkDuplicateEmail,
    onSuccess:(data)=>{
      console.log(data);
      if(data?.data?.status==='fail'&&isResettingPassword===false){
        toast.error('There is already an registered user with this email',{
          duration:3000,
        });
        setTimeout(() => {
          toast('Please try different email!', {
            icon: '⚠️',
          });
        }, 3000);
      }else if(data?.data?.status==='success'&&isResettingPassword===false){
              navigate("/signup/mail-verification");
      setTimeLeft(true);
      const currentDate=new Date();const newDate =      new Date(currentDate.getTime() + 65000);
      sendOtpToUser();
      countDown(newDate);
      }else if(data?.data?.status==='success'&&isResettingPassword===true){
        const msg ="there is no user with this email address";
        console.log(msg);
        toast.error(`${msg}`,{
          duration:3000,
        });
        setTimeout(() => {
          toast('Please try different email!', {
            icon: '⚠️',
          });
        }, 3000);
      }else if(data?.data?.status==='fail'&&isResettingPassword===true){
        console.log(data,"🟣🟣");
        sendResetToken(loginFormData);
      }
    },onError:(error)=>{
      console.log(error);
      const msg =error.response.data.message;
      console.log(msg);
      toast.error(`${msg}`,{
        duration:3000,
      });
      setTimeout(() => {
        toast('Please try different email!', {
          icon: '⚠️',
        });
      }, 3000);
      
    }
  })
  
  const {mutate:sendResetToken}=useMutation({
    mutationFn:forgotPassword,
    onSuccess:(data)=>{
      console.log("🥲");
      const msg=data.data.message;
      toast.success(`${msg}`);
      setTimeout(()=>{
        toast('The has Reset Token has been sent to your email . Hurry up 🏃 reset token is only valid for 10 minutes. ',{
          icon:"⌛",
          duration:40000
        })
        // toast.custom((t) => (
        //   <div
        //     className={`${
        //       t.visible ? 'animate-enter' : 'animate-leave'
        //     } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
        //   >
        //     <div className="flex-1 w-0 p-4">
        //       <p className="w-full">The <b>Reset Token </b>has been sent to your email . Hurry up 🏃 reset token is only valid for <b>10 minutes</b>. </p>
        //     </div>
        //     <div className="flex border-l border-gray-200">
        //       <button
        //         onClick={() => {toast.dismiss(t.id)}}
        //         className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //       >
        //         Close
        //       </button>
        //     </div>
        //   </div>
        // ))
      },4000)

      setIsResettingPasswoord(false);
    },onError:(error)=>{
      console.log(error);
      const msg =error.response.data.message;
      console.log(msg);
      toast.error(`${msg}`,{
        duration:3000,
      });
      setTimeout(() => {
        toast('Please try different email!', {
          icon: '⚠️',
        });
      }, 3000);
    }
  })
  
  
  
  
  
  const [isResettingPassword,setIsResettingPasswoord]=useState(false);
  const [isAuthenticated,setIsAuthenticated]=useState(false);
  
  const [userEmail,setUserEmail]=useState("");
  
    const [signupFormData,setSignupFormData]=useState({
        username:'',
        emailId:'',
        password:'',
        passwordConfirm:'',
      })
      
      const handleSignupChange=(e)=>{
        e.preventDefault();
        console.log(e.target);
        const {name,value}=e.target;
        setSignupFormData({
          ...signupFormData,[name]:value 
        })
      }
    
      
      const handleSignupSubmit=(e)=>{
        e.preventDefault();
        // const navigate=useNavigate();
        console.log(signupFormData);
        // navigate("/signup/mail-verification")
      }
      
      
    
    const [loginFormData,setLoginFormData]=useState({
        emailId:'',
        password:'',
      })
      
      
      const handleLoginChange=(e)=>{
        e.preventDefault();
        console.log(e.target);
        const {name,value}=e.target;
        setLoginFormData({
          ...loginFormData,[name]:value 
        })
      }
      
      const handleLoginSubmit=(e)=>{
        e.preventDefault();
        console.log(loginFormData);
      }
    
      
      const [updateUserData,setUpdateUserData]=useState({
        username:'',
        emailId:'',
      })
      
      
      const handleUpdateUserDataChange=(e)=>{
        e.preventDefault();
        console.log(e.target);
        const {name,value}=e.target;
        setUpdateUserData({
          ...updateUserData,[name]:value 
        })
      }
      
      const [credentialsChangeFormData,setCredentialsChangeFormData]=useState({
        passwordCurrent:'',
        password:'',
        passwordConfirm:'',
      })
      
      
      const handleCredentialsFormDataChange=(e)=>{
        e.preventDefault();
        console.log(e.target);
        const {name,value}=e.target;
        setCredentialsChangeFormData({
          ...credentialsChangeFormData,[name]:value 
        })
      }
      
      
      
      const [otp,setOtp]=useState(new Array(6).fill(""));
      const [clearId,setClearId]=useState();
      const[timeLeft,setTimeLeft]=useState(false);
      const[minutes,setMinutes]=useState(0);
      const[seconds,setSeconds]=useState(0);
      
    const updateCountdown=(deadline)=>{
        clearInterval(clearId);
        console.log("y");
        const currentTime = new Date();
        const timeDifference = deadline-currentTime;
        
        let sec=Math.floor(timeDifference/1000)%60;
        setSeconds(sec);
        let min=Math.floor(timeDifference/1000/60)%60;
        setMinutes(min);
    }
    
    
    
    const countDown = (targetTime)=>{
        console.log("x");
      let x=setInterval(()=>updateCountdown(targetTime),1000)
      setClearId(x);
      return;
    }
    
    const handleOtpChange=(e,index)=>{
        const newArray = [...otp];
        newArray[index]=e.target.value;
        setOtp(newArray);
    }
    
    
    const handleKeyChange=(e,index)=>{
        // e.preventDefault();
        // handleChange(e,index);
        if (e.key === "Backspace") {
            handleOtpChange(e,index);
            if(e.target.value===""){
                
                if(e.target.previousSibling){
                        e.target.previousSibling.focus();
                }else{
                    e.target.value=""
                    handleOtpChange(e,index);
                }
            }
        
        }else{
            if(e.target.value){
                console.log(index,e.target.value)
                // console.log(e.target.value)
                handleOtpChange(e,index);
                // handleOtherKey(e,index);
                if(e.target.nextSibling){
                    e.target.nextSibling.focus();
                    
                }
            }
        }
      }
    
    
      
    const handleOtpSubmit=(e)=>{
        e.preventDefault();
        console.log(otp.join(""));
        return;
      }
      
      const sendOtpToUser=async () =>{
        const res=await axios.post(`${API_URL}/api/v1/users/sendOtpEmail`,{
          email:signupFormData.emailId,
          userName:signupFormData.username
        });
        console.log(res);

      }
      const [windowWidth, setWindowWidth] = useState(window.innerWidth);
      const [stripeCheckoutSessionId,setStripeCheckoutSessionId]=useState(null);
      
    const value ={
        signupFormData,
        setSignupFormData,
        handleSignupChange,
        handleSignupSubmit,
        loginFormData,
        setLoginFormData,
        handleLoginChange,
        handleLoginSubmit,
        updateUserData,
        setUpdateUserData,
        handleUpdateUserDataChange,
        credentialsChangeFormData,
        setCredentialsChangeFormData,
        handleCredentialsFormDataChange,
otp,setOtp,clearId,setClearId,timeLeft,setTimeLeft,minutes,setMinutes,seconds,setSeconds,handleKeyChange,handleOtpChange,handleOtpSubmit,countDown,sendOtpToUser,isAuthenticated,setIsAuthenticated,setUserEmail,userEmail,checkEmail,isResettingPassword,setIsResettingPasswoord,sendResetToken,windowWidth, setWindowWidth,stripeCheckoutSessionId,setStripeCheckoutSessionId}

    return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

function useAuth() {
    const context = useContext(AuthContext);
    if(context===undefined){
        throw new Error("AuthContext was used outside of the auth provider");
    }
    return context;
}

export { AuthProvider,useAuth};