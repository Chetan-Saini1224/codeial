const express = require('express');
const router = express.Router();
const passport = require("passport");
const possApi = require('../../../controllers/api/v1/posts_api');

router.get('/',possApi.index);
router.delete('/:id',passport.authenticate('jwt',{session:false}),possApi.destroy);

module.exports = router;