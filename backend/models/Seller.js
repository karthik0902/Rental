const mongoose = require("../config/mongoose")






const ADSchema = new mongoose.Schema({
    plotArea: {
        type: String,
        required: true
    },
    length: {
        type: Number
    },
    breadth: {
        type: Number
    },
    facing: {
        type: String,
       
    },
    projectName: {
        type: String
    },
    adTitle: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: [{
        type: String,
        
    }],
    price: {
        type: Number
    },
    state: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    }
});


const userSchema = new mongoose.Schema({
    first_name : String,
    last_name: String,
    password:String,
    ad:[ADSchema],
    mobile: Number,
    email:String,
});

const sellerModel= mongoose.model("seller",userSchema)

module.exports = sellerModel