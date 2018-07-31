module.exports = Object.freeze({
  INVALID_DATA: {
    responseCode: 400,
    message: 'Data not valid'
  },
  USER_ALREADY_EXIST: {
    responseCode: 400,
    message: 'User already exist'
  },
  USER_NOT_EXIST: {
    responseCode: 400,
    message: 'User not exist'
  },
  IMAGE_NOT_EXIST: {
    responseCode: 404,
    message: 'Image not exist'
  },
  INVALID_IMAGE_SIZE: {
    responseCode: 406,
    message: 'Invalid image'
  },
  INVALID_ID: {
    responseCode: 405,
    message: 'Invalid id'
  },
  NOT_FOUND: {
    responseCode: 404,
    message: 'Not found'
  },
  INTERNAL_SERVER_ERROR: {
    responseCode: 500,
    message: 'Internal server error'
  }
});
