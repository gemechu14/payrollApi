const Payroll = require("../models/payroll.js");
const Employee = require("../models/employee.js");
const { set } = require("mongoose");
const createError = require("../utils/error.js");
const mongoose = require("mongoose");
const year = require("../models/year.js");
const month = require("../models/month.js");
const moment = require('moment');
const gradeDefinition=require('../models/gradeDefinition.js')

exports.add_payroll = async (req, res, next) => { // const newPayroll = new Payroll(req.body);

    try {
        const {
            payrollID,
            payrollName,
            taxSlab,
            payrollYear,
            type,

            employeer_Contribution,
            employee_Contribution,
            taxable_income_limit,
            exampt_age_limit,
            exampt_percentage
        } = req.body;
        const payroll = await Payroll.find({
            $and: [
                {
                    companyId: req.user.id
                }, {
                    payrollID: payrollID
                }, {
                    payrollName: payrollName
                },
            ]
        });
        // const len=payroll.length;
        console.log(payroll.length);

        if (!payroll || payroll.length == 0) {
            const newpayroll = await Payroll.create({
                payrollID: payrollID,
                payrollName: payrollName,
                taxSlab: taxSlab,
                payrollYear: moment().format('YYYY'),
                companyId: req.user.id,
                type: type,
                employeer_Contribution: employeer_Contribution,
                employee_Contribution: employee_Contribution,
                taxable_income_limit: taxable_income_limit,
                exampt_age_limit: exampt_age_limit,
                exampt_percentage: exampt_percentage
            });

            // const savedPayroll = await newPayroll.save();

            console.log(req.body);
            res.status(200).json({ newpayroll });
        } else {
            res.status(404).json("The payroll already exists");
        }
    } catch (err) {
        next(createError.createError(404, err));
    }
};

// GET ALL
exports.get_All_Payroll = async (req, res, next) => {
    try {
        const payrolls = await Payroll.find({ companyId: req.user.id }).populate("taxSlab");
        res.status(200).json({ count: payrolls.length, payrolls });
    } catch (err) {
        next(err);
    }
};
// GET SINGLE Payroll
exports.get_single_payroll = async (req, res) => {
    try {
        const payroll = await Payroll.findById(req.params.id);
        res.status(200).json(payroll);
    } catch (error) {
        res.status(500).json(error);
    }
};
// UPDATE

exports.updatePayroll = async (req, res) => {
    try {
        const updatedPayroll = await Payroll.findByIdAndUpdate(req.params.id, {
            $set: req.body
        }, { new: true });
        res.status(200).json(updatedPayroll);
    } catch (error) { }
};
// DELETE
exports.delete_Payroll = async (req, res, next) => { // const employeeId = req.params.employeeId;

    try {
        console.log(req.params.id);

        const payroll = await Payroll.find(mongoose.Types.ObjectId(req.params.id));

        if (payroll.length != 0) {

            await Payroll.findByIdAndDelete(req.params.id);
            // try {
            //     console.log(req.params.id);
            // await Employee.findByIdAndUpdate(employeeId, {
            //     $pull: { payroll: req.params.id },
            // });
            // } catch (err) {
            // next(err);
            // }
            res.status(200).json("Payroll has been deleted");
        }
        else {
            res.status(200).json("There is no such Payroll ");
        }
    } catch (error) {
        res.status(500).json(error);
    }
};

// ADD PAYROLL TO EMPLOYEE

// /

exports.add_payroll_to_Employee = async (req, res, next) => {
    const departmentId = req.params.departmentId;
    // const payrollId=req.params.payrollId;

    try {
        const {
            month,
            year,
            payrollId,
            netSalary,
            arrears,
            lateSittingOverTime,
            dayDeduction,
            EOTBDeduction,
            payrollStatus
        } = req.body;

        // year: [{
        // name:'2013',
        // month:[
        //     {
        //       name:'Jan',
        //       payroll:'63eb2c646e8057d17e62cde8'
        //      },
        //      {
        //       name:'FEB',
        //       payroll:'63eb2c646e8057d17e62cde8'
        //      },

        // ]

        // }

        // ]

        // const emp=await Employee.find({department:departmentId});
        // console.log(emp);

        // console.log(emp.department);

        // console.log(departmentId);

        const updated = await Employee.updateMany({
            department: departmentId
        }, {
            $set: {
                year: [
                    {
                        name: year,
                        month: [
                            {
                                name: month,
                                netSalary,
                                payroll: payrollId
                            },
                        ]
                    },
                ]
            }
        });

        const empl1 = await Employee.find({ department: departmentId });
        res.status(200).json({ employee: empl1[0] });
    } catch (err) {
        res.status(404).json(err);
    }
};

