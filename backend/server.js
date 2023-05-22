const path = require('path');
const fs = require("fs");
const express = require('express');
const colors = require('colors');
const dotenv = require('dotenv').config();
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const UploadFile = require('./services/uploadFile');
const multer = require('multer');
const port = process.env.PORT || 5000;

connectDB();

const app = express();
const router = express.Router()

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
    res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
    next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/api/users', require('./routes/userRoutes'));
app.use('/api/organizations', require('./routes/organizationRoutes'));
app.use('/api/categories', require('./routes/categoryRoutes'))
app.use('/api/subcategories', require('./routes/subCategoryRoutes'))
app.use('/api/products', require('./routes/productRoutes'))
app.use('/api/files', require('./routes/file.routes'))
app.use('/api/images', express.static(path.join(__dirname, 'uploads')))

router.post('/fileupload', async (req, res) => {
  try {
    await UploadFile(req, res);
    res.status(200).send({"msf": "Dd"})
  } catch (error) {
    console.log(error)
  }
})

app.use(router)

// Serve frontend
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../frontend/build')));

  app.get('*', (req, res) =>
    res.sendFile(
      path.resolve(__dirname, '../', 'frontend', 'build', 'index.html')
    )
  );
} else {
  app.get('/', (req, res) => res.send('Please set to production'));
}

app.use(errorHandler);

app.listen(port, () => console.log(`Server started on port ${port}`));
