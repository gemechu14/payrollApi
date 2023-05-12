const Payroll = require("../models/payroll.js");
const Employee = require("../models/employee.js");
const { set } = require("mongoose");
const createError = require("../utils/error.js");
const mongoose = require("mongoose");
const year = require("../models/year.js");
const month = require("../models/month.js");
const moment = require('moment');
const gradeDefinition = require('../models/gradeDefinition.js');
// const payroll = require("../models/payroll.js");
const Pension = require('../models/pension.js');
const TaxSlab = require('../models/taxSlabs.js')

exports.add_payroll = async (req, res, next) => {
    // const newPayroll = new Payroll(req.body);

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

            console.log("data length:", data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("i", i);
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
                    gradeId: doc.gradeId


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

                const empdata = await gradeDefinition.find({ _id: data[i].gradeId })
                let allowanceLength = empdata[0]?.allowance.length




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

            console.log("data length:", data.length);
            for (var i = 0; i < data.length; i++) {
                console.log("i", i);

                const conditions = data[i].year.filter((item) => item.name.includes(year));
                if (conditions.length) {
                    const filteredMonth = conditions[0].month.filter((item) => item.name.includes(month));

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

//GIVE PERMISSION

exports.grantPermission = async (req, res, next) => {

    try {

        await Employee.findOneAndUpdate({ _id: req.params.id },
            {

                $set: { [`permissions.${key}.${value}`]: true }

            }, { new: true },



            function (err, doc) {
                if (err) {
                    console.log('Error updating user permissions:', err);
                    res.status(404).json(err)
                } else {
                    console.log('User permissions updated successfully:', doc);
                    res.status(200).json(doc)
                }
            });


    } catch (err) {

        res.status(404).json(err)

    }
}




///RUN PAYROLL

exports.runPayrollForAllEmp = async (req, res, next) => {
    try {
        Employee.find({}, (err, employees) => {
            if (err) {
                console.error(err);
            } else {
                employees.forEach((employee) => {
                    const newPayroll = new Payroll({
                        employeeId: employee._id,

                        employeer_Contribution: "0",
                        employee_Contribution: "0",
                        taxable_income_limit: "600",
                        exampt_age_limit: "65",
                        exampt_percentage: "0",
                        grossSalary: (employee.basicSalary) - 1000,
                        taxableIncome: 12,
                        totalDeduction: 33,
                        totalAllowance: 34,
                        NetSalary: employee.basicSalary,

                        // amountPaid: employee.salary / 2
                    });

                    newPayroll.save((err, savedPayroll) => {
                        if (err) {
                            console.log("length", savedPayroll.length)
                            console.error(err);
                        } else {

                            try {


                                console.log("saved lenght", savedPayroll.length);

                                console.log(`Payroll saved for employee ${employee.fullname}:`, savedPayroll);

                            } catch (err) {
                                res.status(404).json("error occurred"
                                
                                
                                
                                
                                )
                            }




                        }

                    }


                    );
                });
            }
        });



    } catch (err) {
        res.status(404).json(err)
    }
}


exports.calculatePayrollForAllEmployee = async (req, res, next) => {

    try {
        let employer_pension = 0;
        let employee_pension = 0;
        let data = '';
        //GET PENSION
        const pension = await Pension.find();

        console.log("pension",pension)
        employee_pension = pension[0]?.employeeContribution ? (pension[0]?.employeeContribution) : 1;
        employer_pension = pension[0]?.employerContribution ? (pension[0]?.employerContribution) : 1;
// console.log("first",employee_pension)
        //GET TAX RULE
        const taxslab = await TaxSlab.find({ companyId: req.user.id });

        for (const taxslabs of taxslab) {
            //   console.log(taxslabs.from_Salary)
            //   console.log(taxslabs.to_Salary)

        }
        //GET ALLOWANCE
        //const allowances=await Employe

        // Retrieve employee information from the employee collection
        const employees = await Employee.find({ companyId: req.user.id }).populate('deduction').populate('allowance');

        numProcessed = 0;
        numErrors = 0;
        let i = 0
        let tax = 0;
        let Data = [];
        // Iterate through each employee and calculate their pay
        for (const employee of employees) {


            //console.log(employee.basicSalary)

                let totalDeduction = 0;
            // let totalAllowance= 0;


            let totalAllowance = 0;
            let totalTaxable = 0;
            let income_tax_payable = 0;
            let deductible_Fee = 0;
            let totalExempted = 0;
            let totalTaxableIncome = 0;
            let overallTotalDeduction = 0;
            //TOTAL ALLOWANCES
            employee.allowance.forEach((allowance) => {
                totalAllowance += allowance.amount;
                //console.log(allowance.is_Exempted)
                if (allowance.is_Exempted) {
                    totalExempted += allowance.exempted_on_Allowance_amount;
                    if (allowance.amount > allowance.starting_from) {
                        totalTaxable += allowance.amount - allowance.exempted_on_Allowance_amount
                    }
                    else {
                        totalTaxable += allowance.amount
                    }

                } else {
                    totalTaxable += allowance.amount
                }



            });


            //TOTAL DEDUCTION
            employee.deduction.forEach((deduction) => {
                totalDeduction += deduction.amount;
            });
            console.log(`Total  Deduction: ${totalDeduction}`);
            totalTaxable += Number(employee.basicSalary);


            for (const taxslabs of taxslab) {
                // console.log(taxslabs)
                //  console.log(taxslabs.deductible_Fee)

                if (totalTaxable > taxslabs.from_Salary && totalTaxable < taxslabs.to_Salary) {
                    // console.log( "true")
                    deductible_Fee = taxslabs.deductible_Fee;
                    income_tax_payable = taxslabs.income_tax_payable;
                    totalTaxableIncome = (totalTaxable * (income_tax_payable == 0 ? 1 : income_tax_payable / 100)) - deductible_Fee;
                    //  console.log(tax)
                } else {


                    deductible_Fee = 0;
                    income_tax_payable = 0;
                    totalTaxableIncome = 0;
                }

            }
            console.log("total taxable", totalTaxable)
            overallTotalDeduction = totalTaxableIncome + totalDeduction + employee.basicSalary * (employee_pension * 1 / 100);


            const payrollData = {

                payrollName: moment().format('MMMM') +" Payroll",              
                month: moment().format('MMMM'),
                year: moment().format('YYYY'),
                // employeeId: employee._id,
                // taxable_income_limit: "600",
                // exampt_age_limit: "65",
                // exampt_percentage: "0",
                overtime:employee.overtime,
                acting:employee.acting,
                grossSalary: (employee.Acting + employee.overtimeEarning + totalAllowance + Number(employee.basicSalary) + employee.basicSalary * (employer_pension * 1 / 100)).toFixed(2),
                taxableIncome: totalTaxable.toFixed(2),
                incomeTax: totalTaxableIncome.toFixed(2),
                totalDeduction: overallTotalDeduction.toFixed(2),
                totalAllowanc: totalAllowance,
                employee_pension_amount: (employee.basicSalary * (employee_pension * 1 / 100)).toFixed(2),
                employer_pension_amount: (employee.basicSalary * (employer_pension * 1 / 100)).toFixed(2),
                NetSalary: (totalTaxable - overallTotalDeduction + totalExempted).toFixed(2),

            }
            Data.push(payrollData)
           
    //  await Employee.findByIdAndUpdate(employee._id,{

    //  })
            const newPayroll = new Payroll({ ...payrollData, });
            try {
             //GET ALL PAYROLL 
                const getPayroll = await Payroll.find({ month: moment().format('MMMM'), year: moment().format('YYYY') });
              console.log("length",getPayroll.length)
              
                if (getPayroll.length == 0) {
              //   const newpay = await newPayroll.save();
                numProcessed++;
               // console.log(newpay)
                console.log(`Payroll processed for employee ${employee.fullname}.  `, payrollData);
                 // Notify any progress callbacks that new progress information is available
                // for (const callback of progressCallbacks) {
                //     callback(getProgress());
                // }
                }
                else{
                    res.status(404).json('Payroll is defined for this month ');
                }
                      
       
               
            } catch (error) {
                numErrors++;
                console.error(`Error processing payroll for employee ${employee.fullname}:`, error);
            }
        }

        //  console.log(`Payroll processed for employee ${employee.fullname}.  `, payrollData);
        res.status(200).json(Data)
    } catch (error) {
        console.error('Error processing payroll:', error);
    }
}
// function getProgress() {
//     return {
//         numProcessed: numProcessed,
//         numErrors: numErrors
//     };
// }
// function waitForProgress() {
//     return new Promise(resolve => {
//         progressCallbacks.push(resolve);
//     });
// }





//   } catch (err) {
//     res.status(404).json(err)
//   }


exports.getPayrollForSpecificMonth= async(req,res,next)=>{
let payrollData='';
    try {
        const payroll =await Payroll.find({month:"May"}).populate('employeeId');
        res.status(200).json({
            payroll
        })
    } catch (err) {
        res.status(500).json('error occour')
    }

}





async function fetchData() {
    try {
        const data = await Employee.find();
        return data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



exports.checkPay = async (req, res,) => {
    try {
        const a=await fetchData();
        res.status(200).json(a)
    } catch (error) {

    }
}
