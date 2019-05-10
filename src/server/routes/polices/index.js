// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const { getAllPolice, createPolice } = require('./controller');
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
      const newPolice = await createPolice(req.body);
      res.json(newPolice);
    }
  } catch (e) {
    next(e);
  }
});

///////////////////////////////////////////////////////////////
/// DELETE a police
///////////////////////////////////////////////////////////////
router.delete('/:policeId', async (req, res, next) => {
  try {
    const _policeId = req.params.policeId;
    res.json({ message: 'DELETE police ' + _policeId });
  } catch (e) {
    next(e);
  }
});

module.exports = router;
