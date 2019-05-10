const Joi = require('joi');
const config = require('../../helpers/contants');

const schema = Joi.object().keys({
  name: Joi.string()
    .max(50)
    .valid('open', 'inprogress', 'resolved')
    .required(),
});

const validate = (req, res) => {
  return Joi.validate(req.body, schema, (err, value) => {
    if (err) throw err;
    return true;
  });
};

module.exports = validate;
