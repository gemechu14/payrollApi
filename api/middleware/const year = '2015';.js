const year = '2015';
const month = 'January';

YourModel.updateOne(
  {  'payslip.year': year, 'payslip.month': month },
  { $set: { 'payslip.$.approval.isApproved': true } },
  function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

await Employee.updateOne(
  { _id: mongoose.Types.ObjectId(employeeId), 'payslip.year': '2015', 'payslip.month': 'January' },
  { $set: { 'payslip.$.approval.isApproved': true }, $inc: { 'payslip.$.approval.counter': 1 } },
  function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  }
);

await Employee.find({ "payslip.year": year, "payslip.month": month }, (err, docs) => {
  if (err) {
    console.error(err);
  } else {
    console.log(docs);
  }
});



const Employee = require('./models/employee');

async function updateApprovalStatus(employeeId, year, month) {
  // Check if a payslip document with the given year and month exists for the employee
  const payslipExists = await Employee.exists({
    _id: employeeId,
    'payslip.year': year,
    'payslip.month': month,
  });

  // Update the employee document
  const update = payslipExists
    ? {
      $inc: { 'payslip.$.approval.counter': 1 },
      $set: { 'payslip.$.approval.isApproved': true },
    }
    : {
      $push: {
        payslip: {
          month,
          year,
          approval: { counter: 1, isApproved: true },
        },
      },
    };

  const result = await Employee.updateOne({ _id: employeeId }, update);
  console.log(result);
}

// Example usage
updateApprovalStatus('employeeId123', '2015', 'January');
