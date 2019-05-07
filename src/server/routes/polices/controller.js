const Police = require('../../models/Police');
const _ = require('lodash');

const getAllPolice = async () => {
  return Police.findAll()
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

const getPoliceByStatus = async (_isBusy = false) => {
  return Police.find({
      where: {
        isBusy: _isBusy
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

const getPoliceById = async (_policeId) => {
  return Police.find({
      where: {
        policeId: _policeId
      }
    })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

const createPolice = async (_policeObj) => {
  return Police.create(_policeObj)
    .then((data) => {
      if (data) {
          // TODO: Assign him with a Case
      }
      return data;
    })
    .catch((error) => {
      throw error;
    });
};

module.exports = {
  getAllPolice,
  getPoliceById,
  createPolice,
  getPoliceByStatus,
};