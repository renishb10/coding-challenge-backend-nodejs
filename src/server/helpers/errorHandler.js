// Custom error wrapper (just to map error code, so that middleware can throw accordingly)
const throwError = (_errorObj, _errorType) => {
  // If needed can reframe the object and pass it as a user friendly message
  _errorObj.status = _errorType;
  throw _errorObj;
};

module.exports = {
  throwError,
};
