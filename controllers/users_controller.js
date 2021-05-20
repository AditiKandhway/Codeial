module.exports.profile=function(req,res)
{
  return res.end('<h1>User Profile</h1>');
}

module.exports.comment=function(req,res)
{
  return res.end('<h1>My Comments</h1>');
}
