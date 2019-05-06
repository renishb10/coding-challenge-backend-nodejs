'use strict';

const chai = require('chai');
const expect = require('chai').expect;

chai.use(require('chai-http'));

const app = require('../src/server'); // Our app

describe('API endpoint /cases', function() {
  this.timeout(8000); // How long to wait for a response (ms)

  before(function() {

  });

  after(function() {

  });

  // GET - List all cases
  it('should return all Cases', function() {
    return chai.request(app)
      .get('/api/v1/cases')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       // expect(res.body).to.be.an('object');
        //expect(res.body.results).to.be.an('array');
      });
  });

  // GET - List all Polices
  it('should return all Polices', function() {
    return chai.request(app)
      .get('/api/v1/polices')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
       // expect(res.body).to.be.an('object');
        //expect(res.body.results).to.be.an('array');
      });
  });
});