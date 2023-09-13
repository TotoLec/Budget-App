const express = require('express');
const app = express();
var cors = require('cors');
app.use(cors());
const mongoose = require('mongoose');
const dotenv = require('dotenv');
//Import route
const authRoute = require('./routes/auth');

dotenv.config();

//connect to DB
mongoose.connect(process.env.DB_CONNECT,
    { useNewUrlParser: true },
    console.log('Connected to DB')
);

//Middlewares
app.use(express.json());
//Route Middlewares
app.use('/api/user', authRoute);

app.listen(3000, () => console.log('the server is ruinning'));