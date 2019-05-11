const router = require('express').Router();

router.get('/', (req, res) => {
  res.sendFile(__dirname + '/public');
});

module.exports = router;
