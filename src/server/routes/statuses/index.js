// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const {
  createNewStatus,
  getStatuses,
  updateStatus,
  deleteStatus,
} = require('./controller');
const validate = require('./validator');

///////////////////////////////////////////////////////////////
/// GET all statuses
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
  try {
    const statuses = await getStatuses();
    return res.json(statuses);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// POST a status
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
  try {
    if (validate(req, res)) {
      const statuses = await createNewStatus(req.body);
      return res.json(statuses);
    }
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// UPDATE a status
///////////////////////////////////////////////////////////////
router.put('/:id', async (req, res, next) => {
  try {
    const _statusId = req.params.id;
    if (_.isEmpty(_statusId) || _.isEmpty(req.body))
      res.status(400).send({ message: 'No status id or body' });

    const statuses = await updateStatus(_statusId, req.body);
    return res.json(statuses);
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// DELETE a status
///////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res, next) => {
  try {
    const _statusId = req.params.id;
    if (_.isEmpty(_statusId)) res.status(400).send({ message: 'No status id' });
    const statuses = await deleteStatus(_statusId);
    return res.json(statuses);
  } catch (e) {
    next(e);
  }
});

module.exports = router;
