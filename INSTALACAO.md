# Guia de Instalação e Uso

## 📋 Requisitos do Sistema

- **Node.js** versão 16 ou superior
- **npm** ou **yarn**
- Navegador web moderno (Chrome, Firefox, Safari, Edge)

## 🔧 Instalação Passo a Passo

### 1. Clone o Repositório

```bash
git clone https://github.com/alesxandrocosta/Controle.git
cd Controle
```

### 2. Instale as Dependências do Backend

```bash
npm install
```

### 3. Instale as Dependências do Frontend

```bash
cd client
npm install
cd ..
```

## 🚀 Executando o Sistema

### Opção 1: Desenvolvimento (Recomendado para testes)

**Terminal 1 - Backend:**
```bash
npm run dev
```
Aguarde a mensagem: `Servidor rodando na porta 3001`

**Terminal 2 - Frontend:**
```bash
npm run client
```
Aguarde a mensagem com o endereço local (geralmente `http://localhost:5173`)

Acesse o sistema no navegador: **http://localhost:5173**

### Opção 2: Produção

```bash
# 1. Build do frontend
npm run build

# 2. Inicie o servidor em modo produção
NODE_ENV=production npm start
```

Acesse: **http://localhost:3001**

## 📊 Usando o Sistema

### Importar Planilha

1. Na seção "Importar Planilha", clique em **"Selecione a planilha"**
2. Escolha um arquivo .xlsx, .xls ou .csv
3. Clique em **"Importar"**
4. Aguarde o processamento
5. Veja o resultado com número de registros importados e erros (se houver)

### Adicionar Pagamento Manualmente

1. Clique no botão **"Adicionar Novo Pagamento"**
2. Preencha o formulário:
   - Associado * (obrigatório)
   - Franquia * (obrigatório)
   - Descrição
   - Valor *
   - Data Vencimento * (obrigatório)
   - Data Pagamento
   - Status (Pendente, Pago, Atrasado, Cancelado)
3. Clique em **"Salvar"**

### Filtrar Pagamentos

Use a seção **"Filtros"** para buscar:
- **Por Associado**: Digite o nome para buscar
- **Por Franquia**: Digite o nome da franquia
- **Por Status**: Selecione no dropdown (Todos, Pendente, Pago, Atrasado, Cancelado)

Clique em **"Limpar Filtros"** para remover todos os filtros.

### Editar Pagamento

1. Localize o pagamento na tabela
2. Clique no ícone de **lápis (Editar)**
3. Os campos se tornarão editáveis na própria linha
4. Faça as alterações necessárias
5. Clique no ícone de **✓ (Salvar)** ou **✗ (Cancelar)**

### Excluir Pagamento

1. Localize o pagamento na tabela
2. Clique no ícone de **lixeira (Excluir)**
3. Confirme a exclusão na janela de diálogo

## 🗂️ Formato da Planilha

### Colunas Obrigatórias

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **Associado** | Nome do associado | "João Silva" |
| **Franquia** | Nome da franquia | "Franquia SP Centro" |
| **Data Vencimento** | Data de vencimento | "2024-12-31" ou "31/12/2024" |

### Colunas Opcionais

| Coluna | Descrição | Exemplo |
|--------|-----------|---------|
| **Descrição** | Descrição do pagamento | "Mensalidade Dezembro 2024" |
| **Valor** | Valor monetário | 1500.00 ou "R$ 1.500,00" |
| **Data Pagamento** | Data do pagamento | "2024-12-30" ou "30/12/2024" |
| **Status** | Status do pagamento | "Pendente", "Pago", "Atrasado", "Cancelado" |

### Exemplo de Planilha Excel

```
| Associado       | Franquia            | Descrição                  | Valor    | Data Vencimento | Data Pagamento | Status    |
|-----------------|---------------------|----------------------------|----------|-----------------|----------------|-----------|
| João Silva      | Franquia SP Centro  | Mensalidade Dezembro 2024  | 1500.00  | 2024-12-31      | 2024-12-30     | Pago      |
| Maria Santos    | Franquia RJ Norte   | Taxa de Adesão             | 2000.00  | 2024-12-15      |                | Pendente  |
| Pedro Oliveira  | Franquia SP Centro  | Mensalidade Janeiro 2025   | 1500.00  | 2025-01-31      |                | Pendente  |
| Ana Costa       | Franquia MG Sul     | Mensalidade Atrasada       | 1500.00  | 2024-11-30      |                | Atrasado  |
```

### Formatos Aceitos

**Valores Monetários:**
- `1500`
- `1500.00`
- `1.500,00` (formato brasileiro)
- `R$ 1.500,00`

**Datas:**
- `2024-12-31` (YYYY-MM-DD) - **Recomendado**
- `31/12/2024` (DD/MM/YYYY)
- Formato de data do Excel

**Status:**
- `Pendente` - Pagamento não realizado (padrão)
- `Pago` - Pagamento realizado
- `Atrasado` - Pagamento vencido
- `Cancelado` - Pagamento cancelado

## 🔍 Endpoints da API

Se você quiser integrar com outros sistemas, a API REST está disponível em `http://localhost:3001/api`:

### Pagamentos

- `GET /api/pagamentos` - Listar todos
- `GET /api/pagamentos/:id` - Buscar por ID
- `POST /api/pagamentos` - Criar novo
- `PUT /api/pagamentos/:id` - Atualizar
- `DELETE /api/pagamentos/:id` - Excluir
- `GET /api/pagamentos/search/filter?associado=X&franquia=Y&status=Z` - Buscar com filtros

### Importação

- `POST /api/import` - Importar planilha (multipart/form-data)

### Health Check

- `GET /api/health` - Verificar status da API

## 🛠️ Solução de Problemas

### Erro: "Cannot find module"

```bash
# Reinstale as dependências
rm -rf node_modules package-lock.json
npm install

cd client
rm -rf node_modules package-lock.json
npm install
```

### Erro: "Port 3001 already in use"

```bash
# Encontre e mate o processo usando a porta
# Linux/Mac:
lsof -ti:3001 | xargs kill

# Windows:
netstat -ano | findstr :3001
taskkill /PID <PID> /F
```

### Frontend não conecta ao Backend

1. Verifique se o backend está rodando na porta 3001
2. Verifique o console do navegador para erros
3. Limpe o cache do navegador
4. Tente acessar diretamente: `http://localhost:3001/api/health`

### Planilha não importa corretamente

1. Verifique se as colunas obrigatórias estão presentes (Associado, Franquia, Data Vencimento)
2. Remova formatações complexas da planilha
3. Salve a planilha novamente antes de importar
4. Verifique o formato das datas (use YYYY-MM-DD)
5. Consulte os erros detalhados após a importação

## 📚 Recursos Adicionais

- [README.md](README.md) - Documentação principal
- [PLANILHA_EXEMPLO.md](PLANILHA_EXEMPLO.md) - Guia detalhado de formatação de planilhas

## 💡 Dicas de Uso

1. **Backup Regular**: O banco de dados SQLite fica em `server/database.sqlite` - faça backup regularmente
2. **Importação em Lote**: Você pode importar centenas de registros de uma vez
3. **Filtros Combinados**: Use múltiplos filtros simultaneamente para buscas precisas
4. **Edição Rápida**: Use a edição inline para mudanças rápidas sem formulários
5. **Status Visual**: Os status têm cores diferentes para fácil identificação

## 🆘 Suporte

Para problemas ou dúvidas:
1. Consulte a documentação completa
2. Verifique as issues abertas no GitHub
3. Abra uma nova issue descrevendo o problema detalhadamente
