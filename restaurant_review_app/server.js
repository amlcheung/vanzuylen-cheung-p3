const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb+srv://ash-mad:ASHMAD@cluster0.ecwor.mongodb.net/restaurant_review_app?retryWrites=true&w=majority';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));


const postRouter = require('./routes/posts');
app.use(express.static(path.join(__dirname, 'build')));


app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});