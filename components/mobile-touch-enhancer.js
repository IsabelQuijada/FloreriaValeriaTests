/**
 * Mobile Touch Enhancement Script
 * Mejoras de interacción táctil para categorías de productos
 */

class MobileTouchEnhancer {
    constructor() {
        this.init();
    }

    init() {
        if (this.isMobileDevice()) {
            this.setupTouchFeedback();
            this.setupImprovedModals();
            this.setupFilterEnhancements();
            this.setupPerformanceOptimizations();
        }
    }

    isMobileDevice() {
        return window.innerWidth <= 768 || /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }

    /**
     * Configurar feedback táctil mejorado para cards y botones
     */
    setupTouchFeedback() {
        // Agregar ripple effect a botones
        document.querySelectorAll('.contact-btn, .filter-btn').forEach(button => {
            this.addRippleEffect(button);
        });

        // Feedback táctil para product cards
        document.querySelectorAll('.product-card').forEach(card => {
            this.addCardTouchFeedback(card);
        });

        // Mejorar feedback de filtros
        this.enhanceFilterButtons();
    }

    /**
     * Agregar efecto ripple a elementos
     */
    addRippleEffect(element) {
        element.classList.add('btn-ripple');
        
        element.addEventListener('touchstart', (e) => {
            // Crear el elemento ripple
            const ripple = document.createElement('span');
            const rect = element.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.touches[0].clientX - rect.left - size / 2;
            const y = e.touches[0].clientY - rect.top - size / 2;
            
            ripple.style.cssText = `
                position: absolute;
                border-radius: 50%;
                background: rgba(255, 255, 255, 0.3);
                transform: scale(0);
                animation: ripple 0.6s linear;
                left: ${x}px;
                top: ${y}px;
                width: ${size}px;
                height: ${size}px;
                pointer-events: none;
                z-index: 1;
            `;
            
            element.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    /**
     * Mejorar feedback de cards
     */
    addCardTouchFeedback(card) {
        let touchTimeout;
        
        card.addEventListener('touchstart', (e) => {
            e.preventDefault();
            card.style.transform = 'scale(0.98)';
            card.style.transition = 'transform 0.1s ease';
            
            // Feedback visual adicional
            card.style.backgroundColor = '#fafafa';
            
            // Vibración táctil si está disponible
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            
            touchTimeout = setTimeout(() => {
                this.resetCardState(card);
            }, 150);
        });
        
        card.addEventListener('touchend', (e) => {
            clearTimeout(touchTimeout);
            setTimeout(() => this.resetCardState(card), 100);
            
            // Simular click para abrir modal
            if (card.dataset.productId) {
                this.handleCardTap(card);
            }
        });
        
        card.addEventListener('touchcancel', () => {
            clearTimeout(touchTimeout);
            this.resetCardState(card);
        });
    }

    resetCardState(card) {
        card.style.transform = '';
        card.style.backgroundColor = '';
        card.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }

    handleCardTap(card) {
        // Implementar lógica para abrir modal o vista rápida
        const productId = card.dataset.productId;
        if (window.ramosClasicosGallery && window.ramosClasicosGallery.openModal) {
            window.ramosClasicosGallery.openModal(productId);
        }
    }

    /**
     * Mejorar modales para mobile
     */
    setupImprovedModals() {
        const modals = document.querySelectorAll('.quick-view-modal, .modal-overlay');
        
        modals.forEach(modal => {
            this.addSwipeToCloseModal(modal);
            this.improveModalAccessibility(modal);
        });
    }

    addSwipeToCloseModal(modal) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        const content = modal.querySelector('.quick-view-content, .modal-content');
        
        if (!content) return;
        
        content.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            content.style.transition = 'none';
        });
        
        content.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentY = e.touches[0].clientY;
            const diffY = currentY - startY;
            
            if (diffY > 0) {
                content.style.transform = `translateY(${diffY * 0.5}px)`;
                modal.style.backgroundColor = `rgba(0, 0, 0, ${0.8 - diffY * 0.002})`;
            }
        });
        
        content.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffY = currentY - startY;
            isDragging = false;
            
            content.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
            
            if (diffY > 100) {
                this.closeModal(modal);
            } else {
                content.style.transform = '';
                modal.style.backgroundColor = '';
            }
        });
    }

    closeModal(modal) {
        if (modal.classList.contains('active')) {
            modal.classList.remove('active');
            document.body.classList.remove('modal-open');
        }
    }

    improveModalAccessibility(modal) {
        // Agregar indicador de swipe
        const content = modal.querySelector('.quick-view-content, .modal-content');
        if (content && !content.querySelector('.modal-swipe-indicator')) {
            const indicator = document.createElement('div');
            indicator.className = 'modal-swipe-indicator';
            content.appendChild(indicator);
        }
        
        // Mejorar botón de cerrar
        const closeBtn = modal.querySelector('.quick-view-close, .modal-close');
        if (closeBtn) {
            closeBtn.setAttribute('aria-label', 'Cerrar vista rápida');
            closeBtn.style.minWidth = '44px';
            closeBtn.style.minHeight = '44px';
        }
    }

    /**
     * Mejorar filtros para mobile
     */
    setupFilterEnhancements() {
        const filterContainer = document.querySelector('.filter-buttons');
        if (!filterContainer) return;
        
        // Scroll horizontal suave
        filterContainer.style.scrollBehavior = 'smooth';
        filterContainer.style.webkitOverflowScrolling = 'touch';
        
        // Indicadores de scroll
        this.addScrollIndicators(filterContainer);
        
        // Mejorar feedback de filtros
        this.enhanceFilterButtons();
    }

    addScrollIndicators(container) {
        if (container.scrollWidth > container.clientWidth) {
            container.classList.add('has-scroll');
            
            // Agregar fade indicators en CSS
            container.style.maskImage = 'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)';
            container.style.webkitMaskImage = 'linear-gradient(to right, transparent 0, black 20px, black calc(100% - 20px), transparent 100%)';
        }
    }

    enhanceFilterButtons() {
        document.querySelectorAll('.filter-btn').forEach(button => {
            button.addEventListener('touchstart', () => {
                button.style.transform = 'scale(0.95)';
                
                if (navigator.vibrate) {
                    navigator.vibrate(5);
                }
            });
            
            button.addEventListener('touchend', () => {
                setTimeout(() => {
                    button.style.transform = '';
                }, 100);
            });
        });
    }

    /**
     * Optimizaciones de rendimiento
     */
    setupPerformanceOptimizations() {
        // Lazy loading mejorado para imágenes
        this.setupLazyLoading();
        
        // Optimizar scrolling
        this.optimizeScrolling();
        
        // Preload crítico
        this.preloadCriticalResources();
    }

    setupLazyLoading() {
        if ('IntersectionObserver' in window) {
            const imageObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        const img = entry.target;
                        img.src = img.dataset.src;
                        img.classList.remove('lazy-load');
                        imageObserver.unobserve(img);
                    }
                });
            }, {
                rootMargin: '50px'
            });
            
            document.querySelectorAll('img[data-src]').forEach(img => {
                imageObserver.observe(img);
            });
        }
    }

    optimizeScrolling() {
        // Throttle scroll events
        let scrollTimeout;
        window.addEventListener('scroll', () => {
            if (scrollTimeout) return;
            
            scrollTimeout = setTimeout(() => {
                scrollTimeout = null;
                this.handleScroll();
            }, 16); // 60fps
        }, { passive: true });
    }

    handleScroll() {
        // Implementar lógica de scroll optimizada
        const scrolled = window.pageYOffset;
        const rate = scrolled * -0.5;
        
        // Parallax sutil para hero section
        const hero = document.querySelector('.gallery-hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.transform = `translate3d(0, ${rate}px, 0)`;
        }
    }

    preloadCriticalResources() {
        // Precargar la primera imagen visible
        const firstImage = document.querySelector('.product-image');
        if (firstImage && firstImage.dataset.src) {
            const link = document.createElement('link');
            link.rel = 'preload';
            link.as = 'image';
            link.href = firstImage.dataset.src;
            document.head.appendChild(link);
        }
    }

    /**
     * Utilidades adicionales
     */
    static addBounceAnimation(element) {
        element.classList.add('bounce-feedback');
        setTimeout(() => {
            element.classList.remove('bounce-feedback');
        }, 400);
    }

    static addSuccessAnimation(element) {
        element.classList.add('success-feedback');
        setTimeout(() => {
            element.classList.remove('success-feedback');
        }, 600);
    }
}

// Agregar estilos CSS dinámicamente
const style = document.createElement('style');
style.textContent = `
@keyframes ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}
`;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        new MobileTouchEnhancer();
    });
} else {
    new MobileTouchEnhancer();
}

// Exportar para uso global
window.MobileTouchEnhancer = MobileTouchEnhancer;