
import { toast } from "react-hot-toast";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../../AuthContext";
import { useMutation } from "@tanstack/react-query";
import {  resetPassword } from "../../apis/userApi";

function ResetPassword() {
  const navigate = useNavigate();
    const {token}=useParams();

  const {mutate}=useMutation({
    mutationFn:resetPassword,
    onSuccess:(data)=>{
      console.log(data);
      if(data.data.status==='success'){
        const msg=data.data.message;
        toast.success(`Reset successful`,{
          duration:1000
        });
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? 'animate-enter' : 'animate-leave'
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <p className="w-full">{msg}</p>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => {navigate("/login"); toast.dismiss(t.id)}}
                className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Go back to login
              </button>
            </div>
          </div>
        ))
      }
    },onError:(error)=>{
      console.log(error);
      const msg =error.response.data.message;
      console.log(msg);

//FIXME - 
      toast.error(`${msg}`,{
        duration:3000,
      });
      setTimeout(() => {
        toast('Please try again!', {
          icon: '⚠️',
        });
      }, 3000);
    }
  })
  
  const {handleSignupChange,signupFormData,setSignupFormData}=useAuth();
  // 
  // const sendOtpToUser=async () =>{
  //   const res=await axios.post(`${API_URL}/api/v1/users/sendOtpEmail`,{
  //     email:signupFormData.emailId,
  //     userName:signupFormData.username
  //   });
  //   console.log(res);
  //   return;
  // }

  
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
        console.log(token,"🫡");
        let obj={...signupFormData,token}
        mutate(obj);

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
          <h1 className="text-2xl">Reset Account Password</h1>
          <h6 className="">Enter a new password for .com</h6>
          </div>
          <form
            onSubmit={handleSignupSubmit}
            className="flex flex-col gap-6 justify-center items-center min-w-min w-full"
          >

            {/* //2 */}


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
              Submit
            </button>
          
            {/* !SECTION */}
          </form>
          <span className="mt-4">Back to <NavLink className="text-indigo-500" to="/login"> Login</NavLink></span>
        </div>
        {/* <div></div> */}
      </div>
    </div>
  );
}

export default ResetPassword;
