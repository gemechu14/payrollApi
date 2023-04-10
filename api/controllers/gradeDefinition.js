const GradeDefinition = require('../models/gradeDefinition.js')
const mongoose = require('mongoose')
const Allowance=require('../models/gradeAllowance.js')

exports.add_new_Grade = async (req, res) => {
    try {
        const {
            gradeName,
       
        } = req.body;

        const newgGrade = await GradeDefinition.create({
            gradeName: gradeName,  
            companyId: req.user.id
        })


        console.log(req.body);
        res.status(200).json({ newgGrade });

    } catch (err) {
        res.status(404).json({ error: err });
    }
};



// GET ALL
exports.get_All_Grade = async (req, res, next) => {
    const failed = true;
    // if(failed) return next(createError(401,"You are not authenticated"))

    try {
        const grades = await GradeDefinition.find({ companyId: req.user.id }).populate("allowance");
        
        res.status(200).json(grades);
    } catch (err) {
        next(err);
    }
};
// GET one
exports.get_single_Grades= async (req, res) => {
    try {
        const grades = await GradeDefinition.findById({ companyId: req.user.id, _id: req.params.id });
        res.status(200).json(grades);
    } catch (error) {
        res.status(500).json(error);
    }
};
// UPDATE

exports.updateGrades = async (req, res) => {
    try {
        const updatedGrades = await GradeDefinition.findByIdAndUpdate({
            companyId: req.user.id,
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedGrades);
    } catch (error) {

        error
    }
}; 



// /UPDATE
exports.Update_Allowances = async (req, res, next) => {

    const employeeId = req.params.employeeId;
    const newAllowance = new Allowance(req.body);
    try {
        const savedAllowance = await newAllowance.save();
        try {

            await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    allowance: req.body.id
                }

            }, {
                new: true,
                useFindAndModify: false
            });
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedAllowance);
    } catch (err) {
        next(err);
    }
};


// DELETE Allowances
exports.delete_Grades = async (req, res,next) => {
   
    try {

        const grades=await GradeDefinition.find(mongoose.Types.ObjectId(req.params.id));
   
        if(grades.length!=0){
            console.log(grades)
             await GradeDefinition.findByIdAndDelete(req.params.id);
             res.status(200).json("Grades has been deleted.");
        }
        else{
            res.status(200).json("there is no such Grade.");
        }
     
       
          
    } catch (err) {
        next(err);
    }
};


// DELETE Allowances
exports.deleteAllowances = async (req, res) => {
    const employeeId = req.params.employeeId;
    try {
        await Allowance.findByIdAndDelete(req.params.id);


        res.status(200).json("Allowance has been deleted.");
    } catch (err) {
        next(err);
    }
};


// ADD EXISTING ALLOWANCE TO EMPLOY


exports.addExistingAllowances = async (req, res, next) => {
    try {
        const allowanceId = req.params.allowanceId;
        const employeeId = req.params.employeeId;
        console.log(allowanceId);
        console.log(employeeId);
        const check = await Employee.find({ _id: employeeId });

        if (!check[0].allowance.includes(mongoose.Types.ObjectId(allowanceId))) {
            const updated = await Employee.findByIdAndUpdate(employeeId, {
                $push: {
                    allowance: allowanceId
                }

            }, {
                new: true,
                useFindAndModify: false
            });

            res.status(200).json(updated);
        } else {
            res.status(404).json('already added')
        }
    } catch (err) {
        next(err);
    }

}


exports.deleteAllowance = async (req, res, next) => {

    try {

        const deletedAllowance = await Allowance.findByIdAndDelete(req.params.id);

        res.status(200).json(deletedAllowance);

    } catch (error) {
        next(error)

    }
}


//UPDATE GRADEDEFINITION AND ALLOWANCE 
exports.Update_Allowances_and_GradeDefn = async (req, res, next) => {

    const gradeId = req.params.gradeId;
    const allowanceId = req.params.allowanceId;
 
    try {
        await Allowance.findByIdAndUpdate(allowanceId,{
            isTaxable:true
        },{
            new: true,
                useFindAndModify: false
        })
      
            await GradeDefinition.findByIdAndUpdate(gradeId, {
                   basicSalary: 1000000000
                
            }, {
                new: true,
                useFindAndModify: false
            });
        res.status(200).json('done');
        } 

       
    catch (err) {
        next(err);
    }
};
