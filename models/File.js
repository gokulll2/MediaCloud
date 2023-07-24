const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const SendmailTransport = require("nodemailer/lib/sendmail-transport");
require("dotenv").config();
const fileSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
    },
    imageUrl:{
        type:String,
    },
    tags:{
        type:String,
    }
})

//Post middleware
fileSchema.post("save",async function(doc){
    try{
        console.log("DOC",doc);
        //Transporter
        let transporter = nodemailer.createTransport({
            host:process.env.MAIL_HOST,
            auth:{
                user:process.env.MAIL_USER,
                pass:process.env.MAIL_PASS,
            },
        })

        //Send Mail
        let info = await transporter.sendMail({
            from:`Data`,
            to:doc.email,
            subject:"New File Uploaded on Cloud",
            html:`<h2>Hello</h2> <p>File Uploaded View here <a href = "${doc.imageUrl}">${doc.imageUrl}</a> </p>`,
        })
        console.log("INFO",info)
    } catch(error){

    }
})
const File = mongoose.model("File",fileSchema);
module.exports = File;