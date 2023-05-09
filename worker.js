
const Payroll = require("../models/payroll.js");
const Employee = require("../models/employee.js");
const { set } = require("mongoose");
const createError = require("../utils/error.js");
const mongoose = require("mongoose");
const year = require("../models/year.js");
const month = require("../models/month.js");
const moment = require('moment');
const gradeDefinition = require('../models/gradeDefinition.js');
const payroll = require("../models/payroll.js");
const Pension = require('../models/Pension.js');
const TaxSlab = require('../models/taxSlabs.js');

const { parentPort } = require('worker_threads');



parentPort.on('message', async (message) => {
    if (message === 'start') {

        async (req, res, next) => {

            try {
                let employer_pension = 0;
                let employee_pension = 0;
                let data = '';
                //GET PENSION
                const pension = await Pension.find({ companyId: req.user.id });
                employee_pension = pension[0]?.employeeContribution ? (pension[0]?.employeeContribution) : 1;
                employer_pension = pension[0]?.employerContribution ? (pension[0]?.employerContribution) : 1;

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
                    console.log(`Total  Allowance: ${totalDeduction}`);




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

                        payrollName: moment().format('MMMM') + " Payroll",
                        month: moment().format('MMMM'),
                        year: moment().format('YYYY'),
                        // employeeId: employee._id,
                        // taxable_income_limit: "600",
                        // exampt_age_limit: "65",
                        // exampt_percentage: "0",
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

                    const newPayroll = new Payroll({ ...payrollData, companyId: req.user.id });
                    try {
                        //GET ALL PAYROLL 
                        const getPayroll = await Payroll.find({ month: moment().format('MMMM'), companyId: req.user.id, year: moment().format('YYYY') });
                        console.log("length", getPayroll.length)

                        if (getPayroll.length != 0) {
                            //   const newpay = await newPayroll.save();
                            numProcessed++;
                            // console.log(newpay)
                            console.log(`Payroll processed for employee ${employee.fullname}.  `, payrollData);
                            // Notify any progress callbacks that new progress information is available
                            // for (const callback of progressCallbacks) {
                            //     callback(getProgress());
                            // }
                        }
                        else {
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
            }}






        // Define payroll processing logic here
        // Calculate employee salaries and process payments
        // You can use async/await syntax to make database queries
        let progress = 0;
        while (progress < 100) {
            progress += 10;
            // Send progress updates to the main thread
            parentPort.postMessage({
                type: 'progress',
                value: progress
            });
            // Simulate some processing time
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
        // Send a message back to the main thread when complete
        parentPort.postMessage({
            type: 'complete'
        });
    }
});






// exports.calculatePayrollForAllEmployee = async (req, res, next) => {

//     try {
//         let employer_pension = 0;
//         let employee_pension = 0;
//         let data = '';
//         //GET PENSION
//         const pension = await Pension.find({ companyId: req.user.id });
//         employee_pension = pension[0]?.employeeContribution ? (pension[0]?.employeeContribution) : 1;
//         employer_pension = pension[0]?.employerContribution ? (pension[0]?.employerContribution) : 1;

//         //GET TAX RULE
//         const taxslab = await TaxSlab.find({ companyId: req.user.id });

//         for (const taxslabs of taxslab) {
//             //   console.log(taxslabs.from_Salary)
//             //   console.log(taxslabs.to_Salary)

//         }
//         //GET ALLOWANCE
//         //const allowances=await Employe

//         // Retrieve employee information from the employee collection
//         const employees = await Employee.find({ companyId: req.user.id }).populate('deduction').populate('allowance');

//         numProcessed = 0;
//         numErrors = 0;
//         let i = 0
//         let tax = 0;
//         let Data = [];
//         // Iterate through each employee and calculate their pay
//         for (const employee of employees) {


//             //console.log(employee.basicSalary)



//             let totalDeduction = 0;
//             // let totalAllowance= 0;


//             let totalAllowance = 0;
//             let totalTaxable = 0;
//             let income_tax_payable = 0;
//             let deductible_Fee = 0;
//             let totalExempted = 0;
//             let totalTaxableIncome = 0;
//             let overallTotalDeduction = 0;


//             //TOTAL ALLOWANCES
//             employee.allowance.forEach((allowance) => {
//                 totalAllowance += allowance.amount;
//                 //console.log(allowance.is_Exempted)
//                 if (allowance.is_Exempted) {
//                     totalExempted += allowance.exempted_on_Allowance_amount;
//                     if (allowance.amount > allowance.starting_from) {
//                         totalTaxable += allowance.amount - allowance.exempted_on_Allowance_amount
//                     }
//                     else {
//                         totalTaxable += allowance.amount
//                     }

//                 } else {
//                     totalTaxable += allowance.amount
//                 }



//             });


//             //TOTAL DEDUCTION
//             employee.deduction.forEach((deduction) => {
//                 totalDeduction += deduction.amount;
//             });
//             console.log(`Total  Allowance: ${totalDeduction}`);




//             totalTaxable += Number(employee.basicSalary);


//             for (const taxslabs of taxslab) {
//                 // console.log(taxslabs)
//                 //  console.log(taxslabs.deductible_Fee)

//                 if (totalTaxable > taxslabs.from_Salary && totalTaxable < taxslabs.to_Salary) {
//                     // console.log( "true")
//                     deductible_Fee = taxslabs.deductible_Fee;
//                     income_tax_payable = taxslabs.income_tax_payable;
//                     totalTaxableIncome = (totalTaxable * (income_tax_payable == 0 ? 1 : income_tax_payable / 100)) - deductible_Fee;
//                     //  console.log(tax)
//                 } else {


//                     deductible_Fee = 0;
//                     income_tax_payable = 0;
//                     totalTaxableIncome = 0;
//                 }

//             }
//             console.log("total taxable", totalTaxable)
//             overallTotalDeduction = totalTaxableIncome + totalDeduction + employee.basicSalary * (employee_pension * 1 / 100);


//             const payrollData = {

//                 payrollName: moment().format('MMMM') + " Payroll",
//                 month: moment().format('MMMM'),
//                 year: moment().format('YYYY'),
//                 // employeeId: employee._id,
//                 // taxable_income_limit: "600",
//                 // exampt_age_limit: "65",
//                 // exampt_percentage: "0",
//                 grossSalary: (employee.Acting + employee.overtimeEarning + totalAllowance + Number(employee.basicSalary) + employee.basicSalary * (employer_pension * 1 / 100)).toFixed(2),
//                 taxableIncome: totalTaxable.toFixed(2),
//                 incomeTax: totalTaxableIncome.toFixed(2),
//                 totalDeduction: overallTotalDeduction.toFixed(2),
//                 totalAllowanc: totalAllowance,
//                 employee_pension_amount: (employee.basicSalary * (employee_pension * 1 / 100)).toFixed(2),
//                 employer_pension_amount: (employee.basicSalary * (employer_pension * 1 / 100)).toFixed(2),
//                 NetSalary: (totalTaxable - overallTotalDeduction + totalExempted).toFixed(2),

//             }
//             Data.push(payrollData)

//             const newPayroll = new Payroll({ ...payrollData, companyId: req.user.id });
//             try {
//                 //GET ALL PAYROLL 
//                 const getPayroll = await Payroll.find({ month: moment().format('MMMM'), companyId: req.user.id, year: moment().format('YYYY') });
//                 console.log("length", getPayroll.length)

//                 if (getPayroll.length != 0) {
//                     //   const newpay = await newPayroll.save();
//                     numProcessed++;
//                     // console.log(newpay)
//                     console.log(`Payroll processed for employee ${employee.fullname}.  `, payrollData);
//                     // Notify any progress callbacks that new progress information is available
//                     // for (const callback of progressCallbacks) {
//                     //     callback(getProgress());
//                     // }
//                 }
//                 else {
//                     res.status(404).json('Payroll is defined for this month ');
//                 }



//             } catch (error) {
//                 numErrors++;
//                 console.error(`Error processing payroll for employee ${employee.fullname}:`, error);
//             }
//         }

//         //  console.log(`Payroll processed for employee ${employee.fullname}.  `, payrollData);
//         res.status(200).json(Data)
//     } catch (error) {
//         console.error('Error processing payroll:', error);
//     }
// }