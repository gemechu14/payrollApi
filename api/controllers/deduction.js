const Deduction = require('../models/deduction.js');
//const Deduction=require('../models/deduction.js');
const Employee=require('../models/employee.js')





//GET ALL
exports.get_All_Deduction = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const deduction = await Deduction.find();
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
