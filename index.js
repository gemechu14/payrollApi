const express = require("express");
const mongoose = require("mongoose");
const app = express();
const twilio = require("twilio");
const bodyParser = require("body-parser");
require("dotenv").config();
const rateLimit = require("express-rate-limit");

const helper = require("./api/utils/schedulers.js");

// const helmet=require('helmet');
const mongosanitize = require("express-mongo-sanitize");
const hpp = require("hpp");
const xss = require("xss-clean");
const path = require("path");
const uuid = require("uuid");
const multer = require("multer");
// helmet({
//   crossOriginResourcePolicy: false,

// })
// app.use(helmet.crossOriginEmbedderPolicy(true));
// app.use(helmet({
//   crossOriginEmbedderPolicy: false,
// }));

const cron = require("node-cron");
const User = require("./api/models/userModel.js");
const moment = require("moment");
const PackageRoute = require("./api/routes/Package.js");
const TrialRoute = require("./api/routes/trial.js");
const scheduler = require("./api/utils/jobs.js");
const gradeDefinition = require("./api/routes/gradeDefinition.js");
const gradeAllowance = require("./api/routes/gradeAllowance.js");
const pension = require("./api/routes/Pension.js");
const roleRoute = require("./api/routes/customRole.js");
const newPayrollRoute = require("./api/routes/NewPayroll.js");
//Security

//DATA SANITIZATION AGAINST NO SQL QUERY ENJECTION
app.use(mongosanitize());

//DATA SANITIZATION AGAINST  XSSs
app.use(xss());
//PARAMETER POLUTION
app.use(hpp());
// const limiter = rateLimit({
// 	windowMs: 15 * 60 * 1000, // 15 minutes
// 	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
// //	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
// //	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
//   message:'Too many request please try later'
// });
// app.use(limiter);

const authenticationRoute = require("./api/routes/authRoute.js");
const deptRoute = require("./api/routes/department.js");
const payrollRoute = require("./api/routes/payroll.js");
const taxExamptionDateRoute = require("./api/routes/TaxExaptionDate.js");
const providentFundRoute = require("./api/routes/providentFund.js");

const taxSlabRoute = require("./api/routes/TaxSlab.js");
const authRoute = require("./api/routes/auth.js");
const userRoute = require("./api/routes/user.js");
const employeeRoute = require("./api/routes/employee.js");
const allowanceRoute = require("./api/routes/Allowance.js");
const deductionRoute = require("./api/routes/deduction.js");
const generalDeductionRoute = require("./api/routes/generalDeduction.js");
const payrollMonthRoute = require("./api/routes/payrollMonth.js");
const SubscriptionRoute = require("./api/routes/subscription.js");

const approverRoute = require("./api/routes/approverRoute.js");
const defineloanRoute = require("./api/routes/loanDefinition.js");
// const payrollApprovementMethod=require('./api/routes/payrollApprovementRoute.js')
const loanRoute = require("./api/routes/loan.js");
const IDFormatRoute = require("./api/routes/id_format.js");
const approvalMethodRoute = require("./api/routes/approvalMethodRoute.js");

const cors = require("cors");
mongoose.Promise = global.Promise;
const morgan = require("morgan");
app.use(morgan("dev"));

//app.use("/images", express.static(path.join(__dirname, "/images")));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });

app.post("/upload", upload.single("file"), (req, res) => {
  try {
    res.status(200).json("File has been uploaded");
  } catch (err) {
    res.status(404).json("File has not been uploaded");
  }
});

app.use("/scheduler", helper);

const storage1 = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "Logo");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload1 = multer({ storage: storage1 });
app.post("/companyLogo", upload1.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use("/uploads", express.static(path.join(__dirname, "./uploads")));
app.use("/uploads", express.static("./uploads/"));

app.use("/images", express.static(path.join(__dirname, "/images")));

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

const storager = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "images");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + file.originalname);
    console.log(Date.now() + file.originalname);
  },
});

const uploadr = multer({ storage: storager });
app.post("/api/upload1", uploadr.single("file"), (req, res) => {
  try {
    res.status(200).json("File has been uploaded");
  } catch (err) {
    res.status(404).json("File has not been uploaded");
  }
});

const storageFile = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "./uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + uuid.v4();
    const ext = path.extname(file.originalname);
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  // reject a file
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(null, false);
  }
};

