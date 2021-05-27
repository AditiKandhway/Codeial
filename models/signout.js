const mongoose = require('mongoose');

const signoutSchema new mongoose.Schema({
     name:{
       type:String,
       required:true,
     },
     email:{
       type:String,
       required:true,
       unique:true
     },
     password:{
       type:String,
       required:true
     }
},{
  timestamps:true
});

const signout = mongoose.exports('signout',signoutSchema);

module.exports=signout;
