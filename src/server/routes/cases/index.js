// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const {
  getAllCases,
  getAllCaseById,
  createCase,
  createOwner,
} = require('./controller');
const { getPoliceByStatus } = require('../polices/controller');
const validate = require('./validator');
const { caseStatuses } = require('../../helpers/contants');

///////////////////////////////////////////////////////////////
/// GET all cases (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    const cases = await getAllCases();
    return res.json(cases);
  } catch (e) {
    e.status = 400;
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// POST a case
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    if (validate(req, res)) {
      //Get the owner details
      const newOwner = await createOwner(req.body);

      if (!_.isEmpty(newOwner)) {
        req.body.ownerId = newOwner.id;
        const newCase = await createCase(req.body);
        if (_.isEmpty(newCase)) throw Error;

        // Find free police officer
        const freePolice = await getPoliceByStatus(false);
        if (_.isEmpty(freePolice)) return res.json(newCase);

        //Pick random police officer and assign him the case
        const randomPolice =
          freePolice[Math.floor(Math.random() * freePolice.length)];

        // Update the object
        newCase
          .update({
            policeId: randomPolice.id,
            status: caseStatuses.INPROGRESS,
          })
          .then(data => {
            randomPolice
              .update({
                isBusy: true,
              })
              .then(police => {
                return res.json(data);
              })
              .catch(error => {
                throw error;
              });
          })
          .catch(error => {
            throw error;
          });
      }
    }
  } catch (e) {
    next(e);
  }
});

module.exports = router;
