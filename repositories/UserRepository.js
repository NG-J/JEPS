const db = require('../db/connection');

class UserRepository {
  async getAll() {
    const [rows] = await db.query(
      `SELECT u.id, u.name, u.email, r.name AS role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id`
    );
    return rows;
  }

  async getByEmail(email) {
    const [rows] = await db.query(
      `SELECT u.id, u.name, u.email, u.password, r.name AS role
       FROM users u
       LEFT JOIN roles r ON u.role_id = r.id
       WHERE u.email = ?`,
      [email]
    );
    return rows[0]; // return single user or undefined
  }

  async create(user) {
    // Get role_id from roles table
    const [roleRow] = await db.query('SELECT id FROM roles WHERE name = ?', [user.role]);
    if (!roleRow.length) throw new Error('Role not found');

    const role_id = roleRow[0].id;

    const [result] = await db.query(
      'INSERT INTO users (name, email, password, role_id) VALUES (?, ?, ?, ?)',
      [user.name, user.email, user.password, role_id]
    );

    return { id: result.insertId, name: user.name, email: user.email, role: user.role };
  }

  async delete(id) {
    await db.query('DELETE FROM users WHERE id = ?', [id]);
  }
}

module.exports = UserRepository;



