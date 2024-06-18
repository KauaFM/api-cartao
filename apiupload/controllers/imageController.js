const Image = require('../models/imageModel');
const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, '/uploads');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

exports.uploadImage = upload.single('image');

exports.uploadImageFunc = async (req, res) => {
  console.log(req)
  try {
    const image = new Image({
      path: req.file.path,
      originalName: req.file.originalname
    });
    await image.save();
    res.status(201).send(image);
  } catch (error) {
    res.status(400).json(error);
  }
};

exports.getImages = async (req, res) => {
  try {
    const images = await Image.find();
    res.status(200).send(images);
  } catch (error) {
    res.status(500).send(error);
  }
};