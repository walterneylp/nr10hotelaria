# Git Push - Guia de Autenticação

O push falhou porque o GitHub requer autenticação. Siga os passos abaixo:

---

## Opção 1: Token de Acesso Pessoal (Recomendado)

### 1. Gerar Token no GitHub
1. Acesse: https://github.com/settings/tokens
2. Clique em **"Generate new token (classic)"**
3. Dê um nome: `NR-10 Hotelaria Deploy`
4. Selecione escopo: **repo** (acesso completo aos repositórios)
5. Clique em **Generate token**
6. **Copie o token** (só aparece uma vez!)

### 2. Configurar no Terminal

Execute no terminal local:

```bash
cd /home/walterney/Dropbox/Sistemas/nr10hotelaria

# Configurar Git para usar credential helper
git config credential.helper cache

# Tentar push novamente
git push -u origin main
```

Quando pedir:
- **Username:** seu usuário do GitHub
- **Password:** cole o token gerado (não sua senha!)

---

## Opção 2: URL com Token Embutido (Temporário)

```bash
cd /home/walterney/Dropbox/Sistemas/nr10hotelaria

# Configurar URL com token
git remote set-url origin https://SEU_TOKEN@github.com/walterney/nr10hotelaria.git

# Push
git push -u origin main

# Depois do push, remover token da URL por segurança
git remote set-url origin https://github.com/walterney/nr10hotelaria.git
```

---

## Opção 3: SSH (Mais Seguro)

### 1. Gerar chave SSH (se não tiver)
```bash
ssh-keygen -t ed25519 -C "walterney@gmail.com"
```

### 2. Adicionar chave ao agente
```bash
eval "$(ssh-agent -s)"
ssh-add ~/.ssh/id_ed25519
```

### 3. Copiar chave pública
```bash
cat ~/.ssh/id_ed25519.pub
```

### 4. Adicionar ao GitHub
1. Acesse: https://github.com/settings/keys
2. Clique em **"New SSH key"**
3. Cole a chave pública
4. Salve

### 5. Alterar remote para SSH
```bash
cd /home/walterney/Dropbox/Sistemas/nr10hotelaria
git remote set-url origin git@github.com:walterney/nr10hotelaria.git
git push -u origin main
```

---

## Verificação

Após configurar, teste:
```bash
git push -u origin main
```

Se aparecer algo como:
```
Enumerating objects: 20, done.
Counting objects: 100% (20/20), done.
Delta compression using up to 8 threads
Compressing objects: 100% (16/16), done.
Writing objects: 100% (20/20), 45.32 KiB | 15.11 MiB/s, done.
Total 20 (delta 0), reused 0 (delta 0), pack-reused 0
To https://github.com/walterney/nr10hotelaria.git
 * [new branch]      main -> main
Branch 'main' set up to track 'origin/main'.
```

**Sucesso!** 🎉

---

## Verificar no GitHub

Acesse: https://github.com/walterney/nr10hotelaria

Os arquivos devem aparecer lá.

---

## Troubleshooting

### Erro: "remote: Support for password authentication was removed"
Solução: Use token de acesso pessoal, não senha do GitHub.

### Erro: "403 Forbidden"
Solução: O token não tem permissão `repo`. Gere um novo com essa permissão.

### Erro: "Could not resolve host"
Solução: Verifique conexão com internet.
