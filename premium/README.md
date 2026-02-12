# NR-10 Aplicada à Hotelaria - Premium Edition

Versão premium e ultra-profissional do site para divulgação do treinamento NR-10 voltado ao setor de hotelaria.

## ✨ Características Premium

### Design
- 🎨 **Tema Dark Premium** - Design sofisticado com paleta escura e acentos dourados
- 💎 **Glassmorphism** - Efeitos de vidro fosco em cards e navegação
- ✨ **Gradientes Elegantes** - Transições suaves entre tons de azul escuro e dourado
- 🎯 **Tipografia Premium** - Fontes Plus Jakarta Sans e Inter

### Animações & Interatividade
- 🖱️ **Cursor Personalizado** - Cursor customizado com efeito de brilho (desktop)
- 📊 **Progress Bar** - Barra de progresso de leitura no topo
- 🎭 **Preloader Animado** - Tela de carregamento elegante
- 🎬 **AOS Animations** - Animate On Scroll para elementos
- 🔢 **Contadores Animados** - Estatísticas com contagem progressiva
- 🎠 **Slider de Depoimentos** - Carrossel interativo com autoplay
- ❓ **FAQ Accordion** - Perguntas frequentes expansíveis

### Seções do Site
1. **Hero** - Apresentação impactante com partículas animadas
2. **Clientes Marquee** - Scroll infinito de tipos de estabelecimentos
3. **Problemas** - Cards interativos com efeito glow
4. **Solução** - Layout dividido com badges flutuantes
5. **Módulos Timeline** - Linha do tempo vertical dos 8 módulos
6. **Preços** - 3 cards de preços com destaque
7. **Depoimentos** - Slider de depoimentos de clientes
8. **FAQ** - 6 perguntas frequentes com accordion
9. **CTA** - Chamada para ação com efeitos visuais
10. **Contato** - Formulário e métodos de contato

## 📁 Estrutura

```
premium/
├── index.html          # Página principal (487 linhas)
├── css/
│   └── style.css       # Estilos premium (1.1k+ linhas)
├── js/
│   └── main.js         # JavaScript avançado (584 linhas)
├── images/             # Pasta para imagens
└── README.md           # Este arquivo
```

## 🚀 Como Usar

### 1. Configurar WhatsApp
Edite o arquivo `js/main.js` e atualize o número:

```javascript
// Linha ~330
const whatsappNumber = '55SEUNUMEROAQUI';
// Exemplo: const whatsappNumber = '5511987654321';
```

### 2. Configurar Email
Substitua em `index.html`:
- O email já está configurado: contato@nr10hotelaria.com.br
- Substitua pelo seu email real

### 3. Personalizar Depoimentos
Edite a seção de depoimentos em `index.html` (aprox. linha 420)

### 4. Adicionar Imagens (Opcional)
O site funciona perfeitamente sem imagens, usando ícones e efeitos visuais.
Para adicionar imagens, coloque na pasta `images/` e atualize as referências.

## 🎨 Personalização

### Cores
As cores podem ser alteradas no arquivo `css/style.css` nas variáveis CSS:

```css
:root {
    --accent-gold: #d4af37;        /* Dourado principal */
    --accent-electric: #00d4aa;    /* Verde elétrico */
    --accent-blue: #3b82f6;        /* Azul */
    --accent-purple: #8b5cf6;      /* Roxo */
}
```

## 📱 Responsividade

O site é totalmente responsivo:
- ✅ Desktop (1200px+)
- ✅ Tablet (768px - 1199px)
- ✅ Mobile (< 768px)

## 🔧 Tecnologias

- HTML5 semântico
- CSS3 moderno (Grid, Flexbox, Variáveis, Animações)
- JavaScript ES6+ (Vanilla)
- Intersection Observer API
- Font Awesome 6
- Google Fonts

## ⚡ Performance

- Código otimizado e minificável
- Lazy loading para elementos
- Animações com GPU acceleration
- Imagens vetoriais (SVG/Ícones)

## 📝 Licença

Uso exclusivo para NR-10 Aplicada à Hotelaria.

---

**Nota:** Esta é a versão PREMIUM do site, com design mais sofisticado e recursos avançados comparado à versão standard.
