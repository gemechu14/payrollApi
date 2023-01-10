const TaxSlab = require('../models/taxSlabs.js');
const Payroll = require('../models/payroll.js');


//GET ALL
exports.get_All_TaxSlab = async (req, res, next) => {
  try {
    const taxSlab = await TaxSlab.find();
    res.status(200).json({
      count: taxSlab.length,
      taxSlab,
    });
  } catch (err) {
    next(err);
  }
};
//GET SINGLE
exports.get_single_TaxSlab = async (req, res) => {
  try {
    const taxSlab = await TaxSlab.findById(req.params.id);
    res.status(200).json(taxSlab);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

//DELETE
exports.delete_TaxSlab = async (req, res) => {
  try {
    await TaxSlab.findByIdAndDelete(req.params.id);
    res.status(200).json('TaxSlab has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};



// ADD TAXSLAB

exports.add_taxslab = async (req, res) => {
const payrollId=req.params.payrollId;
  const newTaxSlab = new TaxSlab(req.body);
  try {
    const savedTaxSlab = await newTaxSlab.save();
    console.log(req.body);

    try {
      await Payroll.findByIdAndUpdate(payrollId, {
        $push: { taxSlab: savedTaxSlab._id },
      });
    } catch (err) {
      next(err);
    }

    res.status(200).json({ savedTaxSlab });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};