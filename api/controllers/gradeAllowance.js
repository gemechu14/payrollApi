const Allowance = require('../models/gradeAllowance.js');
const mongoose = require('mongoose')
const GradeDefinition = require('../models/gradeDefinition.js');
const Employee=require("../models/employee.js")

exports.add_Allowance = async (req, res) => {
    try {
        const {
            name,
            amount,
            isTaxable,
            percent,
            netAmount,
            description,
            taxable_income_limit,
            is_Exempted,
            starting_from,
            exempted_on_Allowance_amount,
        } = req.body;

        // if(!name ||!amout){
        //     res.stats
        // }
        const newAllowance = await Allowance.create({
            name: name,
            amount: amount,
            description: description,
            isTaxable: isTaxable,
            percent: percent,
            netAmount: netAmount,
            taxable_income_limit: taxable_income_limit,
            is_Exempted: is_Exempted,
            starting_from: starting_from,
            exempted_on_Allowance_amount: exempted_on_Allowance_amount,
            companyId: req.user.id
        })

        console.log(req.body);
        res.status(200).json({ newAllowance });

    } catch (err) {
        res.status(404).json({ error: err });
    }
};


// GET ALL
exports.get_All_Allowance = async (req, res, next) => {
    const failed = true;
    // if(failed) return next(createError(401,"You are not authenticated"))

    try {
        const allowance = await Allowance.find({ companyId: req.user.id });
        res.status(200).json({ count: allowance.length, allowance });
    } catch (err) {
        next(err);
    }
};
// GET one
exports.get_single_Allowance = async (req, res) => {
    try {
        const allowance = await Allowance.findById({ companyId: req.user.id, _id: req.params.id });
        res.status(200).json(allowance);
    } catch (error) {
        res.status(500).json(error);
    }
};
// UPDATE
exports.updateAllowances = async (req, res) => {
    try 
    {
     
          const updatedAllowance = await Allowance.findOneAndUpdate({
            companyId: req.user.id,
            _id: req.params.id
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedAllowance);
    } catch (error) {

        error
    }
};


//ADD ALLOWANCE TO GRADE 
exports.Create_Allowances = async (req, res, next) => {

    try {
        const gradeId = req.params.gradeId;
        const allowanceId = req.params.allowanceId;
        console.log(gradeId);
        console.log(allowanceId);

        const gradedefinition = await GradeDefinition.find({ companyId: req.user.id, allowance: allowanceId });
        console.log("gradedefinition", gradedefinition.length)

        if (gradedefinition.length == 0) {

            const data = await GradeDefinition.findByIdAndUpdate(gradeId, {
                $push: {
                    allowance: allowanceId
                }

            }, {
                new: true,
                useFindAndModify: false
            });

            res.status(200).json('Allowance successfully added to Job Grade');
        }
        else {
            res.status(200).json('Allowance allready added');
        }
    } catch (err) {
        res.status(404).json(err);
    }
};


// /UPDATE
exports.Update_Allowances = async (req, res, next) => {

    const gradeId = req.params.gradeId;
    const newAllowance = new Allowance(req.body);
    try {
        const savedAllowance = await newAllowance.save();
        try {



              
            await GradeDefinition.findByIdAndUpdate(gradeId, {
                $push: {
                    allowance: req.body.id
                }

            }, {
                new: true,
                useFindAndModify: false
            });

            await Employee.findByIdAndUpdate(gradeId, {
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
exports.delete_Allowances = async (req, res) => {

    try {
        const gradeId = req.params.gradeId;
        const allowanceid = await Allowance.find(mongoose.Types.ObjectId(req.params.allowanceId));
        const checkGrade = await GradeDefinition.find({ allowance: req.params.allowanceId });
               if (  checkGrade.length != 0 &&allowanceid.length!=0 ) {
            await GradeDefinition.findByIdAndUpdate(gradeId, {
                $pull: {
                    allowance: req.params.allowanceId
                }
            });

            res.status(200).json("Allowance has been deleted.");

        }
        else {
            res.status(404).json("There is no such allowance In the Grade.");
        }

    } catch (err) {
        res.status(404).json("Something gonna wrong");
    }
};


// DELETE Allowances
exports.delete_from_allowancecollection_Allowances = async (req, res) => {

    try {
        const allowanceid = await Allowance.find(mongoose.Types.ObjectId(req.params.id));
        if (allowanceid.length != 0) {

            await Allowance.findByIdAndDelete(req.params.id);

            res.status(200).json("Allowance has been deleted.");

        }
        else {
            res.status(200).json("There is no such allowance.");
        }

    } catch (err) {
        next(err);
    }
};


// ADD EXISTING ALLOWANCE TO EMPLOY


exports.addExistingAllowances = async (req, res, next) => {
    try {
        const allowanceId = req.params.allowanceId;
        const gradeId = req.params.gradeId;


        const check = await GradeDefinition.find({ _id: gradeId });
        console.log(check.length)

        if (check.length == 0) {
            res.status(404).json('something gonna wrong')
        }

        if (!check[0].allowance.includes(mongoose.Types.ObjectId(allowanceId))) {
            const updated = await GradeDefinition.findByIdAndUpdate(gradeId, {
                $push: {
                    allowance: allowanceId
                }

            }, {
                new: true,
                useFindAndModify: false
            });



             const updated1 = await Employee.findOneAndUpdate({gradeId}, {
                $push: {
                    allowance: allowanceId
                }

            }, {
                new: true,
                useFindAndModify: false
            });
            res.status(200).json("Allowance added successfully");
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



exports.Add_Allowance_to_Grade = async (req, res, next) => {
    const gradeId = req.params.gradeId;
    const data = { ...req.body, companyId: req.user.id };
    const newAllowance = new Allowance(data
    );
    console.log(gradeId);
    console.log(newAllowance);
    try {
        const savedAllowance = await newAllowance.save();
        try {
            await GradeDefinition.findByIdAndUpdate(
                gradeId,
                {
                    $push: { allowance: savedAllowance._id },
                },
                { new: true, useFindAndModify: false }
            );

            await Employee.findOneAndUpdate(
                {gradeId},
                {
                    $push: { allowance: savedAllowance._id },
                },
                { new: true, useFindAndModify: false }
            );

           
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedAllowance);
    } catch (err) {
        next(err);
    }
};


exports.updateGradeandAllowance=async(req,res,next)=>{

    try {
        const gradeId=req.params?.gradeId;
        const allowanceId=req.params?.allowanceId;
        console.log(req.body)
        console.log(gradeId)
        console.log(allowanceId)
        const updatedAllowance = await GradeDefinition.findOneAndUpdate({
            companyId: req.user.id,
            _id: gradeId,
            allowance:allowanceId
        }, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedAllowance);

    } catch (err) {
        res.status(404).json(err)
    }
}