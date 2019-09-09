const postofsocial = require('../models/post');
const User = require('../models/user');
module.exports.hometry = async function(req, res) {
    // postofsocial.find({}, function(err, posts) {
    //     if (err) {
    //         console.log('Posting error');
    //     }
    //     return res.render('home', {
    //         title: "SOCIAL | Home",
    //         posts: posts
    //     })
    // })


    // postofsocial.find({}).populate('user').exec(function(err, posts) {
    //     if (err) {
    //         console.log('ERROR IN USER SCHEMA POPULATING', err);
    //     }
    //     return res.render('home', {
    //         title: 'SOCIAL | HOME',
    //         posts: posts
    //     })
    // })
    try {
        let posts = await postofsocial.find({}).sort('-createdAt').populate('user').sort('-createdAt').populate({
            path: 'comments',
            populate: {
                path: 'user'
            }
        });

        let users = await User.find({});
        return res.render('home', {
            title: "SOCIAL | Home",
            post: posts,
            all_users: users
        })
    } catch (err) {
        console.log('ERROR', err);
    }
}




// postofsocial.find({})
// .populate('user')
// .populate({
//     path: 'comments',
//     populate: {
//         path: 'user'
//     }
// }).exec(function(err, posts) {
//     if (err) {
//         console.log('Posting error', err);
//     }
//     console.log(posts);
//     User.find({}, function(err, users) {
//         return res.render('home', {
//             title: "SOCIAL | Home",
//             post: posts,
//             all_users: users
//         })
//     })

// });