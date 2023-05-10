const mongoose = require("mongoose");
const Payroll = require("../models/payroll.js");
const Employee = require("../models/employee.js");
const Pension = require("../models/Pension.js");
const TaxSlab = require("../models/taxSlabs.js");
const Deduction = require("../models/deduction.js");
const Allowance = require("../models/Allowance.js");
const GradeAllowance = require("../models/gradeAllowance.js");
const gradeDefinition = require("../models/gradeDefinition.js");
const { parentPort, workerData } = require("worker_threads");
const moment = require("moment");

const connect = async () => {
  try {
    mongoose.set("strictQuery", true);
    await mongoose.connect(
      process.env.MONGO_DB_NEW,
      console.log("connected to MongoDB"),
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
        useCreateIndex: true, //make this true
        autoIndex: true,
      }
    );
  } catch (error) {
    throw error;

    // process.exit();
  }
};

exports.fetchData = async (message) => {
  //   console.log("message from fetchData", message.employeeId);
  try {
    await connect();
    let employer_pension = 0;
    let employee_pension = 0;
    const pension = await Pension.find({ companyId: message.user });
    employee_pension = pension[0]?.employeeContribution
      ? pension[0]?.employeeContribution
      : 1;
    employer_pension = pension[0]?.employerContribution
      ? pension[0]?.employerContribution
      : 1;
    //GET TAX RULE
    const taxslab = await TaxSlab.find({ companyId: message.user });
    const employee = await Employee.findOne({ _id: message.employeeId })
      .populate("deduction")
      .populate("allowance");

    let totalDeduction = 0;
    // let totalAllowance= 0;
    let totalAllowance = 0;
    let totalTaxable = 0;
    let income_tax_payable = 0;
    let deductible_Fee = 0;
    let totalExempted = 0;
    let totalTaxableIncome = 0;
    let overallTotalDeduction = 0;

    // console.log("allowance", employee, null, 2);

    // //TOTAL ALLOWANCES
    employee.allowance.forEach((allowance) => {
      totalAllowance += allowance.amount;
      //console.log(allowance.is_Exempted)
      if (allowance.is_Exempted) {
        totalExempted += allowance.exempted_on_Allowance_amount;
        if (allowance.amount > allowance.starting_from) {
          totalTaxable +=
            allowance.amount - allowance.exempted_on_Allowance_amount;
        } else {
          totalTaxable += allowance.amount;
        }
      } else {
        totalTaxable += allowance.amount;
      }
    });

    //TOTAL DEDUCTION
    employee.deduction.forEach((deduction) => {
      totalDeduction += deduction.amount;
    });

    totalTaxable += Number(employee.basicSalary);

    for (const taxslabs of taxslab) {
      // console.log(taxslabs)
      //  console.log(taxslabs.deductible_Fee)

      if (
        totalTaxable > taxslabs.from_Salary &&
        totalTaxable < taxslabs.to_Salary
      ) {
        // console.log( "true")
        deductible_Fee = taxslabs.deductible_Fee;
        income_tax_payable = taxslabs.income_tax_payable;
        totalTaxableIncome =
          totalTaxable *
            (income_tax_payable == 0 ? 1 : income_tax_payable / 100) -
          deductible_Fee;
        //  console.log(tax)
      } else {
        deductible_Fee = 0;
        income_tax_payable = 0;
        totalTaxableIncome = 0;
      }
    }

    overallTotalDeduction =
      totalTaxableIncome +
      totalDeduction +
      employee.basicSalary * ((employee_pension * 1) / 100);

    const payrollData = {
      payrollName: moment().format("MMMM") + " Payroll",
      month: moment().format("MMMM"),
      year: moment().format("YYYY"),
      grossSalary: (
        employee.Acting +
        employee.overtimeEarning +
        totalAllowance +
        Number(employee.basicSalary) +
        employee.basicSalary * ((employer_pension * 1) / 100)
      ).toFixed(2),
      taxableIncome: totalTaxable.toFixed(2),
      incomeTax: totalTaxableIncome.toFixed(2),
      totalDeduction: overallTotalDeduction.toFixed(2),
      totalAllowance,
      employee_pension_amount: (
        employee.basicSalary *
        ((employee_pension * 1) / 100)
      ).toFixed(2),
      employer_pension_amount: (
        employee.basicSalary *
        ((employer_pension * 1) / 100)
      ).toFixed(2),
      NetSalary: (totalTaxable - overallTotalDeduction + totalExempted).toFixed(
        2
      ),
    };
    // Data.push(payrollData);

    const newPayroll = new Payroll({ ...payrollData, companyId: message.user });

    return payrollData;

    // console.log("newPayroll", newPayroll);

    // console.log("allowance", {
    //   totalAllowance,
    //   totalTaxable,
    //   totalExempted,
    //   totalDeduction,
    // });
    // for (const employee of employees) {
    //   let totalDeduction = 0;
    //   let totalAllowance = 0;
    //   let totalTaxable = 0;
    //   let income_tax_payable = 0;
    //   let deductible_Fee = 0;
    //   let totalExempted = 0;
    //   let totalTaxableIncome = 0;
    //   let overallTotalDeduction = 0;

    //   //TOTAL ALLOWANCES
    //   employee.allowance.forEach((allowance) => {
    //     totalAllowance += allowance.amount;
    //     //console.log(allowance.is_Exempted)
    //     if (allowance.is_Exempted) {
    //       totalExempted += allowance.exempted_on_Allowance_amount;
    //       if (allowance.amount > allowance.starting_from) {
    //         totalTaxable +=
    //           allowance.amount - allowance.exempted_on_Allowance_amount;
    //       } else {
    //         totalTaxable += allowance.amount;
    //       }
    //     } else {
    //       totalTaxable += allowance.amount;
    //     }
    //   });

    // }
    //  console.log("allowance", { totalTaxable, totalAllowance });
    // console.log("employees", employees);
    // return "hey";
  } catch (error) {
    console.log("calculatePayroll", error);
    return error;
  }
};

// module.exports = fetchData;
