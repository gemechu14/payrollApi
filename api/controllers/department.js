const Department = require('../models/department.js');
const Employee = require('../models/employee.js');

exports.add_dept = async (req, res) => {
  const employeeId=req.params.employeeId;
  const newDept = new Department(req.body);
  try {
    const savedDept = await newDept.save();
    console.log(req.body);

    try {
      await Employee.findByIdAndUpdate(employeeId, {
        $push: { department: savedDept._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json({ savedDept });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

//GET ALL
exports.get_All_Dept = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const depts = await Department.find();
    res.status(200).json({
      count: depts.length,
      depts,
    });
  } catch (err) {
    next(err);
  }
};
//GET SINGLE DEPT
exports.get_singe_Dept = async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    res.status(200).json(dept);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateDept = async (req, res) => {
  try {
    const updatedDept = await Department.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDept);
  } catch (error) {}
};
//DELETE
exports.delete_Dept = async (req, res) => {
  try {
    await Department.findByIdAndDelete(req.params.id);
    res.status(200).json('Department has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};

//SEARCH BY DEPARTMENT IDD

exports.search_By_Department = async (req, res) => {
  const departmentId = req.params.departmentId;
  try {
  } catch (err) {
    next(err);
  }
};
