const mongoose = require("mongoose");
const validator = require('validator');
const bcrypt = require('bcrypt');
const crypto = require('crypto');
const idformat=require('./defineIDFormat.js');
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
employeeTIN:{type:String}, 

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

  overtimeEarning: {type: Number, default: 0 },
  Acting: { type: Number, default: 0 },


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
        payrollId: [{ type: mongoose.Schema.Types.ObjectId, ref: "Payroll",} ],
      approval: { 
        counter: { type: Number, default: 0 },            
        isApproved:{type:Boolean, default:false}

       }
    },
     
  ]

,
  payroll: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "Payroll",
    },
  ],

  allowance: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "GradeAllowance",
    },
  ],
  
  personal_allowance: [
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


  loanId: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Loan",
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

  // payroll: [
  //   {
  //     type: mongoose.Schema.Types.ObjectId,

  //     ref: "Payroll",
  //   },
  // ],
  permissions: {
    payroll: {
      view: {type:Boolean,default:false},
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    },
    employee: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    },
    deduction: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    }, 
    allowance: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    },
    grade: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    },
    taxslab: {
      view: { type: Boolean, default: false },
      create: { type: Boolean, default: false },
      approve: { type: Boolean, default: false },
    }
  },




  // customRole:{

  //   "  ":permition{
  // taxslab: {
  //   view: { type: Boolean, default: false },
  //   create: { type: Boolean, default: false },
  //   approve: { type: Boolean, default: false },
  // }
  //   }
  // },

  passwordChangedAt: Date,
  passwordResetToken: String,
  passwordResetExpires: Date,

  deduction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Deduction",
    },
  ],
  generaldeduction: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "GeneralDeduction",
    },
  ],

});


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


employeeSchema.pre('save',async function (next) {

//   console.log("let check what is happering")


  let employee = this;

const idformat1=await idformat.find({companyId:employee?.companyId});

  if (!employee.id_number) {
    mongoose
      .model('Employee', employeeSchema)
      .countDocuments({}, function (err, count) {
        if (err) return next(err);
        employee.id_number = idformat1[0]?.prefix ? idformat1[0]?.prefix + ('0000' + (count + 1)).slice(-4) : "" + ('0000' + (count + 1)).slice(-4).save();
              
        next();
      });
  } else {
    console.log('not working')
    next();
  }
});


module.exports = mongoose.model("Employee", employeeSchema);
