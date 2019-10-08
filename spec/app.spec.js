process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

describe('app', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    xit('GET / responds with 200 and a JSON file containing all endpoints available', () => {});
    describe('/topics', () => {
      it('GET / 200 responds with an array of topic objects', () => {
        return request(app)
          .get('/api/topics')
          .expect(200)
          .then(({ body }) =>
            expect(body.topics[0]).to.have.keys('description', 'slug')
          );
      });
    });
    describe('/users', () => {
      it('GET /:username returns a status code 200 and the specified user object', () => {
        return request(app)
          .get('/api/users/lurker')
          .expect(200)
          .then(({ body }) => {
            expect(body.user[0]).to.have.keys('username', 'avatar_url', 'name');
          });
      });
    });
    describe('/articles', () => {
      it('GET /:article_id returns a status code of 200 and the specified article object', () => {
        return request(app)
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            console.log(body);
            expect(body.article[0]).to.contain.keys(
              'author',
              'title',
              'article_id',
              'body',
              'topic',
              'created_at',
              'votes'
            );
          });
      });
    });
    describe('/comments', () => {});
  });
});
