const mongoose = require ('mongoose');

const Schema = mongoose.Schema;

/*//==================================================\\
    This is model schema on how a books gets stores into 
        the database
*/
const bookSchema = new Schema({//feilds that are required true can't be skipped ortherwise it will respond with error
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref : "User",
        required: true,
    },
    status: {
        type: String,
        required: true,
        default: "waiting"
    },
},
{
    timestamps: true,//to see when the obj gets greated
}
);
//exports the mode as Book
module.exports = mongoose.model("Book", bookSchema);