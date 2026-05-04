process.env.NODE_ENV = 'test';

const request = require('supertest');
const app = require('../server');

describe('Post API', () => {

  let userId;
  let postId;

  test('Créer un user pour les posts', async () => {
    const res = await request(app)
      .post('/users')
      .send({
        name: 'Author',
        email: 'author@test.com'
      });

    userId = res.body.id;
  });

  test('Créer un post', async () => {
    const res = await request(app)
      .post('/posts')
      .send({
        title: 'Test Post',
        content: 'Content',
        userId
      });

    expect(res.statusCode).toBe(200);
    postId = res.body.id;
  });

  test('Lire les posts', async () => {
    const res = await request(app).get('/posts');

    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  test('Supprimer un post', async () => {
    const res = await request(app)
      .delete(`/posts/${postId}`);

    expect(res.statusCode).toBe(200);
    expect(res.body.deleted).toBe(1);
  });

});