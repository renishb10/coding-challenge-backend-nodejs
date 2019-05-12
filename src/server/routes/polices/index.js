// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const {
  getAllPolice,
  createPolice,
  updatePolice,
  deletePolice,
} = require('./controller');
const {
  getCasesByStatus,
  getCaseByPolice,
  updateCase,
} = require('../cases/controller');
const { caseStatuses } = require('../../helpers/contants');
const validate = require('./validator');

///////////////////////////////////////////////////////////////
/// GET all polices (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    let allPolice = await getAllPolice();
    return res.json(allPolice);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// POST a police
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    if (validate(req, res)) {
      // 1) Create the police
      const newPolice = await createPolice(req.body);

      if (_.isEmpty(newPolice))
        throw new Error(
          `Couldn't create Police officer - ${JSON.stringify(req.body)}`,
        );

      // 2) Check if any open cases in the system
      const allOpenCases = await getCasesByStatus(caseStatuses.OPEN);
      if (
        !_.isEmpty(allOpenCases) &&
        _.isArray(allOpenCases) &&
        allOpenCases.length > 0
      ) {
        // 2.1) Pick the long-awaiting case (ordered by createdAt date)
        const pickedCase = allOpenCases[0];

        // 2.2) Assign police with the case
        // 2.3) Update police & update case
        await assignPoliceWithCase(newPolice, pickedCase);
      }

      // 3) Return new police
      res.json(newPolice);
    }
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// UPDATE a police
///////////////////////////////////////////////////////////////
router.put('/:policeId', async (req, res, next) => {
  try {
    // Validation
    if (!_.isEmpty(req.params.policeId) && validate(req, res)) {
      await updatePolice(req.params.policeId, req.body);

      // We can handle case update if the police's status gets updated.
      // But left this call as it is, to give God-Mode update.
      return res.json(req.body);
    }
    res.status(400).send({ message: 'Please check your input' });
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// DELETE a police
///////////////////////////////////////////////////////////////
router.delete('/:policeId', async (req, res, next) => {
  try {
    // Validation
    if (!_.isEmpty(req.params.policeId)) {
      // 1) Delete the police and get the id (just confirmation)
      const removedPolice = await deletePolice(req.params.policeId);

      if (removedPolice && removedPolice.id) {
        // 2) Find the relevant case with policeId
        const caseToReOpen = await getCaseByPolice(removedPolice.id);
        if (caseToReOpen) {
          // 2.1) Re-Open the case (we can introduce new status (REOPENED) for history/track, later)
          await updateCase(caseToReOpen.id, { statusId: caseStatuses.OPEN });
        }
      }

      // 3) Return the removedPolice
      return res.json(removedPolice);
    }
    res.status(400).send({ message: 'Param policeId is missing' });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
