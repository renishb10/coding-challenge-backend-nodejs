'use strict';

// Dependencies
const chai = require('chai');
const expect = require('chai').expect;
chai.use(require('chai-http'));

// Reference to main app
const app = require('../src/server');

//////////////////////////////////////////////////
// Cases Endpoint (TEST CASES)
//////////////////////////////////////////////////
describe('API endpoint /cases', function() {
  let globalCaseId = null;
  // POST a case
  it('should create a Case', function() {
    const caseObj = {
      firstName: 'Test',
      lastName: 'Owner',
      stolenObject: 'bike',
      licenseNo: '14A 55 CC' + Math.floor(Math.random() * 1000 + 1),
      color: 'light blue',
      type: '2017 DONALD UND MÜLLER CHARGER GS NUVINCI',
      date: '2019-05-01T02:29:31.379Z',
      description:
        "Ipsum Lorem is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    };

    return chai
      .request(app)
      .post('/api/v1/cases/')
      .send(caseObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');

        globalCaseId = res.body.id;
      });
  });

  // GET - List all cases
  it('should return all Cases', function() {
    return chai
      .request(app)
      .get('/api/v1/cases')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
      });
  });

  // Search cases (with filters)
  it('should return searched Cases', function() {
    return chai
      .request(app)
      .get('/api/v1/cases/search')
      .query({ keyword: '2013' })
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
      });
  });

  // GET a case
  it('should return a Case', function() {
    // TODO: Get case id from get all cases and add it here
    return chai
      .request(app)
      .get('/api/v1/cases/' + globalCaseId)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
      });
  });

  // Resolve a case
  it('should update a Case', function() {
    const caseObj = {
      statusId: 2,
      type: 'TEST BIKE TYPE',
    };

    return chai
      .request(app)
      .put('/api/v1/cases/' + globalCaseId)
      .send(caseObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('type');
      });
  });

  // Resolve a case
  it('should resolve a Case', function() {
    return chai
      .request(app)
      .patch('/api/v1/cases/' + globalCaseId + '/resolve')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
      });
  });

  // DELETE a case
  it('should delete a Case', function() {
    // TODO: Get case id from get all cases and add it here
    return chai
      .request(app)
      .delete('/api/v1/cases/' + globalCaseId)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
      });
  });
});

//////////////////////////////////////////////////
// Police Endpoint  (TEST CASES)
//////////////////////////////////////////////////
describe('API endpoint /police', function() {
  let globalPoliceId = null;

  // Create a Police
  it('should create a Police', function() {
    const policeObj = {
      extPoliceId: '111 AA ' + Math.floor(Math.random() * 999 + 1),
      firstName: 'Test',
      lastName: 'Police',
      division: 'municipal',
    };

    return chai
      .request(app)
      .post('/api/v1/police')
      .send(policeObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');

        globalPoliceId = res.body.id;
      });
  });

  // GET - List all Police
  it('should return all Police', function() {
    return chai
      .request(app)
      .get('/api/v1/police')
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('array');
        expect(res.body[0]).to.have.property('id');
      });
  });

  // GET a Police
  it('should return a Police', function() {
    return chai
      .request(app)
      .get('/api/v1/police/' + globalPoliceId)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
      });
  });

  // Update a Police
  it('should update a Police', function() {
    const policeObj = {
      extPoliceId: '111 AA ' + Math.floor(Math.random() * 999 + 1),
      firstName: 'Test 2',
      lastName: 'Police 2',
      division: 'corporation',
    };

    return chai
      .request(app)
      .put('/api/v1/police/' + globalPoliceId)
      .send(policeObj)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('lastName');
      });
  });

  // Delete a Police
  it('should update a Police', function() {
    return chai
      .request(app)
      .delete('/api/v1/police/' + globalPoliceId)
      .then(function(res) {
        expect(res).to.have.status(200);
        expect(res).to.be.json;
        expect(res.body).to.be.an('object');
        expect(res.body).to.have.property('id');
      });
  });
});
