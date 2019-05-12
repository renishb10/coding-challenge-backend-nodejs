const Case = require('../../models/Case');
const Owner = require('../../models/Owner');
const uuid = require('uuid/v4');

const getAllCases = async () => {
  return Case.findAll({ include: [Owner] })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

const getCaseById = async _caseId => {
  return Case.findAll({
    where: {
      id: _caseId,
    },
    include: [Owner],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

const getCasesByStatus = async _statusId => {
  return Case.findAll({
    where: {
      statusId: _statusId,
    },
    order: [['createdAt', 'ASC']],
    include: [Owner],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

const createCase = async _caseObj => {
  _caseObj.id = uuid(); //problem with sequelize default uuid setting.
  return Case.create(_caseObj)
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

// This can be moved if owner module is created in future.
const createOwner = async _ownerObj => {
  _ownerObj.id = uuid(); //problem with sequelize default uuid setting.
  return Owner.create(_ownerObj)
    .then(data => {
      return data.dataValues;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllCases,
  getCaseById,
  getCasesByStatus,
  createCase,
  createOwner,
};
