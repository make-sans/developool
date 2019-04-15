const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config');
const accounts = require('./routes/api/accounts');
const auth = require('./routes/api/auth');
const confirm = require('./routes/confirm');
const register = require('./routes/api/registration');
const project = require('./routes/api/project');

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
app.get('/confirm/:token', confirm);
app.use('/api/project', project);

app.listen(config.get('port'), () =>
  console.log(`Server started on port ${config.get('port')}`)
);
