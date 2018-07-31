const ExtendError = require('./ExtendError');

module.exports = class ApiError extends ExtendError {
  constructor(customError, extra) {
    super(customError.message);
    Object.assign(this, customError, { extra });
  }

  get response() {
    return {
      message: this.message,
      error: this.error,
      extra: this.extra
    };
  }
};
