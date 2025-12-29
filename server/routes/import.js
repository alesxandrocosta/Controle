const express = require('express');
const router = express.Router();
const multer = require('multer');
const xlsx = require('xlsx');
const path = require('path');
const Pagamento = require('../models/Pagamento');

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ 
  storage: storage,
  fileFilter: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase();
    if (ext !== '.xlsx' && ext !== '.xls' && ext !== '.csv') {
      return cb(new Error('Apenas arquivos Excel (.xlsx, .xls) ou CSV são permitidos'));
    }
    cb(null, true);
  }
});

// Import spreadsheet
router.post('/', upload.single('file'), (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'Nenhum arquivo enviado' });
  }

  try {
    const workbook = xlsx.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const worksheet = workbook.Sheets[sheetName];
    const data = xlsx.utils.sheet_to_json(worksheet);

    let importedCount = 0;
    let errors = [];

    // Process each row
    const promises = data.map((row, index) => {
      return new Promise((resolve) => {
        // Map spreadsheet columns to database fields
        // Flexible mapping to handle different column names
        const pagamento = {
          associado: row['Associado'] || row['associado'] || row['ASSOCIADO'] || '',
          franquia: row['Franquia'] || row['franquia'] || row['FRANQUIA'] || '',
          descricao: row['Descrição'] || row['Descricao'] || row['descricao'] || row['DESCRIÇÃO'] || '',
          valor: parseFloat(String(row['Valor'] || row['valor'] || row['VALOR'] || 0).replace(/[^\d.,]/g, '').replace(',', '.')) || 0,
          data_vencimento: row['Data Vencimento'] || row['Data vencimento'] || row['data_vencimento'] || row['DATA VENCIMENTO'] || '',
          data_pagamento: row['Data Pagamento'] || row['Data pagamento'] || row['data_pagamento'] || row['DATA PAGAMENTO'] || null,
          status: row['Status'] || row['status'] || row['STATUS'] || 'Pendente'
        };

        // Validate required fields
        if (!pagamento.associado || !pagamento.franquia || !pagamento.data_vencimento) {
          errors.push({ linha: index + 2, erro: 'Campos obrigatórios faltando (Associado, Franquia, Data Vencimento)' });
          resolve();
          return;
        }

        Pagamento.create(pagamento, (err) => {
          if (err) {
            errors.push({ linha: index + 2, erro: err.message });
          } else {
            importedCount++;
          }
          resolve();
        });
      });
    });

    Promise.all(promises).then(() => {
      res.json({
        message: 'Importação concluída',
        importados: importedCount,
        total: data.length,
        erros: errors
      });
    });

  } catch (error) {
    res.status(500).json({ error: 'Erro ao processar planilha: ' + error.message });
  }
});

module.exports = router;
