const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
  nam : {
        type : String,
        required : true,
        trim : true,
    },
    age : {
        type : Number,
        trim : true,
        unique : true,
    },

});
module.exports =  mongoose.model('User', User);
