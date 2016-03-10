'use strict';

const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const request = chai.request;
const mongoose = require('mongoose');
process.env.MONGOLABL_URI = 'mongodb://localhost/gallery_app_test';

require(__dirname + '/../server');
const Photo = require(__dirname + '/../models/photo');

describe('photo API', () => {
  before((done) => {
    done();
  });

  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to GET all photos', (done) => {
    request('localhost:3000')
      .get('/api/photo/')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(res.body).to.not.eql(null);
        done();
      });
  });

  it('should be able to POST a photo', (done) => {
      request('localhost:3000')
        .post('api/newphoto')
        .send({ url: 'test url' })
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.url).to.eql('test url');
          expect(res.body).to.have.property('_id');
          done();
      });
    });
  });
