const express = require("express");
const router = express.Router();

const {localFile,imageUpload} = require("../controllers/fileupload");

router.post('/imageUpload',imageUpload)
// router.post('/videoUpload' , videoUpload);
// router.post('/imageReducer' , imageReducer);
router.post('/localFileupload' , localFile);

module.exports = router;
