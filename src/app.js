const express = require('express');

const participantsRoutes = require('./participants/participants-routes.js');

const app = express();

app.use(express.json());

const router = express.Router();

app.use('/participants', participantsRoutes);

router.use('*', (req, res) => {
  res.status = '404';
  res.send('NOT FOUND\n');
});

module.exports = app;