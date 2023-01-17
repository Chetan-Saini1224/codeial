const { application } = require("express");
const express = require("express");

const router = express.Router();

const usersController = require("../controllers/user_controller");


router.get('/profile',usersController.profile);

router.get('/signup',usersController.signup);

router.post("/signupuser",usersController.signupUser);

router.get("/signin",usersController.signin);

router.post("/create-session",usersController.createSession);



module.exports = router;