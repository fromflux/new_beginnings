const joi = require("@hapi/joi");

const referenceService = require('../reference-service/reference-service.js');
const participants = require('./participants-mock.json');

async function getAll(req, res) {
  res.send(participants);
}

async function getByReference(req, res) {
  const { reference } = req.params;

  const { error } = joi.string().required().validate(reference);

  // pass param to query builder, orm or other sanitized mechanism
  const foundEntry = participants.find(entry => entry.reference === reference);

  if (!error && foundEntry) {
    res.send(foundEntry);
  } else {
    res.status(404).json({ error: 'Invalid participant reference' });
  }
}

async function updateByReference(req, res) {
  const { reference } = req.params;

  // pass param to query builder, orm or other sanitized mechanism
  let foundIndex = participants.findIndex(entry => entry.reference === reference);

  if (foundIndex > -1) {

    const participantSchema = joi.object(
      {
        name: joi.string().min(2),
        dateOfBirth: joi.date().iso(),
        email: joi.string().email(),
        phoneNumber: joi.string().min(10),
        address: joi.string(),
      }
    );

    const { error } = participantSchema.validate(req.body);

    if (error) {
      const errorMessage = error.details
        .map((details) => details.message)
        .join(', ')

      return res.status(400).json({ error: errorMessage });
    }

    const updateData = req.body;

    participants[foundIndex] = {
      ...participants[foundIndex],
      ...updateData,
    }

    res.send(participants[foundIndex]);

  } else {
    res.status(404).json({ error: 'Invalid participant reference' });
  }
}

async function createParticipant(req, res) {

  const newData = req.body;

  const participantSchema = joi.object(
    {
      name: joi.string().min(2).required(),
      dateOfBirth: joi.date().iso().required(),
      email: joi.string().email().required(),
      phoneNumber: joi.string().min(10).required(),
      address: joi.string().required(),
    }
  );

  const { error } = participantSchema.validate(newData);

  if (error) {
    const errorMessage = error.details
      .map((details) => details.message)
      .join(', ')

    return res.status(400).json({ error: errorMessage });
  }

  const newEntry = {
    reference: await referenceService.generate(),
    ...newData
  }

  participants.push(newEntry);

  res.send(newEntry);
}

module.exports = {
  getAll,
  getByReference,
  updateByReference,
  createParticipant,
}