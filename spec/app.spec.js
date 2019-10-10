process.env.NODE_ENV = 'test';
const chai = require('chai');
const chaiSorted = require('sams-chai-sorted');
const { expect } = chai;
chai.use(chaiSorted);
const request = require('supertest');
const app = require('../app.js');
const connection = require('../db/connection.js');

describe('app', () => {
  beforeEach(() => connection.seed.run());
  after(() => connection.destroy());
  describe('/api', () => {
    it('GET / responds with 200 and a JSON file containing all endpoints available', () => {
      request(app)
        .get('/api')
        .expect(200)
        .then(({ body }) => {
          expect(body).to.be.an('object');
        });
    });
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
      it('GET /:article_id returns a 400 error when a nonsensical article_id is requested but the format of the request is a string', () => {
        return request(app)
          .get('/api/articles/rowdy-chav-in-a-tractor')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('GET /:article_id returns a 404 error when a non-existent article_id is requested', () => {
        return request(app)
          .get('/api/articles/404')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('not found');
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
      it('GET / 200 returns a list of all articles which is sorted by default as descending by date', () => {
        return request(app)
          .get('/api/articles')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.descendingBy('created_at');
            expect(body.articles).to.be.an('array');
            expect(body.articles[0]).to.contain.keys(
              'title',
              'article_id',
              'topic',
              'created_at',
              'votes',
              'comment_count'
            );
          });
      });
      it('GET /?order=asc returns the list of articles sorted in ascending created_at order', () => {
        return request(app)
          .get('/api/articles?order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.articles).to.be.ascendingBy('created_at');
          });
      });
      it('GET /?author=icellusedkars returns only a list of articles written by the specified author', () => {
        return request(app)
          .get('/api/articles?author=icellusedkars')
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(article => {
              expect(article.author).to.equal('icellusedkars');
            });
          });
      });
      it('GET /?topic=cats returns only a list of articles written by the specified author', () => {
        return request(app)
          .get('/api/articles?topic=cats')
          .expect(200)
          .then(({ body }) => {
            body.articles.forEach(article => {
              expect(article.topic).to.equal('cats');
            });
          });
      });
      it('GET /? returns a 400 bad request when an invalid author is specified as a query', () => {
        return request(app)
          .get('/api/articles?author=pryda')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('GET /? returns a 400 bad request when an invalid topic is specified as a query', () => {
        return request(app)
          .get('/api/articles?topic=tromb')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('GET /? returns a 400 bad request when an invalid column is specified as a sort_by query', () => {
        return request(app)
          .get('/api/articles?sort_by=bass')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
    });
    describe('/comments', () => {
      it('GET / returns a 405 error for an invalid method', () => {
        return request(app)
          .get('/api/comments')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad method');
          });
      });
      it('GET /:comment_id returns a 405 error for an invalid method', () => {
        return request(app)
          .get('/api/comments/1')
          .expect(405)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad method');
          });
      });
      it('POST /:article_id/comments returns a 201 status code and adds a comment to the specified article returning the posted comment', () => {
        return request(app)
          .post('/api/articles/2/comments')
          .send({ username: 'icellusedkars', body: 'que pretendes' })
          .expect(201)
          .then(({ body }) => {
            expect(body.comment[0]).to.contain.keys(
              'comments_id',
              'author',
              'article_id',
              'votes',
              'created_at',
              'body'
            );
          });
      });
      it('POST /:article_id/comments returns a 400 status code when the body of the post contains invalid inputs', () => {
        return request(app)
          .post('/api/articles/2/comments')
          .send({ theboizzz: 'snoop', bodizzle: 6 })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('POST /:article_id/comments returns a 404 status code when the article is not found', () => {
        return request(app)
          .post('/api/articles/500/comments')
          .send({ username: 'icellusedkars', body: 'que pretendes' })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('not found');
          });
      });
      it('GET /:article_id/comments returns a 200 status code and an array of comments for the specified article and is sorted by created_at by default in descending order', () => {
        return request(app)
          .get('/api/articles/1/comments')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments[0]).to.contain.keys(
              'comments_id',
              'votes',
              'created_at',
              'author',
              'body',
              'article_id'
            );
            expect(body.comments).to.be.descendingBy('created_at');
          });
      });
      it('GET /:article_id/comments returns a 200 status code and an array of comments for the specified article sorted by the column specified', () => {
        return request(app)
          .get('/api/articles/1/comments?sort_by=votes')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.descendingBy('votes');
          });
      });
      it('GET /:article_id/comments returns a 200 status code and an array of comments for the specified article sorted by the order specified', () => {
        return request(app)
          .get('/api/articles/1/comments?order=asc')
          .expect(200)
          .then(({ body }) => {
            expect(body.comments).to.be.sorted({ ascending: true });
          });
      });
      it('GET /:article_id/comments returns a 404 not found when the article specified is a valid input but does not exist', () => {
        return request(app)
          .get('/api/articles/404/comments')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('not found');
          });
      });
      it('GET /:article_id/comments returns a 400 bad request when the article specified is a nonsensical input', () => {
        return request(app)
          .get('/api/articles/trump-declares-war-on-mexico/comments')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('PATCH /:comment_id returns 200 and returns the updated comment when the votes increment is a positive integer', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 10 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(26);
          });
      });
      it('PATCH /:comment_id returns 200 and returns the updated comment when the votes increment is a negative number', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: -10 })
          .expect(200)
          .then(({ body }) => {
            expect(body.comment[0].votes).to.equal(6);
          });
      });
      it('PATCH /:comment_id returns 400 bad request when the input is invalid', () => {
        return request(app)
          .patch('/api/comments/1')
          .send({ inc_votes: 'post malone' })
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('invalid update');
          });
      });
      it('PATCH /:comment_id returns 404 not found when the input is valid but the comment id is not', () => {
        return request(app)
          .patch('/api/comments/404')
          .send({ inc_votes: 1 })
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('not found');
          });
      });
      it('DELETE /:comment_id returns a 204 and deletes the comment', () => {
        return request(app)
          .delete('/api/comments/1')
          .expect(204);
      });
      it('DELETE /:comment_id returns a 400 and returns a bad request for invalid inputs', () => {
        return request(app)
          .delete('/api/comments/hugoboss')
          .expect(400)
          .then(({ body }) => {
            expect(body.msg).to.equal('bad request');
          });
      });
      it('DELETE /:comment_id returns a 404 and returns not found for non existent comments', () => {
        return request(app)
          .delete('/api/comments/404')
          .expect(404)
          .then(({ body }) => {
            expect(body.msg).to.equal('not found');
          });
      });
    });
  });
});
