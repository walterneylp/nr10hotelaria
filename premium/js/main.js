/**
 * NR-10 Hotelaria - Premium Edition
 * JavaScript Avançado com Animações e Interatividade
 */

document.addEventListener('DOMContentLoaded', () => {
    // ========================================
    // Preloader
    // ========================================
    const preloader = document.getElementById('preloader');
    
    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('hidden');
            document.body.style.overflow = 'auto';
        }, 500);
    });

    // ========================================
    // Custom Cursor (Desktop Only)
    // ========================================
    const cursor = document.getElementById('cursor');
    const cursorFollower = document.getElementById('cursorFollower');
    
    if (window.matchMedia('(pointer: fine)').matches) {
        let mouseX = 0, mouseY = 0;
        let cursorX = 0, cursorY = 0;
        let followerX = 0, followerY = 0;
        
        document.addEventListener('mousemove', (e) => {
            mouseX = e.clientX;
            mouseY = e.clientY;
        });
        
        function animateCursor() {
            // Smooth follow for cursor
            cursorX += (mouseX - cursorX) * 0.2;
            cursorY += (mouseY - cursorY) * 0.2;
            cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px)`;
            
            // Smoother follow for follower
            followerX += (mouseX - followerX) * 0.1;
            followerY += (mouseY - followerY) * 0.1;
            cursorFollower.style.transform = `translate(${followerX - 16}px, ${followerY - 16}px)`;
            
            requestAnimationFrame(animateCursor);
        }
        animateCursor();
        
        // Hover effects
        const hoverElements = document.querySelectorAll('a, button, .problem-card, .module-card, .pricing-card');
        hoverElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(2)`;
                cursorFollower.style.opacity = '0';
            });
            el.addEventListener('mouseleave', () => {
                cursor.style.transform = `translate(${cursorX - 4}px, ${cursorY - 4}px) scale(1)`;
                cursorFollower.style.opacity = '0.5';
            });
        });
    }

    // ========================================
    // Progress Bar
    // ========================================
    const progressBar = document.getElementById('progressBar');
    
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = (scrollTop / docHeight) * 100;
        progressBar.style.width = scrollPercent + '%';
    });

    // ========================================
    // Navigation
    // ========================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');
    
    // Navbar scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Mobile toggle
    navToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        
        const spans = navToggle.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translate(7px, -6px)';
        } else {
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        }
    });
    
    // Close menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
            const spans = navToggle.querySelectorAll('span');
            spans.forEach(span => {
                span.style.transform = 'none';
                span.style.opacity = '1';
            });
        });
    });
    
    // Active link on scroll
    const sections = document.querySelectorAll('section[id]');
    
    window.addEventListener('scroll', () => {
        const scrollPos = window.pageYOffset + 150;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === '#' + sectionId) {
                        link.classList.add('active');
                    }
                });
            }
        });
    });

    // ========================================
    // Smooth Scroll
    // ========================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            
            if (target) {
                const headerHeight = navbar.offsetHeight;
                const targetPosition = target.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ========================================
    // Animated Counter
    // ========================================
    const counters = document.querySelectorAll('.stat-number');
    let counted = false;
    
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting && !counted) {
                counted = true;
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-count'));
                    animateCounter(counter, 0, target, 2000);
                });
            }
        });
    }, { threshold: 0.5 });
    
    const statsSection = document.querySelector('.hero-stats');
    if (statsSection) {
        counterObserver.observe(statsSection);
    }
    
    function animateCounter(element, start, end, duration) {
        const range = end - start;
        const increment = range / (duration / 16);
        let current = start;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= end) {
                current = end;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current);
        }, 16);
    }

    // ========================================
    // AOS-like Animation
    // ========================================
    const animatedElements = document.querySelectorAll('[data-aos]');
    
    const animationObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const delay = entry.target.getAttribute('data-aos-delay') || 0;
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, delay);
                animationObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    animatedElements.forEach(el => animationObserver.observe(el));

    // ========================================
    // Testimonials Slider
    // ========================================
    const track = document.getElementById('testimonialsTrack');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');
    const dotsContainer = document.getElementById('testimonialsDots');
    
    if (track && prevBtn && nextBtn) {
        const cards = track.querySelectorAll('.testimonial-card');
        let currentIndex = 0;
        
        // Create dots
        cards.forEach((_, index) => {
            const dot = document.createElement('button');
            dot.className = 'dot' + (index === 0 ? ' active' : '');
            dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
            dot.addEventListener('click', () => goToSlide(index));
            dotsContainer.appendChild(dot);
        });
        
        const dots = dotsContainer.querySelectorAll('.dot');
        
        function goToSlide(index) {
            currentIndex = index;
            track.style.transform = `translateX(-${index * 100}%)`;
            
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === index);
            });
        }
        
        function nextSlide() {
            currentIndex = (currentIndex + 1) % cards.length;
            goToSlide(currentIndex);
        }
        
        function prevSlide() {
            currentIndex = (currentIndex - 1 + cards.length) % cards.length;
            goToSlide(currentIndex);
        }
        
        nextBtn.addEventListener('click', nextSlide);
        prevBtn.addEventListener('click', prevSlide);
        
        // Auto-play
        setInterval(nextSlide, 6000);
    }

    // ========================================
    // FAQ Accordion
    // ========================================
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all
            faqItems.forEach(i => i.classList.remove('active'));
            
            // Open clicked if wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });

    // ========================================
    // Back to Top
    // ========================================
    const backToTop = document.getElementById('backToTop');
    
    window.addEventListener('scroll', () => {
        if (window.pageYOffset > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    });
    
    backToTop.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ========================================
    // Contact Form - N8N WEBHOOK INTEGRATION
    // ========================================
    
    // CONFIGURAÇÃO DO N8N - ALTERE AQUI
    const N8N_WEBHOOK_URL = 'https://n8n.chatbotpro.com.br/webhook-test/contato-nr10'; // <-- SUBSTITUA PELA SUA URL
    const N8N_WEBHOOK_KEY = ''; // <-- Opcional: coloque sua chave de autenticação se configurada no n8n
    
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            // Verificar se configurou o URL
            if (N8N_WEBHOOK_URL.includes('SEU-N8N.com')) {
                showNotification('Configure o URL do n8n no arquivo js/main.js', 'error');
                console.log('%c[CONFIGURAÇÃO N8N NECESSÁRIA]', 'color: #ef4444; font-size: 16px; font-weight: bold;');
                console.log('%c1. No n8n, crie um workflow com nó Webhook (método POST)', 'color: #fbbf24');
                console.log('%c2. Copie a URL do webhook gerada', 'color: #fbbf24');
                console.log('%c3. No arquivo premium/js/main.js, substitua:', 'color: #fbbf24');
                console.log('%c   const N8N_WEBHOOK_URL = \'https://SEU-N8N.com/webhook/contato-nr10\'', 'color: #60a5fa');
                console.log('%c   pela sua URL (ex: https://n8n.seuservidor.com/webhook/contato)', 'color: #60a5fa');
                console.log('%c4. Salve o arquivo e teste o formulário', 'color: #fbbf24');
                return;
            }
            
            // Coletar dados do formulário
            const formData = new FormData(contactForm);
            const data = {
                name: formData.get('name'),
                email: formData.get('email'),
                phone: formData.get('phone') || '',
                company: formData.get('company') || '',
                interest: formData.get('interest'),
                message: formData.get('message') || '',
                data_envio: new Date().toISOString(),
                origem: window.location.href,
                user_agent: navigator.userAgent
            };
            
            // Validar campos obrigatórios
            if (!data.name || !data.email || !data.interest) {
                showNotification('Por favor, preencha nome, email e interesse.', 'error');
                return;
            }
            
            // Mostrar loading
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            submitBtn.disabled = true;
            
            try {
                console.log('%c[DEBUG] Enviando para:', 'color: #fbbf24', N8N_WEBHOOK_URL);
                console.log('%c[DEBUG] Dados:', 'color: #fbbf24', data);
                
                // Preparar headers
                const headers = {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                };
                
                // Adicionar chave de autenticação se configurada
                if (N8N_WEBHOOK_KEY) {
                    headers['X-Webhook-Key'] = N8N_WEBHOOK_KEY;
                }
                
                // Enviar para o n8n
                const response = await fetch(N8N_WEBHOOK_URL, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify(data),
                    mode: 'cors', // Explicitar modo CORS
                    cache: 'no-cache',
                });
                
                console.log('%c[DEBUG] Resposta HTTP:', 'color: #fbbf24', response.status);
                
                if (response.ok) {
                    const responseData = await response.json().catch(() => ({}));
                    console.log('%c[DEBUG] Resposta do servidor:', 'color: #00d4aa', responseData);
                    
                    showNotification('Solicitação enviada com sucesso! Entraremos em contato em breve.', 'success');
                    contactForm.reset();
                    console.log('%c[DADOS ENVIADOS PARA N8N]', 'color: #00d4aa', data);
                } else {
                    const errorText = await response.text();
                    console.error('%c[DEBUG] Erro na resposta:', 'color: #ef4444', errorText);
                    throw new Error(`Erro ${response.status}: ${errorText}`);
                }
                
            } catch (error) {
                console.error('%c[DEBUG] Erro completo:', 'color: #ef4444', error);
                
                // Verificar se é erro de CORS
                if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                    console.log('%c[DEBUG] Possível erro de CORS', 'color: #ef4444');
                    console.log('%c[SOLUÇÃO] Verifique se o n8n está configurado para aceitar CORS', 'color: #fbbf24');
                    
                    // Tentar método alternativo (formulário tradicional)
                    console.log('%c[TENTANDO MÉTODO ALTERNATIVO]', 'color: #fbbf24');
                    await submitViaFormPost(data);
                    return;
                }
                showNotification('Erro ao enviar. Tente novamente ou use o WhatsApp.', 'error');
            } finally {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }
        });
    }
    
    // ========================================
    // Fallback: Submit via Form POST (para evitar CORS)
    // ========================================
    function submitViaFormPost(data) {
        return new Promise((resolve) => {
            // Criar um formulário temporário
            const form = document.createElement('form');
            form.method = 'POST';
            form.action = N8N_WEBHOOK_URL;
            form.style.display = 'none';
            
            // Adicionar campos
            Object.keys(data).forEach(key => {
                const input = document.createElement('input');
                input.type = 'hidden';
                input.name = key;
                input.value = data[key];
                form.appendChild(input);
            });
            
            // Adicionar ao body e submeter
            document.body.appendChild(form);
            
            // Mostrar mensagem antes de enviar
            showNotification('Redirecionando para confirmação...', 'success');
            
            // Pequeno delay para mostrar a mensagem
            setTimeout(() => {
                form.submit();
            }, 1000);
            
            resolve();
        });
    }
    
    // ========================================
    // Notification Function
    // ========================================
    function showNotification(message, type = 'success') {
        // Remove existing
        const existing = document.querySelector('.notification');
        if (existing) existing.remove();
        
        // Create notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'}"></i>
            <span>${message}</span>
        `;
        
        // Styles
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 30px;
            background: ${type === 'success' ? '#00d4aa' : '#ef4444'};
            color: white;
            padding: 16px 24px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            gap: 12px;
            font-weight: 500;
            z-index: 10000;
            box-shadow: 0 10px 30px rgba(0,0,0,0.3);
            transform: translateX(120%);
            opacity: 0;
            transition: all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
        `;
        
        document.body.appendChild(notification);
        
        // Animate in
        requestAnimationFrame(() => {
            notification.style.transform = 'translateX(0)';
            notification.style.opacity = '1';
        });
        
        // Remove after delay
        setTimeout(() => {
            notification.style.transform = 'translateX(120%)';
            notification.style.opacity = '0';
            setTimeout(() => notification.remove(), 400);
        }, 5000);
    }

    // ========================================
    // Parallax Effect
    // ========================================
    const heroSection = document.querySelector('.hero');
    
    if (heroSection && window.matchMedia('(pointer: fine)').matches) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const rate = scrolled * 0.3;
            
            const particles = heroSection.querySelector('.hero-particles');
            if (particles) {
                particles.style.transform = `translateY(${rate}px)`;
            }
        });
    }

    // ========================================
    // Problem Cards Hover Effect
    // ========================================
    const problemCards = document.querySelectorAll('.problem-card');
    
    problemCards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            card.style.setProperty('--mouse-x', `${x}px`);
            card.style.setProperty('--mouse-y', `${y}px`);
        });
    });

    // ========================================
    // Module Cards Stagger Animation
    // ========================================
    const moduleCards = document.querySelectorAll('.module-card');
    
    const moduleObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 100);
                moduleObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    moduleCards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        moduleObserver.observe(card);
    });

    // ========================================
    // WhatsApp Link Configuration
    // ========================================
    const whatsappNumber = '5517991236884';
    
    if (whatsappNumber.length > 2) {
        const whatsappMessage = 'Olá! Gostaria de mais informações sobre o treinamento NR-10 Aplicada à Hotelaria.';
        
        document.querySelectorAll('a[href="https://wa.me/"]').forEach(link => {
            link.href = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;
        });
    }

    // ========================================
    // Typing Effect for Hero (Optional Enhancement)
    // ========================================
    const heroTitle = document.querySelector('.hero-title');
    
    if (heroTitle && window.matchMedia('(pointer: fine)').matches) {
        const titleLines = heroTitle.querySelectorAll('.title-line');
        
        // Simple reveal animation
        titleLines.forEach((line, index) => {
            line.style.opacity = '0';
            line.style.transform = 'translateY(30px)';
            
            setTimeout(() => {
                line.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
                line.style.opacity = '1';
                line.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }

    // ========================================
    // Pricing Spotlight Effect
    // ========================================
    const pricingGrid = document.querySelector('.pricing-spotlight');
    const spotlight = document.querySelector('.spotlight');
    
    if (pricingGrid && spotlight) {
        pricingGrid.addEventListener('mousemove', (e) => {
            const rect = pricingGrid.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            spotlight.style.left = `${x}px`;
            spotlight.style.top = `${y}px`;
        });
        
        pricingGrid.addEventListener('mouseenter', () => {
            spotlight.style.opacity = '1';
        });
        
        pricingGrid.addEventListener('mouseleave', () => {
            spotlight.style.opacity = '0';
        });
    }

    // ========================================
    // Reveal on Scroll (General)
    // ========================================
    const revealElements = document.querySelectorAll('.problem-card, .feature-item, .pricing-card, .delivery-tag, .trigger-card');
    
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });
    
    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

    // Debug: Verificar se formulário foi encontrado
    if (contactForm) {
        console.log('%c[DEBUG] Formulário encontrado e configurado', 'color: #00d4aa');
    } else {
        console.log('%c[DEBUG] ERRO: Formulário NÃO encontrado', 'color: #ef4444');
    }
    
    console.log('%c NR-10 Hotelaria ', 'background: linear-gradient(135deg, #d4af37, #e8c547); color: #0a0a0f; font-size: 24px; font-weight: bold; padding: 10px 20px; border-radius: 8px;');
    console.log('%c Premium Edition - Site carregado com sucesso! ', 'color: #d4af37; font-size: 14px;');
    console.log('%c WhatsApp configurado: 5517991236884 ', 'color: #25d366;');
    
    // Info do n8n
    console.log('%c n8n Webhook configurado: ', 'color: #00d4aa', N8N_WEBHOOK_URL);
    console.log('%c Se o formulário não funcionar, verifique: ', 'color: #fbbf24');
    console.log('%c 1. Se o workflow está ativo no n8n ', 'color: #fbbf24');
    console.log('%c 2. Se o CORS está configurado (veja N8N_CORS_CONFIG.md) ', 'color: #fbbf24');
    console.log('%c 3. Abra o console (F12) e tente enviar o formulário ', 'color: #fbbf24');
});
