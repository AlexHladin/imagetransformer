const express = require('express');
const multer = require('multer');

const { isAuthenticated } = require('../auth');
const action = require('../action/image');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @swagger
 * definition:
 *   image:
 *     properties:
 *       img:
 *         type: Object
 *       width:
 *         type: Number
 *       height:
 *         type: Number
 */

/**
 * @swagger
 * /api/image/:
 *   get:
 *     tags:
 *       - image
 *     description: Get users images
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Users images list
 *       401:
 *         description: Unauthorized
 */
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const images = await action.getUserImages(req.user);
    const mappedImages = images.map(image => ({
      id: image._id,
      width: image.width,
      height: image.height,
      url: `${req.protocol}://${req.get('host')}/api/image/${image._id}`
    }));

    res.json(mappedImages);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/image/transform:
 *   post:
 *     tags:
 *       - image
 *     description: Transform image
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Transform image
 *       401:
 *         description: Unauthorized
 *       406:
 *         description: Invalid image
 */
router.post('/transform', isAuthenticated, upload.single('image'), async function (req, res, next) {
  try {
    const transformedImages = await action.transform(req.file.buffer, req.query, req.user);

    res.json(transformedImages);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/image/transform/:id:
 *   post:
 *     tags:
 *       - image
 *     description: Transform already uploaded image
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Transform already uploaded image
 *       401:
 *         description: Unauthorized
 */
router.post('/transform/:id', isAuthenticated, upload.single('image'), async (req, res, next) => {
  try {
    const image = await action.getImage(req.params);
    const transformedImages = await action.transform(image.img.data, req.query, req.user);

    res.json(transformedImages);
  } catch (err) {
    next(err);
  }
});

/**
 * @swagger
 * /api/image/:id:
 *   get:
 *     tags:
 *       - image
 *     description: Get single image
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Single image
 *       404:
 *          description: Image not exist
 *       405:
 *          description: Invalid id
 */
router.get('/:id', async (req, res, next) => {
  try {
    const image = await action.getImage(req.params);

    res.contentType(image.img.contentType);
    res.send(image.img.data)
  } catch (err) {
    next(err);
  }
});

module.exports = router;
