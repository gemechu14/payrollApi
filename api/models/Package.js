const mongoose=require('mongoose');

const PackageSchema=mongoose.Schema({
packageName:{
    type:String,
    required:true
},
packagePrice:{
    type:String,
    required:true
},

description:{
    type:String,

}}
);