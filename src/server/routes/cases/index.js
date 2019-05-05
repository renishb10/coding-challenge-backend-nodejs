const router = require('express').Router();
const { Case } = require('../../models');

///////////////////////////////////////////////////////////////
/// GET all cases (with filters)
///////////////////////////////////////////////////////////////
router.get('/', async (req, res, next) => {
    try {
        res.json({ message: "GET Cases" });
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
        Case.create(req.body)
        .then((data) => {
            res.json({data});
        })
        .catch((error) => {
            res.json(error);
        });
        // res.json({ message: "POST Case" });
    } catch (e) {
        console.log(e.message);
        res.status(500).send({ message: e.message });
    }
});

module.exports = router;