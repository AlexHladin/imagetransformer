const express = require('express');
const fs = require('fs');
const path = require('path');
const multer = require('multer');
const resizeImg = require('resize-img');
const { promisify } = require('util');
const validator = require('validator');

const { isAuthenticated } = require('../auth');
const config = require('../../config');
const User = require('../model/user');
const Image = require('../model/image');
const errors = require('../errors/errors');
const ApiError = require('../errors/ApiError');

const readFile = promisify(fs.readFile);

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../..', config.uploadDir));
  },
  filename: (req, file, cb) => {
    cb(null, `${req.user.id}-${file.originalname}`);
  }
});
const upload = multer({ storage });

router.post('/', isAuthenticated, async (req, res, next) => {
  try {
    const images = await Image.find({
      _id: {
        $in: req.user.images
      }
    });
    res.json(images);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/image/transform:
 *   get:
 *     tags:
 *       - image
 *     description: Transform image
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Transform image
 */
router.post('/transform', isAuthenticated, upload.single('image'), async (req, res, next) => {
  try {
    if (!validator.isInt(req.query.width) || !validator.isInt(req.query.height)) {
      throw new ApiError(errors.INVALID_DATA);
    }

    const transformParam = {
      width: parseInt(req.query.width),
      height: parseInt(req.query.height)
    };

    const originalImage = new Image();
    const transformedImage = new Image();

    const file = await readFile(req.file.path);

    originalImage.img.data = file;
    originalImage.img.contentType = 'image/png';

    transformedImage.img.data = await resizeImg(file, transformParam);
    originalImage.img.contentType = 'image/png';

    const [ originalImageInstance, transformedImageInstance ]= await Promise.all([
        originalImage.save(),
        transformedImage.save()
    ]);

    await User.update({ _id: req.user.id }, {
      $push: {
        images: [ originalImageInstance.id, transformedImageInstance.id ]
      }
    });

    res.json({
      originalImageId: originalImageInstance.id,
      transformedImageId: transformedImageInstance.id
    });
  } catch (err) {
    next(err);
  }
});

module.exports = router;
