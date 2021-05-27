const mongoose = require('mongoose');

const signinSchema = new mongoose.Schema({
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

const signin=mongoose.model('signin',signinSchema);

module.exports=signin;
