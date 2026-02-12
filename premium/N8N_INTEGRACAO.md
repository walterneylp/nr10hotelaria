# Integração com n8n

Guia completo para receber dados do formulário no seu servidor n8n.

---

## 📋 O que você precisa

1. **Servidor n8n** rodando (self-hosted ou n8n.cloud)
2. **URL do webhook** do n8n (ex: `https://seu-n8n.com/webhook/contato-nr10`)
3. **Workflow configurado** no n8n

---

## 🚀 Configuração Passo a Passo

### PARTE 1: Configurar o Workflow no n8n

#### 1.1 Crie um novo workflow
- Acesse seu n8n
- Clique em "+" para novo workflow
- Dê um nome: "Contato Site NR-10"

#### 1.2 Adicione o nó "Webhook"

Clique em "+" e adicione o nó **Webhook**:

**Configurações:**
- **Authentication:** None (ou Header Auth se quiser segurança extra)
- **HTTP Method:** POST
- **Path:** `contato-nr10` (ou qualquer nome que preferir)
- **Response Mode:** Last Node
- **Response Data:** All Entries

Clique em "Execute Workflow" para salvar e obter a **URL do webhook**.

**A URL vai parecer assim:**
```
https://seu-n8n.com/webhook/contato-nr10
```

Ou se estiver em modo de teste:
```
https://seu-n8n.com/webhook-test/contato-nr10
```

#### 1.3 Adicione o nó de Email (Gmail, Outlook ou SMTP)

Após o Webhook, adicione um nó para enviar email:

**Opção A: Gmail**
- Crie credenciais OAuth2 do Gmail
- Configure destinatário: `contato@nr10hotelaria.com.br`
- Assunto: `Nova solicitação de contato - {{$json.body.name}}`

**Opção B: SMTP (Mais fácil)**
Adicione nó "Email (SMTP)":
```
Host: smtp.gmail.com (ou seu servidor SMTP)
Port: 587
User: seu-email@gmail.com
Password: senha-app (não é a senha normal, é app password)
From: site@nr10hotelaria.com.br
To: contato@nr10hotelaria.com.br
Subject: Nova solicitação de contato
```

**Corpo do email (HTML):**
```html
<h2>Nova solicitação de contato - NR-10 Hotelaria</h2>

<p><strong>Nome:</strong> {{$json.body.name}}</p>
<p><strong>Email:</strong> {{$json.body.email}}</p>
<p><strong>Telefone:</strong> {{$json.body.phone}}</p>
<p><strong>Empresa:</strong> {{$json.body.company}}</p>
<p><strong>Interesse:</strong> {{$json.body.interest}}</p>
<p><strong>Mensagem:</strong><br>{{$json.body.message}}</p>

<hr>
<p>Enviado em: {{$now.format('DD/MM/YYYY HH:mm:ss')}}</p>
```

#### 1.4 (Opcional) Salvar em Planilha/Google Sheets

Adicione um nó "Google Sheets" para também salvar os dados:
- Operation: Append
- Document: Crie uma planilha com colunas: Data, Nome, Email, Telefone, Empresa, Interesse, Mensagem
- Mapeie os campos do webhook para as colunas

#### 1.5 Ative o workflow

Clique em "Active" para deixar o workflow sempre rodando.

---

### PARTE 2: Configurar o Formulário

#### 2.1 Obtenha a URL do webhook

No n8n, no nó Webhook, copie a URL:
```
https://seu-n8n.com/webhook/contato-nr10
```

#### 2.2 Configure no JavaScript

Vou atualizar o arquivo `js/main.js` para enviar para o n8n.

---

## 🔒 Segurança (Recomendado)

### Adicionar Header de Autenticação

No n8n, no nó Webhook:
1. Mude **Authentication** para "Header Auth"
2. Crie uma credencial com:
   - Name: `X-Webhook-Key`
   - Value: `sua-chave-secreta-aqui` (use uma senha longa e aleatória)

No JavaScript, vamos enviar este header em todas as requisições.

---

## 🧪 Testando

1. Ative o "Execute Workflow" no n8n (modo de teste)
2. Preencha o formulário no site
3. Verifique se o n8n recebeu os dados
4. Verifique se o email chegou

---

## 📊 Exemplo de Payload Enviado

```json
{
  "name": "João Silva",
  "email": "joao@hotel.com.br",
  "phone": "(17) 99999-9999",
  "company": "Hotel Exemplo",
  "interest": "basico",
  "message": "Gostaria de uma proposta para 10 funcionários"
}
```

---

## 🐛 Troubleshooting

### Problema: CORS (Cross-Origin)
Se o navegador bloquear a requisição, você precisa configurar CORS no seu servidor n8n ou usar um proxy.

**Solução 1:** Configure o n8n com CORS permitido
No arquivo `.env` do n8n:
```
N8N_CORS_ORIGIN=*
```

**Solução 2:** Use modo "no-cors" (limitado)

**Solução 3:** Configure um proxy reverso (nginx) com headers CORS

### Problema: Webhook não recebe dados
- Verifique se a URL está correta
- Verifique se o workflow está "Active"
- Verifique o console do navegador (F12) por erros
- Teste com curl ou Postman primeiro

### Problema: Não recebe email
- Verifique a pasta de spam
- Verifique as credenciais SMTP no n8n
- Teste o nó de email isoladamente no n8n

---

## 💡 Dicas Extras

### Enviar também para WhatsApp
Adicione um nó "WhatsApp Business Cloud" ou "Twilio" no n8n para também receber uma mensagem no WhatsApp quando tiver nova solicitação.

### Criar lead no CRM
Adicione nós para criar contato no:
- Pipedrive
- HubSpot
- Salesforce
- etc.

### Notificação Slack/Telegram
Adicione nó "Slack" ou "Telegram" para receber notificação instantânea.
