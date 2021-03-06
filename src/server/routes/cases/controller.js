// Dependencies
const uuid = require('uuid/v4');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

// Custom dependencies
const Case = require('../../models/Case');
const Owner = require('../../models/Owner');
const Police = require('../../models/Police');
const { errorTypes } = require('../../helpers/contants');
const { throwError } = require('../../helpers/errorHandler');
const { getCaseSearchQuery } = require('../../helpers/queryBuilder');

// Gets all cases includes relevant owner object (No order by)
const getAllCases = async () => {
  return Case.findAll({
    include: [{ model: Owner }, { model: Police, as: 'police' }],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Get single case by Id
const getCaseById = async _caseId => {
  return Case.findOne({
    where: {
      id: _caseId,
    },
    include: [{ model: Owner }, { model: Police, as: 'police' }],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Gets cases by status Id (1: Open, 2: Inprogress, 3: Resolved)
const getCasesByStatus = async _statusId => {
  return Case.findAll({
    where: {
      statusId: _statusId,
    },
    order: [['createdAt', 'ASC']],
    include: [{ model: Owner }, { model: Police, as: 'police' }],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Get a case by policeId
const getCaseByPolice = async _policeId => {
  return Case.findOne({
    where: {
      policeId: _policeId,
    },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
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
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Update a case
const updateCase = async (_caseId, _caseObj) => {
  return Case.update(_caseObj, {
    where: { id: _caseId },
    returning: true,
  })
    .then(([rowsAffected, [data]]) => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Deletes a case
const deleteCase = async _caseId => {
  return Case.findOne({
    where: { id: _caseId },
  })
    .then(data => {
      if (data) {
        data.destroy({}).catch(error => {
          throwError(error, errorTypes.DB_VALIDATION);
        });
      }
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
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
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Search cases with the given params
// As of now keyword and status only
const searchCases = async (_keyword, _statusId) => {
  return Case.findAll({
    where: getCaseSearchQuery(_keyword, _statusId),
    include: [{ model: Owner }, { model: Police, as: 'police' }],
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Expose methods
module.exports = {
  getAllCases,
  getCaseById,
  getCasesByStatus,
  getCaseByPolice,
  createCase,
  updateCase,
  deleteCase,
  createOwner,
  searchCases,
};
