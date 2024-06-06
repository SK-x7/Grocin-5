import { useEffect } from "react";
import { useAuth } from "../../AuthContext"
import axios from "axios";
import { API_URL } from "../../utils/constants";
import { toast } from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import { signUser } from "../../apis/userApi";
function VerificationScreen() {
  
  
  const {mutate}=useMutation({
    mutationFn:signUser,
    onSuccess:(data)=>{
      console.log(data);
    },onError:(error)=>{
      console.log(error.response.data);
    }
  })
  
  const {otp,clearId,timeLeft,setTimeLeft,minutes,setMinutes,seconds,setSeconds,countDown,handleOtpChange,handleKeyChange,sendOtpToUser,signupFormData}=useAuth();
    
    // useEffect(()=>{startCountdown()},);
    // const [otp,setOtp]=useState(new Array(6).fill(""));
    // const [timer,setTimer]=useState(false);
    // const [clearId,setClearId]=useState();
    // const[timeLeft,setTimeLeft]=useState(true);
    // const[minutes,setMinutes]=useState(0);
    // const[seconds,setSeconds]=useState(0);
  
  const verifyOtp=async ()=>{
    
    if(timeLeft===false){
      toast.error("Verification-session, Timeout",{duration:1000});
      setTimeout(()=>{
        toast("Click on resend code and try again",{
          icon:"⚠️",
          duration: 1700,
        })
      },1000)
      return;
    }
    const x=otp.join("")
    const res=await axios.post(`${API_URL}/api/v1/users/verifyOtpEmail`,{
      otpToken:x,
    },{
      withCredentials:true,
    });
    
    console.log(res);
    
    if(res.data.status==='success'&&res.data.message==='Timed-out'){
      toast.error("Verification-session, Timeout",{
        duration:2000,
      });
      setTimeout(() => {
        toast('Click on resend code and try again', {
          icon: '⚠️',
          duration:1800,
          
        });
      }, 2000);
    }
    
    if(res.data.status==='success'&&res.data.message==="incorrect otp"){
      toast.error("incorrect otp",{
        duration: 1600,
      });
      setTimeout(() => {
        toast('Click on resend code and try again', {
          icon: '⚠️',
          duration:1800,
          
        });
      }, 1500);
    }
    
    if(res.data.status==='success'&&res.data.message==="otp verified"){
      toast.success("Otp verified",{
        duration:200,
      })
      //ANCHOR - 
      mutate(signupFormData);
    }
    
    
  }
    
  
  useEffect(()=>{
    if(minutes<0&&seconds<0){
      clearInterval(clearId);
      setMinutes(0);
      setSeconds(0);
      setTimeLeft(false);
    }
  },[minutes,seconds,clearId,setMinutes,setSeconds,setTimeLeft])
    
  // const updateCountdown=(deadline)=>{
  //   console.log("y");
  //   const currentTime = new Date();
  //   const timeDifference = deadline-currentTime;
    
  //   let sec=Math.floor(timeDifference/1000)%60;
  //   setSeconds(sec);
  //   let min=Math.floor(timeDifference/1000/60)%60;
  //   setMinutes(min);
  // }
  
  // const countDown = (targetTime)=>{
  //   console.log("x");
  // let x=setInterval(()=>updateCountdown(targetTime),1000)
  // setClearId(x);
  // return;
  // }
    
    

    
    
    

      
      

    
    // const handleChange=(e,index)=>{
    //     const newArray = [...otp];
    //     newArray[index]=e.target.value;
    //     setOtp(newArray);
    // }
    
    
    

      
    // const handleKeyChange=(e,index)=>{
    //     // e.preventDefault();
    //     // handleChange(e,index);
    //     if (e.key === "Backspace") {
    //         handleChange(e,index);
    //         if(e.target.value===""){
                
    //             if(e.target.previousSibling){
    //                     e.target.previousSibling.focus();
    //             }else{
    //                 e.target.value=""
    //                 handleChange(e,index);
    //             }
    //         }
        
    //     }else{
    //         if(e.target.value){
    //             console.log(index,e.target.value)
    //             // console.log(e.target.value)
    //             handleChange(e,index);
    //             // handleOtherKey(e,index);
    //             if(e.target.nextSibling){
    //                 e.target.nextSibling.focus();
                    
    //             }
    //         }
    //     }
    //   }
      
      // const handleSubmit=(e)=>{
      //   e.preventDefault();
        
        
      //   console.log(otp.join(""));
      // }
    return (
        <div className="min-h-screen h-screen w-screen bg-indigo-200 flex flex-grow-0 flex-wrap place-content-center box-border overflow-hidden">
        <div className="h-4/5 w-10/12 flex flex-col flex-shrink-0 flex-wrap ">
          <div className="md:w-3/5 h-full sm:w-1/2">
            <img
              alt="loginImage"
              src="https://mir-s3-cdn-cf.behance.net/projects/max_808/eb054f99517327.Y3JvcCw1MzI3LDQxNjcsNDYxLDA.jpg"
              className="object-cover h-full w-full min-h-full"
            ></img>
          </div>
          {/* form container */}
  
          {/* SECTION */}
          <div className="md:w-2/5 h-full flex flex-col justify-evenly gap-4  items-center bg-blue-100 box-border sm:w-1/2" >
            <h1 className="text-3xl">Email Verification</h1>
            {/* //FIXME -  */}
            <div className="flex flex-col gap-1 justify-evenly items-center min-w-min w-2/3 ">
              
            {/* //FIXME -  */}
            <div className="flex flex-col w-full  justify-center items-center gap-1">
              
            <div className="w-1/5  rounded-3xl"><img alt="mail image" src="https://cdn.pixabay.com/photo/2016/06/13/17/30/mail-1454731_960_720.png" className="w-full h-full"/></div>
            <h1 className="text-xl">Verify your email</h1>
            </div>
            
            {/* //FIXME -  */}
          <div className="flex flex-col justify-evenly items-center w-10/12 ">
            
            <h1 className="text-xs">An 6-digit code has been</h1>
            <h1 className="text-xs">sent to your email address</h1>
          </div>
            </div>
            <form
              onSubmit={(e)=>{e.preventDefault();verifyOtp()}}
              className="flex flex-col gap-6 justify-center items-center min-w-2/2 w-2/3 py-2  sm:w-5/6"
            >
            {/* //FIXME -  */}
            <div className="  flex flex-row justify-center gap-0  items-center  md:w-5/6 sm:gap-0 sm:justify-between sm:w-full">
                
            
            {otp.map((data,i)=>{
                return <input type="text" required className="w-11 sm:w-9 rounded-lg" maxLength={1} value={data} onKeyDown={(e)=>handleKeyChange(e,i)} key={i} onChange={(e)=>handleOtpChange(e,i)}/>
            })}
            </div>
            
            <div className="flex flex-col justify-center items-start md:w-5/6 sm:w-full ">
                {/* //FIXME -  */}
                
              
                
            {timeLeft?<li className="text-base sm:text-sm">The otp will be expire in <span  className="text-indigo-500 text-base sm:text-sm">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span></li>:<li className="text-red-500 text-base sm:text-sm">Time-out, click resend.</li>}
            {/* {!timeOut &&             <li>The otp will be expire in <span className="text-indigo-500">{String(minutes).padStart(2, '0')}:{String(seconds).padStart(2, '0')}</span></li>}
            {timeOut&&<li>Time-out</li>} */}
                

            <li className="text-base sm:text-sm">Didnot recieve the code? <a href="" onClick={(e)=>{e.preventDefault();setTimeLeft(true);const currentDate=new Date();const newDate = new Date(currentDate.getTime() + 65000);sendOtpToUser();
countDown(newDate)}} className="text-indigo-500 text-base sm:text-sm">Resend code</a></li>
            
            </div>
              <button
                className="border-blue-300 border-solid border h-10 w-2/3 text-center align-middle rounded-lg bg-indigo-400 ring-3 hover:ring-3 hover:ring-sky-300 ring-gray-900  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50 text-xl sm:text-base"
                type="submit" 
              >
                Verify code
              </button>
            
              {/* !SECTION */}
            <div className="w-2/3 h-min  flex flex-row gap-0 rounded-lg justify-center items-center ">
            </div>
            </form>
          {/* <div></div> */}
            <div className="w-2/3 h-min  flex flex-row gap-0 rounded-lg justify-center items-center justify-self-end ">
          <span className="text-sm">project logo<span className="text-indigo-500 text-sm"> ©️2024</span></span>
            </div>
          </div>
        </div>
      </div>
    )
}

export default VerificationScreen
