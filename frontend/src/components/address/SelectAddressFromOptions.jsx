// import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { getUserSavedAddresses } from "../../apis/userApi";
import { useUiContext } from "../../contexts/UiContext";
import { useUser } from "../../hooks/useUser";

/* eslint-disable react/prop-types */

function SelectAddressFromOptions() {
  const { setIsModalOpen } = useUiContext();
  // console.log("📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈📈");
  // const { setIsModalOpen, closeModal } = useUiContext();
  // console.log(onClose);
  // console.log(oo);
  // const  [lat,setLat]=useState("");
  // const  [long,setLong]=useState("");

  function getLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      } else {
        reject(new Error("Geolocation is not supported by this browser."));
      }
    });
  }

  async function handleLocation() {
    try {
      const position = await getLocation();
      if (position?.coords?.latitude && position?.coords?.longitude) {
        getFullAddress(position?.coords?.latitude, position?.coords?.longitude);
      }
      // alert(`${position?.coords?.latitude},${position?.coords?.longitude}`)
      // console.log(lat,long);

      // alert(`${lat},${long}`);

      // Further processing
    } catch (error) {
      alert(`${error.message}`);
    }
  }

  function getFullAddress(latitude, longitude) {
    let apiUrl = `https://api.tomtom.com/search/2/reverseGeocode/${latitude},${longitude}.json?key=AL4E1LlNn2lrxJEG01RmqehBEq9rUXVf&radius=100`;
    fetch(apiUrl)
      .then((response) => {
        // Check if the request was successful (status code 200)
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        // Parse the response as JSON
        return response.json();
      })
      .then((data) => {
        let adr = data.addresses[0].address.freeformAddress;
        localStorage.setItem("deliveryAddress", adr);
        //   toast.success(adr);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
          >
            <div className="flex-1 w-0 p-4">
              <span className="font-semibold">📌 Your Current Location : </span>
              {adr}
            </div>
            <div
              className="flex border-l border-gray-200"
              onClick={() => toast.dismiss(t.id)}
            >
              <button className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none">
                Close
              </button>
            </div>
          </div>
        ));

        //           toast.custom((t)=>{
        //             <div className={`${
        //                 t.visible ? 'animate-enter' : 'animate-leave'
        //               } max-w-md w-full h-48 bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}>
        //             <div className="bg-gray-100">
        //               <h1>Confirm this address?</h1>
        //               <span>Ajmer Road, Madrampur, Civil Lines, Jaipur 302006, Rajasthan,{adr}</span>
        //               <div className="flex justify-center items-center">
        //                 <button className=" border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">Cancel</button>
        //                       <button className=" border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500">Confirm</button>
        //               </div>

        //               <span>You can choose address manually by clicking on select new address</span>
        //               <button
        //     onClick={() => toast.dismiss(t.id)}
        //     className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
        //   >
        //     Close
        //   </button>

        //             </div>
        //           </div>
        //         })
        //   alert(`${adr}`);
      })
      .catch((error) => {
        // Handle errors
        console.error("Fetch error:", error);
      });
  }

  return (
    <div className="  lg:!w-[500px]     flex flex-col   justify-start items-start !h-full ">
      {/* box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px; */}
      <span className="font-bold w-full py-3 text-center shadow-md shadow-gray-300 tracking-wide">
        Your Location
      </span>
      <div className="flex flex-col justify-start items-start w-full px-6 gap-5 mt-6">

        <div className="flex justify-center items-center gap-3">
          <img
            src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/current-location-marker-icon.svg"
            alt="gps"
          />
          <div
            className="flex flex-col justify-start items-start gap-0 text-red-500 cursor-pointer"
            onClick={(e) => {
              e.preventDefault();
              // () => setIsModalOpen(false);
              
              handleLocation();
              setIsModalOpen(false);
              // onClose();
            }}
          >
            <span className="font-medium">Select current location</span>
            <span>using gps</span>
          </div>
        </div>
      </div>
            
            <ShowSavedAddresses/>

    </div>
  );
}

