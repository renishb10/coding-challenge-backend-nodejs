// Dependencies
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const getCaseSearchQuery = (_keyword = null, _statusId = null) => {
  // If condition grows then modularize & convert it to switch cases
  let query = {};
  if (_keyword && _statusId) {
    query = {
      [Op.or]: {
        type: {
          [Op.iLike]: `%${_keyword}%`,
        },
        licenseNo: {
          [Op.iLike]: `%${_keyword}%`,
        },
        color: {
          [Op.iLike]: `%${_keyword}%`,
        },
        description: {
          [Op.iLike]: `%${_keyword}%`,
        },
      },
      statusId: _statusId,
    };
  } else if (_keyword) {
    query = {
      [Op.or]: {
        type: {
          [Op.iLike]: `%${_keyword}%`,
        },
        licenseNo: {
          [Op.iLike]: `%${_keyword}%`,
        },
        color: {
          [Op.iLike]: `%${_keyword}%`,
        },
        description: {
          [Op.iLike]: `%${_keyword}%`,
        },
      },
    };
  } else if (_statusId) {
    query = {
      statusId: _statusId,
    };
  }

  return query;
};

module.exports = {
  getCaseSearchQuery,
};
