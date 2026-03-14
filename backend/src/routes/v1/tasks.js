const express = require('express');
const Task = require('../../models/Task');
const { validateTask } = require('../../middleware/validation');
const { authMiddleware, roleMiddleware } = require('../../middleware/auth');

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

/**
 * @swagger
 * /v1/tasks:
 *   get:
 *     summary: Get all tasks (admin) or user's tasks
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: List of tasks
 */
router.get('/', async (req, res) => {
  try {
    let tasks;
    if (req.user.role === 'admin') {
      tasks = await Task.getAll();
    } else {
      tasks = await Task.findByUserId(req.user.id);
    }
    res.json({ success: true, tasks });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/tasks/{id}:
 *   get:
 *     summary: Get a specific task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.get('/:id', async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) {
      return res.status(404).json({ success: false, message: 'Task not found' });
    }

    // Users can only see their own tasks, admins see all
    if (task.user_id !== req.user.id && req.user.role !== 'admin') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }

    res.json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/tasks:
 *   post:
 *     summary: Create a new task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [title]
 *             properties:
 *               title: { type: string }
 *               description: { type: string }
 *               status: { type: string, enum: [pending, in-progress, completed] }
 *               priority: { type: string, enum: [low, medium, high] }
 */
router.post('/', async (req, res) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const task = await Task.create(
      req.user.id,
      value.title,
      value.description,
      value.status,
      value.priority
    );

    res.status(201).json({ success: true, task });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/tasks/{id}:
 *   put:
 *     summary: Update a task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.put('/:id', async (req, res) => {
  try {
    const { error, value } = validateTask(req.body);
    if (error) {
      return res.status(400).json({ success: false, message: error.details[0].message });
    }

    const task = await Task.update(
      req.params.id,
      req.user.id,
      value.title,
      value.description,
      value.status,
      value.priority
    );

    res.json({ success: true, task });
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

/**
 * @swagger
 * /v1/tasks/{id}:
 *   delete:
 *     summary: Delete a task
 *     tags: [Tasks]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema: { type: integer }
 */
router.delete('/:id', async (req, res) => {
  try {
    if (req.user.role === 'admin') {
      await Task.deleteByAdmin(req.params.id);
    } else {
      await Task.delete(req.params.id, req.user.id);
    }

    res.json({ success: true, message: 'Task deleted successfully' });
  } catch (err) {
    if (err.message === 'Unauthorized') {
      return res.status(403).json({ success: false, message: 'Access denied' });
    }
    res.status(500).json({ success: false, message: err.message });
  }
});

module.exports = router;
