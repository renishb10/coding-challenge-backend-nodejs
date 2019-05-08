// Dependencies
const router = require('express').Router();
const Case = require('../../models/Case');
const _ = require('lodash');

// Custom dependencies
const { getAllCases, getAllCaseById, createCase, createOwner } = require('./controller');
const { getPoliceByStatus } = require('../polices/controller');
const { caseStatuses } = require('../../helpers/contants');

///////////////////////////////////////////////////////////////
/// GET all cases (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
    try {
        const cases = await getAllCases();
        return res.json(cases);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// POST a case
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
    try {
      if (_.isEmpty(req.body))
        return res.status(400).send({ message: "Please check your input" });
      
      console.log(randomPolice);
      //Get the owner details
      const newOwner = await createOwner(req.body);

      if (!_.isEmpty(newOwner)) {
        req.body.ownerId = newOwner.id;
        const newCase = await createCase(req.body);
        if (_.isEmpty(newCase))
          throw Error;
  
        // Find free police officer
        const freePolice = await getPoliceByStatus(false);
        if (_.isEmpty(freePolice))
          return res.json(newCase);
  
        //Pick random police officer and assign him the case
        const randomPolice = freePolice[Math.floor(Math.random()*freePolice.length)];
        console.log(randomPolice);
        
        // Update the object
        newCase.update({
          policeId: randomPolice.id,
          status: caseStatuses.INPROGRESS,
        }).then((data) => {
            randomPolice.update({
                isBusy: true
            })
            .then((police) => {
              return res.json(data);
            })
            .catch((error) => {
              throw error;
            })
          })
          .catch((error) => {
            throw error;
          });
      }      
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;