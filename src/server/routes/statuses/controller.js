const Status = require('../../models/Status');
const _ = require('lodash');

const createNewStatus = async (_statusObj) => {
  return Status.create(_statusObj)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const getStatuses = async () => {
  return Status.findAll()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const deleteStatus = async (_statusId) => {
  return Status.findOne({ where: { id: _statusId } })
    .then((data) => {
      if (_.isEmpty(data))
        throw error;
      
      Status.destroy({ where: { id: data.id } })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        })
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const updateStatus = async (_statusId, _newStatusObj) => {
  return Status.findOne({ where: { id: _statusId } })
    .then((data) => {
      if (_.isEmpty(data))
        throw error;
    
      data.update({
          name: _newStatusObj.name
      })
        .then((data) => {
            return data;
        })
        .catch((error) => {
            throw error;
        })
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

module.exports = {
  createNewStatus,
  getStatuses,
  deleteStatus,
  updateStatus,
};