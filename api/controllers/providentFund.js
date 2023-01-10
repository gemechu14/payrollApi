const ProvidentFund=require('../models/providentFund.js');


exports.add_ProvidentFund = async (req, res) => {
  const newProvidentFund = new ProvidentFund(req.body);
  try {
    const savedProvidentFund = await newProvidentFund.save();
    console.log(req.body);
    res.status(200).json({
      savedProvidentFund,
    });
   
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};


//GET ALL
exports.get_All_Payroll = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const providentFund = await ProvidentFund.find();
    res.status(200).json({
      count: providentFund.length,
      providentFund,
    });
  } catch (err) {
    next(err);
  }
};
//GET SINGLE Payroll
exports.get_single_ProvidentFund = async (req, res) => {
  try {
    const providentFund = await ProvidentFundfindById(req.params.id);
    res.status(200).json(providentFund);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateProvidentFund = async (req, res) => {
  try {
    const updatedProvidentFund = await ProvidentFund.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedProvidentFund);
  } catch (error) {}
};
//DELETE
exports.delete_ProvidentFund = async (req, res) => {
  try {
    await ProvidentFund.findByIdAndDelete(req.params.id);
    res.status(200).json('ProvidentFund has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};

