
const User=require('../models/user');
module.exports.profile=function(req,res)
{
   User.findById(req.params.id,function(err,user){
     return res.render('users',{
       title:'User Profile',
       profile_user:user
     });
   });
}

module.exports.update=function(req,res)
{
  if(req.user.id==req.params.id)
  {
    User.findByIdAndUpdate(req.params.id,req.body,function(err,user){
      req.flash('success', 'Updated!');
      return res.redirect('back');
    });
  }
  else{
    req.flash('error', 'Unauthorized!');
    return res.status(401).send('Unauthorized');
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
  if(req.isAuthenticated())
  {
    return res.redirect('/');
  }
  return res.render('user_sign_up',{
    title:"Codeial | Sign Up"
  })
}
// render the sign in pages
module.exports.signIn=function(req,res){
  if(req.isAuthenticated())
  {
    return res.redirect('/');
  }
  return res.render('user_sign_in',{
    title:"Codeial | Sign In"
  })
}
// get the sign up data
module.exports.create=function(req,res)
{
  if(req.body.password!=req.body.confirm_password)
  {
    req.flash('error', 'Passwords do not match');
    return res.redirect('back');
  }
  User.findOne({email:req.body.email},function(err,user){
    if(err)
    {
      req.flash('error', err);
      return;
    }
    if(!user)
    {
      User.create(req.body,function(err,user){
        if(err)
        {
        req.flash('error', err);
          return;
        }
        return res.redirect('/users/sign-in');
      })
    }
    else{
      req.flash('success', 'You have signed up, login to continue!');
      return res.redirect('back');
    }
  });
}
// sign in and create session for user
module.exports.createSession=function(req,res)
{
   req.flash('success','Logged in Sucessfully');
   return res.redirect('/');
}
module.exports.destroySession=function(req,res)
{
   req.logout();
   // to connect the message to response convert req to res using middleware.
   req.flash('success','You have logged out!');
   return res.redirect('/');
}
