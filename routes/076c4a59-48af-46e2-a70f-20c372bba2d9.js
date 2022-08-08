const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
  name : {
        type : String,
        required : true,
        trim : true,
    },
    age : {
        type : Number,
        required : true,
    },
password : {
        type : String,
        unique : true,
    },

});
module.exports =  mongoose.model('User', User);
