const mongoose = require("../config/mongoose")



const userSchema = new mongoose.Schema({
    id:String,
    mobile: Number,
    email: String,
    first_name : String,

});

const InterestedModel= mongoose.model("Interested",userSchema)

module.exports = InterestedModel