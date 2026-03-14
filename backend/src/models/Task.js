const { db_run, db_get, db_all } = require('../config/database');

class Task {
  static async create(userId, title, description, status = 'pending', priority = 'medium') {
    const result = await db_run(
      'INSERT INTO tasks (user_id, title, description, status, priority) VALUES (?, ?, ?, ?, ?)',
      [userId, title, description, status, priority]
    );
    return this.findById(result.id);
  }

  static async findById(id) {
    return db_get('SELECT * FROM tasks WHERE id = ?', [id]);
  }

  static async findByUserId(userId) {
    return db_all('SELECT * FROM tasks WHERE user_id = ? ORDER BY created_at DESC', [userId]);
  }

  static async getAll() {
    return db_all('SELECT * FROM tasks ORDER BY created_at DESC');
  }

  static async update(taskId, userId, title, description, status, priority) {
    // Verify ownership
    const task = await db_get('SELECT user_id FROM tasks WHERE id = ?', [taskId]);
    if (!task || task.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    await db_run(
      'UPDATE tasks SET title = ?, description = ?, status = ?, priority = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [title, description, status, priority, taskId]
    );
    return this.findById(taskId);
  }

  static async delete(taskId, userId) {
    // Verify ownership
    const task = await db_get('SELECT user_id FROM tasks WHERE id = ?', [taskId]);
    if (!task || task.user_id !== userId) {
      throw new Error('Unauthorized');
    }

    await db_run('DELETE FROM tasks WHERE id = ?', [taskId]);
  }

  static async deleteByAdmin(taskId) {
    await db_run('DELETE FROM tasks WHERE id = ?', [taskId]);
  }
}

module.exports = Task;
