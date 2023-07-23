const File = require("../models/File");
const cloudinary = require("cloudinary").v2
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

function isSupportedTypes(type , supportedTypes)
{
    return supportedTypes.includes(type);
}
async function uploadFiletoCloudinary(file,folder){
    const options = {folder}
   console.log("temp File Path ->",file.tempFilePath)
   options.resource_type = "auto"
   return await cloudinary.uploader.upload(file.tempFilePath ,options)
}

exports.imageUpload = async (req,res)=>{
    try{
        //data fetch
        const {name , tags , email} = req.body;

        console.log(name , tags ,email);

        const file = req.files.imageFile;
         console.log(file);

        //Validation
        const supportedTypes = ['jpeg' , 'jpg' , 'png'];
        const fileType =  file.name.split('.')[1].toLowerCase();
        console.log(fileType);
        if(!isSupportedTypes(fileType,supportedTypes))
        {
            return res.status(400).json({
                success:false,
                message:"File Format not Supported",
            })
        }
        //File Format Supported hai
        console.log("Uploading to CloudMedia");
        const response = await uploadFiletoCloudinary(file,"CloudMedia");
        console.log(response)

        //Db mei entry save
        const fileData = await File.create({
            name,
            email,
            tags,
            imageUrl:response.secure_url,  
        })
        return res.json({
            success:true,
            imageUrl:response.secure_url,
            message:"Image Successfully Uploaded"
        })

    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}

//Video upload ka handler

exports.videoUpload = async (req,res)=>{
    try{
        const {name, email , tags} = req.body;
        console.log(name,email,tags);
        const file = req.files.videoFile;
        
        //Validation
        const supportedTypes = ["mp4","mov"];
        const fileType = file.name.split('.')[1].toLowerCase();
        console.log("File Type",fileType);
        if(!isSupportedTypes(fileType,supportedTypes) || file.size > 5 * 1024 * 1024) //5mb 
        {
            return res.status(400).json({
                success:false,
                message:"File Format not Supported",
            })
        }
        console.log("Uploading to CloudMedia");
        const response = await uploadFiletoCloudinary(file,"CloudMedia")
        console.log(response);

       const fileData = File.create({
        name,
        email,
        tags,
        imageUrl:response.secure_url,
       })

        res.json({
        success:true,
        videoUrl:response.secure_url,
        message:"Video SuccessFully Uploaded",
       })
    } catch(error){
        console.log(error);
        return res.status(400).json({
            success:false,
            message:"Something went wrong",
        })
    }
}
//Image reducer handler Function
