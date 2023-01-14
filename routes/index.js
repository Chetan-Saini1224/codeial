const express = require('express');
const router = express.Router();
const Home = require('../controllers/home_controller');

router.get('/',Home.home);



module.exports = router;