const TaxSlab = require("../models/taxSlabs.js");
const Payroll = require("../models/payroll.js");
const createError = require("../utils/error.js");

//GET ALL
exports.get_All_TaxSlab = async (req, res, next) => {
  try {
    const taxSlab = await TaxSlab.find();
    res.status(200).json({
      count: taxSlab.length,
      taxSlab,
    });
  } catch (err) {
    next(createError.createError(404, err));
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


// ADD TAXSLAB

exports.add_taxslab = async (req, res) => {
  const payrollId = req.params.payrollId;
  //const newTaxSlab = new TaxSlab(req.body);
  try {
    const { deductible_Fee, income_tax_payable, to_Salary, from_Salary } =
      req.body;
    // const savedTaxSlab = await newTaxSlab.save();
    // console.log(req.body);

    // const taxslabs = await TaxSlab.find({
    //   $and: [
    //     { companyId: req.user.id },
    //     { to_Salary: to_Salary },
    //     { from_Salary: from_Salary },
    //   ],
    // });
    // console.log(taxslabs.length);
    // console.log(!taxslabs);
    if (!taxslabs || taxslabs.length == 0) {
      try {
        const savedTaxSlab = await TaxSlab.create({
          deductible_Fee: deductible_Fee,
          income_tax_payable: income_tax_payable,
          to_Salary: to_Salary,
          from_Salary: from_Salary,
          companyId: req.user.id,
        });

        await Payroll.findByIdAndUpdate(payrollId, {
          $push: { taxSlab: savedTaxSlab._id },
        });
      } catch (err) {
        next(err);
      }
      res.status(200).json({ savedTaxSlab });
    } else {
      res.status(404).json("The Taxslab already exists");
    }
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

//add taxslab

exports.add_only_taxslab = async (req, res) => {


  
  
  
  try {
    const { from_Salary, to_Salary, income_tax_payable, deductible_Fee } = req.body;
    const newTaxable = await TaxSlab.create({
      from_Salary: from_Salary,
      to_Salary: to_Salary,
      income_tax_payable: income_tax_payable,
      deductible_Fee: deductible_Fee,
     
    });

    //const savedPayroll = await newPayroll.save();

    console.log(req.body);
    res.status(200).json({
      message:"Registered successfully",
      newTaxable,
    });
  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};

///

///Update payroll with taxslab id

exports.add_taxslab_on_payroll = async (req, res) => {
  const taxslabId = req.params.taxslabId;
  const payrollId = req.params.payrollId;

  try {
    const updatedpayroll = await Payroll.findByIdAndUpdate(payrollId, {
      $push: { taxSlab: taxslabId },
    });

    res.status(200).json({ updatedpayroll });
  } catch (err) {
    next(err);
  }
};

// exports.update=async(req,res)



exports.generalTaxslab = async (req, res, next) => {
  try {
    const { deductible_Fee, income_tax_payable, to_Salary, from_Salary } =
      req.body;
    // const savedTaxSlab = await newTaxSlab.save();
    // console.log(req.body);

    const taxslabs = await TaxSlab.find({  
      $and: [
        { to_Salary: to_Salary },
        { from_Salary: from_Salary },
      ],
    });
    if (!taxslabs || taxslabs.length == 0) 
    {

      const savedTaxSlab = await TaxSlab.create({
        deductible_Fee: deductible_Fee,
        income_tax_payable: income_tax_payable,
        to_Salary: to_Salary,
        from_Salary: from_Salary,

      });


      res.status(200).json({ savedTaxSlab });

    } else {
      res.status(409).json("already registed");
    }

  } 
  
  catch (err) {
    res.status(404).json(err);

  }
}


exports.delete_SINGLE_TAXSLAB=async(req,res,next)=>{

try {
  

const deletedTaxslab=  await TaxSlab.findByIdAndDelete(req.params.id);
res.status(200).json('deleted successfully')



} catch (err) {
res.status(404).json((err))  
}

}



//UPDATE

//UPDATE
exports.updateTaxslab = async (req, res) => {
  try {
    const updatedTax = await TaxSlab.findByIdAndUpdate(
      req.params.id,
      { $set: req.body },
      { new: true }
    );
    res.status(200).json(updatedTax);
  } catch (error) { }
};