const mongoose = require("mongoose");
require("dotenv").config();

exports.connectDb = ()=>{
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser:true,
        useUnifiedTopology:true,
    })
    .then(console.log("DB connection Successfully"))
    .catch((error) =>{
        console.log("ISSUES")
        console.log(error);
       process.exit(1); 
    })
}