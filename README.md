# Sistema de Controle de Pagamentos - Franquia

Sistema profissional para gerenciamento de pagamentos de associados de franquia com importação de planilhas Excel/CSV.

## 🚀 Funcionalidades

- ✅ **Banco de Dados SQLite** com tabela de pagamentos contendo todos os campos solicitados
- ✅ **Importação de Planilhas** (.xlsx, .xls, .csv) com validação automática
- ✅ **Dashboard Profissional** com interface moderna e responsiva
- ✅ **Gerenciamento Completo** (CRUD) de pagamentos
- ✅ **Filtros e Busca** por associado, franquia e status
- ✅ **Edição Inline** de registros diretamente na tabela
- ✅ **Adição Manual** de novos pagamentos
- ✅ **Tratamento de Status** (Pendente, Pago, Atrasado, Cancelado)
- ✅ **Formatação Automática** de valores monetários e datas

## 📋 Campos do Sistema

O sistema gerencia os seguintes campos:

- **ID**: Identificador único (auto-incremento)
- **Associado**: Nome do associado
- **Franquia**: Nome da franquia
- **Descrição**: Descrição do pagamento
- **Valor**: Valor monetário
- **Data Vencimento**: Data de vencimento do pagamento
- **Data Pagamento**: Data em que foi realizado o pagamento
- **Status**: Status do pagamento (Pendente, Pago, Atrasado, Cancelado)
- **Ações**: Editar e Excluir

## 🛠️ Tecnologias Utilizadas

### Backend
- Node.js + Express
- SQLite3 (banco de dados)
- Multer (upload de arquivos)
- XLSX (processamento de planilhas)
- CORS (permitir requisições cross-origin)

### Frontend
- React 18
- Vite (build tool)
- Axios (requisições HTTP)
- React Icons (ícones)
- TailwindCSS-style (estilização)

## 📦 Instalação

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Passos

1. Clone o repositório:
```bash
git clone <url-do-repositorio>
cd Controle
```

2. Instale as dependências do backend:
```bash
npm install
```

3. Instale as dependências do frontend:
```bash
cd client
npm install
cd ..
```

## 🚀 Como Executar

### Desenvolvimento

1. **Iniciar o Backend** (em um terminal):
```bash
npm run dev
```
O servidor estará rodando em `http://localhost:3001`

2. **Iniciar o Frontend** (em outro terminal):
```bash
npm run client
```
O frontend estará rodando em `http://localhost:5173`

### Produção

1. Build do frontend:
```bash
npm run build
```

2. Iniciar o servidor em modo produção:
```bash
NODE_ENV=production npm start
```

O sistema completo estará disponível em `http://localhost:3001`

## 📊 Formato da Planilha para Importação

A planilha deve conter as seguintes colunas (a ordem não importa):

| Coluna | Obrigatório | Exemplo |
|--------|-------------|---------|
| Associado | Sim | "João Silva" |
| Franquia | Sim | "Franquia SP Centro" |
| Descrição | Não | "Mensalidade Dezembro 2024" |
| Valor | Sim | 1500.00 ou "R$ 1.500,00" |
| Data Vencimento | Sim | "2024-12-31" ou "31/12/2024" |
| Data Pagamento | Não | "2024-12-30" ou "30/12/2024" |
| Status | Não | "Pendente", "Pago", "Atrasado", etc. |

**Notas:**
- O sistema aceita nomes de colunas em maiúsculas, minúsculas ou misto
- Valores monetários podem ter formatação brasileira (R$, pontos, vírgulas)
- Se o Status não for fornecido, será definido como "Pendente"

## 🎨 Interface do Sistema

O sistema possui:

1. **Header**: Cabeçalho profissional com nome do sistema
2. **Importação**: Área para upload de planilhas com feedback detalhado
3. **Adição Manual**: Botão para adicionar pagamentos manualmente via formulário
4. **Filtros**: Barra de filtros para buscar por associado, franquia e status
5. **Tabela**: Visualização completa dos dados com ações de editar e excluir
6. **Edição Inline**: Clique em "Editar" para modificar diretamente na tabela
7. **Footer**: Rodapé profissional

## 🔧 Estrutura do Projeto

```
Controle/
├── server/                 # Backend
│   ├── database.js        # Configuração do SQLite
│   ├── index.js           # Servidor Express
│   ├── models/            # Models do banco de dados
│   │   └── Pagamento.js
│   ├── routes/            # Rotas da API
│   │   ├── pagamentos.js
│   │   └── import.js
│   └── uploads/           # Arquivos uploaded
├── client/                # Frontend React
│   ├── src/
│   │   ├── components/    # Componentes React
│   │   │   ├── ImportSpreadsheet.jsx
│   │   │   ├── PagamentoTable.jsx
│   │   │   ├── FilterBar.jsx
│   │   │   └── AddPagamento.jsx
│   │   ├── services/      # Serviços de API
│   │   │   └── api.js
│   │   ├── App.jsx        # Componente principal
│   │   └── main.jsx       # Entry point
│   └── package.json
├── package.json           # Dependências do backend
└── README.md             # Este arquivo
```

## 🌐 API Endpoints

### Pagamentos

- `GET /api/pagamentos` - Listar todos os pagamentos
- `GET /api/pagamentos/:id` - Buscar pagamento por ID
- `POST /api/pagamentos` - Criar novo pagamento
- `PUT /api/pagamentos/:id` - Atualizar pagamento
- `DELETE /api/pagamentos/:id` - Excluir pagamento
- `GET /api/pagamentos/search/filter` - Buscar com filtros

### Importação

- `POST /api/import` - Importar planilha (multipart/form-data)

### Health Check

- `GET /api/health` - Verificar status da API

## 💡 Uso do Sistema

### Importar Planilha

1. Clique em "Selecione a planilha"
2. Escolha um arquivo .xlsx, .xls ou .csv
3. Clique em "Importar"
4. Aguarde o processamento
5. Verifique o resultado (quantos foram importados, erros, etc.)

### Adicionar Manualmente

1. Clique em "Adicionar Novo Pagamento"
2. Preencha o formulário
3. Clique em "Salvar"

### Editar Pagamento

1. Clique no ícone de lápis na linha desejada
2. Edite os campos diretamente na tabela
3. Clique no ícone de salvar (✓) ou cancelar (✗)

### Filtrar Dados

1. Use os campos de filtro no topo da tabela
2. Digite o nome do associado, franquia ou selecione o status
3. Os resultados são atualizados automaticamente
4. Clique em "Limpar Filtros" para remover todos os filtros

## 🔒 Segurança

- Validação de tipo de arquivo no upload
- Sanitização de dados na importação
- Validação de campos obrigatórios
- Tratamento de erros completo

## 📝 Licença

ISC

## 👥 Suporte

Para dúvidas ou problemas, abra uma issue no repositório.
