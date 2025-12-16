const db = require('../db/connection');

class LogRepository {
  async log(userId, action, entity, entityId) {
    await db.query('INSERT INTO logs (user_id, action, entity, entity_id) VALUES (?,?,?,?)', 
      [userId, action, entity, entityId]);
  }

  async getAll() {
    const [rows] = await db.query(`SELECT logs.*, users.name FROM logs JOIN users ON users.id=logs.user_id ORDER BY logs.created_at DESC`);
    return rows;
  }
}

module.exports = LogRepository;


