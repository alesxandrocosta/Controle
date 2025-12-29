# Guia de Customização

Este guia mostra como personalizar o sistema de controle de negociações para suas necessidades específicas.

## Adicionar/Modificar Associados

### Estrutura de Dados do Associado

Cada associado possui os seguintes campos:

```javascript
{
  id: 'identificador-unico',
  name: 'Nome do Associado',
  status: 'Pendente',
  valor: 'R$ 1.500,00',
  vencimento: '15/01/2025',
  telefone: '5511999999999' // Formato internacional: código país + DDD + número
}
```

### Como Adicionar Novos Associados

1. Abra o arquivo `src/App.js`
2. Localize o array `initialMembers` (próximo ao início do arquivo)
3. Adicione novos objetos ao array:

```javascript
const initialMembers = [
  { 
    id: '1', 
    name: 'João Silva', 
    status: 'Pendente', 
    valor: 'R$ 1.500,00', 
    vencimento: '15/01/2025',
    telefone: '5511999999999'
  },
  // Adicione seu novo associado aqui
  { 
    id: '6', 
    name: 'Novo Associado', 
    status: 'Pendente', 
    valor: 'R$ 3.000,00', 
    vencimento: '30/01/2025',
    telefone: '5511944444444'
  },
];
```

**Importante**: 
- O `id` deve ser único para cada associado
- O `telefone` deve estar no formato internacional (código do país + DDD + número)
- Para números brasileiros: `55` (Brasil) + `11` (DDD) + `999999999` (número)

## Customizar Mensagem do WhatsApp

Localize a função `handleSendBoleto` em `src/App.js`:

```javascript
const handleSendBoleto = (member) => {
  // Personalize a mensagem aqui
  const message = `Olá ${member.name}, seu boleto no valor de ${member.valor} com vencimento em ${member.vencimento} está disponível.`;
  
  const whatsappUrl = `https://api.whatsapp.com/send?phone=${member.telefone}&text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
};
```

### Exemplos de Mensagens Personalizadas

**Mensagem formal:**
```javascript
const message = `Prezado(a) ${member.name},\n\nInformamos que seu boleto no valor de ${member.valor} está disponível para pagamento.\nData de vencimento: ${member.vencimento}\n\nAtenciosamente,\nEquipe de Cobrança`;
```

**Mensagem com link:**
```javascript
const message = `Olá ${member.name}! Seu boleto de ${member.valor} (vencimento: ${member.vencimento}) está pronto.\n\nAcesse: https://seusite.com/boletos/${member.id}`;
```

## Customizar Cores e Estilos

### Alterar Cores Principais

Edite o arquivo `src/App.css`:

**Gradiente do cabeçalho e botões:**
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

**Cor de destaque dos consolidados:**
```css
.badge {
  background: #4caf50; /* Verde */
}
```

**Cor do botão WhatsApp:**
```css
.send-btn {
  background: #25d366; /* Verde WhatsApp */
}
```

### Alterar Layout

**Mudar para 3 colunas (desktop):**
```css
.container-wrapper {
  grid-template-columns: 1fr 1fr 1fr;
}
```

**Alterar largura máxima:**
```css
.container-wrapper {
  max-width: 1600px; /* Padrão: 1400px */
}
```

## Ajustar Tempo entre Envios em Massa

Localize a função `handleSendAllBoletos`:

```javascript
setTimeout(() => {
  handleSendBoleto(member);
}, index * 2000); // Mude 2000 (2 segundos) para o tempo desejado em milissegundos
```

**Exemplos:**
- 1 segundo: `index * 1000`
- 3 segundos: `index * 3000`
- 5 segundos: `index * 5000`

## Integração com Backend

Para integrar com um backend real:

1. Substitua o `initialMembers` por uma chamada de API:

```javascript
const [members, setMembers] = useState([]);

useEffect(() => {
  // Buscar dados da API
  fetch('https://sua-api.com/associados')
    .then(response => response.json())
    .then(data => setMembers(data))
    .catch(error => console.error('Erro ao buscar dados:', error));
}, []);
```

2. Adicione persistência ao mover membros:

```javascript
const onDragEnd = (result) => {
  // ... lógica existente ...
  
  // Salvar mudança no backend
  fetch('https://sua-api.com/associados/atualizar', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ memberId: movedItem.id, newStatus: movedItem.status })
  });
};
```

## Adicionar Novos Campos

Para adicionar um novo campo (ex: CPF):

1. Adicione o campo aos dados:
```javascript
const initialMembers = [
  { 
    id: '1', 
    name: 'João Silva',
    cpf: '123.456.789-00', // Novo campo
    status: 'Pendente',
    // ... outros campos
  },
];
```

2. Exiba o campo no card (em `src/App.js`):
```javascript
<div className="member-details">
  <p><strong>CPF:</strong> {member.cpf}</p>
  <p><strong>Valor:</strong> {member.valor}</p>
  <p><strong>Vencimento:</strong> {member.vencimento}</p>
</div>
```

## Suporte e Dúvidas

Para mais informações ou suporte, consulte a documentação principal no `README.md` ou abra uma issue no repositório.
