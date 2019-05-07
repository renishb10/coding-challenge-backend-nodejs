// Dependencies
const router = require('express').Router();
const _ = require('lodash');

// Custom dependencies
const { getAllPolice, createPolice } = require('./controller');

///////////////////////////////////////////////////////////////
/// GET all polices (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
    try {
        let allPolice = await getAllPolice();
        return res.json(allPolice);
    } catch (e) {
        e.status = 400;
        return next(e);
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// POST a police
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
    try {
        if (_.isEmpty(req.body))
            return res.status(400).send({ message: 'bad request'})
        
        const newPolice = await createPolice(req.body);
        res.json(newPolice);
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// DELETE a police
///////////////////////////////////////////////////////////////
router.delete('/:policeId', async (req, res, next) => {
    try {
        const _policeId = req.params.policeId;
        res.json({ message: "DELETE police " + _policeId });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;