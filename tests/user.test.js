process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

describe('User API', () => {

  let userId;

  test('Créer un utilisateur', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Test',
        email: 'test@example.com'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBeDefined();

    userId = res.body.id;
  });

  test('Récupérer les utilisateurs', async () => {
    const res = await request(app).get('/users');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Récupérer un utilisateur', async () => {
    const res = await request(app).get(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.id).toBe(userId);
  });

  test('Mettre à jour un utilisateur', async () => {
    const res = await request(app)
      .put(`/users/${userId}`)
      .send({
        name: 'Updated',
        email: 'updated@example.com'
      });

    expect(res.statusCode).toBe(200);
    expect(res.body.updated).toBe(1);
  });

  test('Supprimer un utilisateur', async () => {
    const res = await request(app)
      .delete(`/users/${userId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });

});