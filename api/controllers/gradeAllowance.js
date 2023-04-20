const Allowance = require('../models/gradeAllowance.js');
const mongoose = require('mongoose')
const GradeDefinition = require('../models/gradeDefinition.js')

exports.add_Allowance = async (req, res) => {
    try {
        const {
            name,
            amount,
            description
        } = req.body;
        const newAllowance = await Allowance.create({
            name: name,
            amount: amount,
            description: description,
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

exports.updateAllowance = async (req, res) => {
    try {
        const updatedAllowance = await Allowance.findByIdAndUpdate({
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
        console.log(gradeId);
        const newAllowance = new Allowance(req.body);
        console.log(req.body)
        const savedAllowance = await newAllowance.save();
       console.log("id",savedAllowance._id)

        await GradeDefinition.findByIdAndUpdate(gradeId, {
            $push: {
                allowance:mongoose.Types.ObjectId(savedAllowance._id)
            }

        }, {
            new: true,
            useFindAndModify: false
        });


        res.status(200).json(savedAllowance);
    } catch (err) {
        res.status(404).json(err);
    }
};


// /UPDATE
exports.Update_Allowances = async (req, res, next) => {

    const gradeId = req.params.employeeId;
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
    const employeeId = req.params.employeeId;
    try {
        await Allowance.findByIdAndDelete(req.params.id);
        try {
            console.log(req.params.id);
            await GradeDefinition.findByIdAndUpdate(employeeId, {
                $pull: {
                    allowance: req.params.id
                }
            });
        } catch (err) {
            next(err);
        }


        res.status(200).json("Allowance has been deleted.");
    } catch (err) {
        next(err);
    }
};


// DELETE Allowances
exports.delete_from_allowancecollection_Allowances = async (req, res) => {
   
    try {
        console.log('delete')
       // await Allowance.findByIdAndDelete(req.params.id);


      //  res.status(200).json("Allowance has been deleted.");
    } catch (err) {
        next(err);
    }
};


// ADD EXISTING ALLOWANCE TO EMPLOY


exports.addExistingAllowances = async (req, res, next) => {
    try {
        const allowanceId = req.params.allowanceId;
        const gradeId = req.params.employeeId;
        console.log(allowanceId);
 
        const check = await Grade.find({ _id: employeeId });

        if (!check[0].allowance.includes(mongoose.Types.ObjectId(allowanceId))) {
            const updated = await Grade.findByIdAndUpdate(gradeId, {
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



exports.Add_Allowance_to_Grade = async (req, res, next) => {
    const gradeId = req.params.gradeId;
    const data = { ...req.body, companyId:req.user.id };
    const newDeduction = new Allowance(data
        );
    console.log(gradeId);
    console.log(newDeduction);
    try {

        
        const savedDeduction = await newDeduction.save();
        try {
            await GradeDefinition.findByIdAndUpdate(
                gradeId,
                {
                    $push: { allowance: savedDeduction._id },
                },
                { new: true, useFindAndModify: false }
            );
        } catch (err) {
            next(err);
        }

        res.status(200).json(savedDeduction);
    } catch (err) {
        next(err);
    }
};