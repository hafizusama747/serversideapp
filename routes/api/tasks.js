var express = require('express');
var router = express.Router();
var {Task}= require("../../models/product")
var checkSessionAuth=require("../../middlewares/checkSessionAuth")
const multer=require('multer');

var auth=require("../../middlewares/auth");
var admin=require("../../middlewares/admin");

//define storage for the images

const storage = multer.diskStorage({

  //destination for files
  destination:function(req, file, callback){
    callback(null,'./public/uploads/images');
  },


  //add back the extension

  filename:function(req, file, callback){
    callback(null,Date.now()+file.originalname);
  }

});






router.get('/', async function(req, res, next) {
    let tasks=await Task.find();
    res.render("tasks/list",{tasks:tasks})
});


router.post('/search', async function(req, res, next) {
  let tasks=await Task.find({name:req.body.name});
res.render("tasks/list",{tasks:tasks})
});


router.get('/add', async function(req, res, next) {
res.render("tasks/add")
});


router.post('/add', async function(req, res, next) {

  console.log(req.file);
  let task=new Task({
    name:req.body.title,
  })

  try{
      await task.save();
  }catch{
      console.log(error);
  }
  
  res.redirect("/tasks")
});


router.get("/delete/:id", async function(req, res, next) {
  let product=await Task.findByIdAndDelete(req.params.id);
  res.redirect("/tasks")
});


router.get("/edit/:id", async function(req, res, next) {
  let task=await Task.findById(req.params.id);
  res.render("tasks/edit",{task})
});


router.post("/edit/:id", async function(req, res, next) {
  let Task=await Task.findById(req.params.id);
  task.name=req.body.title,


  await Task.save();

  res.redirect("/tasks")
});



module.exports = router;