//TODO - remove the review
//TODO - block reset password page

//REVIEW -

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const crypto = require("crypto");
const { totp } = require("otplib");
const { type } = require("os");
const cookieParser = require("cookie-parser");
const DispatchManager=require("../models/dispatchManagerModel");




const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (dispatchManager, statusCode, res) => {
  const token = signToken(dispatchManager._id);
  const date_now = new Date();
  date_now.setDate(date_now.getDate() + process.env.JWT_COOKIE_EXPIRES_IN);
  res.cookie("jwt", token, {
    expires:date_now,
    secure: true,
    httpOnly: true,
    sameSite:"none",
    path:"/",
    domain:"",
  }); 

  dispatchManager.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      dispatchManager,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await DispatchManager.create({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
  });
  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  // console.log(email,password);

  if (!email || !password) {
    return next(new AppError("please provide email and password", 400));
  }
  // console.log("1️⃣");

  const dispatchManager = await DispatchManager.findOne({ email }).select("+password");
  // console.log(dispatchManager);
  if (!dispatchManager) {
    return next(new AppError("Incorret email or password", 401));
  }
  
  // if (!correct) {
  //   res.status(400).json({
  //     status:"fail",
  //     message:"invalid email or password"
  //   })
  // }
  
  const correct =await dispatchManager.correctPassword(password, dispatchManager.password);
  console.log(correct,"⚠️⚠️");
  if (!dispatchManager || !correct) {
    return next(new AppError("Incorret email or password", 401));
  }

  const url =
    "https://static.langimg.com/photo/imgsize-142503,msid-87446458/navbharat-times.jpg"; //NOTE - update later←
  // await new Email(dispatchManager, url).sendWelcome();
  createSendToken(dispatchManager, 201, res);
});    
// 
exports.protect = catchAsync(async function (req, res, next) {
  console.log("⚠️");
  // console.log(req.cookies.jwt);
  // console.log(req.signedcookies);
  let token;
  
  //gettting token and check if its there-----++--
  if (
    req.headers.authorization &&
    req.headers.authorization.startswith("Bearer")
  ) {
    token = req.headers.authorization.split(" ")[1];
  }else if(req.cookies.jwt){
    token=req.cookies.jwt;
  }
  
  if (!token) {
    return next(
      new AppError("You are not logged in! Please login to get access", 401)
    );
  }

  //verification token

  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  //check if dispatchManager still exists

  const currentUser = await DispatchManager.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The dispatchManager belonging to  this token does no longer exist",
        401
      )
    );
  }

  //check if dispatchManager changed password after token was issued
  if (currentUser.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError("DispatchManager recently changed password! Please log in again.", 401)
    );
  }
  // console.log("passed",currentUser);
  req.dispatchManager = currentUser;

  next();
});



exports.sendOtpEmail = catchAsync(async (req, res, next) => {
  //take 1 sec
  if (!req.body.userName || !req.body.email) {
    return next(new AppError("please provide email and firstName"), 404);
  }

  try {
    totp.options = {
      window: [0,0],
      step: 90,
      
    };
    const token = totp.generate(process.env.OTP_SECRET);
    // console.log(typeof token);
    let dispatchManager = {};
    dispatchManager.email = req.body.email;
    dispatchManager.name = req.body.userName;
    let url = "https://www.npmjs.com/package/otplib";
    // console.log(token);
    dispatchManager.otp=token;

    await new Email(dispatchManager, url).sendOtp();
    res.status(200).json({
      status: "success",
      message: "One-time password sent to email,check your email",
    });
  } catch (err) {
    console.log(err);
    return next(
      new AppError("there was an error sending email,try again later", 500)
    );
  }
});
exports.verifyOtp = catchAsync(async (req, res, next) => {
  try {
    const token = await req.body.otpToken;
    // console.log(token,"token");
    const secret =process.env.OTP_SECRET
    const x=totp.timeRemaining();
    const isValid = totp.check(token, process.env.OTP_SECRET);
    //         // console.log(isValid);
    console.log(isValid);
  
    
    // else{
    //   res.status(200).json({
    //     status:"success",
    //     message:"Timed-out",
    //     isValid,
    //   })+++++++++++++-------
    // }
    //         console.log(isVerified);
    if(isValid) {
      
      res.status(200).json({
        status: "success",
        message: "otp verified",
        isValid,
        x
      });
    }else{
      res.status(200).json({
        status:'success',
        message:"incorrect otp",
        x
      })
    }
  } catch (err) {
    return next(new AppError("there is a problem in verifying otp", 404));
  }
});



// exports.verifyOtp = catchAsync(async (req, res, next) => {
//   try {
//     const token = await req.body.otpToken;
//     console.log(token);
//     const secret =process.env.OTP_SECRET
//     const isValid = await totp.check(token, process.env.OTP_SECRET);
//     //         // console.log(isValid);
//     console.log(isValid);
//     let isVerified;
//     if (isValid) {
//       isVerified =await totp.verify({ token, secret });
//     }
//     // else{
//     //   res.status(200).json({
//     //     status:"success",
//     //     message:"Timed-out",
//     //     isValid,
//     //   })
//     // }
//     //         console.log(isVerified);
//     if(isValid&&isVerified) {
      
