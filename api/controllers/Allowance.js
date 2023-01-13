const Allowance=require('../models/Allowance.js');
const Employee=require('../models/employee.js');

// exports.add_Allowance = async (req, res) => {
//   const employeeId=req.params.employeeId;

//   const newAllowance = new Allowance(req.body);
//   try {
//     const savedAllowance = await newAllowance.save();
//     await Employee.findByIdAndUpdate(employeeId, {
//       $push: { allowance: savedAllowance._id },
      
//     },      { new: true, useFindAndModify: false }
//     );
//     console.log(req.body);
//     res.status(200).json({
//       savedAllowance,
//     });
   
//   } catch (err) {
//     res.status(404).json({
//       error: err,
//     });
//   }
// };


//GET ALL
exports.get_All_Allowance = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const allowance = await Allowance.find();
    res.status(200).json({
      count: allowance.length,
      allowance,
    });
  } catch (err) {
    next(err);
  }
};
//GET one
exports.get_single_Allowance = async (req, res) => {
  try {
    const allowance = await Allowance.findById(req.params.id);
    res.status(200).json(allowance);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateAllowance = async (req, res) => {
  try {
    const updatedAllowance = await Allowance.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedAllowance);
  } catch (error) {}
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




///UPDATE
exports.Update_Allowances = async (req, res, next) => {
  
  const employeeId = req.params.employeeId;
  const newAllowance = new Allowance(req.body);
  try {
      const savedAllowance = await newAllowance.save();
     try {
  
    await Employee.findByIdAndUpdate(employeeId, {
      $push: { allowance: req.body.id },
      
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


//DELETE Allowances
exports.delete_Allowances = async (req, res) => {
  const employeeId = req.params.employeeId;
try {
  await Allowance.findByIdAndDelete(req.params.id);
  try {
      console.log(req.params.id);
    await Employee.findByIdAndUpdate(employeeId, {
      $pull: {allowance: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json("Allowance has been deleted.");
} catch (err) {
  next(err);
}
};