// ADD PAYROLL TO DEPARATMENT

// Get taxSlab

exports.get_taxslab_Payroll = async (req, res, next) => {
    try {
        const payrolls = await Payroll.find({ companyId: req.user.id, _id: req.params.payrollId }).populate("taxSlab");
        res.status(200).json({ count: payrolls.length, taxSlab: payrolls[0].taxSlab });
    } catch (err) {
        next(err);
    }
};

exports.get_delete_Payroll = async (req, res, next) => {
    try {
        const payrolls = await Payroll.find({ companyId: req.user.id }).populate("taxSlab");
        res.status(200).json({ count: payrolls.length, payrolls });
    } catch (err) {
        next(err);
    }
};

// ///////////

exports.add_allowance_and_deduction_to_Employee = async (req, res, next) => {
    const employeeId = req.params.employeeId;

    try {
        const {
            month,
            year,
            payrollId,
            netSalary,
            arrears,
            lateSittingOverTime,
            dayDeduction,
            EOTBDeduction,
            payrollStatus,
            // payStat
        } = req.body;

        const updated = await Employee.findOneAndUpdate({
            _id: employeeId
        }, {
            $set: {
                year: [
                    {
                        name: year,
                        month: [
                            {
                                name: month,
                                netSalary,
                                payroll: payrollId,
                                // payStat:payStat,

                                arrears: arrears,
                                lateSittingOverTime: lateSittingOverTime,
                                dayDeduction: dayDeduction,
                                EOTBDeduction: EOTBDeduction,
                                payrollStatus: payrollStatus
                            },
                        ]
                    },
                ]
            }
        });

        res.status(200).json(updated);
    } catch (err) {
        res.status(404).json(err);
    }
};

// /get other allowance

