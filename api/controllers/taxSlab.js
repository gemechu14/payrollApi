const TaxSlab = require('../models/taxSlabs.js');
const Payroll = require('../models/payroll.js');
const  createError  = require('../utils/error.js');


//GET ALL
exports.get_All_TaxSlab = async (req, res, next) => {
  try {
    const taxSlab = await TaxSlab.find({companyId:req.user.id});
    res.status(200).json({
      count: taxSlab.length,
      taxSlab,
    });
  } catch (err) {
    next(createError.createError(404,err));
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
exports.delete_TaxSlab = async (req, res,next) => {
  const payrollId = req.params.payrollId;
try {
  await TaxSlab.findByIdAndDelete(req.params.id);
  try {
      console.log(req.params.id);
    await Payroll.findByIdAndUpdate(payrollId, {
      $pull: {taxSlab: req.params.id },
    });
  } catch (err) {
    next(err);
  }
  res.status(200).json("Taxslab has been deleted.");
} catch (err) {
  next(err);
}
};



// ADD TAXSLAB

exports.add_taxslab = async (req, res) => {
const payrollId=req.params.payrollId;
  //const newTaxSlab = new TaxSlab(req.body);
  try {

    const{
      deductible_Fee,income_tax_payable,to_Salary,from_Salary
    }=req.body;
    // const savedTaxSlab = await newTaxSlab.save();
    // console.log(req.body);
    
  
    const taxslabs = await TaxSlab.find({
      $and: [ { companyId:req.user.id },{ to_Salary:to_Salary},{from_Salary:from_Salary}],}
    );
    console.log(taxslabs.length)
    console.log(!taxslabs)
   if(!taxslabs  || taxslabs.length==0){
    try {
      const savedTaxSlab=await TaxSlab.create({
        deductible_Fee:deductible_Fee,
        income_tax_payable:income_tax_payable,
        to_Salary:to_Salary,
        from_Salary:from_Salary,
        companyId:req.user.id
      })
      
      await Payroll.findByIdAndUpdate(payrollId, {
        $push: { taxSlab: savedTaxSlab._id },
      });
    } catch (err) {
      next(err);
    }
    res.status(200).json({ savedTaxSlab });
  

   }else{
    res.status(404).json('The Taxslab already exists')
   }



  } catch (err) {
    res.status(404).json({
      error: err,
    });
  }
};


//add taxslab

exports.add_only_taxslab = async (req, res) => {

    const newTaxSlab = new TaxSlab(req.body);
    try {
      const savedTaxSlab = await newTaxSlab.save();
      console.log(req.body);
  
     
  
      res.status(200).json({ savedTaxSlab });
    } catch (err) {
      res.status(404).json({
        error: err,
      });
    }
  };
  


///

///Update payroll with taxslab id

exports.add_taxslab_on_payroll = async (req, res) => {
  const taxslabId=req.params.taxslabId;
const payrollId=req.params.payrollId;
    
      try {
    const updatedpayroll   = await Payroll.findByIdAndUpdate(payrollId, {
          $push: { taxSlab: taxslabId},
        });

        res.status(200).json({ updatedpayroll });
      } catch (err) {
        next(err);
      }
  
    
    
  };
  


//exports.updatePayroll=async(req,res)