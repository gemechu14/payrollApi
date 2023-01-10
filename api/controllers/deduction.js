const Deduction=require('../models/deduction.js');


exports.add_Deduction = async (req, res) => {
  const newDeduction = new Deduction(req.body);
  try {
    const savedDeduction = await newDeduction.save();
    console.log(req.body);
    res.status(200).json({
      savedDeduction,
    });
   
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};


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
//DELETE
exports.delete_Deduction= async (req, res) => {
  try {
    await Deduction.findByIdAndDelete(req.params.id);
    res.status(200).json('Deduction has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};




exports.Create_Allowances = async (req, res, next) => {
  
  const employeeId = req.params.employeeId;
  const newAllowance = new Allowance(req.body);
  try {
      const savedAllowance = await newAllowance.save();
     try {
  
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { allowance: savedAllowance._id },
      
    },      { new: true, useFindAndModify: false }
    );
  } catch (err) {
    next(err);
  }

  res.status(200).json(savedAllowance);
} catch (err) {
  next(err);
}
};