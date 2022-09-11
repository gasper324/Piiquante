//setup router
const express = require('express');
const router = express.Router();

//setup multer with token authorization
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

//require controller functions
const saucesCtrl = require('../controllers/sauces');

//setup routes
router.post('/', auth, saucesCtrl.createSauce);
router.get('/', auth, multer, saucesCtrl.getAllSauces);


//export router
module.exports = router;
