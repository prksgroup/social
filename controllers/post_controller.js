const postuser = require('../models/post');
const Comment = require('../models/comments');

module.exports.create = async function(req, res) {
    req.flash('success', 'POSTED SUCCESSFULLY');
    try {
        let post = await postuser.create({
            content: req.body.content,
            user: req.user.id
        });

        if (req.xhr) {
            return res.status(200).json({
                data: {
                    post: post
                },
                message: '!!POST CREATED!!'
            })
        }

        return res.redirect('back');
    } catch (err) {
        console.log('ERROR ', err);
    }

}

module.exports.destroy = async function(req, res) {
    req.flash('success', 'POST DELETED SUCCESSFULLY');
    // console.log(req.params.id);
    try {
        let post = await postuser.findById(req.params.id);
        if (post.user == req.user.id) {
            post.remove();

            await Comment.deleteMany({ post: req.params.id });

            if (req.xhr) {
                return res.status(200).json({
                    data: {
                        post_id: req.params.id
                    },
                    message: 'POST DELETED'
                })
            }

            return res.redirect('back');

        } else {
            return res.redirect('back');
        }
    } catch (err) {
        console.log('ERROR ', err);
    }

}


// module.exports.create = function(req, res) {
//     postuser.create({
//         content: req.body.content,
//         user: req.user.id
//     }, function(err, post) {
//         if (err) {
//             console.log('errrrrr');
//         }
//         return res.redirect('back');
//     })
// }

// module.exports.destroy = function(req, res) {
//     // console.log(req.params.id);
//     postuser.findById(req.params.id, function(err, post) {
//         if (err) {
//             console.log('ERROR IN DELETING POST --><--', err);
//             return;
//         }
//         if (post.user == req.user.id) {
//             post.remove();

//             Comment.deleteMany({ post: req.params.id }, function(err) {
//                 if (err) { console.log('ERROR IN DELETING POST AND COMMENTS') } else {
//                     return res.redirect('back');
//                 }
//             })

//         } else {
//             return res.redirect('back');
//         }
//     })
// }