const uploadFile = multer({
  storage: storageFile,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

app.post("/api/upload", uploadFile.single("file"), (req, res) => {
  try {
    res.status(200).json("Image has been uploaded");
  } catch (err) {
    res.status(404).json("File has not been uploaded");
  }
});

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "http://localhost:3002",
      "http://localhost:*",
      "http://10.2.125.124:4000",
    ],
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

//MIDDLEWARE
app.use("/department", deptRoute);
app.use("/payroll", payrollRoute);
app.use("/taxExamption", taxExamptionDateRoute);
app.use("/providentFund", providentFundRoute);
app.use("/taxSlab", taxSlabRoute);
app.use("/runPayroll", newPayrollRoute);
app.use("/auth", authRoute);
app.use("/user", userRoute);
app.use("/employee", employeeRoute);
app.use("/allowance", allowanceRoute);
app.use("/deduction", deductionRoute);
app.use("/generaldeduction", generalDeductionRoute);
app.use("/payrollMonth", payrollMonthRoute);
app.use("/package", PackageRoute);
app.use("/trial", TrialRoute);
app.use("/subscription", SubscriptionRoute);
app.use("/gradeDefinition", gradeDefinition);
app.use("/gradeAllowance", gradeAllowance);
app.use("/idformat", IDFormatRoute);
app.use("/api", approverRoute);

app.use("/role", roleRoute);
app.use("/api", approvalMethodRoute);
app.use("/pension", pension);
app.use("/defineloan", defineloanRoute);
app.use("/loan", loanRoute);

app.use(bodyParser.json());
app.use("/api", authenticationRoute);

app.use((req, res, next) => {
  const error = new Error("Not Found");
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  res.removeHeader("Cross-Origin-Embedder-Policy");
  const errorStatus = err.status || 500;
  const errorMessage = err.message || "Something went Wrong";

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

// app.use((req, res, next) => {
//   res.setHeader("Access-Control-Allow-Origin", "*");
//   res.setHeader(
//     "Access-Control-Allow-Headers",
//     "Origin,X-Requested-With, Content-Type, Accept, Authorization"
//   );
//   res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,PUT,DELETE,OPTIONS");
//   next();
// });

cron.schedule("* * * * *", async function (req, res, next) {
  let today_date = moment(new Date()).format("YYYY-MM-DD hh:mm");
  const find_users = await User.find();
  if (find_users) {
    for (let i = 0; i < find_users.length; i++) {
      let users = find_users[i];
      //format user date to same format as today date then compare
      let userDueDate = moment(users.next_payment_date).format(
        "YYYY-MM-DD hh:mm"
      );
      let today_date = moment(Date.now().format("YYYY-MM-DD hh:mm"));

      if (today_date === userDueDate && today_date > userDueDate) {
        console.log(today_date > userDueDate);
        let find_user = await User.findById(users._id);
        find_user.isPaid = false;
        find_user.next_payment_date = null;
        find_user.startDate = null;

        find_user.save();
      }
    }
  }
});

async function run() {
  try {
    connect();
    // const database = client.db('my-database'); // Replace with your database name
    // const collection = database.collection('my-collection'); // Replace with your collection name

    // Schedule a task to run every day at midnight
    cron.schedule("*  * * * *", async () => {
      let today_date = moment(new Date()).format("YYYY-MM-DD hh:mm");
      const find_users = await User.find();
      if (find_users) {
        for (let i = 0; i < find_users.length; i++) {
          let users = find_users[i];
          // console.log(users.length)
          //format user date to same format as today date then compare

          let currentDate = moment(Date.now()).format("YYYY-MM-DD hh:mm");

          console.log(users.next_payment_date);
          let userDueDate = moment(users.next_payment_date).format(
            "YYYY-MM-DD hh:mm"
          );
          //console.log(currentDate>userDueDate);
          //let today_date=moment(Date.now().format("YYYY-MM-DD hh:mm"))
          //console.log(userDueDate)
          // console.log(currentDate);

          if (currentDate != userDueDate || currentDate > userDueDate) {
            // console.log(currentDate>userDueDate);
            // let find_user = await User.findById(users._id);
            // console.log(find_user)
            //   find_user.isPaid = true;
            //   find_user.next_payment_date=null;
            //   find_user.startDate=null;
            //     find_user.save();
            //const result = await User.updateMany({ status: 'active' }, { $set: { status: 'pending',isPaid:false,next_payment_date:null,startDate:null } },
            // );
            //console.log(`Updated ${result.modifiedCount} documents`);
            //    // let find_user = await User.findById(users._id);
            // find_user.isPaid = false;
            // find_user.next_payment_date=null;
            // find_user.startDate=null;
            // find_user.save()
          }
        }
      }

      // const result = await User.updateMany({ status: 'inactive' }, { $set: { status: 'active' } });
      // console.log(`Updated ${result.modifiedCount} documents`);
    });
  } catch (err) {}
}

//run();

app.listen(process.env.PORT, (req, res, next) => {
  connect(req, res, next);
  // run();
  console.log("connected to backend");
});
