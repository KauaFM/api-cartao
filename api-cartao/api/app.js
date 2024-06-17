const express = require('express');
const swaggerUi = require('swagger-ui-express');
const yaml = require('yamljs');
const path = require('path');
const multer = require('multer');

const app = express();
const swaggerDocument = yaml.load(path.join(__dirname, 'swagger.yaml'));


const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});
const upload = multer({ storage: storage });

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


app.post('/api/upload', upload.single('file'), (req, res) => {
  res.status(200).send('Image uploaded successfully');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
  console.log('Swagger UI available at http://localhost:3000/api-docs');
});
