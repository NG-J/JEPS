const db = require('../db/connection');

class EvidenceRepository {
async getAll() {
  const [rows] = await db.query('SELECT * FROM evidence');
  return rows;
}


  async getAllByCase(caseId) {
    const [rows] = await db.query(
      `SELECT e.*, u.name AS uploader 
       FROM evidence e 
       LEFT JOIN users u ON e.uploader_id = u.id 
       WHERE case_id = ?`, [caseId]
    );
    return rows;
  }

  async create(data) {
    const [result] = await db.query(
      'INSERT INTO evidence (case_id, uploader_id, type, file_path, status) VALUES (?, ?, ?, ?, ?)',
      [data.case_id, data.uploader_id, data.type, data.file_path, data.status || 'Collected']
    );
    return { id: result.insertId, ...data };
  }

  async delete(id) {
    await db.query('DELETE FROM evidence WHERE id = ?', [id]);
  }
}

module.exports = EvidenceRepository;

