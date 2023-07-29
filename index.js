const express = require('express');
const mongoose = require('mongoose');

require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3000;
// cloudinary connection
const cloudinary = require('cloudinary').v2;

cloudinary.config({
  cloud_name: 'dyukjqemj',
  api_key: '975334944781146',
  api_secret: 'USmTRR4C6ly_RDh-82Y8rhMIMzc',
});

// MongoDB Connection
const MONGODB_USERNAME = encodeURIComponent(process.env.MONGODB_USERNAME);
const MONGODB_PASSWORD = encodeURIComponent(process.env.MONGODB_PASSWORD);
const MONGODB_DBNAME = process.env.MONGODB_DBNAME;

const MONGODB_URI = `mongodb+srv://${MONGODB_USERNAME}:${MONGODB_PASSWORD}@cluster0.q83ut8c.mongodb.net/${MONGODB_DBNAME}?retryWrites=true&w=majority`;

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB');
});

// Rest of your application code goes here...
const user_route = require('./routes/userRoutes'); // Remove the leading forward slash
app.use('/user', user_route);
// const store_route = require('./routes/storeRoutes');
// app.use('/partner', store_route);
// Starting the server
app.listen(PORT, () => {
  console.log(`Server is ready on port ${PORT}`);
});
