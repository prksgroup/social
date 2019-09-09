const express = require('express');
const router = express.Router();
const passport = require('../config/passport-local-strategy');
const commentcontroller = require('../controllers/commentcontroller');
//const commentcontroller=require('../controllers/post_controller');
router.post('/create', passport.checkAuthentication, commentcontroller.create);
router.get('/destroy/:id', passport.checkAuthentication, commentcontroller.destroy);
module.exports = router;