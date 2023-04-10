// superadmin.js

const mongoose = require('mongoose');

const superAdminSchema = new mongoose.Schema({
  
    name: {
        type: String,
        required: [true, 'user must have a name'],
        unique: true
    }, 

    phoneNumber: {
        type: String,
        required: true,
    },
  
    address: {
        type: String,
        required: true,
    },
    jobTitle: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['Companyadmin', 'superAdmin', 'employee', 'approver'],
        default: 'Companyadmin',
    },
    email: {
        type: String,
        required: [true, 'user must have a email to login'],
        unique: true,
        lowercase: true,
        validate: [validator.isEmail, 'please insert correct email address'],
    },

    password: {
        type: String,
        required: [true, 'user must have a password to login'],
        minlength: 6,
        select: false,
    },
    isActive: {
        type: Boolean,
        default: false,
        select: false,
    },
    packageId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Package',
    },
    isTrial: {
        type: Boolean,
        default: false,
    },
    startDate: {
        type: Date,
        default: null,
    },
    isPaid: {
        type: Boolean,
        default: false,
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    next_payment_date: {
        type: Date,
        default: null,
    },


    status: {
        type: String,
        enum: ['pending', 'active', 'blocked', 'denied'],
        default: 'pending',
    },

    isApproved: {
        type: Boolean,
        default: false,
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    photo: String,
    // confirmPassword: {
    //   type: String,
    //   required: [true, 'please confirm your password'],
    //   validate: {
    //     // this is only work on create and save
    //     validator: function (element) {
    //       return element === this.password;
    //     },
    //     message: 'passwords are not the same',
    //   },
    // },
});

superAdminSchema.pre('save', async function (next) {
    //only run this function if password was actually modified
    if (!this.isModified('password')) return next();
    //hash password
    this.password = await bcrypt.hash(this.password, 12);
    // //delete confirmPassword from database
    // this.confirmPassword = undefined;
    next();
});

superAdminSchema.methods.correctPassword = async function (
    candidatePassword,
    userPassword
) {
    return await bcrypt.compare(candidatePassword, userPassword);
};

superAdminSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
    if (this.passwordChangedAt) {
        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );
        return JWTTimestamp < changedTimestamp;
    }
    //false if password was not changed
    return false;
};

superAdminSchema.methods.createPasswordResetToken = function () {
    const resetToken = crypto.randomBytes(32).toString('hex');
    this.passwordResetToken = crypto
        .createHash('sha256')
        .update(resetToken)
        .digest('hex');
    console.log(resetToken, this.passwordResetToken);
    this.passwordResetExpires = Date.now() + 10 * 60 * 1000;
    return resetToken;
};
superAdminSchema.pre('save', function (next) {
    if (!this.isModified('password') || this.isNew) return next();
    this.passwordChangedAt = Date.now() - 1000;
    next();
});
superAdminSchema.pre(/^find/, function (next) {
    this.find({ active: { $ne: false } });
    next();
});


const SuperAdmin = mongoose.model('SuperAdmin', superAdminSchema);
module.exports = SuperAdmin;
