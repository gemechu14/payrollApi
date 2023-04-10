const mongoose = require('mongoose');



const GradeSchema = mongoose.Schema({
    gradeName: { type: String, required: true },
    description: { type: String },
    companyId: { type: String, required: true }
})


module.exports = mongoose.model("Grade", GradeSchema)