const mongoose = require("mongoose");
const { Schema } = mongoose;
const User = new Schema({
  name : {
        type : String,
    },
    age : {
        type : Number,
    },

});
module.exports =  mongoose.model('User', User);
