# Exemplo de Planilha para Importação

## Formato Aceito

O sistema aceita planilhas nos formatos:
- .xlsx (Excel)
- .xls (Excel antigo)
- .csv (valores separados por vírgula)

## Colunas Obrigatórias

As seguintes colunas são **obrigatórias** e devem estar presentes na planilha:

1. **Associado** - Nome completo do associado
2. **Franquia** - Nome da franquia
3. **Data Vencimento** - Data de vencimento do pagamento

## Colunas Opcionais

Estas colunas são opcionais, mas recomendadas:

1. **Descrição** - Descrição detalhada do pagamento
2. **Valor** - Valor monetário (será 0 se não informado)
3. **Data Pagamento** - Data em que o pagamento foi realizado
4. **Status** - Status do pagamento (padrão: "Pendente" se não informado)

## Exemplo de Planilha

| Associado | Franquia | Descrição | Valor | Data Vencimento | Data Pagamento | Status |
|-----------|----------|-----------|-------|-----------------|----------------|--------|
| João Silva | Franquia SP Centro | Mensalidade Dezembro 2024 | 1500.00 | 2024-12-31 | 2024-12-30 | Pago |
| Maria Santos | Franquia RJ Norte | Taxa de Adesão | 2000.00 | 2024-12-15 | | Pendente |
| Pedro Oliveira | Franquia SP Centro | Mensalidade Janeiro 2025 | 1500.00 | 2025-01-31 | | Pendente |
| Ana Costa | Franquia MG Sul | Mensalidade Atrasada | 1500.00 | 2024-11-30 | | Atrasado |

## Formatos Aceitos para Valores

O sistema aceita valores nos seguintes formatos:

- `1500` (número simples)
- `1500.00` (com decimais)
- `1.500,00` (formato brasileiro)
- `R$ 1.500,00` (com símbolo de moeda)
- `1,500.00` (formato americano)

## Formatos Aceitos para Datas

O sistema aceita datas nos seguintes formatos:

- `2024-12-31` (YYYY-MM-DD) - **Recomendado**
- `31/12/2024` (DD/MM/YYYY)
- `12/31/2024` (MM/DD/YYYY)
- Formato de data do Excel (número serial)

## Status Válidos

Os seguintes valores de status são reconhecidos:

- **Pendente** - Pagamento ainda não realizado (padrão)
- **Pago** - Pagamento já realizado
- **Atrasado** - Pagamento vencido e não pago
- **Cancelado** - Pagamento cancelado

Qualquer outro valor será aceito e exibido como informado.

## Variações de Nomes de Colunas

O sistema é flexível e aceita variações nos nomes das colunas:

- **Associado**: "Associado", "associado", "ASSOCIADO"
- **Franquia**: "Franquia", "franquia", "FRANQUIA"
- **Descrição**: "Descrição", "Descricao", "descricao", "DESCRIÇÃO"
- **Valor**: "Valor", "valor", "VALOR"
- **Data Vencimento**: "Data Vencimento", "Data vencimento", "data_vencimento", "DATA VENCIMENTO"
- **Data Pagamento**: "Data Pagamento", "Data pagamento", "data_pagamento", "DATA PAGAMENTO"
- **Status**: "Status", "status", "STATUS"

## Dicas para Importação Bem-Sucedida

1. ✅ Mantenha a primeira linha com os cabeçalhos das colunas
2. ✅ Não deixe linhas vazias no meio da planilha
3. ✅ Use datas no formato YYYY-MM-DD para melhor compatibilidade
4. ✅ Verifique se os campos obrigatórios estão preenchidos
5. ✅ Remova formatações complexas (cores, bordas) que podem causar problemas
6. ✅ Salve a planilha antes de importar
7. ⚠️ O sistema reportará erros específicos para cada linha com problema

## Download de Template

Você pode criar sua própria planilha seguindo o exemplo acima, ou usar qualquer planilha Excel/CSV que contenha as colunas obrigatórias.
