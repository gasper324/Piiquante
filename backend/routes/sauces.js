//setup router
const express = require('express');
const router = express.Router();

//setup multer with token authorization
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config)');

//require controller functions



//setup routes

router.post('/', auth, multer, /*insert function*/)


//export router
module.exports = router;
