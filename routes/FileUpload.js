const express = require("express");
const router = express.Router();

const {localFile,imageUpload,videoUpload,imageSizeReducer} = require("../controllers/fileupload");

router.post('/imageUpload',imageUpload)
router.post('/videoUpload' , videoUpload);
router.post('/imageSizeReducer' , imageSizeReducer);
router.post('/localFileupload' , localFile);

module.exports = router;
