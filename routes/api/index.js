const express = require('express');
const router = express.Router();

//this index will contain for all version v1 v2....
router.use('/v1',require('./v1'));
router.use('/v2',require('./v2'));
module.exports = router;