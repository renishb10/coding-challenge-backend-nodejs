const router = require('express').Router();

router.get('/', (req, res) => {
  res.json("Stolen Bike API Service");
});

module.exports = router;