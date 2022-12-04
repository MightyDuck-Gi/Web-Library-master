const mongoose = require("mongoose");
/*//==================================================\\
    This is model schema on how a user gets stores into 
        the database
*/
const userSchema = new mongoose.Schema({//these are the fields the user gets save in db by
    email: { 
        type: String,
        required: true
    },
    passwordHash: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: "customer",
    },
});
userSchema.virtual("books", {//populating books the user requested
    ref: "Book",
    foreignField: "createdBy",
    localField: "_id",
});

userSchema.set( 'toJSON', { virtuals: true });//in order to use virtual functions 

const User = mongoose.model("user", userSchema);
//then gets exported as User
module.exports = User;