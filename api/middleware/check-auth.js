require("dotenv").config();
const jwt = require("jsonwebtoken");
const ApiError = require("../exceptions/api-error");
const tokenService = require("../service/token-service");

module.exports = (req, res, next) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      return next(ApiError.UnauthorizedError());
    }

    const accessToken = authorizationHeader.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.UnauthorizedError());
    }

    const userData = tokenService.validateAccessToken(accessToken);
    if (!userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.userData = userData;
    next();
  } catch (err) {
    return next(ApiError.UnauthorizedError());
  }
};
