const express = require('express');
const router = express.Router();
const likesController = require("../controllers/likes_controller");
const passport = require('passport');

router.get("/toogle", passport.checkAuthentication,likesController.toogleLike);

module.exports = router;