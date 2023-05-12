const express = require("express");
const router = express.Router();
const payrollController = require("../controllers/payroll.js");
const middleware = require("../middleware/auth.js");
const { Worker, workerData } = require("worker_threads");
const Employee = require("../models/employee.js");
const mongoose = require("mongoose");
const Payroll = require('../models/payroll.js');
const moment = require('moment')
router.get("/", async (req, res) => {
  try {
    res.status(200).json("hello");
  } catch (err) { }
});
// router.post(
//   "/",
//   middleware.protect,
//   middleware.restrictTo("Companyadmin"),
//   async (req, res) => {
//     res.set({
//       "Content-Type": "text/event-stream",
//       "Cache-Control": "no-cache",
//       Connection: "keep-alive",
//     });

//     const employees = await Employee.find({ companyId: req.user.id });
//     const employeesId = employees?.map((emp) => emp.id);

//     const workerThreads = employeesId?.map((employeeId) => {
//       return new Promise((resolve, reject) => {
//         const worker = new Worker("./api/routes/newWorker.js", {
//           workerData: { employeeId, user: req.user.id },
//         });
//         worker.on("message", (message) => {
//           res.write(
//             `data: ${JSON.stringify({
//               type: "progress",
//               value: message.payroll,
//             })}\n\n`
//           );
//         });

//         worker.on("error", (error) => {
//           console.error(error);
//           reject(new Error("An error occurred while calculating payroll"));
//         });

//         // Listen for the worker thread to exit
//         worker.on("exit", (code) => {
//           if (code !== 0) {
//             console.error(`Worker stopped with exit code ${code}`);
//             reject(new Error("An error occurred while calculating payroll"));
//           }
//           resolve();
//         });
//       });
//     });

//       Promise.all(workerThreads)
//         .then(() => {
//           completed = true;
//         })
//         .catch((err) => {
//           console.error(err);
//           res.status(500).send({ error: err.message });
//         });
//   }
// );

router.post("/",
  middleware.protectAll,
  middleware.restrictToAll('Companyadmin'),
  async (req, res) => {
    res.set({
      "Content-Type": "text/event-stream",
      "Cache-Control": "no-cache",
      Connection: "keep-alive",
    });
    const getPayroll = await Payroll.find({ month: moment().format('MMMM'), companyId: req.user.id, year: moment().format('YYYY') });
    console.log("length", getPayroll.length)

    if (getPayroll.length == 0) {
      res.status(409);
      res.write(
        `data: ${JSON.stringify({
          type: "Conflict",
          value: "Payroll is run this month",
        })}\n\n`
      );

      res.end();
    }
    else {

      console.log("first")
      const employees = await Employee.find({ companyId: req.user.id });
      const employeesId = employees?.map((emp) => emp.id);
      let employeeLength = employeesId.length
      let progress = 0
      let completed = false;



      const workerThreads = employeesId?.map((employeeId) => {
        return new Promise((resolve, reject) => {
          const worker = new Worker("./api/routes/newWorker.js", {
            workerData: { employeeId, user: req.user.id },
          });
          worker.on("message", (message) => {
            progress++
            res.write(
              `data: ${JSON.stringify({
                type: "progress",
                percentage: progress / employeeLength * 100,
                value: message.payroll,
         
              })}\n\n`
            );
          });

          worker.on("error", (error) => {
            console.error(error);
            reject(new Error("An error occurred while calculating payroll"));
          });

          // Listen for the worker thread to exit
          worker.on("exit", (code) => {
            if (code !== 0) {
              console.error(`Worker stopped with exit code ${code}`);
              reject(new Error("An error occurred while calculating payroll"));
            }
            resolve();
          });
        });
      });



      Promise.all(workerThreads)
        .then(() => {
          completed = true;
          // console.log("hey");
        })
        .catch((err) => {
          console.error(err);
          res.status(500).send({ error: err.message });
        });

      // Check if all workers have completed every 100ms
      const interval = setInterval(() => {
        if (completed) {
          res.write(
            `data: ${JSON.stringify({
              type: "completed",
            })}\n\n`
          );
          res.end();
          clearInterval(interval);
        }
      }, 100);



    }


  })

module.exports = router;
