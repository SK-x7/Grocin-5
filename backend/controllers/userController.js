const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");

const filterObj = (obj, ...allowedFields) => {
  let newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) {
      newObj[el] = obj[el];
    }
  });
  return newObj;
};

exports.updateMe = catchAsync(async (req, res, next) => {
  // create error if user posts password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new AppError(
        "This is not for password updates. Please use /updateMyPassword",
        400
      )
    );
  }

  //update user document

  const filteredBody = filterObj(req.body, "name", "email");

  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: "success",
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async(req,res,next)=>{
    await User.findByIdAndUpdate(req.user.id,{active:false})
    
    res.status(400).json({
      status:'success',
      data:null,  
    })
})


exports.isLoggedIn=catchAsync(async(req,res,next)=>{
  console.log("HEYy");
  res.status(200).json({
    status: 'success',
    loggedIN:true,
    data:{
      currentUserId:req.user.id,
    }
  })
  
})

exports.checkDuplicateEmail=catchAsync(async (req,res,next)=>{
  if(!req.body.email) return (next(new AppError("Please provide your email address",404)))
  const user=await User.findOne({email:req.body.email})
  if(user){
    res.status(200).json({
      status: 'fail',
      message:"Duplicate email"
    })
  }else{
    res.status(200).json({
      status:'success',
      message:"you can use this email"
    })
  }
})

// ---------------------------------------------------------------------------------------------------------------------------
exports.getUser = catchAsync( async (req,res,next)=>{
  const user = await User.findById(req.params.id).populate('reviews').populate("orders");
  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }
  res.status(200).json({
    status: 'success',
    message: "user found successfully",
    data:{
      user
    }
  })
})

exports.getAllUser = catchAsync( async (req,res,next)=>{
  const users = await User.find().populate("orders");
  // if (!user) {
  //   return next(new AppError('No user found with that ID', 404));
  // }
  res.status(200).json({
    status: 'success',
    message: "user found successfully",
    data:{
      "total users":users.length,
      users
    }
  })
})

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'This route is not defined! Please use /signup instead'
  });
};

