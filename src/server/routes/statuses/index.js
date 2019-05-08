// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const { createNewStatus, getStatuses, updateStatus, deleteStatus } = require('./controller');

///////////////////////////////////////////////////////////////
/// GET all statuses
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
    try {
        const statuses = await getStatuses();
        return res.json(statuses);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// POST a status
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
    try {
        const statuses = await createNewStatus(req.body);
        return res.json(statuses);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// UPDATE a status
///////////////////////////////////////////////////////////////
router.put('/:id', async (req, res, next) => {
    try {
        const _statusId = req.params.id;
        console.log(_statusId);
        if (_.isEmpty(_statusId) || _.isEmpty(req.body))
            res.status(400).send({ message: 'No status id or body' });
        
        const statuses = await updateStatus(_statusId, req.body);
        return res.json(statuses);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// DELETE a status
///////////////////////////////////////////////////////////////
router.delete('/:id', async (req, res, next) => {
    try {
        const _statusId = req.params.id;
        if (_.isEmpty(_statusId))
            res.status(400).send({ message: 'No status id' });
        const statuses = await deleteStatus(_statusId);
        return res.json(statuses);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;