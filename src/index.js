require('./models/Users');
require('./models/Tracks');
const express = require('express');
const mongoose = require('mongoose');
const authRoutes = require('./routes/authRoutes');
const trackRoutes = require('./routes/trackRoutes');
const requireAuth = require('./middlewares/requireAuth');

const app = express();

app.use(express.json());
app.use(authRoutes);
app.use(trackRoutes);

const mongoUri =
  'mongodb+srv://admin:password19@cluster0.kym5q.mongodb.net/Tracker?retryWrites=true&w=majority';

mongoose.connect(mongoUri, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true
});

mongoose.connection.on('connected', () => {
  console.log('Connected to mongoDB instance');
});

mongoose.connection.on('error', err => {
  console.error('Error connecting to mongoDB instance', err);
});

app.get('/', requireAuth, (req, res) => {
  res.send(`Hi there!!\n Email: ${req.user.email}`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000');
});
