import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { changeCredentials, updateUser } from "../../apis/userApi";
import { useAuth } from "../../AuthContext";

function Myprofile() {
  
  
  
  const {mutate}=useMutation({
    mutationFn:updateUser,
    mutationKey:'updateUser',
    onSuccess:(data)=>{
      console.log(data);
      if(data?.data?.status==='success'){
        toast.success('Data updated succesfully',{
          duration:3000,
        });
      }
    },
    onError:(error)=>{
      console.log(error);
    }
  })
  
  
  
  const {mutate:updateCredentials}=useMutation({
    mutationFn:changeCredentials,
    mutationKey:'changeCredentials',
    onSuccess:(data)=>{
      console.log(data.data);
      if(data?.data?.status==='success'){
        toast.success('Password changed succesfully',{
          duration:3000,
        });
      }
    },
    onError:(error)=>{
      console.log(error.response.data);
      if(error.response.data.status==="fail"&&(error.response.data.message=="your current password is wrong")){
        toast.error('Your current password is wrong',{
          duration:3000,
        });
        setTimeout(() => {
          toast('Please try again!', {
            icon: '⚠️',
          });
        }, 3000);
      }
    }
  })
  
    
  const {updateUserData,handleUpdateUserDataChange,credentialsChangeFormData,setCredentialsChangeFormData,handleCredentialsFormDataChange}=useAuth();
  
  const handleUpdateUserDataSubmit=(e)=>{
    e.preventDefault();
    console.log(updateUserData);
    mutate(updateUserData);
  }
  
  const handleCredentialsFormDataSubmit=(e)=>{
    e.preventDefault();
    console.log(credentialsChangeFormData);
    if(credentialsChangeFormData?.password!==credentialsChangeFormData?.passwordConfirm){
      setCredentialsChangeFormData({...credentialsChangeFormData, 
        passwordCurrent:'',
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
      console.log("x")
      updateCredentials(credentialsChangeFormData);
      // mutate(signupFormData);
    }
  }
  
  
  
    return (
        <main className="flex flex-col divide-y-2">
        <div className="flex flex-col mx-12 mt-7 mb-3 px-14">
          <h1 className="text-[23px] tracking-wider text-blue-600 mb-[30px]">
            YOUR ACCOUNT SETTINGS
          </h1>
          <form className="flex flex-col gap-8" onSubmit={handleUpdateUserDataSubmit}>
            <div className="flex flex-col ">
              <label className="mb-[10px]">Name </label>
              <input
                required
                id="username"
                name="username"
                placeholder="Enter your email address"
                value={updateUserData.username}
                onChange={handleUpdateUserDataChange}
                className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
                label="username"
                title=""
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-[10px]">Email address </label>
              <input
                required
                type="email"
                id="emailId"
                name="emailId"
                placeholder="Enter your email address"
                value={updateUserData.emailId}
                onChange={handleUpdateUserDataChange}
                className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
                label="emaildId"
                title=""
              />
            </div>
            <div className="flex items-center justify-end">
                <button type="submit" className="text-sm tracking-wider px-[30px] py-[12.5px] border rounded-2xl bg-blue-600 text-white   ">SAVE SETTINGS</button>
            </div>
          </form>
        </div>
        <div className="flex flex-col mx-12 my-7 px-14 py-[70px]">
          <h1 className="text-[23px] tracking-wider text-blue-600 mb-[30px] capitalize">
            password change
          </h1>
          <form className="flex flex-col gap-6" onSubmit={handleCredentialsFormDataSubmit}>
            <div className="flex flex-col ">
              <label className="mb-[10px]">Current password </label>
              <input
                required
                minLength="3"
                // type="password"
                id="passwordCurrent"
                name="passwordCurrent"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                placeholder="Enter your current password"
                className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
                label="passwordCurrent"
                title=""
                value={credentialsChangeFormData?.passwordCurrent}
                onChange={handleCredentialsFormDataChange}

              />
            </div>
            <div className="flex flex-col">
              <label className="mb-[10px]">New password </label>
              <input
                required
                minLength="3"
                // type="password"
                id="password"
                name="password"
                placeholder="Enter your new password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
                label="password"
                title=""
                value={credentialsChangeFormData?.password}
                onChange={handleCredentialsFormDataChange}
              />
            </div>
            <div className="flex flex-col mb-6">
              <label className="mb-[10px]">Confirm password </label>
              <input
                required
                minLength="3"
                // type="password"
                id="passwordConfirm"
                name="passwordConfirm"
                placeholder="Re-enter your new password"
                pattern="^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$"
                className="h-full w-full border-none border-opacity-0 rounded-sm focus:outline-none  focus:ring-indigo-300 focus:border-transparent text-sm bg-gray-100 py-3"
                label="emaildId"
                title=""
                value={credentialsChangeFormData?.passwordConfirm}
                onChange={handleCredentialsFormDataChange}
              />
            </div>
            <div className="flex items-center justify-end">
                <button type="submit" className="text-sm tracking-wider px-[30px] py-[12.5px] border rounded-2xl bg-blue-600 text-white   !uppercase">save password</button>
            </div>
          </form>
        </div>
      </main>
    )
    
}

export default Myprofile;