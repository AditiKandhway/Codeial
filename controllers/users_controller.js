
const User=require('../models/user');

module.exports.profile=function(req,res)
{
   if(req.cookies.user_id)
   {
      User.findById(req.cookies.user_id,function(err,user){
        if(user)
        {
          return res.render('users',{
            title:"Users",
            user:user
          })
        }else{
          return res.redirect('/users/sign-in');
        }
      });
   }
   else{
     return res.redirect('/users/sign-in');
   }
}

module.exports.comment=function(req,res)
{
    return res.render('home',{
      title:"comment"
    });
}

// render the sign up page
module.exports.signUp=function(req,res){
  return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
  })
}
// render the sign in pages
module.exports.signIn=function(req,res){
  return res.render('user_sign_in',{
    title:"Codeial | Sign In"
  })
}

// get the sign up data
module.exports.create=function(req,res)
{
  if(req.body.password!=req.body.confirm_password)
  {
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err)
    {
      console.log("error");
      return;
    }
    if(!user)
    {
      User.create(req.body,function(err,user){
        if(err)
        {
          console.log("error");
          return;
        }
        return res.redirect('/users/sign-in');
      })
    }
    else{
      return res.redirect('back');
    }
  });
}
// sign in and create session for user
module.exports.createSession=function(req,res)
{
  // steps to authenticate
  // find the user
  User.findOne({email:req.body.email},function(err,user){
     if(err)
     {
       console.log("Error in finding user in signing in");
       return;
     }
     // handle user found
     if(user)
     {
       // handle password which doesn't match
       if(user.password!=req.body.password){
         return res.redirect('back');
       }
       // handle session create
       res.cookie('user_id',user.id);
       return res.redirect('/users/profile');
     }
     else{
       // handle user not found
       return res.redirect('back');
     }
  });

}

module.exports.logout=function(req,res)
{
  res.cookie('user_id',25);
  return res.redirect('/users/sign-in');
}
