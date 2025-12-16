const db = require('../db/connection');

class CaseRepository {
  async getAll() {
    const [rows] = await db.query(`SELECT c.*, u.name AS created_by FROM cases c LEFT JOIN users u ON c.created_by=u.id`);
    return rows;
  }

  async getById(id) {
    const [rows] = await db.query(
      `SELECT c.*, u.name AS created_by
       FROM cases c
       LEFT JOIN users u ON c.created_by = u.id
       WHERE c.id = ?`,
      [id]
    );
    return rows[0];
  }

  async add(data) {
    const [res] = await db.query('INSERT INTO cases SET ?', data);
    return { id: res.insertId, ...data };
  }

  async deleteEvidenceByCaseId(caseId) {
    await db.query('DELETE FROM evidence WHERE case_id=?', [caseId]);
  }

  async delete(id) {
    await db.query('DELETE FROM cases WHERE id=?', [id]);
  }
}

module.exports = CaseRepository;



