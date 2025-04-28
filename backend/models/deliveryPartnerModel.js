const crypto = require('crypto');
const mongoose = require('mongoose');
const  validator = require('validator');
const bcrypt = require('bcryptjs');
const catchAsync = require('../utils/catchAsync');





const deliveryPartnerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: [true,'please tell us your name!']
    },
    email:{
        type: String,
        required: [true,'please provide your email!'],
        unique: true,
        lowercase: true,
        validate:[validator.isEmail,'please provide a valid email']
    },
    photo:String,
    password:{
        type: String,
        required: [true,'please provide a password!'],
        minlength:3,
        maxlength:90,
        
        select:false,
    
    },
    passwordConfirm:{
        type: String,
        required: [true,'please confirm your password!'],
        select: false,
        minlength:3,
        maxlength:90,

        validate:{
            //this only works on create and save!!
            validator: function (el) {
                return el===this.password;
            },message: 'passwords are not same'
        },
        // minlength:8
    },
    passwordChangedAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
    active:{
        type:Boolean,
        default:true,
        select:false,
    } ,
    status: {
        type: String,
        enum: ['idle', 'available', 'delivering'],
        default: 'available',
      },
      currentOrder: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Order',
        default: null,
      },
},
{
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }

)



deliveryPartnerSchema.pre('save',async function(next){
    if(!this.isModified('password')) return next();
    this.password =await bcrypt.hash(this.password,13);
    this.passwordConfirm=undefined;
    next();
})



deliveryPartnerSchema.pre('save',function (next) {
    if(!this.isModified('password')||this.isNew)
    return next();    
    this.passwordChangedAt = Date.now()-1000;
    next();
})


deliveryPartnerSchema.pre('find',function (next) {
    this.find({active: {$ne:false}});
    next();
})



deliveryPartnerSchema.methods.correctPassword = async function (candidatePassword,userPassword) {
    console.log("1044444444444444444444444444444444444444")
    console.log(candidatePassword,userPassword);
    // console.log(typeof candidatePassword);
    // console.log(typeof userPassword);
    console.log("1044444444444444444444444444444444444444")
    return await bcrypt.compare(candidatePassword,userPassword);
}

deliveryPartnerSchema.methods.changesPasswordAfter = function(JWTTimestamp){
    if(this.passwordChangedAt){
        const changedTimestamp = parseInt(this.passwordChangedAt.getTime()/1000,10);
        
        return JWTTimestamp<changedTimestamp;
    }
    
    return false;
}


deliveryPartnerSchema.methods.createPasswordResetToken =function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken=crypto.createHash('sha256').update(resetToken).digest('hex');
    
    this.passwordResetExpires = Date.now()+10*60*1000;
    
    return resetToken;
}




const DeliveryPartner = mongoose.model("DeliveryPartner",deliveryPartnerSchema);
module.exports = DeliveryPartner;