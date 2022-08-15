// const express = require('express');
// const app = express();
// const bodyParser = require('body-parser');
// const port = 5000;
// app.set('view engine', 'ejs');
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({extended:true}));
// const mongoose = require('mongoose');
// mongoose.connect("mongodb://localhost:27017/todolistDB", {useNEWUrlParser:true,useUnifiedTopology:true});
// const itemSchema ={
//     name:String
// }
// const Item = mongoose.model("Item",itemSchema);
// const item1 = new Item({
//     name:"welcomme to our todo website",
// });
// const item2 = new Item({
//     name:"helo guys",
// });
// const item3 = new Item({
//     name: "my name is mohammed sajid",
// });
// const d = [item1,item2,item3];
// // var i1 = [];
// app.get("/", (req,res) => {
//     Item.find({},function(err, f){
//         // console.log(f)
//         if(f.length===0){
//             Item.insertMany(d, function(err) {
//                 if (err) {
//                    console.log(err);
//                 } else {
//                  console.log("successfully saved items to mongoDB") ; 
//                 }
//            });
//            res.redirect("/");
//         }
//         else{

//             res.render("list", {newListItem:f});
//         }
//     })
// });
// app.post("/", function(req,res){
//      const itemName =req.body.n;
//     // res.redirect("list", {newListItem:i});
//     // console.log(i);
//     // i1.push(i)
//     // res.redirect("/");
//     const item = new Item({
//         name:itemName
//     });
//     item.save();
//     res.redirect("/");
// });
// app.post("/delete",function(req,res)
// {  
//     const check = req.body.checkbox;
//     Item.findByIdAndRemove(check,function(err){
//         if(!err){
//             console.log("successfully deleted");
//             res.redirect("/");
//         }
//     });
// });
// app.listen(port, () => {
//     console.log(`listening port on ${port}`)
// });


var express=require("express");
var mongoose=require("mongoose");
var bodyParser=require("body-parser");
var app=express();

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));
mongoose.connect("mongodb://localhost:27017/todolistDB",{useNewUrlParser:true,useUnifiedTopology:true});
const itemSchema={
    name:String
}
const Item=mongoose.model("Item",itemSchema);
const item1=new Item({
    name:"Welcome to our todo app",
});
const item2=new Item({
    name:"my name is mohammed sajid",
});
const item3=new Item({
    name:"how are you",
});
const d=[item1,item2,item3];
/*
Item.insertMany(d,function(err)
{
    if(err){
        console.log(err);
    }
    else{
        console.log("Successfully saved items to DB");
    }
});
*/
app.get("/",function(req,res)
{
   // res.send("<h1>Hey guys!!</h1>");
   Item.find({},function(err,f)
   {
      // console.log(f);
      if(f.length===0)
      {
        Item.insertMany(d,function(err)
        {
            if(err){
                console.log(err);
            }
            else{
                console.log("Successfully saved items to DB");
            }
        });
      res.redirect("/");
      }
      else{
      res.render("list",{newListItems:f});
      }
   })
  ;
})
app.post("/",function(req,res)
{
     const itemName=req.body.n;
    //console.log(i);
    //i1.push(i);
    //res.render("list",{newListItem:i});
   // res.redirect("/");
   const item=new Item({
       name:itemName
   });
item.save();
res.redirect("/");
});
app.post("/delete",function(req,res)
{
  const check=req.body.checkbox;
  Item.findByIdAndRemove(check,function(err)
  {
      if(!err)
      {
          console.log("Successfully deleted");
          res.redirect("/");
      }
  })
});

app.listen(3000,function()
{
    console.log("Server is listening to port 3000");
})