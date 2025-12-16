const db = require('../db/connection');
class LogService {

  async log(userId, action, target_type, target_id) {
    await db.query(
      'INSERT INTO logs (user_id, action, target_type, target_id) VALUES (?, ?, ?, ?)',
      [userId, action, target_type, target_id]
    );
  }



  async getAll() {
    const [rows] = await db.query(`
      SELECT l.*, u.name 
      FROM logs l JOIN users u ON u.id = l.user_id
      ORDER BY l.created_at DESC
    `);
    return rows;
  }
}
module.exports = LogService;

