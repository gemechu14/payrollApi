const TaxExaptionDate=require('../models/taxExamptionDate.js');


exports.add_TaxExaptionDate = async (req, res) => {
  const newTaxExaptionDate = new TaxExaptionDate(req.body);
  try {
    const savedTaxExaptionDate = await newTaxExaptionDate.save();
    console.log(req.body);
    res.status(200).json({
      savedTaxExaptionDate,
    });
   
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};


//GET ALL
exports.get_All_TaxExaptionDate = async (req, res, next) => {
  const failed = true;
  // if(failed) return next(createError(401,"You are not authenticated"))

  try {
    const taxExaptionDate = await TaxExaptionDate.find();
    res.status(200).json({
      count: taxExaptionDate.length,
      taxExaptionDate,
    });
  } catch (err) {
    next(err);
  }
};
//GET SINGLE TaxExaptionDate
exports.get_single_TaxExaptionDate = async (req, res) => {
  try {
    const taxExaptionDate = await TaxExaptionDate.findById(req.params.id);
    res.status(200).json(taxExaptionDate);
  } catch (error) {
    res.status(500).json(error);
  }
};
//UPDATE

exports.updateTaxExaptionDate = async (req, res) => {
  try {
    const updatedTaxExaptionDate = await TaxExaptionDate.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTaxExaptionDate);
  } catch (error) {}
};
//DELETE
exports.delete_TaxExaptionDate = async (req, res) => {
  try {
    await TaxExaptionDate.findByIdAndDelete(req.params.id);
    res.status(200).json('TaxExaptionDate has been deleted');
  } catch (error) {
    res.status(500).json(error);
  }
};

