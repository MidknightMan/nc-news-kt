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
    it('GET /aoi returns a 404 route not found message', () => {
      return request(app)
        .get('/aoi')
        .expect(404)
        .then(({ body }) => expect(body.msg).to.equal('route not found'));
    });
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
      it('GET /:username returns a 404 error code when a non existent username is requested', () => {
        return request(app)
          .get('/api/users/johncena')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('username does not exist');
          });
      });
    });
    describe('/articles', () => {
      it('GET /:article_id returns a status code of 200 and the specified article object', () => {
        return request(app)
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
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
      it('GET /:article_id returns a status code 200 with the article object returned containing a comment count', () => {
        return request(app)
          .get('/api/articles/2')
          .expect(200)
          .then(({ body }) => {
            expect(body.article[0]).to.contain.keys('comment_count');
          });
      });
      it('GET /:article_id returns a 400 error when a non-existent article_id is requested but the format of the request is a string', () => {
        return request(app)
          .get('/api/articles/rowdy-chav-in-a-tractor')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad article request');
          });
      });
      it('PATCH /:article_id returns a 200 status code and updates the article with the passed information', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({ inc_votes: 1 })
          .expect(200)
          .then(({ body }) => expect(body.article[0].votes).to.equal(1));
      });
      it('PATCH /:article_id returns a 200 status code and lowers the vote count when passed a negative', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({ inc_votes: -100 })
          .expect(200)
          .then(({ body }) => expect(body.article[0].votes).to.equal(-100));
      });
      it('PATCH /:article_id returns a 400 status code when passed an invalid request', () => {
        return request(app)
          .patch('/api/articles/2')
          .send({
            inc_votes: 'potatoes, boil them, mash them, stick them in a stew'
          })
          .expect(400)
          .then(({ body }) => expect(body.msg).to.equal('invalid update'));
      });
    });
    describe('/comments', () => {});
  });
});