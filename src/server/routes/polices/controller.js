// Dependencies
const _ = require('lodash');

// Custom dependencies
const Police = require('../../models/Police');
const { caseStatuses } = require('../../helpers/contants');
const { errorTypes } = require('../../helpers/contants');
const { throwError } = require('../../helpers/errorHandler');

// Gets all the police (default order)
const getAllPolice = async () => {
  return Police.findAll()
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Gets police officers based on busy status (by default false)
const getFreePolice = async (_isBusy = false) => {
  return Police.findAll({
    where: {
      isBusy: _isBusy,
    },
    order: [['createdAt', 'ASC']],
  })
    .then(data => {
      console.log(data);
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Sets the police officer's busy status
const setPoliceBusyStatus = async (_policeId, _isBusy) => {
  if (_policeId && _isBusy) {
    return Police.findOne({
      where: {
        id: _policeId,
      },
    })
      .then(data => {
        return data
          .update({
            isBusy: _isBusy,
          })
          .catch(error => {
            throwError(error, errorTypes.DB_VALIDATION);
          });
      })
      .catch(error => {
        throwError(error, errorTypes.DB_VALIDATION);
      });
  } else
    throw new Error(
      'Err - setPoliceBusyStatus(_policeObj, _isBusy) requires two params',
    );
};

// Get single police officer by id
const getPoliceById = async _policeId => {
  return Police.find({
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

// Creates a new police officer (TBD - Assigning him case here is not done to adapt Single Responsibility design)
const createPolice = async _policeObj => {
  return Police.create(_policeObj)
    .then(data => {
      if (data) {
        // TODO: Assign him with a Case (TBD)
      }
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Updates police officer with the whole object recieved.
// TODO: This expects external police Id to be the same. Needs modification
const updatePolice = async (_policeId, _policeObj) => {
  return Police.update(_policeObj, {
    where: { id: _policeId },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Deletes a police officer
const deletePolice = async _policeId => {
  return Police.destroy({
    where: { id: _policeId },
  })
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

// Assign police officer with a case
// Note: This doesn't validate the current police status
const assignPoliceWithCase = async (_policeObj, _caseObj) => {
  return _policeObj
    .update({
      isBusy: true,
    })
    .then(data => {
      if (data) {
        // 2.4) Update case
        _caseObj
          .update({
            policeId: _policeObj.id,
            statusId: caseStatuses.INPROGRESS,
          })
          .catch(err => {
            throw err;
          });
      }
    })
    .catch(err => {
      throw err;
    });
};

// Expose all the methods
module.exports = {
  getAllPolice,
  getPoliceById,
  createPolice,
  updatePolice,
  deletePolice,
  getFreePolice,
  setPoliceBusyStatus,
  assignPoliceWithCase,
};
