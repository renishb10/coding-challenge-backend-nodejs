const router = require('express').Router();

///////////////////////////////////////////////////////////////
/// GET all polices (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "GET polices" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

///////////////////////////////////////////////////////////////
/// POST a police
///////////////////////////////////////////////////////////////
router.post('/', async (req, res, next) => {
    try {
        res.json({ message: "POST police" });
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