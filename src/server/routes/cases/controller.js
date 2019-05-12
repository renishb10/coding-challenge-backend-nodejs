// Dependencies
const uuid = require('uuid/v4');

// Custom dependencies
const Case = require('../../models/Case');
const Owner = require('../../models/Owner');

// Gets all cases includes relevant owner object (No order by)
const getAllCases = async () => {
  return Case.findAll({ include: [Owner] })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

// Get single case by Id
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

// Gets cases by status Id (1: Open, 2: Inprogress, 3: Resolved)
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

// Creates a case, doesn't assign it to police to adapt Single Responsibility policy.
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

// Update a case
const updateCase = async (_caseId, _caseObj) => {
  return Case.update(_caseObj, {
    where: { id: _caseId },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwDBError(error);
    });
};

// Deletes a case
const deleteCase = async _caseId => {
  return Case.destroy({
    where: { id: _caseId },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

const throwDBError = _error => {
  const err = _error;
  err.status = 422;
  throw err;
};

// Creates a owner and returns the whole object
// Note: This can be moved if owner module is created in future.
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

// Expose methods
module.exports = {
  getAllCases,
  getCaseById,
  getCasesByStatus,
  createCase,
  updateCase,
  deleteCase,
  createOwner,
};
