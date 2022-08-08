const mongoose = require("mongoose");
const { Schema } = mongoose;
const People = new Schema({
  namae : {
        type : String,
    },
members : {
        type : User+Table,
    },

});
module.exports =  mongoose.model('People', People);
