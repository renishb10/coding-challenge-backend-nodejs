const Case = require('../../models/Case');
const Owner = require('../../models/Owner');

const getAllCases = async () => {
  return Case.findAll({ include: [Owner]})
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const getAllCaseById = async (_caseId) => {
  return Case.findAll({
    where: {
      id: _caseId,
    },
    include: [Owner],
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const getUnassigned = async (_caseId) => {
  return Case.findAll({
    where: {
      id: _caseId,
    },
    include: [Owner],
  })
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

const createCase = async (_caseObj) => {
  return Case.create(_caseObj)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

// This can be moved if owner module is created in future.
const createOwner = async (_ownerObj) => {
  return Owner.create(_ownerObj)
    .then((data) => {
      return data;
    })
    .catch((error) => {
      console.log(error.message);
      throw error;
    });
};

module.exports = {
  getAllCases,
  getAllCaseById,
  createCase,
  createOwner,
};
