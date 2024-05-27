const mongoose = require("../config/mongoose")



const userSchema = new mongoose.Schema({
    first_name : String,
    last_name: String,
    password:String,
    mobile: Number,
    email:String,
});

const BuyerModel= mongoose.model("users",userSchema)

module.exports = BuyerModel