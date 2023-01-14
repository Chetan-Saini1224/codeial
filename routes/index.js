const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const postsController = require('../controllers/posts');

router.get('/',homeController.home);

//for multiply level request
//like for :- /users/profile
router.use('/users',require('./users')); 



router.get("/posts",postsController.posts);


module.exports = router;