//app create
const express = require("express")
const app = express();

//Port find karna hai
require("dotenv").config();
const Port = process.env.PORT

//middleware karna hai
app.use(express.json());
const fileupload = require("express-fileupload")
app.use(fileupload());

//DB Connection Karna
const db = require("./config/database")
db.connectDb();
//Cloud se connect krna hai
const cloudinary = require("./config/cloudinary");
cloudinary.cloudinaryConnect();

//api route mount karna hai
const Upload = require("./routes/FileUpload")
app.use("api/v1/upload",Upload);

//Activate Server
app.listen(Port, ()=>{
    console.log(`App is running at ${Port} successfully`);
})