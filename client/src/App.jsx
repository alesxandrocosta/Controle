import { useState, useEffect } from 'react';
import { FaMoneyBillWave } from 'react-icons/fa';
import ImportSpreadsheet from './components/ImportSpreadsheet';
import PagamentoTable from './components/PagamentoTable';
import FilterBar from './components/FilterBar';
import AddPagamento from './components/AddPagamento';
import { pagamentosService } from './services/api';
import './App.css';

function App() {
  const [pagamentos, setPagamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({});

  const loadPagamentos = async () => {
    setLoading(true);
    setError(null);
    try {
      const hasFilters = Object.values(filters).some(f => f);
      const response = hasFilters 
        ? await pagamentosService.search(filters)
        : await pagamentosService.getAll();
      setPagamentos(response.data);
    } catch (err) {
      setError('Erro ao carregar pagamentos: ' + (err.response?.data?.error || err.message));
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadPagamentos();
  }, [filters]);

  const handleUpdate = async (id, data) => {
    try {
      await pagamentosService.update(id, data);
      loadPagamentos();
    } catch (err) {
      alert('Erro ao atualizar pagamento: ' + (err.response?.data?.error || err.message));
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm('Tem certeza que deseja excluir este pagamento?')) {
      try {
        await pagamentosService.delete(id);
        loadPagamentos();
      } catch (err) {
        alert('Erro ao excluir pagamento: ' + (err.response?.data?.error || err.message));
      }
    }
  };

  const handleFilter = (newFilters) => {
    setFilters(newFilters);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-blue-600 text-white shadow-lg">
        <div className="container mx-auto px-4 py-6">
          <h1 className="text-3xl font-bold flex items-center">
            <FaMoneyBillWave className="mr-3" />
            Sistema de Controle de Pagamentos - Franquia
          </h1>
          <p className="mt-2 text-blue-100">
            Gerenciamento profissional de associados e pagamentos
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <ImportSpreadsheet onImportSuccess={loadPagamentos} />
        
        <div className="mb-6">
          <AddPagamento onAdd={loadPagamentos} />
        </div>

        <FilterBar onFilter={handleFilter} />

        {loading && (
          <div className="text-center py-8">
            <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
            <p className="mt-4 text-gray-600">Carregando...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-6 py-4 rounded-lg mb-6">
            {error}
          </div>
        )}

        {!loading && !error && (
          <>
            <div className="mb-4 text-gray-700">
              <strong>{pagamentos.length}</strong> registro(s) encontrado(s)
            </div>
            <PagamentoTable 
              pagamentos={pagamentos}
              onUpdate={handleUpdate}
              onDelete={handleDelete}
            />
          </>
        )}
      </main>

      <footer className="bg-gray-800 text-white mt-12">
        <div className="container mx-auto px-4 py-6 text-center">
          <p>&copy; 2024 Sistema de Controle de Pagamentos. Todos os direitos reservados.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
