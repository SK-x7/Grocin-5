import { NavLink} from "react-router-dom";
import { useAuth } from "../../AuthContext";



function ForgotPassword() {
      const {handleLoginChange,checkEmail,loginFormData,setIsResettingPasswoord}=useAuth();
  
  // const [formData,setFormData]=useState({
  //   emailId:'',
  //   password:'',
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
          <div className="flex flex-col gap-3 justify-evenly items-start min-w-min w-2/3 ">
            
          <h1 className="text-3xl">Logo</h1>
          <h1 className="text-xl">Please enter your registered email address</h1>
          <h1 className="text-xl">You will recieve a link in your email</h1>
          </div>
          <form
            onSubmit={(e)=>{e.preventDefault();setIsResettingPasswoord(true);checkEmail(loginFormData)}}
            className="flex flex-col gap-6 justify-center items-center min-w-min w-full py-2"
          >

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
                  placeholder="Enter your email address"
                  className="h-full w-full border-none border-opacity-0 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-300 focus:border-transparent text-lg"
                  label="emaildId"
                  title=""
                  onChange={handleLoginChange}
                  // error={!!errors.emailId}
                  // helperText={errors?.emailId?.message}
                />
              </div>
            </div>

            {/* 3 */}

            {/* <div className="w-2/3 h-min  flex flex-row-reverse gap-0 rounded-lg -mt-4  items-center">
                
            <a className="text-indigo-500 text-sm" href="www.google.com">Forgot password?</a>
            </div> */}

            {/* //4 */}


            <button
              className="border-blue-300 border-solid border h-10 w-2/3 text-center align-middle rounded-lg bg-indigo-400 ring-3 hover:ring-3 hover:ring-sky-300 ring-gray-900  hover:bg-indigo-500 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-500 focus:ring-opacity-50"
              type="submit"
            >
              Submit
            </button>
          
            {/* !SECTION */}
        
          </form>
        {/* <div></div> */}
          <div className="w-2/3 h-min  flex flex-row gap-0 rounded-lg justify-center items-center justify-self-end ">
        <span className="text-sm">Back to <NavLink className="text-indigo-500 text-sm" to="/login"> Login</NavLink></span>
          </div>
        </div>
      </div>
    </div>
  );


}

export default ForgotPassword;
