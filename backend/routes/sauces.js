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
router.get('/', auth, multer, saucesCtrl.getAllSauces);
router.get('/:id', auth, saucesCtrl.getOneSauce);
router.put('/:id', auth, multer, saucesCtrl.modifySauce);
router.delete('/:id', auth, multer, saucesCtrl.deleteSauce);
router.post('/:id/like', auth, saucesCtrl.updateLikeStatus);

//export router
module.exports = router;
