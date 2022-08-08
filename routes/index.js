var express = require('express');
var router = express.Router();
const { v4: uuidv4 } = require('uuid');
const Model  = require("../model/model");
const fs = require("fs");
const path = require("path");
router.get('/data-type', function(req, res, next) {
  return res.json(["String","Number","Date","Buffer","Boolean","Mixed","ObjectId","Array","Decimal128","Map"]);
});
router.post('/get-code',async function(req, res, next) {
  try {
    const model = req.body;
    console.log(model);
    let newmodel = new Model({name : model.modelName ,items : model.items });
    newmodel = await newmodel.save();
    return res.json(newmodel);
  }
  catch (err) {
    console.log(err);
  }
});

router.get('/download/:id',async function (req, res, next) {
  try {
    const {id} = req.params;
    const model = await Model.findById(id);
    const fileId = uuidv4();
    fs.appendFile(`${__dirname}/`+ fileId + ".js",getTemplate(model) , (err) => {
      if(err) {
        return res.json({error :"Failed to download file"});
      }
      const p = path.join(`${__dirname}/` ,fileId + ".js") ;
      res.download(p);
      // fs.unlink(`${__dirname}/` +fileId + ".js" , (err) =>{
      //   if(err) res.json(err);
      // });
    });
  }
  catch (err) {
    console.log(err);
    res.json(err);
  }
});
const getTemplate = (model) => {
  const data = `const mongoose = require("mongoose");
const { Schema } = mongoose;
const ${model.name} = new Schema({
  ${getData(model.items)}
});
module.exports =  mongoose.model('${model.name}', ${model.name});
`
  return data;
}

const getData = (items)  => {
  let res = "";
  let index  = 0;
  for(let ob of items) {
    let ans = "";
    if(ob.type.split("+")[1] === "table") {
      res  += `  ${ob.title.padStart(8)} : [${ob.type.split("+")[0]}],\n`;
      continue;
    }
    ans = `${ob.title.padStart(index>0?7:0)} : {\n`;
    for(let [key , val] of Object.entries(ob)) {
      if(key === "title") continue;
      if( val ) ans += `        ${key} : ${val?val:"false"},\n`
    }
    ans +=  "    },\n";
    res += ans;
    index += 1;
  }
  return res;
}

module.exports = router;
