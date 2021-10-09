require("dotenv").config();
const jwt = require("jsonwebtoken");
const RefreshToken = require("../models/refresh-token");

class TokenService {
  // argument { ...userDto }
  generateTokens(payload) {
    const accessToken = jwt.sign(payload, process.env.JWT_KEY, {
      expiresIn: "1h",
    });
    const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, {
      expiresIn: "30d",
    });
    return {
      accessToken,
      refreshToken,
    };
  }

  validateAccessToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  validateRefreshToken(token) {
    try {
      const userData = jwt.verify(token, process.env.JWT_REFRESH_KEY);
      return userData;
    } catch (err) {
      return null;
    }
  }

  // ToDo remember that tokens will overwrite and the user can not open application from couple of devices
  async saveRefreshToken(userId, refreshToken) {
    const refreshTokenData = await RefreshToken.findOne({ user: userId });
    if (refreshTokenData) {
      refreshTokenData.refreshToken = refreshToken;
      return await refreshTokenData.save();
    }
    const newRefreshToken = new RefreshToken({
      user: userId,
      refreshToken,
    });
    return await newRefreshToken.save();
  }

  async findToken(refreshToken) {
    const tokenData = await RefreshToken.findOne({ refreshToken });
    return tokenData;
  }

  async removeToken(refreshToken) {
    const tokenData = await RefreshToken.deleteOne({ refreshToken });
    return tokenData;
  }
}

module.exports = new TokenService();
