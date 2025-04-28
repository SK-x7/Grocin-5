/* eslint-disable react/prop-types */

import { useMutation } from "@tanstack/react-query";
import { createContext, useContext, useState } from "react"
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
// import { test, updateUserSavedAddresses } from "../apis/userApi";
import {deleteUserSavedAddresses, editUserSavedAddresses, updateUserSavedAddresses } from "../apis/userApi";
import { useUser } from "../hooks/useUser";
// import { us } from "../apis/userApi";
// import { us } from "../apis/userApi";

const UiContext=createContext();

function UiProvider({children}) {
    const {currentUserId}= useUser();
    const navigate=useNavigate();
    
    //for big modal to show page
    const [isModalOpen ,setIsModalOpen] =useState(false);
    const [isRegularModalOpen ,setIsRegularModalOpen] =useState(false);
    function closeModal() {
        setIsRegularModalOpen(false);
        // setIsModalOpen(false);
    }
    
    function openModal() {
        // setIsModalOpen(true);
        setIsRegularModalOpen(true);
        
    }
    
    
    
    //for address (Map Component)
    const [address,setAddress]=useState();

    
    //for add address label
    
    const [addressLabel,setAddressLabel]=useState("");
    
    function handleAddressLabelChange(e) {
        console.log(e.target.value);
        setAddressLabel(e.target.value);        
    }
    
    function handleAddressLabelSubmit(params) {
        console.log(params)
        closeModal();
        localStorage.setItem("deliveryAddress", address);
    }
    
    //for edit saved address form
    const [editAddressLabelValue,setEditAddressLabelValue]=useState("");
    const [editAddressValue,setEditAddressValue]=useState("");
    const [editAddressId,setEditAddressId]=useState("");
    
    
    
    //SECTION ------ For Edit Saved Address Form
    function handleEditAddressLabelValueChange(e) {
        console.log(e.target.value);
        setEditAddressLabelValue(e.target.value);        
    }
    
    
    function handleEditAddressValueChange(e) {
        console.log(e.target.value);
        setEditAddressValue(e.target.value);        
    }
    
    
    const  {mutate:editSavedAddresses}=useMutation({
        mutationFn:editUserSavedAddresses,
        onSuccess:(data)=>{
          console.log(data);
          setEditAddressId("")
          setEditAddressLabelValue("")
          setEditAddressValue("")
          setIsRegularModalOpen(false);
        //   setAddressLabel("")
        //   setAddress("");
        //   setIsRegularModalOpen(false)
        //   setIsModalOpen(false)
        //   localStorage.setItem("deliveryAddress", address);

        //   navigate("/");
          
          toast.success(data?.message)
        },onError:(err)=>{
          toast.error(err.response.data.message,{
            duration: 4000
          });
        }
      })
    
    
    
    
    
    
    
    
    
    
    function handleSubmitEditAddress() {
        
        if(!editAddressLabelValue.length){
            toast.error("Label cannot be empty,please fill first");
            return
        }
        if(!editAddressValue.length){
            toast.error("address cannot be empty,please fill first");
            return
        }
        
        
        
        
        let data={
            label:editAddressLabelValue,
            address:editAddressValue
        }
        const obj={
            userId:currentUserId,
            editedAddressData:{
                addressId:editAddressId,
                data
            }
        }
        editSavedAddresses(obj);
    }
    
    
    const  {mutate:deleteSavedAddresses}=useMutation({
        mutationFn:deleteUserSavedAddresses,
        onSuccess:(data)=>{
          console.log(data);
          setEditAddressId("")
        toast.success(data?.message)
        },onError:(err)=>{
          toast.error(err.response.data.message,{
            duration: 4000
          });
        }
      })
    
    
    function handleSubmitdeleteAddress(id) {
        const obj={
            userId:currentUserId,
            addressId:id
        }
        deleteSavedAddresses(obj);
    }
    
    
    
    
    
    
    
    
    
    
    //!SECTION
    
    
    
    const  {mutate:updateSavedAddresses}=useMutation({
        mutationFn:updateUserSavedAddresses,
        onSuccess:(data)=>{
        //   console.log(data);
          setAddressLabel("")
          setAddress("");
          setIsRegularModalOpen(false)
          setIsModalOpen(false)
          localStorage.setItem("deliveryAddress", address);

          navigate("/");
          
          toast.success(data?.message)
        },onError:(err)=>{
          toast.error(err.response.data.message,{
            duration: 4000
          });
        }
      })
    
    function handleSubmitAddress() {
        const addresses=[];
        let newSaveAddressObj={
            label:addressLabel,
            address:address
        }
        addresses.push(newSaveAddressObj)
        const obj={
            userId:currentUserId,
            addresses,
            action:"add"
        }
        updateSavedAddresses(obj);
    }
    
    
    
    
    const value={isModalOpen,setIsModalOpen,isRegularModalOpen,setIsRegularModalOpen,closeModal,addressLabel,setAddressLabel,handleAddressLabelChange,handleAddressLabelSubmit,address,setAddress,handleSubmitAddress,openModal,editAddressLabelValue,setEditAddressLabelValue,editAddressValue,setEditAddressValue,handleEditAddressLabelValueChange,handleEditAddressValueChange,editAddressId,setEditAddressId,handleSubmitEditAddress,handleSubmitdeleteAddress};
    return <UiContext.Provider value={value}>{children}</UiContext.Provider>
}

function useUiContext() {
    const context = useContext(UiContext);
    if(context===undefined){
        throw new Error("UiContext was used outside of the ui provider");
    }
    return context;
}


export {UiProvider,useUiContext}
