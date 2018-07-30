const express = require('express');
const multer = require('multer');

const { isAuthenticated } = require('../auth');
const action = require('../action/image');

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post('/', isAuthenticated, async (req, res, next) => {
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
    const transformedImages = await action.transform(req.file, req.query, req.user);

    res.json(transformedImages);
  } catch (err) {
    next(err);
  }
});

module.exports = router;
