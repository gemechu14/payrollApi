const PayrollApproval = require("../models/PayrollApprovementModel.js");
// const ApprovalMethod = require("../models/");
const Payroll = require("../models/PayrollModel");
const Approver = require("../models/ApproverModel");

const getPayrollApprovals = async (req, res, next) => {
    try {
        const payrollApprovals = await PayrollApproval.find().populate(
            "payroll_id approver_id"
        );
        res.status(200).json(payrollApprovals);
    } catch (err) {
        next(err);
    }
};

const getPayrollApprovalById = async (req, res, next) => {
    const { id } = req.params;
    try {
        const payrollApproval = await PayrollApproval.findById(id).populate(
            "payroll_id approver_id"
        );
        if (!payrollApproval) {
            const error = new Error("Payroll approval not found");
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json(payrollApproval);
    } catch (err) {
        next(err);
    }
};
const createPayrollApproval = async (req, res, next) => {
    const { payroll_id, approver_id, level } = req.body;
    try {
        const payrollApproval = new PayrollApproval({
            payroll_id,
            approver_id,
            level,
        });
        await payrollApproval.save();
        res
            .status(201)
            .json({ message: "Payroll approval created", payrollApproval });
    } catch (err) {
        next(err);
    }
};

const updatePayrollApproval = async (req, res, next) => {
    const { id } = req.params;
    const { status } = req.body;
    try {
        const payrollApproval = await PayrollApproval.findById(id);
        if (!payrollApproval) {
            const error = new Error("Payroll approval not found");
            error.statusCode = 404;
            throw error;
        }
        payrollApproval.status = status;
        payrollApproval.approved_date = Date.now();
        await payrollApproval.save();
        res
            .status(200)
            .json({ message: "Payroll approval updated", payrollApproval });
    } catch (err) {
        next(err);
    }
};

const deletePayrollApproval = async (req, res, next) => {
    const { id } = req.params;
    try {
        const payrollApproval = await PayrollApproval.findByIdAndRemove(id);
        if (!payrollApproval) {
            const error = new Error("Payroll approval not found");
            error.statusCode = 404;
            throw error;
        }
        res
            .status(200)
            .json({ message: "Payroll approval deleted", payrollApproval });
    } catch (err) {
        next(err);
    }
};

const approveMyPayroll = async (req, res, next) => {
    const payrollId = req.params.payrollId;
    const approverId = req.params.approverId;
    //console.log(approverId,payrollId)
    //get company id from approver
    const getCompany = await Payroll.findOne({ _id: payrollId });
    console.log(getCompany)
    const companyId = getCompany.company;
    //payroll status
    const payrollStatus = getCompany.status;

    //  //test if company aoproval method profile is completed

    const approvalMeth = await ApprovalMethod.findOne({ company: companyId });

    const checkIfComplete = approvalMeth?.isCompleted;
    const minimumApprover = approvalMeth.minimumApprover;
    const companyApprovalLevel = approvalMeth.approvalLevel;

    const getApprover = await Approver.findOne({ _id: approverId });

    const isActive = getApprover?.isActive;
    const approverLevel = getApprover?.level;
    console.log(isActive)
    if (!checkIfComplete) {
        res.json(
            "approval method set app is not completed! your admin should complete once "
        );
    } else {
        if (!isActive) {
            res.json("this account is not active to approve contact your admin");
        } else {
            //check if approvemt method horizontal
            const type = approvalMeth.approvalMethod;
            //do here if horizontal
            if (type === "horizontal") {
                const approvedBy = await PayrollApproval.find({
                    payroll_id: payrollId,
                }).count();
                const leftApprover = minimumApprover - approvedBy;
                if (minimumApprover > approvedBy) {
                    const isLastApprover = leftApprover - 1;
                    if (isLastApprover === 0) {
                        try {
                            const payroll = await Payroll.findById(payrollId);
                            if (!payroll) {
                                return res.status(404).json({ message: "Payroll not found" });
                            }
                            payroll.status = "approved";
                            await payroll.save();
                            //register status change on payrollapprovment
                            const approve = new PayrollApproval({
                                payroll_id: payrollId,
                                approver_id: approverId,
                                level: 1,
                                status: "approved",
                            });
                            await approve.save();
                            //res.status(200).json(updatedPayroll);
                        } catch (error) {
                            res.status(400).json({ message: error.message });
                        }
                    } else {

                        const payroll = await Payroll.findById(payrollId);
                        if (!payroll) {
                            return res.status(404).json({ message: "Payroll not found" });
                        }
                        payroll.status = "pending";

                        //register status change on payrollapprovment
                        const approve = new PayrollApproval({
                            payroll_id: payrollId,
                            approver_id: approverId,
                            level: 1,
                            status: "approved",
                        });
                        await approve.save()
                        console.log(approve)
                        await payroll.save();
                        console.log(payroll)
                        res.status(200).json("approved successfully ");

                    }

                    //res.status(201).json(`successfully approved by you!  ${leftApprover-1} other, approver should approve this payroll`)
                } else {
                    res.json("it is approved already ");
                }
            }
            //de here i hierachy
            else if (type === "hierarchy") {
                //fetch level
                if (payrollStatus === "created") {
                    res.json({ message: "it is not ordered" });
                } else if (payrollStatus === "approved") {
                    res.json({ message: "it is already approved" });
                } else if (payrollStatus === "ordered") {
                    //check approver level
                    if (approverLevel !== 1) {
                        //res.json({ message: 'find some one who is level one'})
                        const whoseTurn = await Approver.findOne({ level: 1 });
                        res.json({ message: `${whoseTurn.role} should approve before ` });
                    } else {
                        //register status change on payroll
                        try {
                            //register status change on payrollapprovment
                            const approve1 = new PayrollApproval({
                                payroll_id: payrollId,
                                approver_id: approverId,
                                level: 1,
                                status: "approved",
                            });
                            const payroll = await Payroll.findById(payrollId);
                            if (!payroll) {
                                return res.status(404).json({ message: "Payroll not found" });
                            }
                            payroll.status = "pending";
                            await payroll.save()
                            await approve1.save();
                            res.status(200).json("Payroll approved successfully");
                        } catch (error) {
                            console.log("error has occured")
                            res.status(400).json({ message: error.message });
                        }
                    }
                } else if (payrollStatus === "pending") {
                    //check if some approved form level 2
                    const payrollApprovaLevel = await PayrollApproval.findOne({
                        level: 2,
                        payroll_id: payrollId,
                        status: "approved",
                    }).count();

                    if (payrollApprovaLevel < 1) {
                        const whoseTurn = await Approver.findOne({
                            level: 2,
                            company: companyId,
                        });
                        if (approverLevel !== 2) {
                            if (approverLevel === 1) {
                                res.json({
                                    //approve here for one level
                                    message: `payroll approved at your level do you want to continue anyway`,
                                });
                            } else if (approverLevel === 3) {
                                res.json({
                                    message: `${whoseTurn.role} should approve before you`,
                                });
                                //res.json({ message: `${whoseTurn.role} should approve before you` })
                            } else {
                                res.json("undefined level of approver")
                            }
                            //}res.json("unknown level")
                        } else {
                            //check if comapny approval level is two or not
                            if (companyApprovalLevel !== 2) {
                                try {
                                    //register status change on payrollapprovment
                                    const approve1 = new PayrollApproval({
                                        payroll_id: payrollId,
                                        approver_id: approverId,
                                        level: 2,
                                        status: "approved",
                                    });
                                    const payroll = await Payroll.findById(payrollId);
                                    if (!payroll) {
                                        return res.status(404).json({ message: "Payroll not found" });
                                    }
                                    payroll.status = "pending";
                                    await payroll.save()
                                    await approve1.save();
                                    res.status(200).json("Payroll approved successfully");
                                } catch (error) {
                                    console.log("error has occured")
                                    res.status(400).json({ message: error.message });
                                }

                            } else {

                                try {
                                    //register status change on payrollapprovment
                                    const approve1 = new PayrollApproval({
                                        payroll_id: payrollId,
                                        approver_id: approverId,
                                        level: 2,
                                        status: "approved",
                                    });
                                    const payroll = await Payroll.findById(payrollId);
                                    if (!payroll) {
                                        return res.status(404).json({ message: "Payroll not found" });
                                    }
                                    payroll.status = "approved";
                                    await payroll.save()
                                    await approve1.save();
                                    res.status(200).json("Payroll approved successfully");
                                } catch (error) {
                                    console.log("error has occured")
                                    res.status(400).json({ message: error.message });
                                }
                            }
                        }
                    } else if (approverLevel === 3) {
                        //two already approved and level three turn register on payroll

                        try {
                            //register on payrollapprov
                            const approve3 = new PayrollApproval({
                                payroll_id: payrollId,
                                approver_id: approverId,
                                level: 3,
                                status: "approved",
                            });
                            const payroll = await Payroll.findById(payrollId);
                            if (!payroll) {
                                return res.status(404).json({ message: "Payroll not found" });
                            }
                            payroll.status = "approved";
                            await payroll.save()
                            await approve3.save();

                            res.status(200).json("approved successfully!");
                        } catch (error) {
                            res.status(400).json({ message: error.message });
                        }
                    } else {
                        //what if not both three
                        res.json("already approved by you level");
                    }
                } else {
                    res.json("something is wrong unknown status ");
                }

                //do it if not both
            } else {
                res.json("something went undefined approval method ");
            }
        }
    }
};
exports.approveMyPayroll = approveMyPayroll;
exports.createPayrollApproval = createPayrollApproval;
exports.getPayrollApprovalById = getPayrollApprovalById;
exports.getPayrollApprovals = getPayrollApprovals;
exports.updatePayrollApproval = updatePayrollApproval;
exports.deletePayrollApproval = deletePayrollApproval;


