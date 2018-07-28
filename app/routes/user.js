const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/users/:
 *   get:
 *     tags:
 *       - users
 *     description: Get a single user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: Get a single user
 */
router.get('/', (req, res) => {
  res.json([]);
});

module.exports = router;
