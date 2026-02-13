#!/bin/bash
# Script para fazer push para o GitHub

echo "=========================================="
echo "  Git Push - NR-10 Hotelaria"
echo "=========================================="
echo ""

# Verificar se está no diretório correto
if [ ! -f "index.html" ]; then
    echo "Erro: Execute este script no diretório do projeto"
    exit 1
fi

echo "Status do repositório:"
git status

echo ""
echo "Commits a enviar:"
git log --oneline main --not --remotes 2>/dev/null || echo "- Nenhum commit pendente ou remote não configurado"

echo ""
echo "Remote configurado:"
git remote -v

echo ""
echo "=========================================="
echo "Para fazer o push, execute:"
echo ""
echo "  git push -u origin main"
echo ""
echo "Se pedir senha, use um Token de Acesso"
echo "Pessoal do GitHub (não sua senha!)"
echo ""
echo "Guia completo: GIT_PUSH_GUIA.md"
echo "=========================================="
