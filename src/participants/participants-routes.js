const express = require('express');

const handlers = require('./participants-handlers.js');

const router = express.Router();

router.route('/')
  .get(handlers.getAll);

router.route('/:reference')
  .get(handlers.getByReference);

router.route('/:reference')
  .put(handlers.updateByReference);

router.route('/')
  .post(handlers.createParticipant);

module.exports = router;
