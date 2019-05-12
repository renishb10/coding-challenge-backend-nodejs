const Status = require('../../models/Status');
const _ = require('lodash');
const { errorTypes } = require('../../helpers/contants');
const { throwError } = require('../../helpers/errorHandler');

const createNewStatus = async _statusObj => {
  return Status.create(_statusObj)
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

const getStatuses = async () => {
  return Status.findAll()
    .then(data => {
      return data;
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

const deleteStatus = async _statusId => {
  return Status.findOne({ where: { id: _statusId } })
    .then(data => {
      if (_.isEmpty(data)) throw error;

      Status.destroy({ where: { id: data.id } })
        .then(data => {
          return data;
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

const updateStatus = async (_statusId, _newStatusObj) => {
  return Status.findOne({ where: { id: _statusId } })
    .then(data => {
      if (_.isEmpty(data)) throw error;

      data
        .update({
          name: _newStatusObj.name,
        })
        .then(data => {
          return data;
        })
        .catch(error => {
          throw error;
        });
    })
    .catch(error => {
      throwError(error, errorTypes.DB_VALIDATION);
    });
};

module.exports = {
  createNewStatus,
  getStatuses,
  deleteStatus,
  updateStatus,
};
