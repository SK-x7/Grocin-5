//inbuilt packages
//REVIEW - 
const express = require('express');
const app= express();
const rateLimit = require('express-rate-limit')
const helmet = require('helmet');
const mongoSanitize = require('express-mongo-sanitize');
const xss = require('xss-clean');
const hpp = require('hpp');
//----
const AppError=require('./utils/appError');

const userRouter = require('./routes/userRoute');
const categoryRouter = require('./routes/categoryRoute');
const subCategoryRouter = require('./routes/subCategoryRoute');
const productRouter = require('./routes/productRoute');
const reviewRouter = require('./routes/reviewRoute');
const orderRouter = require('./routes/orderRoute');

const globalErrorHandler=require('./controllers/errorController');
const cookieParser = require("cookie-parser");



const  cors=require("cors")

app.use((req, res, next) => {
    // req.requestTime = new Date().toISOString();
    // console.log(req.requestTime);
    console.log("💥💥💥")
    // console.log(req.protocol);
    // console.log(req.hostname)
    // // console.log(req.hostname)
    // // console.log(req.headers.;
    console.log(
      
      `${req.get('referer')}`,
      );


    next();
  });

app.use(cors({credentials:true,origin:true}));
app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Credentials', true);
    res.header('Access-Control-Allow-Origin', req.headers.origin);
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,UPDATE,OPTIONS');
    res.header('Access-Control-Allow-Headers', 'X-Requested-With, X-HTTP-Method-Override, Content-Type, Accept');
    next();
  });
// app.options('*', cors());

app.use(cookieParser({
secure: true,
}));


app.use(express.static('public'));
const limiter = rateLimit({
    max:1000,
    windowMs:60*60*1000,
    message:'Too many requests from this ip please try again in an hour!'
});



//set security htttp headers
app.use(helmet());
//limit requests from same IP
app.use('/api',limiter);
//body parser,reading data from body into req.body
app.use(express.json());

//data sanitization against nosql query injection
app.use(mongoSanitize());
//and against xss
app.use(xss());
//prevnet params pollution
//NOTE - add whitelist later
app.use(hpp());

app.use('/api/v1/users', userRouter);
app.use('/api/v1/category', categoryRouter);
app.use('/api/v1/subcategory', subCategoryRouter);
app.use('/api/v1/product', productRouter);
app.use('/api/v1/reviews', reviewRouter);
app.use('/api/v1/orders', orderRouter);


// app.route('user',user)
// handling unhandled routes
app.all('*',(req,res,next)=>{
    // res.status(404).json({
    //     status:"fail",
    //     message:`cant find ${req.originalUrl} on this server`
    // })
    next(new AppError(`cant find ${req.originalUrl} on this server`, 404));
})


//global error handler
app.use(globalErrorHandler);




module.exports=app;