const express = require('express');
const mongoose = require('mongoose');
const config = require('./config/config');
const accounts = require('./routes/api/accounts');

const app = express();

// Express config
app.use(express.json());

// Connect and setup database
mongoose
  .connect(config.mongooseURI, { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/accounts', accounts);

app.listen(config.port, () => console.log(`Server started on port ${config.port}`));
