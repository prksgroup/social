const Comment = require('../models/comments');
const Post = require('../models/post');

module.exports.create = async function(req, res) {

    try {
        let post = await Post.findById(req.body.post);

        if (post) {
            let comment = await Comment.create({
                content: req.body.content,
                post: req.body.post,
                user: req.user._id
            });

            post.comments.push(comment);
            post.save();
            req.flash('success', 'Comment published!');

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        comments: comment
                    },
                    message: 'COMMENT CREATED SUCCESSFULLY'
                })
            }
            res.redirect('/');
        }
    } catch (err) {
        req.flash('error', err);
        return;
    }

}

// module.exports.create = function(req, res) {
//     try {
//         req.flash('success', 'YOU COMMENTED ON A POST');
//         let post = Post.findById(req.body.post);
//         if (post) {
//             let comment = Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             });
//             post.comments.push(comment);
//             post.save();

//             res.redirect('back');
//         };
//     } catch (err) {
//         req.flash('error', 'ERROR IN COMMENTING');
//     }



// }

module.exports.destroy = async function(req, res) {

        try {
            let comment = await Comment.findById(req.params.id);

            if (comment.user == req.user.id) {

                let postId = comment.post;

                comment.remove();

                let post = Post.findByIdAndUpdate(postId, { $pull: { comments: req.params.id } });
                req.flash('success', 'Comment deleted!');

                return res.redirect('back');
            } else {
                req.flash('error', 'Unauthorized');
                return res.redirect('back');
            }
        } catch (err) {
            req.flash('error', err);
            return;
        }

    }
    // module.exports.destroy = function(req, res) {
    //     req.flash('success', 'COMMENT DELETED SUCCESSFULLY');
    //     Comment.findById(req.params.id, function(err, comment) {
    //         if (comment.user == req.user.id) {
    //             let postid = comment.post;
    //             comment.remove();
    //             Post.findByIdAndUpdate(postid, { $pull: { comments: req.params.id } }, function(err, post) {
    //                 return res.redirect('back');
    //             })

//         } else {
//             return res.redirect('back');
//         }
//     })
// }

// module.exports.create = function(req, res) {
//     req.flash('success', 'YOU COMMENTED ON A POST');
//     Post.findById(req.body.post, function(err, post) {
//         if (post) {
//             Comment.create({
//                 content: req.body.content,
//                 post: req.body.post,
//                 user: req.user._id
//             }, function(err, comment) {
//                 if (err) {
//                     console.log(err, 'error in pushing comments ids into comments array');
//                 }
//                 post.comments.push(comment);
//                 post.save();

//                 res.redirect('back');
//             });
//         }
//     })
// }