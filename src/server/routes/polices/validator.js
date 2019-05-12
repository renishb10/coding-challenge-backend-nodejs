const Joi = require('joi');

// Simple Joi validator, can be extended later
const schema = Joi.object().keys({
  extPoliceId: Joi.string()
    .max(50)
    .required(),
  firstName: Joi.string()
    .min(2)
    .max(100)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(100)
    .required(),
  division: Joi.string()
    .max(50)
    .required(),
});

const validate = (req, res) => {
  return Joi.validate(req.body, schema, (err, value) => {
    if (err) {
      err.status = 400;
      throw err;
    }
    return true;
  });
};

module.exports = validate;
