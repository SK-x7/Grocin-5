
import { toast } from "react-hot-toast";
import { NavLink } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { checkDuplicateEmail } from "../../apis/userApi";

function Signup() {
    const navigate = useNavigate();

  const {mutate}=useMutation({
    mutationFn:checkDuplicateEmail,
    onSuccess:(data)=>{
      console.log(data);
      if(data?.data?.status==='fail'){
        toast.error('There is already an registered user with this email',{
          duration:3000,
        });
        setTimeout(() => {
          toast('Please try different email!', {
            icon: '⚠️',
          });
        }, 3000);
      }else if(data?.data?.status==='success'){
              navigate("/signup/mail-verification");
      setTimeLeft(true);
      const currentDate=new Date();const newDate =      new Date(currentDate.getTime() + 65000);
      sendOtpToUser();
      countDown(newDate);
      }
    },onError:(error)=>{
      console.log(error);
    }
  })
  
  const {handleSignupChange,signupFormData,setSignupFormData,setTimeLeft,minutes,seconds,setMinutes,setSeconds,clearId,countDown,sendOtpToUser,}=useAuth();
  // 
  // const sendOtpToUser=async () =>{
  //   const res=await axios.post(`${API_URL}/api/v1/users/sendOtpEmail`,{
  //     email:signupFormData.emailId,
  //     userName:signupFormData.username
  //   });
  //   console.log(res);
  //   return;
  // }
  useEffect(()=>{
    if(minutes<0&&seconds<0){
      clearInterval(clearId);
      setMinutes(0);
      setSeconds(0);
      setTimeLeft(false);
    }
  },[minutes,seconds,clearId,setMinutes,setSeconds,setTimeLeft])
  
  // const navigate = useNavigate();
  const handleSignupSubmit=(e)=>{
    e.preventDefault();
    console.log(signupFormData);
    if(signupFormData.password!==signupFormData.passwordConfirm){
      setSignupFormData({...signupFormData, 
        password:'',
        passwordConfirm:'',
      })
      toast.error('Password and comfirm password do not match',{
        duration:3000,
      });
      setTimeout(() => {
        toast('Please try again!', {
          icon: '⚠️',
        });
      }, 3000);
    }else{
      mutate(signupFormData);
      //FIXME - 
      // navigate("/signup/mail-verification");
      // setTimeLeft(true);
      // const currentDate=new Date();const newDate =      new Date(currentDate.getTime() + 65000);
      // sendOtpToUser();
      // countDown(newDate);
      // ANCHOR - 
    }
  }
  // const [formData,setFormData]=useState({
  //   username:'',
  //   emailId:'',
  //   password:'',
  //   passwordConfirm:'',
  // })
  
  // const handleChange=(e)=>{
  //   e.preventDefault();
  //   console.log(e.target);
  //   const {name,value}=e.target;
  //   setFormData({
  //     ...formData,[name]:value 
  //   })
  // }
  
  // const handleSubmit=(e)=>{
  //   e.preventDefault();
  //   console.log(formData);
  //   navigate("/signup/mail-verification")
  // }

  return (
    <div className="min-h-screen h-screen w-screen bg-indigo-200 flex flex-grow-0 flex-wrap place-content-center box-border overflow-hidden">
      <div className="bg-white h-4/5 w-10/12 flex flex-col flex-shrink-0 flex-wrap ">
        <div className="w-2/5 h-full bg-white">
          <img
            alt="loginImage"
            src="https://mir-s3-cdn-cf.behance.net/projects/max_808/eb054f99517327.Y3JvcCw1MzI3LDQxNjcsNDYxLDA.jpg"
            className="object-contain min-h-full"
          ></img>
        </div>
        {/* form container */}

        {/* SECTION */}
        <div className="w-3/5 h-full flex flex-col justify-evenly gap-4 bg-slate-50 items-center" >
          <div className="flex flex-col gap-1 justify-center items-start min-w-min w-2/3">
            
          <h1 className="text-3xl">Logo</h1>
          <h1 className="text-2xl">Sign up</h1>
          </div>
          <form
            onSubmit={handleSignupSubmit}
            className="flex flex-col gap-6 justify-center items-center min-w-min w-full"
          >
            <div className="w-2/3 h-14 bg-white flex flex-row gap-0 rounded-lg border border-indigo-200">
              <div
                alt="userIconImage"
                src="#"
                className="h-full w-1/6  flex flex-col justify-center border-r border-r-indigo-200"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-1/2"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                  />{" "}
                </svg>
              </div>
              <div className="h-full w-5/6 flex flex-col justify-center items-center rounded-lg">
                <input
                required
                minLength="3"
                type='text'
                id="username"
                name="username"
                value={signupFormData.username}
                  className="h-full w-full text-lg border-none border-opacity-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent"
                  label="username"
                  placeholder="Enter your name"
                  onChange={handleSignupChange}
                  // error={!!errors?.userName}
                  // helperText={errors?.userName?.message}
                />
              </div>
            </div>
            {/* //2 */}
            <div className="w-2/3 h-14 bg-white flex flex-row gap-0 rounded-lg border">
              <div
                alt="passwordIconImage"
                src="#"
                className="h-full w-1/6  flex flex-col justify-center border-r"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-1/2"
                >
                  {" "}
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M21.75 6.75v10.5a2.25 2.25 0 0 1-2.25 2.25h-15a2.25 2.25 0 0 1-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25m19.5 0v.243a2.25 2.25 0 0 1-1.07 1.916l-7.5 4.615a2.25 2.25 0 0 1-2.36 0L3.32 8.91a2.25 2.25 0 0 1-1.07-1.916V6.75"
                  />{" "}
                </svg>
              </div>
              <div className="h-full w-5/6 flex flex-col justify-center items-center rounded-lg">
                <input
                required
                type='email'
                  id="emailId"
                  name="emailId"
                  value={signupFormData.emailId}
                  className="h-full w-full border-none border-opacity-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-lg"
                  label="emaildId"
                  placeholder="Enter your e-mail address"
                  title=""
                  onChange={handleSignupChange}
                  // error={!!errors.emailId}
                  // helperText={errors?.emailId?.message}
                />
              </div>
            </div>

            {/* 3 */}
            <div className="w-2/3 h-14 bg-white flex flex-row gap-0 rounded-lg border">
              <div
                alt="iconImage"
                src="#"
                className="h-full w-1/6  flex flex-col justify-center border-r"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div className="h-full w-5/6 flex flex-col justify-center items-center rounded-lg">
                <input
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Must contain 8 chracters,one uppercase,lowercase,number and a special case charcter"
                required
                type="password"
                id="password"
                value={signupFormData.password}
                name="password"
                  className="h-full w-full border-none border-opacity-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-lg"
                  label="password"
                  placeholder="Enter your password"
                  
                  onChange={handleSignupChange}
                  // error={!!errors?.password}
                  // helperText={errors?.password?.message}
                />
              </div>
            </div>

            {/* //4 */}
            <div className="w-2/3 h-14 bg-white flex flex-row gap-0 rounded-lg border">
              <div
                alt="iconImage"
                src="#"
                className="h-full w-1/6  flex flex-col justify-center border-r"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="w-full h-1/2"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 1 0-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 0 0 2.25-2.25v-6.75a2.25 2.25 0 0 0-2.25-2.25H6.75a2.25 2.25 0 0 0-2.25 2.25v6.75a2.25 2.25 0 0 0 2.25 2.25Z"
                  />
                </svg>
              </div>
              <div className="h-full w-5/6 flex flex-col justify-center items-center rounded-lg ">
                <input
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                title="Must contain 8 chracters,one uppercase,lowercase,number and a special case charcter"
                required
                value={signupFormData.passwordConfirm}
                type='password'
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Re-enter your password"
                  className="h-full w-full border-none border-opacity-0 rounded-lg  focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-lg"
                  label="passwordConfirm"
                  onChange={handleSignupChange}
                  // error={!!errors?.passwordConfirm}
                  // helperText={errors?.passwordConfirm?.message}
                />
              </div>
            </div>

            <button
              className="border-blue-300 border-solid border h-10 w-2/3 text-center align-middle rounded-lg bg-indigo-400 ring-3 hover:ring-3 hover:ring-sky-300 ring-gray-900  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              type="submit"
            >
              Create Account
            </button>
          
            {/* !SECTION */}
          </form>
          <span className="mt-4">Already have an account? <NavLink className="text-indigo-500" to="/login"> Login</NavLink></span>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default Signup;
