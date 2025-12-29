@echo off
REM Script de inicialização do Sistema de Controle de Pagamentos
REM Inicia o backend e o frontend automaticamente

echo ==============================================
echo Sistema de Controle de Pagamentos - Franquia
echo ==============================================
echo.

REM Verifica se o Node.js está instalado
where node >nul 2>nul
if %errorlevel% neq 0 (
    echo X Node.js nao encontrado. Por favor, instale o Node.js 16+ primeiro.
    echo   Visite: https://nodejs.org/
    pause
    exit /b 1
)

echo V Node.js encontrado
node --version
echo.

REM Verifica se as dependências estão instaladas
if not exist "node_modules\" (
    echo Instalando dependencias do backend...
    call npm install
    echo.
)

if not exist "client\node_modules\" (
    echo Instalando dependencias do frontend...
    cd client
    call npm install
    cd ..
    echo.
)

echo Iniciando o sistema...
echo.
echo Backend rodara em: http://localhost:3001
echo Frontend rodara em: http://localhost:5173
echo.
echo Pressione Ctrl+C para parar o sistema
echo ==============================================
echo.

REM Inicia o backend em uma nova janela
start "Backend - API" cmd /k "npm run dev"

REM Aguarda 3 segundos para o backend iniciar
timeout /t 3 /nobreak >nul

REM Inicia o frontend em uma nova janela
cd client
start "Frontend - React" cmd /k "npm run dev"
cd ..

echo.
echo Sistema iniciado!
echo Feche as janelas do backend e frontend para parar o sistema.
echo.
pause
