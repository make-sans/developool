const express = require('express');
const mongoose = require('mongoose');
const accounts = require('./routes/api/accounts');
const config = require('config');

const app = express();

// Express config
app.use(express.json());

// Connect and setup database
mongoose
  .connect(config.get('mongooseURI'), { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/accounts', accounts);

app.listen(config.get('port'), () => console.log(`Server started on port ${config.get('port')}`));
