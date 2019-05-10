'use strict';

// Dependencies
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

// Reference to main app
const app = require('../src/server');

// Cases Endpoint
describe('API endpoint /cases', function() {
  // GET - List all cases
  it('should return all Cases', function() {
    return chai.request(app)
      .get('/api/v1/cases')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id')
      });
  });
});


// Police Endpoint
describe('API endpoint /polices', function() {
  // GET - List all Polices
  it('should return all Polices', function() {
    return chai.request(app)
      .get('/api/v1/polices')
      .then(function(res) {           
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body[0]).to.have.property('id')
       // expect(res.body).to.be.an('object');
        //expect(res.body.results).to.be.an('array');
      });
  });
});