const express = require('express');
const multer = require('multer');

const { isAuthenticated } = require('../auth');
const action = require('../action/image');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

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
 */
router.get('/', isAuthenticated, async (req, res, next) => {
  try {
    const images = await action.getUserImages(req.user);
    
    res.json(images);
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
 */
router.post('/transform', isAuthenticated, upload.single('image'), async (req, res, next) => {
  try {
    const transformedImages = await action.transform(req.file, req.query, req.user);

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
