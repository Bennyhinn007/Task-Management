const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { db_run, db_get, db_all } = require('../config/database');

class User {
  static async create(name, email, password) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const result = await db_run(
      'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
      [name, email, hashedPassword, 'user']
    );
    return result;
  }

  static async findByEmail(email) {
    return db_get('SELECT * FROM users WHERE email = ?', [email]);
  }

  static async findById(id) {
    return db_get('SELECT id, name, email, role, created_at FROM users WHERE id = ?', [id]);
  }

  static async getAll() {
    return db_all('SELECT id, name, email, role, created_at FROM users');
  }

  static async verifyPassword(password, hashedPassword) {
    return bcrypt.compare(password, hashedPassword);
  }

  static generateToken(user) {
    return jwt.sign(
      { id: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE || '24h' }
    );
  }

  static async updateRole(userId, role) {
    await db_run(
      'UPDATE users SET role = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [role, userId]
    );
  }

  static async delete(userId) {
    await db_run('DELETE FROM users WHERE id = ?', [userId]);
  }
}

module.exports = User;