exports.get_All_pm = async (req, res, next) => {
    try {
        const {
            month,
            year,
            payrollId,
            netSalary,
            payrollStatus,
            payStat
        } = req.body;
        let data = "";
        const departmentId = req.params.departmentId;
        await Employee.find({ companyId: req.user.id, department: departmentId }).exec().then((docs) => {
            console.log("docs:", docs);
            const other = docs.map((doc) => {
                return {
                    _id: doc._id,
                    arrears: doc.arrears,
                    lateSittingOverTime: doc.lateSittingOverTime,
                    dayDeduction: doc.dayDeduction,
                    EOTBDeduction: doc.EOTBDeduction,
                    department: doc.department,
                    companyId: doc.companyId,
                    payrollStatus: doc.payrollStatus,
                    year: doc.year,
                    // month: monthArray?.map((item) => item[0]?.name),
                };
            });
            // }

            data = other;
            console.log("data", data);
        });
        try {
            // console.log(req.body);
            // // const check_month=await Employee.find({department:departmentId,})
            console.log("data length:", data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("i", i);
                //     // const d1=  await Employee.find({  _id: mongoose.Types.ObjectId(data[i]._id) });
                //     // console.log(d1[i].year[0].month[0].name);
                // for (let j = 0; j < data[i].year.length; j++) {
                const conditions = data[i].year.filter((item) => item.name.includes(year));

                console.log(data[i].year)
                if (conditions.length) {
                    const filteredMonth = conditions[0].month.filter((item) => item.name.includes(month));
                    // console.log("filteredMonth:", filteredMonth);
                    if (filteredMonth.length) {
                        console.log("year and month");
                        const emp = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            },
                            "year.$.month": {
                                $elemMatch: {
                                    name: {
                                        $eq: month
                                    }
                                }
                            }
                        }, {
                            $pull: {
                                "year.$.month": {
                                    name: month,
                                    // // netSalary: netSalary,
                                    // payroll: payrollId,
                                    // arrears: data[i].arrears,
                                    // lateSittingOverTime: data[i].lateSittingOverTime,
                                    // dayDeduction: data[i].dayDeduction,
                                    // EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                }
                            }
                        });
                        // console.log(payrollStatus);
                        const emp1 = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            }
                        }, {
                            $push: {
                                // lateSittingOverTime: 10,
                                // "arrears": 10,
                                // "dayDeduction": 10,
                                // "EOTBDeduction": 10,

                                "year.$.month": {
                                    name: month,
                                    netSalary: netSalary,
                                    payroll: payrollId,
                                    // payStat:"true",
                                    payrollStatus: payrollStatus,
                                    arrears: data[i].arrears,
                                    lateSittingOverTime: data[i].lateSittingOverTime,
                                    dayDeduction: "15",
                                    EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                },
                                // EOTBDeduction:'6'
                            },
                            $set: {
                                lateSittingOverTime: 0,
                                arrears: 0,
                                dayDeduction: 0,
                                EOTBDeduction: 0
                            }
                        });

                        // const emp4 = await Employee.updateOne(
                        // {
                        //     _id: mongoose.Types.ObjectId(data[i]._id),
                        //     year: { $elemMatch: { name: { $eq: year } } },
                        // },
                        // {
                        //     $set: {
                        //       lateSittingOverTime: 910,
                        //       // "arrears": 10,
                        //       // "dayDeduction": 10,
                        //       // "EOTBDeduction": 10,

                        //       //EOTBDeduction:'6'

                        //     },
                        // }
                        // );

                        // console.log(emp);
                    } else {
                        console.log("year but not month");
                        const emp = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            }
                        }, {
                            $push: {
                                "year.$.month": {
                                    name: month,
                                    netSalary: netSalary,
                                    payroll: payrollId,
                                    // payStat:'true',

                                    payrollStatus: payrollStatus,
                                    arrears: data[i].arrears,
                                    lateSittingOverTime: data[i].lateSittingOverTime,
                                    dayDeduction: data[i].dayDeduction,
                                    EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                }
                            },
                            $set: {
                                lateSittingOverTime: 0,
                                arrears: 0,
                                dayDeduction: 0,
                                EOTBDeduction: 0
                            }
                        });
                        console.log(emp);
                    }
                }
                else {
                    console.log("false");
                    const emp = await Employee.updateOne({
                        _id: mongoose.Types.ObjectId(data[i]._id)
                    }, {
                        $push: { // dayDeduction:383,

                            year: [
                                {
                                    name: year,
                                    month: [
                                        {
                                            name: month,
                                            netSalary: netSalary,
                                            payroll: payrollId,
                                            // payStat:"true",
                                            payrollStatus: payrollStatus,
                                            arrears: data[i].arrears,
                                            lateSittingOverTime: data[i].lateSittingOverTime,
                                            dayDeduction: data[i].dayDeduction,
                                            EOTBDeduction: data[i].EOTBDeduction,
                                            // payrollStatus: data[i].payrollStatus,
                                        },
                                    ]
                                },
                            ]
                        },

                        $set: {
                            lateSittingOverTime: 0,
                            arrears: 0,
                            dayDeduction: 0,
                            EOTBDeduction: 0
                        }
                    });
                    console.log(emp);
                }
                // }
            }
            res.status(200).json("done");
        } catch (err) {
            createError.createError(404, err);
        }
    } catch (err) {
        next(err);
    }
};



exports.newVal = async (req, res, next) => {
    try {
        const { month, year, payrollId } = req.body;

        const newMonth = await month.create({ month: month, companyId: req.user.id });
        // const newYear=await year.find({companyId:req.user.id});
        const newye = await year.create({ month: newMonth._id, year: year, companyId: req.user.id });

        const updateEmp = await Employee.create({ year: newye._id });
    } catch (err) { }
};



