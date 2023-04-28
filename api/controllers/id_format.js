const Deduction = require("../models/deduction.js");
//const Deduction=require('../models/deduction.js');
const IDFormat = require("../models/defineIDFormat.js");
const mongoose = require("mongoose");
const createError = require("../utils/error.js");



///////////////
exports.add_new_idFormat = async (req, res, next) => {
    try {

        const { prefix, description } = req.body;
        const checkFormat=await IDFormat.find({companyId:req.user.id
     
        })

console.log("format",checkFormat.length)

   if(checkFormat.length==0){
       const newIDFormat = await IDFormat.create({
           prefix: prefix,
           description: description,
           companyId: req.user.id,
       });
       res.status(200).json({
           newIDFormat
       });

   }else{
    res.status(404).json('you have already added ')
   }
     
    } catch (err) {
        res.status(404).json({
            error: err,
        });
    }
};


//GET ALL
exports.get_All_Id_format = async (req, res, next) => {
    const failed = true;

    try {
        const idFormat = await IDFormat.find({ companyId: req.user.id });
        res.status(200).json({
            count: idFormat.length,
            idFormat,
        });
    } catch (err) {
        next(createError.createError(404, err));
    }
};


//GET one
exports.get_single_Deduction = async (req, res) => {
    try {
        const idFormat = await IDFormat.findById(req.params.id);


        res.status(200).json(idFormat);
    } catch (error) {
        res.status(500).json(error);
    }
};
//UPDATE
exports.updateIDFormat = async (req, res) => {
    try {
        const idformat= await IDFormat.findByIdAndUpdate(
            req.params.id, { $set: req.body }, { new: true }
        );
  
        res.status(200).json(idformat);


   


    } catch (err) { 

        res.status(404).json({message:"not working"});
    }
};





//Delete 

exports.deleteIDFormat=async(req,res,next)=>{

try {


    const idFormat = await IDFormat.find(mongoose.Types.ObjectId(req.params.id));

    if (idFormat.length != 0) {

        await IDFormat.findByIdAndDelete(req.params.id);
        
        res.status(200).json("Deleted successfully");
    }
    else {
        res.status(200).json("There is no such Id Format ");
    }

} catch (err) {
    res.status(404).json(err)
}

}