/**
 *  App-wise constants can be defined here
 *  Important note: There are sensitive data, just constants should be defined here
 *  Exposure of this file should never cause impact to product or service
 */

module.exports = {
  caseStatuses: {
    OPEN: 1,
    INPROGRESS: 2,
    RESOLVED: 3,
  },
  errorTypes: {
    // As of now I've added required error types
    BAD_REQUEST: 400,
    DB_VALIDATION: 422,
    SERVER_ERROR: 500,
  },
};
