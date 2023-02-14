const Deduction = require('../models/deduction.js');
//const Deduction=require('../models/deduction.js');
const Employee=require('../models/employee.js')
const mongoose=require('mongoose');


//GET ALL
exports.get_All_Deduction = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const deduction = await Deduction.find({companyId:req.user.id});
    res.status(200).json({
      count: deduction.length,
      deduction,
    });
  } catch (err) {
    next(err);
  }
};
//GET one
exports.get_single_Deduction = async (req, res) => {
  try {
    const deduction = await Deduction.findById(req.params.id);
    res.status(200).json(deduction);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateDeduction = async (req, res) => {
  try {
    const updatedDeduction = await Deduction.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDeduction);
  } catch (error) {}
};


///////////////
exports.add_new_deduction = async (req, res) => {
  try {
    const {
      name,
      amount,
      month,
      year,
      description,
      
    }=req.body;
    const newDeduction = await Deduction.create({
      name:name,
      amount:amount,
      month:month,
      year:year,
      description:description,
      companyId:req.user.id
    })
 


    //const savedPayroll = await newPayroll.save();

    console.log(req.body);
    res.status(200).json({
      newDeduction,
    });
   
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};




//ADD 

exports.Add_Deduction = async (req, res, next) => {
  
  const employeeId = req.params.employeeId;
  const newDeduction = new Deduction(req.body);
  console.log(employeeId);
  try {
      const savedDeduction = await newDeduction.save();
     try {
  
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { deduction: savedDeduction._id },
      
    },      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    next(err);
  }

  res.status(200).json(savedDeduction);
} catch (err) {
  next(err);
}
};


//DELETE DEDUCTION
 
 exports.delete_Deduction = async (req, res) => {
  const employeeId = req.params.employeeId;
try {
  await Deduction.findByIdAndDelete(req.params.id);
  try {
      console.log(req.params.id);
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: {deduction: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json("Deductin has been deleted.");
} catch (err) {
  next(err);
}
};





exports.Update_DE = async (req, res, next) => {
  
  const employeeId = req.params.employeeId;
  const newDeduction = new Deduction(req.body);
  try {
      const savedDeduction = await newDeduction.save();
     try {
  
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { deduction: req.body.id },
      
    },      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    next(err);
  }

  res.status(200).json(savedDeduction);
} catch (err) {
  next(err);
}
};




//DELETE Allowances
exports.delete_Allowances = async (req, res) => {
  const employeeId = req.params.employeeId;
try {
  await Deduction.findByIdAndDelete(req.params.id);
  try {
      console.log(req.params.id);
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: {deduction: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json("Allowance has been deleted.");
} catch (err) {
  next(err);
}
};






//ADD EXISTING Deduction TO EMPLOY


exports.addExistingDeduction=async (req,res,next)=>{
  try {
    const deductionId=req.params.deductionId;
   const employeeId=req.params.employeeId;

  console.log(deductionId);

  const check=await Employee.find({_id:employeeId});

  //console.log(mongoose.Types.ObjectId(deductionId));
//console.log(!Zcheck[0].deduction.includes(mongoose.Types.ObjectId(deductionId)))
  //console.log( check.deduction.includes(mongoose.Types.ObjectId(deductionId)));

if(!check[0].deduction.includes(mongoose.Types.ObjectId(deductionId))){
  const updated=  await Employee.findByIdAndUpdate(employeeId, {
      $push: { deduction: deductionId},
      
    },      { new: true, useFindAndModify: false }
    ).populate('deduction')
    .populate('allowance');

    res.status(200).json(updated);

  }
  else{
    res.status(404).json('already added')
  }
  
  } catch (err) {
    next(err);
  }

}
