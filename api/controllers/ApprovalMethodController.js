const ApprovalMethod = require('../models/ApprovalMethodModel');

// Get all approvers
const get1AllApprovalMethod = async (req, res, next) => {
    try {
        const approvalMethod = await ApprovalMethod.find();
        res.json(approvalMethod);
    } catch (err) {
        next(err);
    }
};

//get by id
const getApprovalMethodById = async (req, res, next) => {
    try {
        const approvalMethod = await ApprovalMethod.findById(req.params.id).populate('company');
        res.json(approvalMethod);
    } catch (err) {
        next(err);
    }
}


const getAllApprovalMethod=async (req,res,next)=>{

}

// Create a new approver
const createApprovalMethod = async (req, res, next) => {

    const checkIfRegistered = await ApprovalMethod.find({ company: req.body.company }).count();
    if (checkIfRegistered >= 1) {
        res.json("this company has registered approval method")
    } else {
        if (req.body.approvalMethod === 'horizontal') {
            try {
                const { company, minimumApprover, approvalMethod } = req.body;
                const approvalMeth = await ApprovalMethod.create({
                    company,
                    minimumApprover,
                    approvalLevel: '0',
                    approvalMethod
                });
                res.status(201).json(`approval method is sucess fully seted ${approvalMeth}`);
            } catch (err) {
                next(err);
            }

        } else {
            try {
                const { company, minimumApprover, approvalLevel, approvalMethod } = req.body;
                const approvalMeth = await ApprovalMethod.create({
                    company,
                    minimumApprover,
                    approvalLevel,
                    approvalMethod
                });
                res.status(201).json(approvalMeth);
            } catch (err) {
                next(err);
            }

        }

    }
};

// Update an existing approver
const updateApprovalMethodById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { company, minimumApprover, approvalLevel, approvalMethod, isCompleted } = req.body;
        const approvalMeth = await ApprovalMethod.findByIdAndUpdate(
            id,
            {
                company,
                minimumApprover,
                approvalLevel,
                approvalMethod,
                isCompleted
            },
            { new: true }
        );
        if (!approvalMeth) {
            return res.status(404).json({ error: 'Approval method  defined found' });
        }
        res.json(approvalMeth);
    } catch (err) {
        next(err);
    }
};

// Delete an existing approver
const deleteApprovalMethodById = async (req, res, next) => {
    try {
        const { id } = req.params;
        const approvalmethod = await ApprovalMethod.findByIdAndDelete(id);
        if (!approvalmethod) {
            return res.status(404).json({ error: 'Approval method not found' });
        }
        res.json(approvalmethod);
    } catch (err) {
        next(err);
    }
};

//update


const update_ApprovalMethod=async(req,res,next)=>{

    try {
        const id=req.params.id;

        const data=await ApprovalMethod.findByIdAndUpdate(id);

        res.status(200).json({
            message:"updated successfully"
        });
        
    } catch (err) {
        res.status(404).json(err)
    }
}



exports.getAllApprovalMethod = getAllApprovalMethod;


exports.update_ApprovalMethod=update_ApprovalMethod;
exports.get1AllApprovalMethod = get1AllApprovalMethod;
exports.getApprovalMethodById = getApprovalMethodById;
exports.createApprovalMethod = createApprovalMethod;
exports.updateApprovalMethodById = updateApprovalMethodById;
exports.deleteApprovalMethodById = deleteApprovalMethodById;