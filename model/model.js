const mongoose = require("mongoose");
const {Schema} = mongoose;
const model = new Schema({
  name:  {
  	type : String,
  	require : true,
  	trim :true,
  },
  items : {
  	type : Array
  },
},{timestamps : true});

module.exports = mongoose.model("Mode" , model);