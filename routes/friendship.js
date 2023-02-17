const express = require('express');
const router = express.Router();
const friendship_Controller = require("../controllers/friendship_controller");

router.get('/toogle/:id',friendship_Controller.toogleFriend);

module.exports = router;