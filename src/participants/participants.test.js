const request = require('supertest');

const app = require('../app');


describe('Participants Routes', () => {

  it('GetAll', async () => {
    const expectedEntry = [{
      "reference": "KFG-737",
      "name": "Kate Smith",
      "dateOfBirth": "2023-03-24T21:29:00.362Z",
      "email": "kate.smith@mail.com",
      "phoneNumber": "07473373737",
      "address": "home address"
    }];

    const res = await request(app)
      .get('/participants');

    expect(res.statusCode).toEqual(200);
    expect(res.body).toEqual(expect.arrayContaining(expectedEntry));
    expect(res.body.length).toEqual(4);
  });

  describe('GetByReference', () => {
    it('Returns correct entry given its reference', async () => {
      const expectedEntry = {
        "reference": "KFG-737",
        "name": "Kate Smith",
        "dateOfBirth": "2023-03-24T21:29:00.362Z",
        "email": "kate.smith@mail.com",
        "phoneNumber": "07473373737",
        "address": "home address"
      }

      const res = await request(app)
        .get('/participants/KFG-737');

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedEntry);
    });

    it('Returns not found given invalid reference', async () => {
      const res = await request(app)
        .get('/participants/INVALID_REF');

      expect(res.statusCode).toEqual(404);
    });
  });

  describe('UpdateByReference', () => {
    it('Returns updated entry given correct data', async () => {
      const updateData = {
        name: 'Anew Name',
      }

      const expectedUpdated = {
        "reference": "KFG-737",
        "name": "Anew Name",
        "dateOfBirth": "2023-03-24T21:29:00.362Z",
        "email": "kate.smith@mail.com",
        "phoneNumber": "07473373737",
        "address": "home address"
      }

      const res = await request(app)
        .put('/participants/KFG-737')
        .send(updateData);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toEqual(expectedUpdated);
    });

    it('Returns error given incorrect data', async () => {
      const updateData = {
        email: 'INVALID_EMAIL',
      }

      const res = await request(app)
        .put('/participants/KFG-737')
        .send(updateData);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });

  describe('createParticipant', () => {
    it('Returns newly created entry given correct data', async () => {
      const newEntry = {
        "name": "Vincent Gold",
        "dateOfBirth": "1990-01-05T10:50:00.362Z",
        "email": "jack.smith@mail.com",
        "phoneNumber": "07473373737",
        "address": "home address"
      }

      const res = await request(app)
        .post('/participants')
        .send(newEntry);

      expect(res.statusCode).toEqual(200);
      expect(res.body).toHaveProperty('reference');
      expect(res.body).toMatchObject(newEntry)
    });

    it('Returns error given incorrect data', async () => {
      const newEntry = {
        "name": "Vincent Gold",
        "dateOfBirth": "INVALID_DATE",
        "email": "jack.smith@mail.com",
        "phoneNumber": "07473373737",
        "address": "home address"
      }

      const res = await request(app)
        .post('/participants')
        .send(newEntry);

      expect(res.statusCode).toEqual(400);
      expect(res.body).toHaveProperty('error');
    });
  });
});
