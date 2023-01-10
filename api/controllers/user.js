// const user = require("../models/user.js");
const User=require("../models/user.js");

exports.updateUser = async (req,res,next)=>{
  try {
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedUser);
  } catch (err) {
    next(err);
  }
}
exports.deleteUser = async (req,res,next)=>{
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json("User has been deleted.");
  } catch (err) {
    next(err);
  }
}
exports.getUser = async (req,res,next)=>{
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    next(err);
  }
}
exports.getUsers = async (req,res,next)=>{
  try {
    const users = await User.find();
    res.status(200).json({
      count:users.length,
      users
    });
  } catch (err) {
    next(err);
  }
}

//ADMIN
exports.super_admin=async(req,res,next)=>{

const userId=req.params.userId;

  try {
const data=await User.updateOne({_id:userId},{$set:{isactive:true}})  
res.status(200).json(data);
 } catch (err) {
    next(err)
  }
}