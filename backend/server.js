const dotenv = require('dotenv');
dotenv.config({path:'./config.env'});
const mongoose = require('mongoose');
const app=require('./app');
const DB=process.env.DATABASE.replace("<PASSWORD>",process.env.DATABASE_PASSWORD);
mongoose.connect(DB,{
}).then((con)=>{
    console.log("Database Connected,Lets get to work");
});

const port=process.env.PORT;
const server = app.listen(port,()=>{
    console.log(`Welcome to the server...${port}`);
    require('./utils/jobSchedulars/cancelUnpaidOrders');
    require('./utils/jobSchedulars/updateArrivedOrders');
})

//handing un''handled rejection like changing of passwords of database in between
process.on('unhandledRejection',(err)=>{
    console.log("Unhandled Rejections⚠️....shutting down🥲")
    console.log(err);
    server.close(()=>{
        process.exit(1);
    });
})

//handling uncaught exceptions like any variable not defined
process.on('uncaughtException',(err)=>{
    console.log("Uncaught Exceptions⚠️....shutting down🥲")
    console.log(err);
        process.exit(1);
})