//       res.status(200).json({
//         status: "success",
//         message: "otp verified",
//         isVerified,
//       });
//     }else{
//       res.status(200).json({
//         status:'success',
//         message:"incorrect otp"
//       })
//     }
//   } catch (err) {
//     return next(new AppError("there is a problem in verifying otp", 404));
//   }
// });

exports.forgotPassword = catchAsync(async (req, res, next) => {
  // get dispatchManager password based on posted email
  const dispatchManager = await DispatchManager.findOne({ email: req.body.email });
  if (!dispatchManager) {
    return next(new AppError("there is no dispatchManager with this email address"), 401);
  }
  //generat random reset token
  const resetToken = dispatchManager.createPasswordResetToken();
  await dispatchManager.save({ validateBeforeSave: false });

  //send it to dispatchManager gmail

  try {
    // await sendEmail({
    //     email:dispatchManager.email,
    //     subject:'Your password reset token (valid for 10 min)',
    //     message
    // })
    const host=req.get("host");
    const origin=req.get("origin");
    console.log(host+"➕"+origin);
    let resetURL="";
    if(origin){
      resetURL=`${req.get(
        "origin"
      )}/reset-password/${resetToken}`;
    }else{
      
      resetURL = `${req.protocol}://${req.get(
        "host"
      )}/api/v1/users/reset-password/${resetToken}`;
    }
    
    await new Email(dispatchManager, resetURL).sendPasswordReset();

    res.status(200).json({
      statusbar: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    dispatchManager.passwordResetToken = undefined;
    dispatchManager.passwordResetExpires = undefined;
    await dispatchManager.save({ validateBeforeSave: false });

    return next(
      new AppError("there was an error sending email,try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get dispatchManager based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const dispatchManager = await DispatchManager.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //if token has not expired .and there is dispatchManager ,set the password

  if (!dispatchManager) {
    return next(new AppError("token is invalid or has expired", 400));
  }

  dispatchManager.password = req.body.password;
  dispatchManager.passwordConfirm = req.body.passwordConfirm;
  dispatchManager.passwordResetToken = undefined;
  dispatchManager.passwordResetExpires = undefined;
  // dispatchManager.saveAfterResetPassword();
  await dispatchManager.save();
  //update changepasswordat property for dispatchManager
  res.status(200).json({
    status: 'success',
    message: 'Password reset successful, please login again'
  })
  //log the dispatchManager in send jwt
  // createSendToken(dispatchManager, 201, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // get dispatchManager from collection
  console.log(req.body)
  if(!req.body.passwordCurrent){
    return next(new AppError("please provide current password", 404));
  }
  if(!req.body.password){
    return next(new AppError("please provide new password", 404));
  }
  if(!req.body.passwordConfirm){
    return next(new AppError("please provide confirm password", 404));
  }
  
  const dispatchManager = await DispatchManager.findById(req.dispatchManager.id).select("+password");
  // console.log(await dispatchManager.correctPassword(req.body.passwordCurrent, dispatchManager.password));
  // check if posted current password is
    console.log(dispatchManager);
    const correct =await dispatchManager.correctPassword(req.body.passwordCurrent, dispatchManager.password);
  
  
  if (!correct) {
    return next(new AppError("your current password is wrong", 401));
  }
  
  dispatchManager.password = req.body.password;
  dispatchManager.passwordConfirm = req.body.passwordConfirm;
  await dispatchManager.save();
  createSendToken(dispatchManager,200,res);
  // log dispatchManager in send jwt
});

//NOTE - related to otp generation,validity and verification

// exports.sendOtp=catchAsync(async(req,res,next)=>{
//     try{
//         totp.options={
//             window:0,
//             step:90
//         }
//         const token = await totp.generate(secret);
//         console.log(token);

//         res.status(200).json({
//             status:'success',
//             message:"token generated successfully",
//             token
//         })
//     }catch(err){
//         throw new AppError('there is a problem in sending otp',404);
//     }
// })

exports.checkValid=catchAsync(async(req,res,next)=>{
    try{
        const token =req.body.otpToken;
        console.log(totp.timeRemaining());
        console.log(totp.timeUsed());
        const isValid = totp.check(token, 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD');
        console.log(isValid);
        res.status(200).json({
            status:'success',
            message:"token generated successfully",
            isValid
        })
    }catch(err){
        new AppError('there is a problem in sending otp',404);
    }
})

// exports.verify=catchAsync(async(req,res,next)=>{
//     try{
//         const token =await req.body.otpToken;
//         const isValid = totp.check(token, 'KVKFKRCPNZQUYMLXOVYDSQKJKZDTSRLD');
//         // console.log(isValid);
//         let isVerified;
//         if(isValid){
//             isVerified = totp.verify({ token, secret });
//         }
//         console.log(isVerified);

//         res.status(200).json({
//             status:'success',
//             message:"token generated successfully",
//             isVerified
//         })
//     }catch(err){
//         new AppError('there is a problem in sending otp',404);
//     }
// })


