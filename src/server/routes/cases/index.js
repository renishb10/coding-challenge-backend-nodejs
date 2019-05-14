// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const {
  getAllCases,
  getCaseById,
  createCase,
  updateCase,
  deleteCase,
  createOwner,
  searchCases,
} = require('./controller');
const { getFreePolice, setPoliceBusyStatus } = require('../polices/controller');
const validate = require('./validator');
const { caseStatuses } = require('../../helpers/contants');
const { throwError } = require('../../helpers/errorHandler');
const { errorTypes } = require('../../helpers/contants');

///////////////////////////////////////////////////////////////
/// GET all cases (without filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    //TODO: Implement pagination support (limit & skip)
    const cases = await getAllCases();
    return res.json(cases);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// Search cases (with filters)
///////////////////////////////////////////////////////////////
router.get('/search', async (req, res, next) => {
  try {
    const { keyword, statusId } = req.query;
    const cases = await searchCases(keyword, statusId);
    return res.json(cases);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// GET a case
///////////////////////////////////////////////////////////////
router.get('/:caseId', async (req, res, next) => {
  try {
    const _caseId = req.params.caseId;
    const aCase = await getCaseById(_caseId);
    return res.json(aCase);
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
/// Resolve a case
///////////////////////////////////////////////////////////////
router.patch('/:caseId/resolve', async (req, res, next) => {
  try {
    // Validation
    if (!_.isEmpty(req.params.caseId)) {
      const modifiedCase = await updateCase(req.params.caseId, {
        statusId: caseStatuses.RESOLVED,
      });

      if (_.isEmpty(modifiedCase)) {
        throwError(
          new Error('No such case exist in our system'),
          errorTypes.BAD_REQUEST,
        );
      }

      // 1) Check if updatedCase has policemen assigned
      // We can also check status again. Not needed as of now.
      if (modifiedCase.policeId !== null) {
        // 2) Update relevant policemen (set him not busy)
        await setPoliceBusyStatus(modifiedCase.policeId, false);
      }

      return res.json(modifiedCase);
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
      //1) Delete the case & get the object
      const removedCase = await deleteCase(req.params.caseId);

      // 2) Check if updatedCase has policemen assigned
      // We can also check status again. Not needed as of now.
      if (removedCase.policeId !== null) {
        // 2.1) Update relevant policemen (set him not busy)
        await setPoliceBusyStatus(removedCase.policeId, false);
      }

      return res.json(removedCase);
    }
    res.status(400).send({ message: 'Param caseId is missing' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