exports.payrollCalculation = async (req, res, next) => {

    try {

        const {
            payroll,

        } = req.body;

        // console.log(payroll);
        // FETCH ALL USERS DATA FOR LATER USE
        let data = '';
        const departmentId = req.params.departmentId;
        await Employee.find({ companyId: req.user.id, department: departmentId }).exec().then((docs) => {
            // console.log("docs:", docs);
            const other = docs.map((doc) => {
                return {
                    _id: doc._id,
                    name: doc.fullname,
                    arrears: doc.arrears,
                    lateSittingOverTime: doc.lateSittingOverTime,
                    dayDeduction: doc.dayDeduction,
                    EOTBDeduction: doc.EOTBDeduction,
                    department: doc.department,
                    companyId: doc.companyId,
                    payslip: doc.payslip,
                    otherEarning: doc.otherEarning,
                    housingAllowance: doc.housingAllowance,
                    providentFund: doc.providentFund,
                    TaxDeduction: doc.TaxDeduction,
                    transportAllowance: doc.transportAllowance,
                    cashIndeminityAllowance: doc.cashIndeminityAllowance,
                    fieldAllowance: doc.fieldAllowance,
                    dayDeduction: doc.dayDeduction,
                    positionAllowance: doc.positionAllowance,
                    hardshipAllowance: doc.hardshipAllowance,
                    desertAllowance: doc.desertAllowance,
                    basicSalary: doc.basicSalary,
                    gradeId:doc.gradeId


                    // payrollStatus: doc.payrollStatus,
                    // year: doc.year,
                    // month: monthArray?.map((item) => item[0]?.name),
                };
            });
            // }
            data = other;
            //console.log("data", data);
        });
        //console.log(data)

        for (var i = 0; i < data.length; i++) {
            const month = data[i].payslip?.filter((item) => item?.month?.includes("April"));
            const year = data[i].payslip?.filter((item) => item?.year?.includes("2023"));
            //CHECK  SELECTED MONTH AND YEAR 

            if (month.length && year.length) {
                              // console.log('update')


               // console.log(data[i].gradeId)
                const empdata = await gradeDefinition.find({ _id: data[i].gradeId })            
                let allowanceLength = empdata[0]?.allowance.length
               // console.log(empdata[0]?.allowance[0]);

                // if(allowanceLength){
                //     for (var i=0; i<allowanceLength; i++){
                //         console.log(empdata[0]?.allowance[i]);
                //     }
                // }
      
                
                // await Employee.updateOne(
                //     { _id: mongoose.Types.ObjectId(data[i]._id), 'payslip.year': '2023', 'payslip.month': "April" },
                //     { $set: { 'payslip.$.approval.isApproved': true, 'payslip.$.basicSalary': empdata[0]?.basicSalary ? empdata[0].basicSalary :0}, $inc: { 'payslip.$.approval.counter': 1 } },
                // );



            } else {

                //SUM OF DEDUCTION 
                let sumOfDeduction = '';
                let sumOfAllowance = '';
                const emp1 = await Employee.updateOne({
                    _id: mongoose.Types.ObjectId(data[i]._id),

                },
                    {
                        $push: {
                            payslip: {
                                month: moment().format('MMMM'),
                                year: moment().format('YYYY'),
                                netSalary: 5775755,
                                payrollId: "63f8ab21128cb33bc2f6cb60",
                                arrears: data[i].arrears,
                                lateSittingOverTime: data[i].lateSittingOverTime,
                                dayDeduction: "15",

                            },

                        },
                        $set: {
                            lateSittingOverTime: 0,
                            arrears: 0,
                            dayDeduction: 0,
                            EOTBDeduction: 0
                        }
                    });
            }


            // await Employee.updateOne(
            //     { _id: mongoose.Types.ObjectId(data[i]._id), 'payslip.year': '2015', 'payslip.month': "January" },
            //     { $set: { 'payslip.$.approval.isApproved': true }, $inc: { 'payslip.$.approval.counter': 1 } },
            // );
        }




        res.status(200).json(data)


    } catch (err) {
        res.status(404).json(err)
    }
}






