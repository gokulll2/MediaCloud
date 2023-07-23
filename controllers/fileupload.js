const File = require("../models/File");

//Localfile upload -> Handler Function

exports.localFile = async(req,res)=>{
    try{
        //Fetch a file
        const file = req.files.file;
        console.log("File aagayi Ji ->",file);
        //create path where file needs to be stored on server
        let path = __dirname + "/files/" + Date.now() + `.${file.name.split('.')[1]}`;
        console.log("PATH->",path); 

        //add path to the move function 
        file.mv(path , (err)=>{
            console.log(err);
        })
        //Create a successful Response
        res.json({
            success:true,
            message:'Local file uploaded successfully',
        })
    } catch(error){
        console.log(error); 
    }
}
//image upload handler 
exports.imageUpload = async (req,res)=>{
    try{
        //data fetch
        const {name , tags , email} = req.body;
        console.log(name , tags ,email);
        const file = req.files.imageFile
    } catch(error){

    }
}