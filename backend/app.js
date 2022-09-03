const express = require('express');

const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://cjgmoose:wCGJeylWnleBoDam@cluster0.b34g6jv.mongodb.net/?retryWrites=true&w=majority')
  .then(() => {
    console.log('Successfully connected to MongoDB Atlas!');
  })
  .catch((error) => {
    console.log('Unable to connect to MongoDB Atlas!');
    console.error(error);
  });

const app = express();

module.exports = app;