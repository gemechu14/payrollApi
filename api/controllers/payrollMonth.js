const payrollMonth = require("../models/payrollMonth.js");

const moment = require("moment");
const mongoose = require('mongoose');

exports.add_payrollMonth = async (req, res) => {
  try {
    const { startDate, endDate, name } = req.body;

    const payrollMonth1 = await payrollMonth.find({
      $and: [{ companyId: req.user.id }, { name: name }],
    });

    console.log(payrollMonth1);

    if (!payrollMonth1 || payrollMonth1.length == 0) {
      const newpayrollMonth = await payrollMonth.create({
        startDate: startDate,
        endDate: endDate,
        companyId: req.user.id,
        name: moment().format('MMMM'),
      });

      res.status(200).json({
        newpayrollMonth,
      });
    } else {
      res.status(404).json("The payrollMonth already exists");
    }
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

//GET ALL
exports.get_All_monthPayroll = async (req, res, next) => {
  try {
    const monthPayroll = await payrollMonth.find({ companyId: req.user.id });
    res.status(200).json({
      count: monthPayroll.length,
      monthPayroll,
    });
  } catch (err) {
    next(err);
  }
};
//GET One
exports.get_single_monthPayroll = async (req, res) => {
  try {
    const monthPayroll = await payrollMonth.find({
      companyId: req.user.id,
      _id: req.params.id,
    });
    res.status(200).json(monthPayroll);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updatemonthPayroll = async (req, res) => {
  try {
    const updatedmonthPayroll = await payrollMonth.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedDept);
  } catch (error) { }
};
//DELETE
exports.delete_monthPayroll = async (req, res) => {
  try {

    const payrollMonth = await payrollMonth.find(mongoose.Types.ObjectId(req.params.id));

    if (payrollMonth.length != 0) {
      await payrollMonth.findByIdAndDelete(req.params.id);
      res.status(200).json("monthPayroll has been deleted");
    } else {

      res.status(200).json("there is non such month");
    }

  } catch (error) {
    res.status(500).json(error);
  }
};

exports.get_All = async (req, res, next) => {
  try {

    let data = moment().format('MMMM')
    console.log("month",moment().format('MMMM'))
    let data1 = moment().format('YYYY')
    console.log("year",data1)
    console.log(typeof(data1))
    
    const all_month=await payrollMonth.find();
    res.status(200).json(all_month)
  } catch (err) {
    next(err);
  }
};
//GET One
exports.get_single1_monthPayroll = async (req, res) => {
  try {
    const monthPayroll = await payrollMonth.find({
      companyId: req.user.id,
      _id: req.params.id,
    });
    res.status(200).json(monthPayroll);
  } catch (error) {
    res.status(500).json(error);
  }
};
