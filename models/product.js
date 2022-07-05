var mongoose = require('mongoose');
const Joi=require("@hapi/joi");
  
var taskSchema = new mongoose.Schema({
    name: String,
    date: String,
    status:String,
    
});
  
  
var Task=mongoose.model("Task",taskSchema);

module.exports.Task=Task;