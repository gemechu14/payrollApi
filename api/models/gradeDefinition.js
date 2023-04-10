const mongoose = require('mongoose');

const gradeDefinitionSchema = mongoose.Schema({
  gradeName: { type: String, required: true, unique: true },
  basicSalary: { type: String, required: true, default: 0 },
  // housingAllowance: {
  //  amount:{type: Number, default: 0},
  //  isTaxable:{ type:Boolean, default:false }    
  // },
  // positionAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }
    
  // },


  // hardshipAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }
    
  // },
  // desertAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }
  // },
  // transportAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }

  // },
  // cashIndeminityAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }

  // },
  // fieldAllowance: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }

  // },
  // overtimeEarning: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }

  // },

  allowance: [
    {
      type: mongoose.Schema.Types.ObjectId,

      ref: "GradeAllowance",
    },
  ],
companyId:{type:String},
  // otherEarning: {
  //   amount:{type: Number, default: 0},
  //   isTaxable:{ type:Boolean, default:false }

  // }
});

module.exports = mongoose.model('GradeDefinition', gradeDefinitionSchema);
