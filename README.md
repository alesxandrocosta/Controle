# Sistema de Controle de Negociações

Sistema profissional para análise e gerenciamento de negociações de associados, com funcionalidade de drag-and-drop para consolidação e envio automático de boletos via WhatsApp.

## 📋 Funcionalidades

- **Interface Drag-and-Drop**: Arraste e solte associados entre áreas para consolidação
- **Gerenciamento de Associados**: Visualize informações detalhadas de cada associado
- **Envio de Boletos via WhatsApp**: Integração para envio individual ou em massa de boletos
- **Design Profissional**: Interface moderna e responsiva
- **Consolidação de Negociações**: Container dedicado para associados consolidados

## 🚀 Como Usar

### Pré-requisitos

- Node.js (versão 14 ou superior)
- npm ou yarn

### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/alesxandrocosta/Controle.git
cd Controle
```

2. Instale as dependências:
```bash
npm install
```

3. Execute a aplicação:
```bash
npm start
```

A aplicação será aberta automaticamente em `http://localhost:3000`

## 💡 Uso do Sistema

### Consolidar Associados

1. Na coluna "Associados Pendentes", localize o associado que deseja consolidar
2. Clique e arraste o card do associado
3. Solte o card na coluna "Consolidados"
4. O status do associado será automaticamente atualizado

### Enviar Boletos

**Envio Individual:**
- Clique no botão "Enviar Boleto" em cada card de associado
- O WhatsApp será aberto com a mensagem pré-formatada

**Envio em Massa:**
- Clique no botão "Enviar Todos os Boletos via WhatsApp" no topo da coluna
- Os boletos de todos os associados pendentes serão enviados sequencialmente

### Reverter Consolidação

1. Na coluna "Consolidados", arraste o associado de volta
2. Solte na coluna "Associados Pendentes"
3. O status será revertido automaticamente

## 🏗️ Estrutura do Projeto

```
Controle/
├── public/
│   └── index.html
├── src/
│   ├── App.js          # Componente principal com lógica drag-and-drop
│   ├── App.css         # Estilos da aplicação
│   ├── index.js        # Ponto de entrada
│   └── index.css       # Estilos globais
├── package.json
└── README.md
```

## 🛠️ Tecnologias Utilizadas

- **React**: Biblioteca JavaScript para construção de interfaces
- **React Beautiful DnD**: Biblioteca para funcionalidade drag-and-drop
- **WhatsApp API**: Integração para envio de mensagens

## 📦 Build para Produção

Para criar uma versão otimizada para produção:

```bash
npm run build
```

Os arquivos otimizados serão gerados na pasta `build/`

## 🔧 Personalização

### Adicionar Novos Associados

Edite o array `initialMembers` em `src/App.js`:

```javascript
const initialMembers = [
  { 
    id: '1', 
    name: 'Nome do Associado', 
    status: 'Pendente', 
    valor: 'R$ 1.500,00', 
    vencimento: '15/01/2025' 
  },
  // Adicione mais associados aqui
];
```

### Customizar Mensagem do Boleto

Edite a função `handleSendBoleto` em `src/App.js` para alterar o formato da mensagem enviada via WhatsApp.

## 📱 Responsividade

O sistema é totalmente responsivo e se adapta a diferentes tamanhos de tela:
- Desktop (tela completa com duas colunas)
- Tablet (layout adaptado)
- Mobile (coluna única, interface otimizada para toque)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou enviar pull requests.

## 📄 Licença

ISC

## 👨‍💻 Autor

Desenvolvido para gerenciamento profissional de negociações de associados.