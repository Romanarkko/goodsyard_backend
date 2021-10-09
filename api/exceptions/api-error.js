module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static UnauthorizedError() {
    console.log("UnauthorizedError");
    return new ApiError(401, "Unauthorized user");
  }

  static BadRequest(message, errors = []) {
    console.log("BadRequest", errors);
    return new ApiError(400, message, errors);
  }
};
