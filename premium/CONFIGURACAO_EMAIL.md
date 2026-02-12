# Configuração de Envio de Formulário

Guia completo para receber os dados do formulário de contato no seu email.

---

## Opção 1: Formspree (RECOMENDADA) ✅

**Gratuito** | **Fácil** | **Sem backend necessário**

O Formspree é um serviço que recebe os dados do seu formulário e envia para seu email.

### Passo a Passo:

#### 1. Crie uma conta gratuita
Acesse: https://formspree.io/register

#### 2. Crie um novo formulário
- Clique em "New Project" ou "+ New Form"
- Dê um nome (ex: "Contato NR-10 Hotelaria")

#### 3. Obtenha a URL do endpoint
O Formspree vai gerar uma URL assim:
```
https://formspree.io/f/xnqkvnyp
```

#### 4. Configure no seu site
Edite o arquivo `premium/index.html`:

```html
<!-- Linha ~873 - Substitua SUA_URL_AQUI pela URL do Formspree -->
<form class="contact-form" id="contactForm" 
      action="https://formspree.io/f/xnqkvnyp" 
      method="POST">
```

#### 5. Configure o email de destino
No dashboard do Formspree:
- Clique no seu formulário
- Vá em "Settings" > "Email Notifications"
- Adicione: contato@nr10hotelaria.com.br

#### 6. Teste
Preencha e envie o formulário no site. Você deve receber o email em poucos segundos!

---

## Opção 2: EmailJS (Alternativa)

**Gratuito** | **Sem redirecionamento** | **Mais complexo**

Permite enviar email diretamente sem sair da página.

### Passo a Passo:

#### 1. Cadastre-se em https://www.emailjs.com/

#### 2. Crie um serviço de email
- Vá em "Email Services" > "Add New Service"
- Escolha: Gmail, Outlook, ou outro
- Siga a autorização

#### 3. Crie um template
- Vá em "Email Templates" > "Create New Template"
- Use estas variáveis no corpo do email:

```
Nome: {{name}}
Email: {{email}}
Telefone: {{phone}}
Empresa: {{company}}
Interesse: {{interest}}
Mensagem: {{message}}
```

#### 4. Anote os dados
- Service ID (ex: `service_abc123`)
- Template ID (ex: `template_xyz789`)
- User ID (em "Account" > "API Keys")

#### 5. Instale no site

Adicione no `<head>` do `index.html`:
```html
<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js"></script>
<script>
   (function() {
      emailjs.init("SEU_USER_ID");
   })();
</script>
```

Substitua o JavaScript do formulário por:
```javascript
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    emailjs.sendForm('service_abc123', 'template_xyz789', this)
        .then(function() {
            alert('Mensagem enviada com sucesso!');
        }, function(error) {
            alert('Erro ao enviar: ' + error);
        });
});
```

---

## Opção 3: Netlify Forms (Se hospedar no Netlify)

**Gratuito** | **Integrado** | **Requer Netlify**

Se você hospedar o site no Netlify (gratuito):

### 1. Adicione o atributo `netlify` ao formulário:
```html
<form class="contact-form" id="contactForm" 
      name="contact" 
      method="POST" 
      data-netlify="true">
```

### 2. Faça deploy no Netlify
- Arraste a pasta para https://app.netlify.com/drop
- Ou conecte com GitHub

### 3. Configure no dashboard
- Vá em "Forms" no dashboard do Netlify
- Ative as notificações por email
- Adicione: contato@nr10hotelaria.com.br

---

## Opção 4: PHP (Se tiver hospedagem com PHP)

Se sua hospedagem suporta PHP, crie um arquivo `send-mail.php`:

```php
<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = strip_tags(trim($_POST["name"]));
    $email = filter_var(trim($_POST["email"]), FILTER_SANITIZE_EMAIL);
    $phone = strip_tags(trim($_POST["phone"]));
    $company = strip_tags(trim($_POST["company"]));
    $interest = strip_tags(trim($_POST["interest"]));
    $message = strip_tags(trim($_POST["message"]));
    
    $to = "contato@nr10hotelaria.com.br";
    $subject = "Nova solicitação de contato - NR-10 Hotelaria";
    
    $body = "Nome: $name\n";
    $body .= "Email: $email\n";
    $body .= "Telefone: $phone\n";
    $body .= "Empresa: $company\n";
    $body .= "Interesse: $interest\n";
    $body .= "Mensagem:\n$message";
    
    $headers = "From: $email\r\n";
    $headers .= "Reply-To: $email\r\n";
    
    if (mail($to, $subject, $body, $headers)) {
        header("Location: /obrigado.html");
    } else {
        header("Location: /erro.html");
    }
}
?>
```

E mude o action do formulário:
```html
<form action="send-mail.php" method="POST">
```

---

## Qual opção escolher?

| Opção | Dificuldade | Custo | Recomendado para |
|-------|-------------|-------|------------------|
| **Formspree** | Fácil | Gratuito (500 envios/mês) | Maioria dos casos |
| **EmailJS** | Médio | Gratuito (200 envios/mês) | Quer sem redirecionamento |
| **Netlify** | Fácil | Gratuito | Já usa ou quer usar Netlify |
| **PHP** | Médio | Depende da hospedagem | Tem hospedagem com PHP |

---

## Testando o Formulário

Após configurar:

1. Abra o site no navegador
2. Preencha o formulário com dados de teste
3. Envie
4. Verifique se chegou no email

**Email de teste:** contato@nr10hotelaria.com.br

---

## Precisa de ajuda?

Se tiver problemas, verifique:
- Se a URL do Formspree está correta
- Se os campos do formulário têm os atributos `name`
- O console do navegador (F12) por erros
- A pasta de spam do email
