const path = require('path');
const sharp = require('sharp');
const validator = require('validator');
const _ = require('lodash');

const config = require('../../config');
const User = require('../model/user');
const Image = require('../model/image');
const errors = require('../errors/errors');
const ApiError = require('../errors/ApiError');

const saveImage = (imageSource, width, height) => {
  const image = new Image();
  image.img.data = imageSource;
  image.img.contentType = 'image/png';
  image.width = width;
  image.height = height;

  return image.save();
};

module.exports = {
  getUserImages: user => Image.find({
    _id: {
      $in: user.images
    }
  }, { width: true, height: true, _id: true }),

  transform: async (image, transformParam, user) => {
    if (!validator.isInt(transformParam.width) || !validator.isInt(transformParam.height)) {
      throw new ApiError(errors.INVALID_DATA);
    }

    const width = parseInt(transformParam.width);
    const height = parseInt(transformParam.height);

    const sourceImage = sharp(image.buffer);
    const [ transformedImage, metadata ] = await Promise.all([
      sourceImage
        .resize(width, height)
        .toBuffer(),
      sourceImage.metadata()
    ]);

    const ext = path.extname(image.originalname);
    const [ originalImageInstance, transformedImageInstance ] = await Promise.all([
      saveImage(image.buffer, metadata.width, metadata.height),
      saveImage(transformedImage, width, height)
    ]);

    await User.update({ _id: user.id }, {
      $push: {
        images: [ originalImageInstance.id, transformedImageInstance.id ]
      }
    });

    return {
      originalImageId: originalImageInstance.id,
      transformedImageId: transformedImageInstance.id
    };
  },

  getImage: async (params) => {
    const image = await Image.find({ _id: params.id });

    if (!image.length) {
      throw new ApiError(errors.IMAGE_NOT_EXIST);
    }

    return _.first(image);
  }
};
