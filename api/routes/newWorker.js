const { parentPort, workerData } = require("worker_threads");
const Employee = require("../models/employee.js");
// import Employee from "../models/employee.js";
const mongoose = require("mongoose");
const { fetchData } = require("../utils/calculatePayroll.js");

console.log("workerData", workerData);

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

async function calculatePayrollForEmployee(employeeId) {
  // Perform the payroll calculation
  // await fetchData(workerData.user);
  try {
    // let progress = 0;
    const payroll = await fetchData(workerData);
    // send progress to main thread
    // parentPort.postMessage({ progress: 1 });

    parentPort.postMessage({ employeeId, payroll });
  } catch (error) {
    console.log("error", error);
  }

  // parentPort.postMessage({ employeeId, progress });
}

calculatePayrollForEmployee(workerData.employeeId).catch((error) =>
  console.error(error)
);
