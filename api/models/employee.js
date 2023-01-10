const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    //BASIC INFO
    
  fullname: { type: String, required: true },

  // sex: { type: String, required: true },
  // // date_ofBirth:{type:Date,required:true},
  // nationality: { type: String, required: true },
  // id_number:{type:String, required:true},
  
//     //CONTACT INFO
//   email: { type: String, required: true, unique: true },

//   phoneNumber: { type: String, required: true },
//   optionalNumber: { type: String, required: true },
//   emergency_contact:{type:String,required:true},
//     //EMPLOYEMENT INFO
     
//   hireDate: { type: Date, default: Date.now },
//   joiningDate: { type: Date, default: Date.now },
//   employeeCode: { type: String, required: true },
//   employeeType: { type: String, required: true },
//   accountTitle: { type: String, required: true },
//   accountNumber: { type: String, required: true },
//   paymentMethod: { type: String, required: true },
//   separationDate: { type: String, required: true },
// //SALARY INFO
//   // basicSalary: { type: String, required: true },
//   // housingAllowance: { type: String, required: true },
//   // positionAllowance: { type: String, required: true },
//   // hardshipAllowance: { type: String, required: true },
//   // desertAllowance: { type: String, required: true },
//   // transportAllowance: { type: String, required: true },
//   // cashIndeminityAllowance: { type: String, required: true },
//   // fieldAllowance: { type: String, required: true },
//   // overtimeEarning: { type: String, required: true },
//   // otherEarning: { type: String, required: true },
//   // lateSittingOverTime: { type: String, required: true },
//   // arrears: { type: Number },
//   // dayDeduction: { type: Number },
//   // socialSecurity: { type: Number },
//   // providentFund: { type: Number },
//   // EOTBDeduction: { type: Number },
//   // TaxDeduction: { type: Number },
//   // netSalary: { type: Number },
  // allowance: [{
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'allowance',
   
  //  }],
  allowance: [
    {
     type:mongoose.Schema.Types.ObjectId,
     
     ref:'Allowance',}
     
  ],
  
  department: [
    {
     type:mongoose.Schema.Types.ObjectId,
     
     ref:'Department',}
     
  ],
  payroll: [
    {
     type:mongoose.Schema.Types.ObjectId,
     
     ref:'Payroll',
    }
     
  ],


   deduction:[ {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deduction',
    
   }],
//   image:[],
});

module.exports = mongoose.model('Employee', employeeSchema);
