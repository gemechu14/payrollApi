const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
    //BASIC INFO
    
  fullname: { type: String, required: true },
  images: { type: String },

  sex: { type: String, required: true },
  date_of_birth:{type:Date,required:true},
  nationality: { type: String, required: true },
  id_number:{type:String,},
  
// //     //CONTACT INFO
  email: { type: String, required: true, unique: true },

  phoneNumber: { type: String, required: true },
  optionalNumber: { type: String, },
  emergency_contact:{type:String,},
    //EMPLOYEMENT INFO
     
  hireDate: { type: Date, default: Date.now },
  joiningDate: { type: Date, default: Date.now },
  employeeCode: { type: String,  },
  employeeType: { type: String,  },
  accountTitle: { type: String,  },
  accountNumber: { type: String,},
  paymentMethod: { type: String,  },
  separationDate: { type: String, },
// //SALARY INFO
  basicSalary: { type: String, required: true },
  housingAllowance: { type: String,  },
  positionAllowance: { type: String, },
  hardshipAllowance: { type: String,},
  desertAllowance: { type: String,  },
  transportAllowance: { type: String, },
  cashIndeminityAllowance: { type: String,  },
  fieldAllowance: { type: String,  },
  overtimeEarning: { type: String, },
  otherEarning: { type: String,  },
  lateSittingOverTime: { type: String, },
  arrears: { type: Number },
  dayDeduction: { type: Number },
  socialSecurity: { type: Number },
  providentFund: { type: Number },
  EOTBDeduction: { type: Number },
  TaxDeduction: { type: Number },
  netSalary: { type: Number },

  allowance: [
    {
     type:mongoose.Schema.Types.ObjectId,
     
     ref:'Allowance',}
     
  ],
  
  department: 
    {
     type:mongoose.Schema.Types.ObjectId,
     
     ref:'Department',
     
    }  ,
    companyId:{
      type:String,
      
    }   ,
  
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
  //  img:
  //  {
  //      data: Buffer,
  //      contentType: String
  //  }
});

module.exports = mongoose.model('Employee', employeeSchema);
