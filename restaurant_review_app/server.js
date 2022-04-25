const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');

const app = express();

const userRouter = require('./routes/user');

// This is the default address for MongoDB.
// Make sure MongoDB is running!
const mongoEndpoint = 'mongodb+srv://ash-mad:ASHMAD@cluster0.ecwor.mongodb.net/restaurant_review_app?retryWrites=true&w=majority';
// useNewUrlParser is not required, but the old parser is deprecated
mongoose.connect(mongoEndpoint, { useNewUrlParser: true });

// Get the connection string
const db = mongoose.connection;

// This will create the connection, and throw an error if it doesn't work
db.on('error', console.error.bind(console, 'Error connecting to MongoDB:'));

const cors = require('cors');
const auth_middleware = require('./routes/middleware/auth_middleware');

// (line 25-34) modifying the http request in a way that makes it easier for us to code with 
app.use(express.static(path.join(__dirname, 'build')));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// cors: a security feature: can only send requests if the origin of the domain
// matches the endpoint of the domain (cors minimizes this security)
app.use(cors({
  origin: '*',
}));


app.use('/api/user', userRouter);

// allows code to work with heroku
app.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8000, () => {
  console.log('Starting server');
});