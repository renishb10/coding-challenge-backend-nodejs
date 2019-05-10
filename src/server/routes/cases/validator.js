const Joi = require('joi');

let today = new Date();
const schema = Joi.object().keys({
  firstName: Joi.string()
    .min(2)
    .max(100)
    .required(),
  lastName: Joi.string()
    .min(1)
    .max(100)
    .required(),
  stolenObject: Joi.string()
    .max(50)
    .required(),
  licenseNo: Joi.string()
    .max(50)
    .required(),
  color: Joi.string()
    .max(20)
    .required(),
  type: Joi.string()
    .max(100)
    .required(),
  date: Joi.date()
    .max(today.setDate(today.getUTCDate() + 1).toString())
    .iso(),
  description: Joi.string()
    .max(1200)
    .required(),
});

const validate = (req, res) => {
  return Joi.validate(req.body, schema, (err, value) => {
    if (err) throw err;
    return true;
  });
};

module.exports = validate;
