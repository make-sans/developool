const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const accounts = require('./routes/api/accounts');
const auth = require('./routes/api/auth');
const register = require('./routes/api/registration');
const project = require('./routes/api/project');
const profile = require('./routes/api/profile');
const path = require('path');

const app = express();
app.use(cors());

// Express config
app.use(express.json());

// Connect and setup database
mongoose
  .connect(config.get('mongooseURI'), { useNewUrlParser: true })
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/api/register', register);
app.use('/api/accounts', accounts);
app.use('/api/auth', auth);
app.use('/api/project', project);
app.use('/api/profile', profile);

// Production part
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
});

app.listen(config.get('serverPort'), () =>
  console.log(`Server started on port ${config.get('serverPort')}`)
);
