
const Comment = require('../models/comment');
const Post = require('../models/Post');

// module.exports.create = function(req,res)
// {
//   Post.findById(req.body.post,function(err,post){
//     if(post)
//     {
//       Comment.create({
//         content:req.body.content,
//         post:req.body.post,
//         user:req.user._id
//       },function(err,comment){
//         // handle error
//         post.comments.push(comment);
//         post.save();
//         res.redirect('/');
//       });
//     }
//   });
// }
//
// // while deleting a comment we need to add a post id to va variable so that we can
// // again go to comment arrays in post to find that stored id and delete it from there.
// module.exports.destroy = function(req,res)
// {
//   Comment.findById(req.params.id,function(err,comment){
//     if(comment.user == req.user.id)
//     {
//       let postId = comment.post;
//       comment.remove();
//       Post.findByIdAndUpdate(postId,{$pull:{comments:req.params.id}},function(err,post){
//         return res.redirect('back');
//       })
//     }
//     else{
//       return res.redirect('back');
//     }
//   });
// }

module.exports.create = async function(req, res){
    try{
        let post = await Post.findById(req.body.post);
        if (post){
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            if(req.xhr)
            {
              comment = await comment.populate('user','name').execPopulate();
              return res.status(200).json({
                data:{
                  comment:comment
                },
                messsage:"Post created!"
              });
            }
            req.flash('success','Comment published!');
            res.redirect('/');
        }
    }catch(err){
        req.flash('Error', err);
        return res.redirect('back');
    }
}
module.exports.destroy = async function(req, res){
    try{
        let comment = await Comment.findById(req.params.id);
        if (comment.user == req.user.id){
            let postId = comment.post;
            comment.remove();

            let post = Post.findByIdAndUpdate(postId, { $pull: {comments: req.params.id}});
            // send the comment id which was deleted back to the views
            if(req.xhr)
            {
              return res.status(200).json({
                data:{
                  comment_id:req.params.id
                },
                message:"Post deleted"
              });
            }
            req.flash('success', 'Comment deleted!');
            return res.redirect('back');
        }else{
            req.flash('error', 'Unauthorized');
            return res.redirect('back');
        }
    }catch(err){
        req.flash('error', err);
        return res.redirect('back');
    }
}
