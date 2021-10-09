module.exports = class UserDto {
  email;
  userId;
  isActivated;
  constructor(model) {
    this.email = model.email;
    this.userId = model._id;
    this.isActivated = model.isActivated;
  }
};
