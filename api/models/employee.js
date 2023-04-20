const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const employeeSchema = mongoose.Schema({
  // BASIC INFO


  fullname: {
    type: String,
    required: true,
  },
  images: {
    type: String,
  },
  sex: {
    type: String,
    required: true,
  },
  date_of_birth: {
    type: Date,
    required: true,
  },
  role: {
    type: String,
    enum: ['employee', 'approver'],
    default: 'employee',
  },

  nationality: {
    type: String,
    required: true,
  },
  marriageStatus: {
    type: String,
    enum: ['Single', 'Married', 'Divorced'],
    default: 'Single',
  },
  id_number: {
    type: String,
  },

  // //     //CONTACT INFO
  email: {
    type: String,
    required: true,
    unique: true,
  },

  phoneNumber: {
    type: String,
    required: true,
  },
  optionalNumber: {
    type: String,
  },
  emergency_contact_Info: {
    contact_name: { type: String },
    relationship: { type: String },
    contact_phoneNumber: { type: String }
  },
  // EMPLOYEMENT INFO

  isDeactivated: {
    type: Boolean,
    default: false
  },
  hireDate: {
    type: Date,
    default: new Date(),
  },
  joiningDate: {
    type: Date,
  },
  employeeCode: {
    type: String,
  },
  employeeType: {
    type: String,
  },
  accountNumber: {
    type: String,
  },
  password: {
    type: String,
  },

  // paymentMethod: {
  //   type: String,
  // },
  // separationDate: {
  //   type: String,
  // },
  // //SALARY INFO
  basicSalary: {
    type: String,
    required: true,
  },
  // housingAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // positionAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // hardshipAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // desertAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // transportAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // cashIndeminityAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  // fieldAllowance: {
  //   amount: { type: Number, default: 0 },
  //   isTaxable: { type: Boolean, default: false }
  // },
  overtimeEarning: {type: Number, default: 0 },
  
  otherEarning: {  type: Number, default: 0 },
  
  lateSittingOverTime:   { type: Number, default: 0 },
   
  arrears:  { type: Number, default: 0 },
    
  
  dayDeduction: { type: Number, default: 0 },
  
  socialSecurity: {
    type: Number,
    default: 0,
  },
  providentFund: {
    type: Number,
    default: 0,
  },
  EOTBDeduction: {
    type: Number,
    default: 0,
  },
  TaxDeduction: {
    type: Number,
    default: 0,
  },

  // payrollInfo: {
  // year: [String],
  // month:{
  //     month:[String],
  //     payroll: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,

  //         ref: 'Payroll',
  //       }

  //     ],
  // },

  //    },

  // payrollInfo: [{
  // name: [String],
  // year:[{
  // month: [{
  //     month: [String],
  //     payroll: [
  //       {
  //         type: mongoose.Schema.Types.ObjectId,

  //         ref: 'Payroll',
  //       }

  //     ],
  // },
  // ]}]
  // }],
  sumOfAllowance: { type: Number, default: 0 },
  sumOfDeduction: { type: Number, default: 0 },

  payslip:
    [
      {
      month: { type: String },
      year: { type: String },
      arrears: { type: Number, default: 0 },
      lateSittingOverTime: { type: Number, default: 0 },
      dayDeduction: { type: Number, default: 0 },
      EOTBDeduction: { type: Number, default: 0 },
      basicSalary: { type: Number, default: 0 },
      sumOfAllowance: { type: Number, default: 0 },
      sumOfDeduction: { type: Number, default: 0 },
      netSalary: { type: Number ,default:0},
      payrollId: [{  type: mongoose.Schema.Types.ObjectId, ref: "Payroll",} ],
      approval: { 
        counter: { type: Number, default: 0 },            
        isApproved:{type:Boolean, default:false}

       }
    },
    
   
  ]

,
  year: [
    {
      name: {
        type: String,
   
      },
      month: [
        {
          name: {
            type: String,
            // unique:true,
          },
          arrears: String,
          lateSittingOverTime: String,
          dayDeduction: String,
          EOTBDeduction: String,
          netSalary: String,
          // payrollStatus: {
          //     type: Boolean,
          //     default: false
          // },
          payrollStatus: { type: Boolean, default: false },

          payroll: [
            {
              type: mongoose.Schema.Types.ObjectId,
              ref: "Payroll",
            },
          ],
        },
      ],
    },
  ],

  netSalary: {
    type: Number,
  },

  allowance: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Allowance",
    },
  ],
  gradeId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GradeDefinition",
    },
  ],

  department: {
    type: mongoose.Schema.Types.ObjectId,

    ref: "Department",
    // required: true
  },
  companyId: {
    type: String,
  },
  position: {
    type: String,
  },
  pension: {
    type: Number,
    default: 0
  },
  total_allowance: {
    type: Number,
    default: 0
  },
  total_deduction: {
    type: Number,
    default: 0
  },
  payroll_isApproved: {
    type: Boolean,
    default: "false",
  },
  payroll: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Payroll",
    },
  ],



  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,
  // year1:[ {
  //     type: mongoose.Schema.Types.ObjectId,

  //     ref: 'year',
  //     month:[

  //     ]
  //     // required: true

  // }],

  deduction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deduction",
    },
  ],
  // img:
  // {
  //      data: Buffer,
  //      contentType: String
  // }
});
// employeeSchema.index({ "year.name": 1, "year.month.name": 1 }, { unique: true })



employeeSchema.pre('save', async function (next) {
  //only run this function if password was actually modified
  if (!this.isModified('password')) return next();
  //hash password
  this.password = await bcrypt.hash(this.password, 12);
  // //delete confirmPassword from database
  // this.confirmPassword = undefined;
  next();
});

employeeSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

employeeSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );
    return JWTTimestamp < changedTimestamp;
  }
  //false if password was not changed
  return false;
};

employeeSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  console.log(resetToken, this.passwordResetToken);
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
  return resetToken;
};
employeeSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();
  this.passwordChangedAt = Date.now() - 1000;
  next();
});
employeeSchema.pre(/^find/, function (next) {
  this.find({ active: { $ne: false } });
  next();
});


module.exports = mongoose.model("Employee", employeeSchema);
