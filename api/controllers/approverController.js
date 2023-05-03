const Approver = require('../models/ApproverModel');
const ApprovalMethod = require('../models/ApprovalMethodModel');
// Get all approvers
const getAllApprovers = async (req, res, next) => {
    try {
        const approvers = await Approver.find();
        res.status(200).json({
            count:approvers.length,
            approvers
        })
  
    } catch (err) {
        next(err);
    }
};

//get by id
const getApproverById = async (req, res, next) => {
    try {
        const approver = await Approver.findById(req.params.id).populate('company').populate('employeeId');
        res.json(approver);
    } catch (err) {
        next(err);
    }
}


// Create a new approver
const createApprover = async (req, res, next) => {

    const approvers = await Approver.find({ employeeId: req.body.employeeId, company: req.body.company }).count();
    //check i thie enploye added as approver
    if (approvers >= 1) {
        res.status(200).json("you already registered this employee as approver")
        //
    } else {
        try {
            const getApprovalMethod = await ApprovalMethod.findOne({ company: req.body.company });
            console.log(req.body.company)
            const minimamapprover = await getApprovalMethod.minimumApprover;
            //const approverMethod = await getApprovalMethod.approvalMethod;
            const findApproverNumber = await Approver.find({ company: req.body.company }).count();
            // check if heirarchy or not
            if (minimamapprover === null) {
                res.json("first approver setted")
            } else if (minimamapprover < findApproverNumber) {

                //register approver
                await Approver.create({
                    company: req.body.company,
                    employeeId: req.body.employeeId,
                    level: 0,
                    role: req.body.role,
                    email: req.body.email
                });
                //res.status(201).json(approver);
                //update approval method
                await ApprovalMethod.findOneAndUpdate(
                    company,
                    { isCompleted: true }
                );
                res.status(201).json("successfully registered now your payroll can be approved")

            } else if (minimamapprover === findApproverNumber + 1) {
                const { company, employeeId, level, role, email } = req.body;
                //register approver
                await Approver.create({
                    company,
                    employeeId,
                    level,
                    role,
                    email
                });
                //res.status(201).json(approver);
                //update approval method
                const compId = req.body.company;
                await ApprovalMethod.findOneAndUpdate(
                    { compId },
                    { isCompleted: true }
                );
                res.json(" successfully passed minimum amount of approver ")
            } else if (minimamapprover > findApproverNumber + 1) {
                const { company, employeeId, level, role, email } = req.body;
                //register approver
                await Approver.create({
                    company,
                    employeeId,
                    level,
                    role,
                    email
                });
                //res.status(201).json(approver);
                res.json(" add more approver and meet you minimum approver")
    } else {
                res.json("something is wrong")
            }

        } catch (err) {
            next(err);
        }
    }

};

// Update an existing approver
const updateApprover = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, employeeId, level, role, email } = req.body;
        const approver = await Approver.findByIdAndUpdate(
            id,
            { company, employeeId, level, role, email },
            { new: true }
        );
        if (!approver) {
            return res.status(404).json({ error: 'Approver not found' });
        }
        res.json(approver);
    } catch (err) {
        next(err);
    }
};

// Delete an existing approver
const deleteApprover = async (req, res, next) => {
    //delete if only dont approve any payroll before
    try {
        const { id } = req.params;
        const approver = await Approver.findByIdAndDelete(id);
        if (!approver) {
            return res.status(404).json({ error: 'Approver not found' });
        }
        res.json(approver);
    } catch (err) {
        next(err);
    }
};

exports.getAllApprovers = getAllApprovers;
exports.getApproverById = getApproverById;
exports.createApprover = createApprover;
exports.updateApprover = updateApprover;
exports.deleteApprover = deleteApprover;