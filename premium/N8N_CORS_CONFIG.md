# Configuração CORS no n8n

Se o formulário não estiver funcionando, provavelmente é um problema de **CORS** (Cross-Origin Resource Sharing).

## O que é CORS?

O navegador bloqueia requisições de um domínio (seu site) para outro (seu n8n) por segurança.

## Solução 1: Configurar CORS no n8n (Recomendada)

### Opção A: Via Interface do n8n (mais fácil)

1. Acesse seu n8n: https://n8n.chatbotpro.com.br
2. Vá em **Settings** (canto inferior esquerdo)
3. Procure por **External Hooks** ou vá direto para variáveis de ambiente
4. Adicione a variável:
   ```
   N8N_CORS_ORIGIN=*
   ```
   Ou especifique o domínio do seu site:
   ```
   N8N_CORS_ORIGIN=https://nr10hotelaria.com.br
   ```

### Opção B: Via Arquivo .env

No servidor onde o n8n está rodando, edite o arquivo `.env`:

```bash
# Adicione esta linha
N8N_CORS_ORIGIN=*

# Ou para múltiplos domínios
N8N_CORS_ORIGIN=https://nr10hotelaria.com.br,https://www.nr10hotelaria.com.br
```

Depois reinicie o n8n:
```bash
docker-compose restart
# ou
systemctl restart n8n
```

### Opção C: Via Docker Compose

Se estiver usando Docker, edite seu `docker-compose.yml`:

```yaml
services:
  n8n:
    image: n8nio/n8n
    environment:
      - N8N_CORS_ORIGEN=*
      - N8N_CORS_METHODS=POST,GET,OPTIONS
      - N8N_CORS_HEADERS=Content-Type,Authorization
    ports:
      - "5678:5678"
```

## Solução 2: Usar modo "no-cors" (Limitado)

No arquivo `main.js`, altere o fetch:

```javascript
const response = await fetch(N8N_WEBHOOK_URL, {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    mode: 'no-cors', // <-- Adicione isto
});
```

⚠️ **Atenção**: Com `no-cors`, você não poderá ler a resposta do servidor, mas o envio funcionará.

## Solução 3: Proxy Reverso (nginx)

Se estiver usando nginx na frente do n8n, adicione headers CORS:

```nginx
location /webhook {
    proxy_pass http://localhost:5678;
    
    # CORS Headers
    add_header 'Access-Control-Allow-Origin' '*' always;
    add_header 'Access-Control-Allow-Methods' 'POST, OPTIONS' always;
    add_header 'Access-Control-Allow-Headers' 'Content-Type' always;
    
    # Preflight requests
    if ($request_method = 'OPTIONS') {
        return 204;
    }
}
```

## Como testar se CORS está funcionando?

Abra o console do navegador (F12) e execute:

```javascript
fetch('https://n8n.chatbotpro.com.br/webhook-test/contato-nr10', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({test: true})
}).then(r => console.log('OK:', r.status)).catch(e => console.error('Erro:', e));
```

Se aparecer "Failed to fetch" ou "CORS error", o CORS não está configurado.

## Verificação rápida

Após configurar o CORS, teste o formulário e verifique no console (F12):

- ✅ **Se aparecer "[DEBUG] Resposta HTTP: 200"** → Funcionou!
- ❌ **Se aparecer "Failed to fetch"** → CORS ainda bloqueando
- ⚠️ **Se redirecionar para outra página** → Funcionou via fallback

## Precisa de ajuda?

Se não conseguir configurar o CORS, o formulário tem um **fallback automático** que vai redirecionar para uma página de confirmação do n8n. O lead não será perdido!
