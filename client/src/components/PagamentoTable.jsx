import { useState } from 'react';
import { FaEdit, FaTrash, FaSave, FaTimes } from 'react-icons/fa';

const PagamentoTable = ({ pagamentos, onUpdate, onDelete }) => {
  const [editingId, setEditingId] = useState(null);
  const [editData, setEditData] = useState({});

  const startEdit = (pagamento) => {
    setEditingId(pagamento.id);
    setEditData({ ...pagamento });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditData({});
  };

  const saveEdit = async () => {
    await onUpdate(editingId, editData);
    setEditingId(null);
    setEditData({});
  };

  const handleEditChange = (field, value) => {
    setEditData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('pt-BR');
    } catch {
      return dateString;
    }
  };

  const getStatusColor = (status) => {
    const colors = {
      'Pendente': 'bg-yellow-100 text-yellow-800',
      'Pago': 'bg-green-100 text-green-800',
      'Atrasado': 'bg-red-100 text-red-800',
      'Cancelado': 'bg-gray-100 text-gray-800'
    };
    return colors[status] || 'bg-blue-100 text-blue-800';
  };

  if (!pagamentos || pagamentos.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow-md p-8 text-center text-gray-500">
        Nenhum registro encontrado. Importe uma planilha ou adicione manualmente.
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Associado</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Franquia</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Descrição</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Vencimento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Pagamento</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {pagamentos.map((pagamento) => (
              <tr key={pagamento.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {pagamento.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="text"
                      value={editData.associado}
                      onChange={(e) => handleEditChange('associado', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    pagamento.associado
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="text"
                      value={editData.franquia}
                      onChange={(e) => handleEditChange('franquia', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    pagamento.franquia
                  )}
                </td>
                <td className="px-6 py-4 text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="text"
                      value={editData.descricao}
                      onChange={(e) => handleEditChange('descricao', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    pagamento.descricao || '-'
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="number"
                      step="0.01"
                      value={editData.valor}
                      onChange={(e) => handleEditChange('valor', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    formatCurrency(pagamento.valor)
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="date"
                      value={editData.data_vencimento}
                      onChange={(e) => handleEditChange('data_vencimento', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    formatDate(pagamento.data_vencimento)
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                  {editingId === pagamento.id ? (
                    <input
                      type="date"
                      value={editData.data_pagamento || ''}
                      onChange={(e) => handleEditChange('data_pagamento', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    />
                  ) : (
                    formatDate(pagamento.data_pagamento)
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {editingId === pagamento.id ? (
                    <select
                      value={editData.status}
                      onChange={(e) => handleEditChange('status', e.target.value)}
                      className="border rounded px-2 py-1 w-full"
                    >
                      <option value="Pendente">Pendente</option>
                      <option value="Pago">Pago</option>
                      <option value="Atrasado">Atrasado</option>
                      <option value="Cancelado">Cancelado</option>
                    </select>
                  ) : (
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(pagamento.status)}`}>
                      {pagamento.status}
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  {editingId === pagamento.id ? (
                    <div className="flex space-x-2">
                      <button
                        onClick={saveEdit}
                        className="text-green-600 hover:text-green-900"
                        title="Salvar"
                      >
                        <FaSave />
                      </button>
                      <button
                        onClick={cancelEdit}
                        className="text-gray-600 hover:text-gray-900"
                        title="Cancelar"
                      >
                        <FaTimes />
                      </button>
                    </div>
                  ) : (
                    <div className="flex space-x-2">
                      <button
                        onClick={() => startEdit(pagamento)}
                        className="text-blue-600 hover:text-blue-900"
                        title="Editar"
                      >
                        <FaEdit />
                      </button>
                      <button
                        onClick={() => onDelete(pagamento.id)}
                        className="text-red-600 hover:text-red-900"
                        title="Excluir"
                      >
                        <FaTrash />
                      </button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default PagamentoTable;
