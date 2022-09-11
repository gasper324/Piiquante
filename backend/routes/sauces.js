//setup router
const express = require('express');
const router = express.Router();

//setup multer with token authorization
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//require controller functions
const saucesCtrl = require('../controllers/sauces');

//setup routes

router.post('/', auth, multer, saucesCtrl.createSauce);


//export router
module.exports = router;
