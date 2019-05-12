const Joi = require('joi');
const config = require('../../helpers/contants');

const schema = Joi.object().keys({
  name: Joi.string()
    .max(50)
    .valid(...Object.keys(config.caseStatuses))
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
