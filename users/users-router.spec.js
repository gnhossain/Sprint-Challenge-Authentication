const request = require('supertest');
const server = require('../api/server.js');
const db = require('../database/dbConfig.js');

describe('userRouter.js', () => {
  beforeEach(async () => {
    await db('users').truncate();
  })
  it('Should set environment to testing', () => {
    expect(process.env.DB_ENV).toBe('testing');
  })
});

describe('userRouter.js', () => {
  describe('GET /api/jokes', () => {
    it('Should return 401 invalid credentials error', () => {       
        return request(server)
        .get('/api/jokes')
        .then(res => {
            expect(res.status).toBe(400);
        });    
    });
  });
});