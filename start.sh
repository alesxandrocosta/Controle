#!/bin/bash

# Script de inicialização do Sistema de Controle de Pagamentos
# Inicia o backend e o frontend automaticamente

echo "=============================================="
echo "Sistema de Controle de Pagamentos - Franquia"
echo "=============================================="
echo ""

# Verifica se o Node.js está instalado
if ! command -v node &> /dev/null; then
    echo "❌ Node.js não encontrado. Por favor, instale o Node.js 16+ primeiro."
    echo "   Visite: https://nodejs.org/"
    exit 1
fi

echo "✅ Node.js encontrado: $(node --version)"
echo ""

# Verifica se as dependências estão instaladas
if [ ! -d "node_modules" ]; then
    echo "📦 Instalando dependências do backend..."
    npm install
    echo ""
fi

if [ ! -d "client/node_modules" ]; then
    echo "📦 Instalando dependências do frontend..."
    cd client && npm install && cd ..
    echo ""
fi

echo "🚀 Iniciando o sistema..."
echo ""
echo "📡 Backend rodará em: http://localhost:3001"
echo "🌐 Frontend rodará em: http://localhost:5173"
echo ""
echo "Pressione Ctrl+C para parar o sistema"
echo "=============================================="
echo ""

# Inicia o backend em background
npm run dev &
BACKEND_PID=$!

# Aguarda 3 segundos para o backend iniciar
sleep 3

# Inicia o frontend
cd client && npm run dev &
FRONTEND_PID=$!

# Função para limpar os processos ao sair
cleanup() {
    echo ""
    echo "🛑 Parando o sistema..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    exit 0
}

# Captura Ctrl+C e chama a função de limpeza
trap cleanup SIGINT SIGTERM

# Aguarda indefinidamente
wait
