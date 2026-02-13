#!/bin/bash
# Script para configurar token do GitHub

echo "=========================================="
echo "  Configuração de Token GitHub"
echo "=========================================="
echo ""
echo "Este script vai configurar seu token de acesso."
echo ""

# Ler token
read -s -p "Cole seu token do GitHub (ghp_...): " TOKEN
echo ""

# Validar token
if [[ -z "$TOKEN" ]]; then
    echo "Erro: Token vazio!"
    exit 1
fi

# Configurar Git
cd /home/walterney/Dropbox/Sistemas/nr10hotelaria

# Configurar credential helper
git config credential.helper store

# Criar entrada no .git-credentials
echo "https://walterney:${TOKEN}@github.com" > ~/.git-credentials
chmod 600 ~/.git-credentials

echo ""
echo "✓ Token configurado!"
echo ""
echo "Testando conexão..."

# Testar
git push -u origin main

if [ $? -eq 0 ]; then
    echo ""
    echo "=========================================="
    echo "  ✓ SUCESSO!"
    echo "  Código enviado para GitHub"
    echo "=========================================="
else
    echo ""
    echo "=========================================="
    echo "  ✗ FALHOU"
    echo "  Verifique se o token está correto"
    echo "=========================================="
fi
