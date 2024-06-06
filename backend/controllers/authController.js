//LTT - check lecture 134
//LTT - course section 8
//TODO - remove the review
//TODO - block reset password page

//REVIEW -

const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const Email = require("../utils/email");
const crypto = require("crypto");
const { totp } = require("otplib");
const { type } = require("os");
const cookieParser = require("cookie-parser");




const signToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);
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

  user.password = undefined;
  res.status(statusCode).json({
    status: "success",
    token,
    data: {
      user,
    },
  });
};

exports.signUp = catchAsync(async (req, res, next) => {
  const newUser = await User.create({
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

  const user = await User.findOne({ email }).select("+password");
  // console.log(user);
  if (!user) {
    return next(new AppError("Incorret email or password", 401));
  }
  
  // if (!correct) {
  //   res.status(400).json({
  //     status:"fail",
  //     message:"invalid email or password"
  //   })
  // }
  
  const correct =await user.correctPassword(password, user.password);
  console.log(correct,"⚠️⚠️");
  if (!user || !correct) {
    return next(new AppError("Incorret email or password", 401));
  }

  const url =
    "https://static.langimg.com/photo/imgsize-142503,msid-87446458/navbharat-times.jpg"; //NOTE - update later
  await new Email(user, url).sendWelcome();
  createSendToken(user, 201, res);
});    

exports.protect = catchAsync(async function (req, res, next) {
  console.log("⚠️");
  console.log(req.cookies.jwt);
  console.log(req.signedcookies);
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

  //check if user still exists

  const currentUser = await User.findById(decoded.id);
  if (!currentUser) {
    return next(
      new AppError(
        "The user belonging to  this token does no longer exist",
        401
      )
    );
  }

  //check if user changed password after token was issued
  if (currentUser.changesPasswordAfter(decoded.iat)) {
    return next(
      new AppError("User recently changed password! Please log in again.", 401)
    );
  }
  console.log(currentUser);
  req.user = currentUser;

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
    let user = {};
    user.email = req.body.email;
    user.name = req.body.userName;
    let url = "https://www.npmjs.com/package/otplib";
    // console.log(token);
    user.otp=token;

    await new Email(user, url).sendOtp();
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
  // get user password based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError("there is no user with this email address"), 401);
  }
  //generat random reset token
  const resetToken = user.createPasswordResetToken();
  await user.save({ validateBeforeSave: false });

  //send it to user gmail

  try {
    // await sendEmail({
    //     email:user.email,
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
    
    await new Email(user, resetURL).sendPasswordReset();

    res.status(200).json({
      statusbar: "success",
      message: "Token sent to email",
    });
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(
      new AppError("there was an error sending email,try again later", 500)
    );
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //get user based on token
  const hashedToken = crypto
    .createHash("sha256")
    .update(req.params.token)
    .digest("hex");

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });

  //if token has not expired .and there is user ,set the password

  if (!user) {
    return next(new AppError("token is invalid or has expired", 400));
  }

  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  // user.saveAfterResetPassword();
  await user.save();
  //update changepasswordat property for user
  res.status(200).json({
    status: 'success',
    message: 'Password reset successful, please login again'
  })
  //log the user in send jwt
  // createSendToken(user, 201, res);
});
exports.updatePassword = catchAsync(async (req, res, next) => {
  // get user from collection
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
  
  const user = await User.findById(req.user.id).select("+password");
  // console.log(await user.correctPassword(req.body.passwordCurrent, user.password));
  // check if posted current password is
    console.log(user);
    const correct =await user.correctPassword(req.body.passwordCurrent, user.password);
  
  
  if (!correct) {
    return next(new AppError("your current password is wrong", 401));
  }
  
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();
  createSendToken(user,200,res);
  // log user in send jwt
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


