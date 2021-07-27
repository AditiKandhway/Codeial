const Post = require('../models/Post');
const Comment = require('../models/comment');
module.exports.create = async function(req,res)
{
  try{
    let post = await Post.create({
      content:req.body.content,
      user:req.user._id
    });
    // check ajax request
    if(req.xhr)
    {
      post = await post.populate('user','name').execPopulate();
      return res.status(200).json({
        data:{
          post:post
        },
        message:"Post Created uhi!"
      });
    }
    req.flash('success', 'Post published rjfhry!');
    return res.redirect('back');
  }catch(err){
    req.flash('error', err);
    // added this to view the error on console as well
    console.log(err);
    return res.redirect('back');
  }
}
module.exports.destroy = async function(req,res)
{
  try{
    let post = await Post.findById(req.params.id);
      // .id means converting the object id into string
      if(post.user==req.user.id)
      {
        post.remove();
        // deleteMany delets the comments based on some query.
        await Comment.deleteMany({post:req.params.id});
        if(req.xhr)
        {
          return res.status(200).json({
            data:{
              post_id:req.params.id
            },
            message:"Post deleted!!"
          });
        }
        req.flash('success', 'Post and associated comments deleted!');
        return res.redirect('back');
      }
      else{
        req.flash('error', 'You cannot delete this post!');
        return res.redirect('back');
      }
  }catch{
    req.flash('error', err);
    return res.redirect('back');
  }
}
