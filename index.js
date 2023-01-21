const express = require('express');
const mongoose = require('mongoose');
const app = express();
const twilio = require('twilio');
const bodyParser = require('body-parser');
require('dotenv').config();
const rateLimit=require('express-rate-limit');
const helmet=require('helmet');
const mongosanitize=require('express-mongo-sanitize');
const hpp=require('hpp')
const xss=require('xss-clean');
app.use(helmet());
const PackageRoute=require('./api/routes/Package.js')
const TrialRoute=require('./api/routes/trial.js')
//Security

//DATA SANITIZATION AGAINST NO SQL QUERY ENJECTION
app.use(mongosanitize());

//DATA SANITIZATION AGAINST  XSS
app.use(xss());
//PARAMETER POLUTION
app.use(hpp())
const limiter = rateLimit({
	windowMs: 15 * 60 * 1000, // 15 minutes
	max: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
//	standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
//	legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  message:'Too many request please try later'
});
app.use(limiter);

const authenticationRoute=require('./api/routes/authRoute.js')
const deptRoute = require('./api/routes/department.js');
const payrollRoute = require('./api/routes/payroll.js');
const taxExamptionDateRoute = require('./api/routes/TaxExaptionDate.js');
const providentFundRoute = require('./api/routes/providentFund.js');


const taxSlabRoute = require('./api/routes/TaxSlab.js');
const authRoute = require('./api/routes/auth.js');
const userRoute = require('./api/routes/user.js');
const employeeRoute = require('./api/routes/employee.js');
const allowanceRoute = require('./api/routes/Allowance.js');
const deductionRoute = require('./api/routes/deduction.js');
const payrollMonthRoute = require('./api/routes/payrollMonth.js');
const SubscriptionRoute=require('./api/routes/subscription.js')

const cors = require('cors');
mongoose.Promise = global.Promise;
const morgan=require('morgan');
app.use(morgan("dev"));

app.use('/uploads', express.static('uploads'));


const connect = async () => {
  try {
    mongoose.set('strictQuery', true);
    await mongoose.connect(
      process.env.MONGO,
      console.log('connected to MongoDB'),
      {
        useNewUrlParser: true,

        useUnifiedTopology: true,
      }
    );
  } catch (error) {
    throw error;
  }
};



app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  })
);
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());
app.use(morgan('dev'));

//MIDDLEWARE
app.use('/department', deptRoute);
app.use('/payroll', payrollRoute);
app.use('/taxExamption', taxExamptionDateRoute);
app.use('/providentFund', providentFundRoute);
app.use('/taxSlab', taxSlabRoute);
app.use('/auth', authRoute);
app.use('/user', userRoute);
app.use('/employee', employeeRoute);
app.use('/allowance', allowanceRoute);
app.use('/deduction', deductionRoute);
app.use('/payrollMonth', payrollMonthRoute);
app.use('/package',PackageRoute);
app.use('/trial',TrialRoute);
app.use('/subscription',SubscriptionRoute);
//Send email
const nodemailer = require('nodemailer');

app.use(bodyParser.json());
app.use('/api',authenticationRoute);

///////////////////////////
app.get('/email', async (req, res) => {
  try {
    // let testAccount = await nodemailer.createTestAccount();
    var transporter = nodemailer.createTransport({
      //service: "hotmail",
      service: 'gmail',
      //port: 587,//Yahoo
      //port :465,//Gmail
      secure: false,
      auth: {
        user: 'gemechubulti11@gmail.com',
        pass: 'jrimdincxsstntpo',
        // user: "gemechubulti@outlook.com",
        // pass: 'gemechu@outlook@11',
      },
    });

    var mailOptions = {
      from: 'gemechubulti11@gmail.com',
      // to:'milkessagabai@gmail.com',
      // to:'etanaalemunew@gmail.com',
      to: 'dsichale@gmail.com',
      subject: 'Thank You for Your Kindness!',
      text: "Thank you so much for your patience. I'm sorry it took so long for me to get back to you I truly appreciate your understanding and willingness to wait It was a difficult situation, and I'm glad you were so understanding I want to thank you again for your patience It was much appreciated and it helped me a lot It's hard to ask for help but it's even harder to wait Thank you for making it easier Your kindness is much appreciated Thank you for being so understanding ",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        res.status(404).json(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.status(250).json(info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

/////////////////////////////

// app.use((req, res, next) => {
//   res.header('Access-Control-Allow-Orogin', '*');
//   res.header(
//     'Access-Control-Allow-Headers',
//     '*'
//   );
//   if (req.method == 'OPTIONS') {
//     res.header(Access-Control-Allow-Methods, 'GET,POST,PATCH,DELETE,PUT');
//     return res.status(200).json({});
//   }
//   next();
// });

///////
// app.get("/", (req, res) => {
//   res.setHeader("Access-Control-Allow-Origin", "*")
//   res.setHeader("Access-Control-Allow-Credentials", "true");
//   res.setHeader("Access-Control-Max-Age", "1800");
//   res.setHeader("Access-Control-Allow-Headers", "content-type");
//   res.setHeader( "Access-Control-Allow-Methods", "PUT, POST, GET, DELETE, PATCH, OPTIONS" ); 
//    });




app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});
app.use((err, req, res, next) => {
  const errorStatus = err.status || 500;
  const errorMessage = err.message || 'Something went Wrong';

  return res.status(errorStatus).json({
    success: false,
    status: errorStatus,
    message: errorMessage,
    stack: err.stack,
  });
});

app.listen(process.env.PORT, () => {
  connect();
  console.log('connected to backend');
});
