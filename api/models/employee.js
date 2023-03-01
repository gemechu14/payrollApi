const mongoose = require('mongoose');

const employeeSchema = mongoose.Schema({
  //BASIC INFO

  fullname: { type: String, required: true },
  images: { type: String },
  sex: { type: String, required: true },
  date_of_birth: { type: Date, required: true },
  nationality: { type: String, required: true },
  id_number: { type: String, },

  // //     //CONTACT INFO
  email: { type: String, required: true, unique: true },

  phoneNumber: { type: String, required: true },
  optionalNumber: { type: String, },
  emergency_contact: { type: String, },
  //EMPLOYEMENT INFO

  hireDate: { type: Date, default: new Date() },
  joiningDate: { type: Date, },
  employeeCode: { type: String, },
  employeeType: { type: String, },
  accountTitle: { type: String, },
  accountNumber: { type: String, },
  paymentMethod: { type: String, },
  separationDate: { type: String, },
  // //SALARY INFO
  basicSalary: { type: String, required: true },
  housingAllowance: { type: Number,default:0 },
  positionAllowance: { type: Number,default:0 },
  hardshipAllowance: { type: Number,default:0 },
  desertAllowance: { type: Number,default:0 },
  transportAllowance: { type: Number,default:0 },
  cashIndeminityAllowance: { type:  Number,default:0 },
  fieldAllowance: { type: Number,default:0 },
  overtimeEarning: { type: Number,default:0 },
  otherEarning: { type: Number,default:0 },
  lateSittingOverTime: { type: Number,default:0 },
  arrears: { type: Number ,default:0},
  dayDeduction: { type: Number,default:0 },
  socialSecurity: { type: Number,default:0 },
  providentFund: { type: Number,default:0 },
  EOTBDeduction: { type: Number ,default:0},
  TaxDeduction: { type: Number,default:0 },

  // payrollInfo: {
  //   year: [String],
  //   month:{
  //     month:[String],
  //     payroll: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,

  //         ref: 'Payroll',
  //       }

  //     ],
  //   },

  //    },



  // payrollInfo: [{
  //   name: [String],
  //   year:[{
  //   month: [{
  //     month: [String],
  //     payroll: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,

  //         ref: 'Payroll',
  //       }

  //     ],
  //   },
  //   ]}]
  // }],


  year:[
    {
      name:{
        type:String,
        //unique:true,
        //required:true
      },
      month:[
        {
          name:
          {
            type:String,
          //  unique:true,
                      
          },
          arrears:String,
          lateSittingOverTime:String,
          dayDeduction:String,
          EOTBDeduction:String,
          netSalary:String,
          payrollStatus:{type:Boolean,default:'false'},
   
          payroll:[
            {
              type: mongoose.Schema.Types.ObjectId,    
              ref: 'Payroll',
            }
          ],
        }
      ]
    }
  ],




  netSalary: { type: Number },

  allowance: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'Allowance',
    }

  ],

  department:
  {
    type: mongoose.Schema.Types.ObjectId,

    ref: 'Department',
   // required: true

  },
  companyId: {
    type: String,

  },
  position: {
    type: String
  },
  pension:{type:String},
  total_allowance:{type:Number},
  total_deduction:{type:Number},
  payroll_isApproved:{type:Boolean,default:'false'},
  payroll: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: 'Payroll',
    }

  ],

  deduction: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deduction',

  }],
  //  img:
  //  {
  //      data: Buffer,
  //      contentType: String
  //  }
});
//employeeSchema.index({ "year.name": 1, "year.month.name": 1 }, { unique: true })
module.exports = mongoose.model('Employee', employeeSchema);