exports.get_calculation = async (req, res, next) => {
    try {
        const {
            month,
            year,
            payrollId,
            netSalary,

        } = req.body;
        let data = "";
        const departmentId = req.params.departmentId;
        await Employee.find({ companyId: req.user.id, department: departmentId }).exec().then((docs) => {
            console.log("docs:", docs);
            const other = docs.map((doc) => {
                return {
                    _id: doc._id,
                    arrears: doc.arrears,
                    lateSittingOverTime: doc.lateSittingOverTime,
                    dayDeduction: doc.dayDeduction,
                    EOTBDeduction: doc.EOTBDeduction,
                    department: doc.department,
                    companyId: doc.companyId,
                    payrollStatus: doc.payrollStatus,
                    year: doc.year,
                    // month: monthArray?.map((item) => item[0]?.name),
                };
            });
            // }

            data = other;
            console.log("data", data);
        });
        try {
            // console.log(req.body);
            // // const check_month=await Employee.find({department:departmentId,})
            console.log("data length:", data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("i", i);
                //     // const d1=  await Employee.find({  _id: mongoose.Types.ObjectId(data[i]._id) });
                //     // console.log(d1[i].year[0].month[0].name);
                // for (let j = 0; j < data[i].year.length; j++) {
                const conditions = data[i].year.filter((item) => item.name.includes(year));
                if (conditions.length) {
                    const filteredMonth = conditions[0].month.filter((item) => item.name.includes(month));
                    // console.log("filteredMonth:", filteredMonth);
                    if (filteredMonth.length) {
                        console.log("year and month");
                        const emp = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            },
                            "year.$.month": {
                                $elemMatch: {
                                    name: {
                                        $eq: month
                                    }
                                }
                            }
                        }, {
                            $pull: {
                                "year.$.month": {
                                    name: month,
                                    // // netSalary: netSalary,
                                    // payroll: payrollId,
                                    // arrears: data[i].arrears,
                                    // lateSittingOverTime: data[i].lateSittingOverTime,
                                    // dayDeduction: data[i].dayDeduction,
                                    // EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                }
                            }
                        });
                        console.log(data[i].year)
                        const emp1 = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            }
                        }, {
                            $set: {
                                // lateSittingOverTime: 10,
                                // "arrears": 10,
                                // "dayDeduction": 10,
                                // "EOTBDeduction": 10,

                                "year.$.month": {
                                    name: month,
                                    netSalary: netSalary,
                                    payroll: payrollId,
                                    // payStat:"true",
                                    payrollStatus: payrollStatus,
                                    arrears: data[i].arrears,
                                    lateSittingOverTime: data[i].lateSittingOverTime,
                                    dayDeduction: "15",
                                    EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                },
                                // EOTBDeduction:'6'
                            },
                            $set: {
                                lateSittingOverTime: 0,
                                arrears: 0,
                                dayDeduction: 0,
                                EOTBDeduction: 0
                            }
                        });

                        // const emp4 = await Employee.updateOne(
                        // {
                        //     _id: mongoose.Types.ObjectId(data[i]._id),
                        //     year: { $elemMatch: { name: { $eq: year } } },
                        // },
                        // {
                        //     $set: {
                        //       lateSittingOverTime: 910,
                        //       // "arrears": 10,
                        //       // "dayDeduction": 10,
                        //       // "EOTBDeduction": 10,

                        //       //EOTBDeduction:'6'

                        //     },
                        // }
                        // );

                        // console.log(emp);
                    } else {
                        console.log("year but not month");
                        const emp = await Employee.updateOne({
                            _id: mongoose.Types.ObjectId(data[i]._id),
                            year: {
                                $elemMatch: {
                                    name: {
                                        $eq: year
                                    }
                                }
                            }
                        }, {
                            $push: {
                                "year.$.month": {
                                    name: month,
                                    netSalary: netSalary,
                                    payroll: payrollId,
                                    // payStat:'true',

                                    payrollStatus: payrollStatus,
                                    arrears: data[i].arrears,
                                    lateSittingOverTime: data[i].lateSittingOverTime,
                                    dayDeduction: data[i].dayDeduction,
                                    EOTBDeduction: data[i].EOTBDeduction,
                                    // payrollStatus: data[i].payrollStatus,
                                }
                            },
                            $set: {
                                lateSittingOverTime: 0,
                                arrears: 0,
                                dayDeduction: 0,
                                EOTBDeduction: 0
                            }
                        });
                        console.log(emp);
                    }
                } else {
                    console.log("false");
                    const emp = await Employee.updateOne({
                        _id: mongoose.Types.ObjectId(data[i]._id)
                    }, {
                        $push: { // dayDeduction:383,

                            year: [
                                {
                                    name: year,
                                    month: [
                                        {
                                            name: month,
                                            netSalary: netSalary,
                                            payroll: payrollId,
                                            // payStat:"true",
                                            payrollStatus: payrollStatus,
                                            arrears: data[i].arrears,
                                            lateSittingOverTime: data[i].lateSittingOverTime,
                                            dayDeduction: data[i].dayDeduction,
                                            EOTBDeduction: data[i].EOTBDeduction,
                                            // payrollStatus: data[i].payrollStatus,
                                        },
                                    ]
                                },
                            ]
                        },

                        $set: {
                            lateSittingOverTime: 0,
                            arrears: 0,
                            dayDeduction: 0,
                            EOTBDeduction: 0
                        }
                    });
                    console.log(emp);
                }
                // }
            }
            res.status(200).json("done");
        } catch (err) {
            createError.createError(404, err);
        }
    } catch (err) {
        next(err);
    }
};




