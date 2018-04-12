process.env.NODE_ENV = 'test';
const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../src/server/index');
const knex = require('../src/server/db/connection');

describe('routes : shows', () => {
  beforeEach(() => {
    return knex.migrate
      .rollback()
      .then(() => {
        return knex.migrate.latest();
      })
      .then(() => {
        return knex.seed.run();
      });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('get /api/v1/shows', () => {
    it('should return all shows', done => {
      chai
        .request(server)
        .get('/api/v1/shows')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data.length.should.eql(3);
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          done();
        });
    });
  });

  describe('get /api/v1/shows/:id', () => {
    it('should return a single show', done => {
      chai
        .request(server)
        .get('/api/v1/shows/1')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
          done();
        });
    });
    it('should throw an error if the show does not exist', done => {
      chai
        .request(server)
        .get('/api/v1/shows/999999999')
        .end((err, res) => {
          res.status.should.equal(404);
          res.type.should.eql('application/json');
          res.body.status.should.eql('error');
          res.body.message.should.eql('Show does not exist.');
          done();
        });
    });
  });

  describe('post /api/v1/shows', () => {
    it('should return the show that was added', done => {
      {
        chai
          .request(server)
          .post('/api/v1/shows')
          .send({
            name: 'Black Mirror',
            genre: 'Sci-Fi',
            rating: 9,
            explicit: true
          })
          .end((err, res) => {
            should.not.exist(err);
            res.status.should.equal(201);
            res.type.should.equal('application/json');
            res.body.status.should.eql('success');
            res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
            done();
          });
      }
    });
    it('should throw an error if the payload is malformed', done => {
      chai
        .request(server)
        .post('/api/v1/shows')
        .send({
          name: 'Black Mirror'
        })
        .end((err, res) => {
          // should.exist(err);
          res.status.should.equal(400);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          should.exist(res.body.message);
          done();
        });
    });
  });

  describe('put /api/v1/shows', () => {
    it('should return the show that was updated', done => {
      knex('shows')
        .select('*')
        .then(show => {
          const showObject = show[0];
          chai
            .request(server)
            .put(`/api/v1/shows/${showObject.id}`)
            .send({
              rating: 8
            })
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.eql('success');
              res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
              const newShowObject = res.body.data[0];
              newShowObject.rating.should.not.eql(showObject.rating);
              done();
            });
        });
    });
    it('should throw an error if the show does not exist', done => {
      chai
        .request(server)
        .put('/api/v1/shows/999999999')
        .send({ rating: 9 })
        .end((err, res) => {
          // should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          res.body.message.should.equal('That show does not exist');
          done();
        });
    });
  });

  describe('delete /api/v1/shows/:id', () => {
    it('should return the show that was deleted', done => {
      knex('shows')
        .select('*')
        .then(shows => {
          const showObject = shows[0];
          const lengthBeforeDelete = shows.length;
          chai
            .request(server)
            .delete(`/api/v1/shows/${showObject.id}`)
            .end((err, res) => {
              should.not.exist(err);
              res.status.should.equal(200);
              res.type.should.equal('application/json');
              res.body.status.should.equal('success');
              res.body.data[0].should.include.keys('id', 'name', 'genre', 'rating', 'explicit');
              knex('shows')
                .select('*')
                .then(updateShows => {
                  updateShows.length.should.equal(lengthBeforeDelete - 1);
                  done();
                });
            });
        });
    });
    it('should throw an error if the show does not exist', done => {
      chai
        .request(server)
        .delete('/api/v1/shows/999999999')
        .end((err, res) => {
          // should.exist(err);
          res.status.should.equal(404);
          res.type.should.equal('application/json');
          res.body.status.should.equal('error');
          res.body.message.should.equal('That show does not exist');
          done();
        });
    });
  });
});
