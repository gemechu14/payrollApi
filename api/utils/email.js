const nodemailer=require('nodemailer');

const sendEmail= async (options) => {
{
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
        to: options.email,
        subject: options.subject,
        text: options.message,
        // to: 'geme11.bulti@gmail.com',
        // subject: 'Thank You for Your Kindness!',
        // text: "Thank you so much for your patience. I'm sorry it took so long for me to get back to you I truly appreciate your understanding and willingness to wait It was a difficult situation, and I'm glad you were so understanding I want to thank you again for your patience It was much appreciated and it helped me a lot It's hard to ask for help but it's even harder to wait Thank you for making it easier Your kindness is much appreciated Thank you for being so understanding ",
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
    }}
module.exports = sendEmail;