function ShowSavedAddresses() {
  
  const {setIsModalOpen}=useUiContext();
  //
  function handleClickOnSavedAddress(address) {
    localStorage.setItem("deliveryAddress", address);
    setIsModalOpen(false);


    
  }
  
  
  
    const {currentUserId}= useUser();
    
    const {data,isLoading}= useQuery(
        ["getUserSavedAddresses", currentUserId],
        () => getUserSavedAddresses(currentUserId),
        {
            enabled:!!currentUserId
        }
    )
    

    const savedAddressesByUser=data?.addresses;
    
    console.log(savedAddressesByUser);
    if(isLoading)   return <div></div>
    if(!isLoading&&!savedAddressesByUser?.length) return <div></div>
    
  return (
    <div className="w-full flex flex-col justify-start items-start px-6 gap-1 mt-2">
      <span className="font-bold w-full py-3 text-start tracking-wide">
        Saved Location
      </span>
      
          <div className="flex flex-col justify-start items-start  w-full divide-y-2 gap-5 h-40  overflow-y-scroll overflow-x-clip" >
      {
                savedAddressesByUser?.map((adr,i)=>(
            <div className="flex justify-start items-center gap-3 w-full pt-3 cursor-pointer" key={i} onClick={(e)=>{
              e.preventDefault();
              handleClickOnSavedAddress(adr?.address);
            }}>
              <img
                src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
                alt="gps"
              />
              <div className="flex flex-col justify-start items-start gap-0 ">
                <span className="font-medium capitalize">{adr?.label}</span>
                <span className="line-clamp-2 text-wrap" >{adr?.address}</span>
              </div>
            </div>
        ))
    }
          </div>
      
      

    </div>
  );
}

export default SelectAddressFromOptions;


// for future uuse

      {/* <div className="w-full flex flex-col justify-start items-start px-6 gap-1 mt-2">
        <span className="font-bold w-full py-3 text-start tracking-wide">
          Saved Location
        </span>
        <div className="flex flex-col justify-start items-start  w-full divide-y-2 gap-5 h-40 overflow-y-scroll overflow-x-clip">
          <div className="flex justify-start items-center gap-3 w-full pt-3">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
              alt="gps"
            />
            <div className="flex flex-col justify-start items-start gap-0">
              <span className="font-medium">Home</span>
              <span className="text-wrap line-clamp-2">
                jh, hjg, D Block, Sir Chotu Ram Marg, Avantika, Sector 1,
                Rohini, Delhi, Delhi
                huhhbhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhjjjjjjjjjjjjjjjjjjjjjjj
              </span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 w-full pt-3">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
              alt="gps"
            />
            <div className="flex flex-col justify-start items-start gap-0 ">
              <span className="font-medium">Work</span>
              <span>uhh, uhh, Belgachia, Kolkata, West Bengal</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 w-full pt-3">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
              alt="gps"
            />
            <div className="flex flex-col justify-start items-start gap-0 ">
              <span className="font-medium">Work</span>
              <span>uhh, uhh, Belgachia, Kolkata, West Bengal</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 w-full pt-3">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
              alt="gps"
            />
            <div className="flex flex-col justify-start items-start gap-0 ">
              <span className="font-medium">Work</span>
              <span>uhh, uhh, Belgachia, Kolkata, West Bengal</span>
            </div>
          </div>
          <div className="flex justify-start items-center gap-3 w-full pt-3">
            <img
              src="https://cdn.zeptonow.com/web-static-assets-prod/artifacts/11.8.3/tr:w-0.2,ar-0.2-0.2,pr-true,f-auto,q-80//images/google-map/location-marker-colored-icon.svg"
              alt="gps"
            />
            <div className="flex flex-col justify-start items-start gap-0 ">
              <span className="font-medium">Work</span>
              <span>uhh, uhh, Belgachia, Kolkata, West Bengal</span>
            </div>
          </div>
        </div>
      </div> */}


