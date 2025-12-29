const db = require('../database');

class Pagamento {
  static getAll(callback) {
    db.all('SELECT * FROM pagamentos ORDER BY data_vencimento DESC', [], callback);
  }

  static getById(id, callback) {
    db.get('SELECT * FROM pagamentos WHERE id = ?', [id], callback);
  }

  static create(data, callback) {
    const { associado, franquia, descricao, valor, data_vencimento, data_pagamento, status } = data;
    const sql = `
      INSERT INTO pagamentos (associado, franquia, descricao, valor, data_vencimento, data_pagamento, status)
      VALUES (?, ?, ?, ?, ?, ?, ?)
    `;
    db.run(sql, [associado, franquia, descricao, valor, data_vencimento, data_pagamento, status || 'Pendente'], function(err) {
      callback(err, this ? this.lastID : null);
    });
  }

  static update(id, data, callback) {
    const { associado, franquia, descricao, valor, data_vencimento, data_pagamento, status } = data;
    const sql = `
      UPDATE pagamentos 
      SET associado = ?, franquia = ?, descricao = ?, valor = ?, 
          data_vencimento = ?, data_pagamento = ?, status = ?,
          updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    db.run(sql, [associado, franquia, descricao, valor, data_vencimento, data_pagamento, status, id], function(err) {
      callback(err, this ? this.changes : null);
    });
  }

  static delete(id, callback) {
    db.run('DELETE FROM pagamentos WHERE id = ?', [id], function(err) {
      callback(err, this ? this.changes : null);
    });
  }

  static search(filters, callback) {
    let sql = 'SELECT * FROM pagamentos WHERE 1=1';
    const params = [];

    if (filters.associado) {
      sql += ' AND associado LIKE ?';
      params.push(`%${filters.associado}%`);
    }

    if (filters.franquia) {
      sql += ' AND franquia LIKE ?';
      params.push(`%${filters.franquia}%`);
    }

    if (filters.status) {
      sql += ' AND status = ?';
      params.push(filters.status);
    }

    sql += ' ORDER BY data_vencimento DESC';
    db.all(sql, params, callback);
  }
}

module.exports = Pagamento;
