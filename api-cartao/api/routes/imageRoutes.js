const express = require('express');
const router = express.Router();
const imageController = require('../controllers/imageController');

router.post('/upload', imageController.uploadImage, imageController.uploadImageFunc);
router.get('/', imageController.getImages);

module.exports = router;