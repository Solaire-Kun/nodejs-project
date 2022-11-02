const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const multer = require('multer');
require('dotenv/config');

// Routes
const outfitsRoute = require('./routes/outfits');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');

// Middleware
const FileStorage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './images')
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname)
    },
});
const upload = multer({ storage: FileStorage })

app.use(cors());
app.use(bodyParser.json());
app.use('/outfits', outfitsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);

// Connect
mongoose.connect(process.env.DB_CONNECTION, () => console.log("Connected!"));

app.get('/', (req, res) => {
    res.send('Home').status(200);
})

app.post('/upload', upload.array('images', 2), (req, res) => {
    res.json('Images successfully uploaded!').status(201);
});

// 404 Page
app.get('/*', (req, res) => {
    res.send('This page does not exist').status(404);
});

app.listen(3000);