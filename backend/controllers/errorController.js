//global error handler
module.exports=(err,eq,res,next)=>{
    console.log("e");
    console.log(err);
    err.statusCode=err.statusCode||500;
    err.status=err.status||'error';
    res.status(err.statusCode).json({
        status:err.status,
        message:err.message||'error'
        
    })
}