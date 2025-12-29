import { useState } from 'react';
import { FaFileUpload, FaCheckCircle, FaTimesCircle } from 'react-icons/fa';
import { pagamentosService } from '../services/api';

const ImportSpreadsheet = ({ onImportSuccess }) => {
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setError(null);
      setResult(null);
    }
  };

  const handleImport = async () => {
    if (!file) {
      setError('Por favor, selecione um arquivo');
      return;
    }

    setImporting(true);
    setError(null);
    setResult(null);

    try {
      const response = await pagamentosService.importSpreadsheet(file);
      setResult(response.data);
      setFile(null);
      if (onImportSuccess) {
        onImportSuccess();
      }
    } catch (err) {
      setError(err.response?.data?.error || 'Erro ao importar planilha');
    } finally {
      setImporting(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 mb-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4 flex items-center">
        <FaFileUpload className="mr-2" />
        Importar Planilha
      </h2>
      
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Selecione a planilha (.xlsx, .xls, .csv)
          </label>
          <input
            type="file"
            accept=".xlsx,.xls,.csv"
            onChange={handleFileChange}
            className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none"
          />
        </div>

        {file && (
          <div className="text-sm text-gray-600">
            Arquivo selecionado: <span className="font-medium">{file.name}</span>
          </div>
        )}

        <button
          onClick={handleImport}
          disabled={!file || importing}
          className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {importing ? 'Importando...' : 'Importar'}
        </button>

        {result && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-start">
              <FaCheckCircle className="text-green-500 mt-1 mr-2" />
              <div>
                <p className="font-semibold text-green-800">Importação concluída!</p>
                <p className="text-sm text-green-700">
                  {result.importados} de {result.total} registros importados com sucesso.
                </p>
                {result.erros && result.erros.length > 0 && (
                  <details className="mt-2">
                    <summary className="cursor-pointer text-sm text-red-600">
                      {result.erros.length} erro(s) encontrado(s)
                    </summary>
                    <ul className="mt-2 text-xs text-red-600 space-y-1">
                      {result.erros.map((err, idx) => (
                        <li key={idx}>Linha {err.linha}: {err.erro}</li>
                      ))}
                    </ul>
                  </details>
                )}
              </div>
            </div>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <div className="flex items-start">
              <FaTimesCircle className="text-red-500 mt-1 mr-2" />
              <div>
                <p className="font-semibold text-red-800">Erro na importação</p>
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}
      </div>

      <div className="mt-6 p-4 bg-blue-50 rounded-lg">
        <h3 className="font-semibold text-blue-900 mb-2">Formato da Planilha</h3>
        <p className="text-sm text-blue-800 mb-2">
          A planilha deve conter as seguintes colunas:
        </p>
        <ul className="text-sm text-blue-700 space-y-1">
          <li>• <strong>Associado</strong> (obrigatório)</li>
          <li>• <strong>Franquia</strong> (obrigatório)</li>
          <li>• <strong>Descrição</strong></li>
          <li>• <strong>Valor</strong></li>
          <li>• <strong>Data Vencimento</strong> (obrigatório)</li>
          <li>• <strong>Data Pagamento</strong></li>
          <li>• <strong>Status</strong> (Pendente, Pago, Atrasado, etc.)</li>
        </ul>
      </div>
    </div>
  );
};

export default ImportSpreadsheet;
