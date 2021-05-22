module.exports.profile=function(req,res)
{
    return res.render('users',{
      title:"Users"
    });
}

module.exports.comment=function(req,res)
{
    return res.render('home',{
      title:"comment"
    });
}
