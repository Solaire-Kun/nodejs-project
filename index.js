const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv/config');

// Routes
const outfitsRoute = require('./routes/outfits');
const ordersRoute = require('./routes/orders');
const usersRoute = require('./routes/users');

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use('/outfits', outfitsRoute);
app.use('/orders', ordersRoute);
app.use('/users', usersRoute);

// Connect
mongoose.connect(process.env.DB_CONNECTION, () => console.log("connected"));

app.get('/', (req, res) => {
    res.send('Go to <a href="/users"Users</a>').status(200);
})

// 404 Page
app.get('/*', (req, res) => {
    res.send('This page does not exist').status(404);
});

app.listen(3000);