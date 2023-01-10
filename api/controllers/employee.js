const Employee = require('../models/employee.js');
const Department=require('../models/department.js')
//Add
exports.add_employee = async (req, res) => {
  const newEmployee = new Employee(req.body);
  try {
    const saved = await newEmployee;
    const savedEmployee = await newEmployee.save();
    console.log(req.body);
    res.status(200).json({
      savedEmployee,
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};



//GET ALL
exports.get_All_Employee = async (req, res, next) => {
  const failed = true;

  try {
    const employee = await Employee.find()
    .populate('department')
    .populate('allowance')
    .populate('payroll')
    ;
    res.status(200).json({
      count: employee.length,
      employee,
    });
  } catch (err) {
    next(err);
  }
};
//GET one
exports.get_single_Employee = async (req, res) => {
  try {
    const employee = await Employee.findById(req.params.id);
    res.status(200).json(employee);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateEmployee = async (req, res) => {
  try {

    const updatedEmployee = await Employee.findByIdAndUpdate(
      req.params.employeeId,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedEmployee);
  } catch (error) {}
};




//DELETE EMPLOYEE

exports.delete_Employee = async (req, res) => {

  try {
  await Employee.findByIdAndDelete(req.params.id);
  // try {
  //     console.log(req.params.id);
  //   await Department.findByIdAndUpdate(departmentId, {
  //     $pull: { employee: req.params.id },
  //   }
  //   );
  // } catch (err) {
  //   next(err);
  // }
  res.status(200).json("Employee has been deleted.");
} catch (err) {
  next(err);
}
};


///

//CREATE NEW ROOM
exports.Create_Employee = async (req, res, next) => {
  
  // const departmentId = req.params.departmentId;
  const newEmployee = new Employee(req.body);
  try {
      const savedEmployee = await newEmployee.save();
     try {
  
    // await Department.findByIdAndUpdate(departmentId, {
    //   $push: { employee: savedEmployee._id },
      
    // },      { new: true, useFindAndModify: false }
    // );
  } catch (err) {
    next(err);
  }

  res.status(200).json(savedEmployee);
} catch (err) {
  next(err);
}
};


//SEARCH BY DEPARTMENT IDD
exports.search_By_Department = async (req, res,next) => {
  const departmentId = req.params.departmentId;
  try {
 const list_of_employee=   await Employee.find({department:departmentId}).findByIdAndUpdate();


 res.status(200).json({list_of_employee:list_of_employee});
  } catch (err) {
    next(err);
  }
};

















// //ADD EMPLOYEE
// exports.CreateEmployee = async (req, res, next) => {
//   const departmentId = req.params.departmentId;
//   const newEmployee = new Employee(req.body);
//   try {
//     const savedEmployee = await newEmployee.save();
//     try {
//       await Departmert.findByIdAndUpdate(
//         departmentId,
//         {
//           $push: { employee: savedEmployee._id },
//         },
       
//       );
//     } catch (err) {
//       next(err);
//     }


//   } catch (err) {
//     next(err);
//   }
// };