exports.updateUser =catchAsync(async (req, res, next) => {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true
    });

    if (!updatedUser) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: updatedUser
      }
    });
  });
  
  exports.deleteUser =
  catchAsync(async (req, res, next) => {
    const deletedUser = await User.findByIdAndDelete(req.params.id);

    if (!deletedUser) {
      return next(new AppError('No user found with that ID', 404));
    }

    res.status(204).json({
      status: 'success',
      message: 'User deleted successfully',
      data: null
    });
  });
  
  exports.logout=(req, res,next) => {
    console.log('logout');
    res.clearCookie('jwt'); 
    res.status(200).json({ message: 'Logged out successfully' });
  };
  
  
  exports.getSavedAddressesOfUser = catchAsync( async (req,res,next)=>{
    const user = await User.findById(req.params.id).populate('reviews').populate("orders");
    console.log(user);
    let addresses;
    if (!user) {
      return next(new AppError('No user found with that ID', 404));
    }else{
      addresses=user.addresses;
    }
    res.status(200).json({
      status: 'success',
      message: "Saved addresses fetched successfully",
      length: addresses.length,
      data:{
        addresses
      }
    })
  })
  
  exports.addRemoveSavedAddresses = catchAsync(async (req,res,next)=>{
    console.log(req.params);
    console.log(req.body);
    if(!req.params.id)    return next(new AppError("please provide id of user to update",404))

    if((req.params.action!=="add")&&(req.params.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
    
    if(req.params.action==='add'){
        if(req.body.length===0){
            return next(new AppError(`please provide address to add`,404))
        }
        
        
        const user = await User.findById(req.params.id);
        
        const newAddresses = req.body.addresses.filter((newAddress) => {
          return !user.addresses.some(existingAddress => 
              existingAddress.label === newAddress.label &&
              existingAddress.address === newAddress.address
          );
      });
        
      if (newAddresses.length === 0) {
        return next(new AppError('All provided addresses are duplicates', 400));
    }
        // console.log(req.user,'KEGHJKEGHJ')
        // const user = await User.findById(req.params.id);
        // console.log(existingAddresses,'HHKJJK');

        
      const updatedUser=await User.findByIdAndUpdate(req.params.id,
        { $addToSet: { addresses: { $each: newAddresses} } },
        {new:true,runValidators:true}
      )   
      // console.log(updatedUser)
      
      res.status(200).json({
        message:"address added, updated successful",
        data:{
            updatedUser
        }
    })
      
    }else{
        if(req.body.length===0){
            return next(new AppError(`please provide address to remove`,404))
        }
        
        const updatedUser=await User.findByIdAndUpdate(req.params.id,
            { $pull: { addresses: {$or:req.body.addresses.map((adr)=>({
              label:adr.label,
              address:adr.address,
            }))} } },            {new:true,runValidators:true}
          )  
          console.log(updatedUser,"⚠️⚠️")
          
          res.status(200).json({
            message:"address removed, update successful",
            data:{
                updatedUser
            }
        })
    }

})



exports.editSavedAddresses = catchAsync(async (req,res,next)=>{
  console.log(req.params);
  console.log(req.body);
  if(!req.params.id)    return next(new AppError("please provide id of user to update",404))

  // if((req.params.action!=="add")&&(req.params.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
  
  
      if(req.body.data.length===0){
          return next(new AppError(`please provide address data to update`,404))
      }
      if(!req.body.addressId){
          return next(new AppError(`please provide id of address to update`,404))
      }
      

      
    const updatedUser=await User.findOneAndUpdate(
      {_id:req.params.id,'addresses._id': req.body.addressId},
      { $set: { 'addresses.$': req.body.data } }, // Use $ to refer to the matched element
      { new: true, runValidators: true }
    )   
    
    
    if(!updatedUser)  return (next(new AppError("No user with this address id found to update",404)))
    
    // console.log(updatedUser)
    
    res.status(200).json({
      message:"Address updated successful",
      data:{
          updatedUser
      }
  })
    
  
  
  // else{
  //     if(req.body.length===0){
  //         return next(new AppError(`please provide address to remove`,404))
  //     }
      
  //     const updatedUser=await User.findByIdAndUpdate(req.params.id,
  //         { $pull: { addresses: {$or:req.body.addresses.map((adr)=>({
  //           label:adr.label,
  //           address:adr.address,
  //         }))} } },            {new:true,runValidators:true}
  //       )  
  //       console.log(updatedUser,"⚠️⚠️")
        
  //       res.status(200).json({
  //         message:"address removed, update successful",
  //         data:{
  //             updatedUser
  //         }
  //     })
  // }

})


exports.deleteSavedAddresses = catchAsync(async (req,res,next)=>{
  console.log(req.params);
  console.log(req.body);
  if(!req.params.id)    return next(new AppError("please provide id of user to update",404))

  
  
      
      if(!req.body.addressId){
          return next(new AppError(`please provide id of address to delete`,404))
      }
      

      
    const updatedUser=await User.findByIdAndUpdate(req.params.id,
      { $pull: { addresses: {_id:req.body.addressId} } }, // Use $ to refer to the matched element
      { new: true, runValidators: true }
    )   
    
    
    if(!updatedUser)  return (next(new AppError("No user with this address id found to delete",404)))
    
    // console.log(updatedUser)
    
    res.status(200).json({
      message:"Address deleted successful",
      data:{
          updatedUser
      }
  })
    
  
  

})
  
  
  
//   exports.addRemoveSavedAddresses = catchAsync(async (req,res,next)=>{
//     console.log(req.params);
//     console.log(req.body);
//     if(!req.params.id)    return next(new AppError("please provide id of user to update",404))

//     if((req.params.action!=="add")&&(req.params.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
    
//     if(req.params.action==='add'){
//         if(req.body.length===0){
//             return next(new AppError(`please provide address to add`,404))
//         }
        
        
//         const temp = req.body.addresses.map(address => address);
//         console.log(temp);
//         // console.log(req.user,'KEGHJKEGHJ')
//         // const user = await User.findById(req.params.id);
//         // console.log(existingAddresses,'HHKJJK');

        
//       const updatedUser=await User.findByIdAndUpdate(req.params.id,
//         { $addToSet: { addresses: { $each: req.body.addresses.map((adr)=>({
//           label:adr.label,
//           address:adr.address
//         })) } } },
//         {new:true,runValidators:true}
//       )   
//       // console.log(updatedUser)
      
//       res.status(200).json({
//         message:"address added, updated successful",
//         data:{
//             updatedUser
//         }
//     })
      
//     }else{
//         if(req.body.length===0){
//             return next(new AppError(`please provide address to remove`,404))
//         }
        
//         const updatedUser=await User.findByIdAndUpdate(req.params.id,
//             { $pull: { addresses: {$or:req.body.addresses.map((adr)=>({
//               label:adr.label,
//               address:adr.address,
//             }))} } },            {new:true,runValidators:true}
//           )  
//           console.log(updatedUser,"⚠️⚠️")
          
//           res.status(200).json({
//             message:"address removed, update successful",
//             data:{
//                 updatedUser
//             }
//         })
//     }

// })
  
  // SECTION-----my original code
//   exports.addRemoveSavedAddresses = catchAsync(async (req,res,next)=>{
//     console.log(req.params);
//     console.log(req.body);
//     if(!req.params.id)    return next(new AppError("please provide id of user to update",404))

//     if((req.params.action!=="add")&&(req.params.action!=='remove')) return next(new AppError(`only Add and Remove actions are valid`,404))
    
//     if(req.params.action==='add'){
//         if(req.body.length===0){
//             return next(new AppError(`please provide address to add`,404))
//         }
//       const updatedUser=await User.findByIdAndUpdate(req.params.id,
//         { $addToSet: { addresses: { $each: req.body.addresses.map((adr)=>({
//           label:adr.label,
//           address:adr.address
//         })) } } },
//         {new:true,runValidators:true}
//       )   
//       console.log(updatedUser)
      
//       res.status(200).json({
//         message:"address added, updated successful",
//         data:{
//             updatedUser
//         }
//     })
      
//     }else{
//         if(req.body.length===0){
//             return next(new AppError(`please provide address to remove`,404))
//         }
        
//         const updatedUser=await User.findByIdAndUpdate(req.params.id,
//             { $pull: { addresses: {$or:req.body.addresses.map((adr)=>({
//               label:adr.label,
//               address:adr.address,
//             }))} } },            {new:true,runValidators:true}
//           )  
//           console.log(updatedUser,"⚠️⚠️")
          
//           res.status(200).json({
//             message:"address removed, update successful",
//             data:{
//                 updatedUser
//             }
//         })
//     }

// })

// !SECTION 
