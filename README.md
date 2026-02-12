# NR-10 Aplicada à Hotelaria - Website

Site profissional para divulgação do treinamento NR-10 voltado ao setor de hotelaria.

## 📁 Estrutura do Projeto

```
.
├── index.html          # Página principal
├── css/
│   └── style.css       # Estilos do site
├── js/
│   └── main.js         # Scripts e interatividade
├── images/             # Pasta para imagens (adicione aqui)
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Atualizar Contato (WhatsApp)

Edite o arquivo `js/main.js` e substitua o número de telefone:

```javascript
// Linha ~230
const whatsappNumber = '55'; // <-- ADICIONE SEU NÚMERO AQUI
// Exemplo: const whatsappNumber = '5511987654321';
```

### 2. Atualizar Email

Substitua o email em todos os links no arquivo `index.html`:

```html
<!-- Busque por: seu-email@exemplo.com -->
<a href="mailto:seu-email@exemplo.com">
<!-- Substitua por seu email real -->
```

### 3. Adicionar Imagens (Opcional)

O site foi projetado para funcionar sem imagens, utilizando ícones e gradientes. Se desejar adicionar imagens:

1. Coloque as imagens na pasta `images/`
2. Referencie no HTML

## 🎨 Personalização de Cores

As cores do site podem ser alteradas no arquivo `css/style.css`, nas variáveis CSS (linhas 12-30):

```css
:root {
    --color-primary: #0a2540;      /* Azul escuro - segurança */
    --color-secondary: #c9a227;    /* Dourado - hotelaria */
    --color-accent: #00d4aa;       /* Verde água - destaque */
    /* ... outras cores */
}
```

## 📱 Recursos do Site

- ✅ Design responsivo (desktop, tablet, mobile)
- ✅ Animações suaves ao rolar a página
- ✅ Menu mobile hambúrguer
- ✅ Formulário de contato funcional
- ✅ Botão "voltar ao topo"
- ✅ Links diretos para WhatsApp e Email
- ✅ SEO otimizado (meta tags)
- ✅ Performance otimizada

## 📋 Seções do Site

1. **Hero** - Apresentação impactante
2. **O Desafio** - Problemas específicos da hotelaria
3. **A Solução** - Apresentação do treinamento
4. **Conteúdo Programático** - 8 módulos detalhados
5. **Modalidades** - Básico 40h, SEP 40h, Reciclagem 16h
6. **Público-Alvo** - Para quem é o treinamento
7. **Diferenciais** - Por que escolher
8. **Contato** - Formulário e informações

## 🔧 Tecnologias Utilizadas

- HTML5 semântico
- CSS3 moderno (Grid, Flexbox, Variáveis)
- JavaScript vanilla
- Font Awesome (ícones)
- Google Fonts (Inter)

## 📞 Suporte

Para dúvidas ou sugestões sobre o site, entre em contato.

---

**Nota:** Este site é apenas para fins informativos. Não possui backend integrado - o formulário de contato exibe uma mensagem de sucesso mas não envia dados para servidor.
