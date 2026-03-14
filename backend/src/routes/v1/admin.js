const express = require('express');
const User = require('../../models/User');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');

const router = express.Router();

// All admin routes require authentication and admin role
router.use(authMiddleware, roleMiddleware('admin'));

/**
 * @swagger
 * /v1/admin/users:
 *   get:
 *     summary: Get all users (admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.get('/users', async (req, res) => {
  try {
    const users = await User.getAll();
    res.json({ success: true, users });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/admin/users/{id}/role:
 *   put:
 *     summary: Update user role (admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.put('/users/:id/role', async (req, res) => {
  try {
    const { role } = req.body;
    if (!['user', 'admin'].includes(role)) {
      return res.status(400).json({ success: false, message: 'Invalid role' });
    }

    await User.updateRole(req.params.id, role);
    const user = await User.findById(req.params.id);

    res.json({ success: true, message: 'Role updated', user });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/admin/users/{id}:
 *   delete:
 *     summary: Delete a user (admin only)
 *     tags: [Admin]
 *     security:
 *       - BearerAuth: []
 */
router.delete('/users/:id', async (req, res) => {
  try {
    await User.delete(req.params.id);
    res.json({ success: true, message: 'User deleted' });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
