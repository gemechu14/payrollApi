const express = require('express');
const mongoose = require('mongoose');
const app = express();
const twilio = require('twilio');
const bodyParser = require('body-parser');
require('dotenv').config();
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
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

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

//Send email
const nodemailer = require('nodemailer');
function sendEmail() {
  return new Promise((resolve, reject) => {
    let transporter = nodemailer.createTransport({
      service: 'hotmail',
      secure:false,
      auth: {
        user: 'gemechu.bulti@yahoo.com',
        pass: process.env.PASS,
      },
    });
    const mail_options = {
      from: 'gemechu.bulti@yahoo.com',
      to: 'temamhashim72@yahoo.com',
      subject: 'hi',
      text: 'hi',
    };

    transporter.sendMail(mail_options, function (error, info) {
      if (error) {
        return reject({ message: 'can not send' });
      }
      return resolve({ message: 'Email sent successfully' });
    });
  });
}



app.use(bodyParser.json());

app.get("/", function(req, res) {
    const transporter = nodemailer.createTransport({
      host: "mail.yahoo.com",
    
      secure: false,
      auth: {
        user: 'gemechu.bulti@yahoo.com',
        pass: 'gemechu@11',
      },
    });

    let mailOptions = {
      from: 'gemechu.bulti@yahoo.com',
      to: 'temamhashim72@yahoo.com',
      subject: 'hi',
      text: 'hi',
    };

    // send mail with defined transport object
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return console.log(error);
        }
        console.log('Message sent: %s', info.messageId);
        res.sendStatus(200);
    });
});


///////////////////////////
app.get("/email", async (req, res) => {
  try {
    // let testAccount = await nodemailer.createTestAccount();
    var transporter = nodemailer.createTransport({
      //service: "hotmail",
        service: "gmail",
      //port: 587,//Yahoo
      //port :465,//Gmail
      secure: false,
      auth: {
        user: "gemechubulti11@gmail.com",
        pass: 'jrimdincxsstntpo',
        // user: "gemechubulti@outlook.com",
        // pass: 'gemechu@outlook@11',
      },
    });

    var mailOptions = {
      from:  "gemechubulti11@gmail.com",
      // to:'milkessagabai@gmail.com',
      to:'etanaalemunew@gmail.com',
      subject: 'Thank You for Your Kindness!',
      text: "Thank you so much for your patience. I'm sorry it took so long for me to get back to you I truly appreciate your understanding and willingness to wait It was a difficult situation, and I'm glad you were so understanding I want to thank you again for your patience It was much appreciated and it helped me a lot It's hard to ask for help but it's even harder to wait Thank you for making it easier Your kindness is much appreciated Thank you for being so understanding ",
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error.message);
        res.status(404).json(error);
      } else {
        console.log("Email sent: " + info.response);
        res.status(250).json(info.response);
      }
    });
  } catch (error) {
    console.log(error);
  }
});

//////////////////////////////


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




app.listen(process.env.PORT , () => {
  connect();
  console.log('connected to backend');
});
