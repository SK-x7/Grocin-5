const nodemailer = require('nodemailer');
const catchAsync = require("../utils/catchAsync")
const pug = require('pug');
const {convert}=require('html-to-text');
// const fs=require('fs');




module.exports = class Email{
    constructor(user,url){
        this.to=user.email;
        this.firstName=user.name.split(' ')[0];
        this.url=url;
        this.from = `Ace1 < ${process.env.EMAIL_FROM}>`;
        this.otp=user.otp;
    }
    
    newTransport(){
        return nodemailer.createTransport({
            // service: 'Brevo',
            host: process.env.SENDINBLUE_HOST,
            port: process.env.SENDINBLUE_PORT,
            auth: {
              user: process.env.SENDINBLUE_LOGIN,
              pass: process.env.SENDINBLUE_PASSWORD,
            },
          });
    }
    
    async send(template,subject){
        
        const html = pug.renderFile(`${__dirname}/../views/email/${template}.pug`, {
            firstName: this.firstName,
            url: this.url,
            subject,
            otp:this.otp
        });
        
        
        //email options
        const mailOptions ={ 
            from: this.from,
            to:this.to,
            subject,
            html,
            text:convert(html),
        }
        
        //create a transport and send email
        
        await this.newTransport().sendMail(mailOptions);

        
    }
    
    async sendWelcome(){
        await this.send('welcomeEmail','Welcome to shopify');
    }
    
    async sendPasswordReset(){
        await this.send('passwordResetEmail','your password reset token valid for only 10 minutes');
    }
    
    async sendOtp(){
        await this.send('sendOtpEmail','Verify  your email address');
    }
}




