const express=require('express');
const cookieParser=require('cookie-parser');
const app=express();
const port=8000;
const expressLayouts=require('express-ejs-layouts');
const db = require('./config/mongoose');
// use for session cookie
const session=require('express-session');
const passport=require('passport');
const passportLocal=require('./config/passport_local_strategy');
app.use(express.urlencoded());
app.use(cookieParser());
app.use(express.static('./assets'));
app.use(expressLayouts);
// extract style and scripts from sub pages into the expressLayouts
app.set('layout extractStyles',true);
app.set('layout extractScripts',true);
// set up the view engine
app.set('view engine','ejs');
app.set('views','./views');

app.use(session({
    name:"Codeial",
    // TODO change secret before deplomemt in production mode
    secret:"blahsomething",
    saveUninitialized:false,
    resave:false,
    cookie:{
      maxAge:(1000*60*100)
    }
}));
app.use(passport.initialize());
app.use(passport.session());
// use express Router
app.use('/',require('./routes'));
app.listen(port,function(err){
    if(err)
    {
        console.log(`Error in running the server: ,${err}`);
        return;
    }
    console.log(`Server is running on port : ${port}`);
});
