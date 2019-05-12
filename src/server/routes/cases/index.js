// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const {
  getAllCases,
  getAllCaseById,
  createCase,
  updateCase,
  deleteCase,
  createOwner,
} = require('./controller');
const { getFreePolice, setPoliceBusyStatus } = require('../polices/controller');
const validate = require('./validator');
const { caseStatuses } = require('../../helpers/contants');

///////////////////////////////////////////////////////////////
/// GET all cases (without filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    const cases = await getAllCases();
    return res.json(cases);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// POST a case
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    if (validate(req, res)) {
      // 1) Set and Get the owner & id respectively
      const newOwner = await createOwner(req.body);

      if (!_.isEmpty(newOwner.id)) {
        // 2) Assign ownerId to the req case object
        req.body.ownerId = newOwner.id;

        // 3) Find free police officer
        const freePolice = await getFreePolice();

        // 3.1) If any free policemen & assign him case
        if (
          !_.isEmpty(freePolice) &&
          _.isArray(freePolice) &&
          freePolice.length > 0
        ) {
          // 3.2) Pick random police officer and assign him the case
          const randomPolice =
            freePolice[Math.floor(Math.random() * freePolice.length)];
          req.body.policeId = randomPolice.id;

          // 3.3) Make the policemen status to busy
          await setPoliceBusyStatus(randomPolice.id, true);

          // 3.4) Make the case status to 'inprogress'
          req.body.statusId = caseStatuses.INPROGRESS;
        }

        // 4) Now create case
        const newCase = await createCase(req.body);

        if (_.isEmpty(newCase)) {
          console.log('new case created', newCase);
          // 4.1) Revert police status & revert owner details if needed (as of now No)
          await setPoliceBusyStatus(randomPolice.id, false);
          throw new Error(
            `Couldn't create a case - ${ownerId}: ${JSON.stringify(req.body)}`,
          );
        }

        // 5) If all goes well return 200 & case
        res.json(newCase);
      }
    }
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// Update a case (Whole object can be passed)
///////////////////////////////////////////////////////////////
router.put('/:caseId', async (req, res, next) => {
  try {
    // Validation
    if (!_.isEmpty(req.params.caseId)) {
      await updateCase(req.params.caseId, req.body);
      return res.json(req.body);
    }
    res.status(400).send({ message: 'Please check your input' });
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// Delete a case
///////////////////////////////////////////////////////////////
router.delete('/:caseId', async (req, res, next) => {
  try {
    // Validation
    if (!_.isEmpty(req.params.caseId)) {
      await deleteCase(req.params.caseId);
      return res.json(req.body);
    }
    res.status(400).send({ message: 'Param caseId is missing' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
