const {viewProduct,addItems,removeItem,updateItemName} = require("./admin.controller");
const router = require('express').Router();
const multer = require("multer");
const path = require("path");
const express = require("express");

const storage = multer.diskStorage({
    destination:'./upload/images',
    filename:(req,file,callBack)=>{
        console.log(file.originalname);
        return callBack(null,`${file.fieldname}_${Date.now()}${path.extname(file.originalname)}`)
    }
});

const upload = multer({storage:storage,
    limits:{fileSize:1000000}
})
// router.post("/upload",upload.single('profile'),(req,res)=>
// {   
//     res.json({
//         success:1,
//         profile_url:`http://localhost:8000/profile/${req.file.filename}`
//     })

// })

router.get("/",viewProduct);
router.post("/",upload.single('item_image'), addItems);
router.delete("/",removeItem);
router.patch("/",upload.single('item_image'),updateItemName);

module.exports = router;