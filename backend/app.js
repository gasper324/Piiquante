const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

// prevent CORS from stopping access
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});

//connect to MongoDb using Mongoose
const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cjgmoose:wCGJeylWnleBoDam@cluster0.b34g6jv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

app.use(express.json());
app.use(cors());
app.use(bodyParser.json());


const userRoutes = require('./routes/user');
const saucesRoutes = require('./routes/sauces');

app.use('/images', express.static(path.join(__dirname, 'images'))); 
app.use('/api/sauces', saucesRoutes)
app.use('/api/auth', userRoutes); 

module.exports = app;