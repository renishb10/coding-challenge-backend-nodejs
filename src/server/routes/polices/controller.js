const Police = require('../../models/Police');
const _ = require('lodash');

const getAllPolice = async () => {
  return Police.findAll()
    .then(data => {
      return data;
    })
    .catch(error => {
      throw error;
    });
};

const getFreePolice = async (_isBusy = false) => {
  console.log(333333333333333333);
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
      throw error;
    });
};

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
            throw error;
          });
      })
      .catch(error => {
        throw error;
      });
  } else
    throw new Error(
      'Err - setPoliceBusyStatus(_policeObj, _isBusy) requires two params',
    );
};

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
      throw error;
    });
};

const createPolice = async _policeObj => {
  return Police.create(_policeObj)
    .then(data => {
      if (data) {
        // TODO: Assign him with a Case
      }
      return data;
    })
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getAllPolice,
  getPoliceById,
  createPolice,
  getFreePolice,
  setPoliceBusyStatus,
};
