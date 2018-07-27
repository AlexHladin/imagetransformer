const express = require('express');

const router = express.Router();

/**
 * @swagger
 * /api/users/{id}:
 *   get:
 *     tags:
 *       - users
 *     description: Deletes a single user
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: user's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Successfully deleted
 */
router.get('/', (req, res) => {
  res.json({ status: 'ok' });
});

module.exports = router;
