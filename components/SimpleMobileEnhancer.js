/**
 * SimpleMobileEnhancer - Versión simplificada y ligera de mejoras móviles
 * 
 * Solo incluye las funcionalidades realmente utilizadas y necesarias
 * para mejorar la experiencia móvil sin código innecesario.
 */

class SimpleMobileEnhancer {
    constructor() {
        this.isMobile = this.detectMobile();
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        
        if (this.isMobile) {
            this.init();
        }
    }
    
    /**
     * Detecta si es un dispositivo móvil
     */
    detectMobile() {
        return window.innerWidth <= 768 || 
               /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    }
    
    /**
     * Inicialización
     */
    init() {
        this.setupTouchFeedback();
        this.setupImprovedModals();
        this.setupScrollOptimizations();
        
        console.log('📱 SimpleMobileEnhancer inicializado');
    }
    
    /**
     * Configurar feedback táctil básico
     */
    setupTouchFeedback() {
        // Solo para botones importantes (elementos existentes)
        document.querySelectorAll('.btn, .contact-btn').forEach(button => {
            this.addBasicTouchFeedback(button);
        });
        
        // Feedback básico para product cards (elementos existentes)
        document.querySelectorAll('.product-card').forEach(card => {
            this.addCardTouchFeedback(card);
        });

        // Observar nuevos elementos añadidos dinámicamente al DOM
        if (window.MutationObserver) {
            const observer = new MutationObserver(mutations => {
                mutations.forEach(mutation => {
                    mutation.addedNodes.forEach(node => {
                        if (!(node instanceof HTMLElement)) {
                            return;
                        }

                        // Botones importantes añadidos dinámicamente
                        if (node.matches('.btn, .contact-btn')) {
                            this.addBasicTouchFeedback(node);
                        }
                        node.querySelectorAll?.('.btn, .contact-btn').forEach(button => {
                            this.addBasicTouchFeedback(button);
                        });

                        // Product cards añadidos dinámicamente
                        if (node.matches('.product-card')) {
                            this.addCardTouchFeedback(node);
                        }
                        node.querySelectorAll?.('.product-card').forEach(card => {
                            this.addCardTouchFeedback(card);
                        });
                    });
                });
            });

            observer.observe(document.body, {
                childList: true,
                subtree: true
            });
        }
    }
    
    /**
     * Añade feedback táctil básico a un elemento
     */
    addBasicTouchFeedback(element) {
        let touchTimeout;
        
        element.addEventListener('touchstart', (e) => {
            if (this.prefersReducedMotion) return;
            
            element.style.transform = 'scale(0.98)';
            element.style.transition = 'transform 0.1s ease';
            
            // Vibración sutil si está disponible
            if (navigator.vibrate) {
                navigator.vibrate(10);
            }
            
            touchTimeout = setTimeout(() => {
                this.resetElementState(element);
            }, 150);
        });
        
        element.addEventListener('touchend', () => {
            clearTimeout(touchTimeout);
            setTimeout(() => this.resetElementState(element), 100);
        });
        
        element.addEventListener('touchcancel', () => {
            clearTimeout(touchTimeout);
            this.resetElementState(element);
        });
    }
    
    /**
     * Añade feedback táctil a product cards
     */
    addCardTouchFeedback(card) {
        let touchTimeout;
        
        card.addEventListener('touchstart', (e) => {
            if (this.prefersReducedMotion) return;
            
            card.style.transform = 'scale(0.98)';
            card.style.transition = 'transform 0.1s ease';
            
            touchTimeout = setTimeout(() => {
                this.resetElementState(card);
            }, 150);
        });
        
        card.addEventListener('touchend', () => {
            clearTimeout(touchTimeout);
            setTimeout(() => this.resetElementState(card), 100);
        });
        
        card.addEventListener('touchcancel', () => {
            clearTimeout(touchTimeout);
            this.resetElementState(card);
        });
    }
    
    /**
     * Resetea el estado de un elemento
     */
    resetElementState(element) {
        element.style.transform = '';
        element.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';
    }
    
    /**
     * Mejoras básicas para modales
     */
    setupImprovedModals() {
        const modals = document.querySelectorAll('.quick-view-modal');
        
        modals.forEach(modal => {
            this.addSwipeToCloseModal(modal);
        });
    }
    
    /**
     * Añade swipe para cerrar modal
     */
    addSwipeToCloseModal(modal) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;
        const content = modal.querySelector('.quick-view-content');
        
        if (!content) return;
        
        content.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
        });
        
        content.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            currentY = e.touches[0].clientY;
            const diffY = currentY - startY;
            
            // Solo permitir swipe hacia abajo
            if (diffY > 0 && !this.prefersReducedMotion) {
                content.style.transform = `translateY(${diffY * 0.5}px)`;
                modal.style.backgroundColor = `rgba(0, 0, 0, ${0.8 - diffY * 0.002})`;
            }
        });
        
        content.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffY = currentY - startY;
            
            // Si el swipe es suficiente, cerrar modal
            if (diffY > 100) {
                this.closeModal(modal);
            } else {
                // Volver a posición original
                content.style.transform = '';
                modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
            }
            
            isDragging = false;
        });
    }
    
    /**
     * Cierra un modal
     */
    closeModal(modal) {
        modal.classList.remove('active');
        modal.style.display = 'none';
        
        // Reset styles
        const content = modal.querySelector('.quick-view-content');
        if (content) {
            content.style.transform = '';
        }
        modal.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
    }
    
    /**
     * Optimizaciones básicas de scroll
     */
    setupScrollOptimizations() {
        // Throttle scroll events para mejor rendimiento
        let scrollTimeout;
        
        window.addEventListener('scroll', () => {
            if (!scrollTimeout) {
                scrollTimeout = setTimeout(() => {
                    // Aquí se pueden añadir funciones que necesiten ejecutarse en scroll
                    scrollTimeout = null;
                }, 16); // ~60fps
            }
        }, { passive: true });
    }
    
    /**
     * Método estático para añadir bounce animation
     */
    static addBounceAnimation(element) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        element.style.animation = 'none';
        element.offsetHeight; // trigger reflow
        element.style.animation = 'mobile-bounce 0.6s ease';
        
        setTimeout(() => {
            element.style.animation = '';
        }, 600);
    }
    
    /**
     * Método estático para añadir success animation
     */
    static addSuccessAnimation(element) {
        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
        
        element.classList.add('mobile-success');
        setTimeout(() => {
            element.classList.remove('mobile-success');
        }, 600);
    }
}

// CSS básico para las animaciones
const mobileStyles = `
@keyframes mobile-bounce {
    0%, 20%, 53%, 80%, 100% { transform: translate3d(0, 0, 0); }
    40%, 43% { transform: translate3d(0, -8px, 0); }
    70% { transform: translate3d(0, -4px, 0); }
    90% { transform: translate3d(0, -2px, 0); }
}

.mobile-success {
    animation: mobile-success-pulse 0.6s ease-out;
}

@keyframes mobile-success-pulse {
    0% { transform: scale(1); }
    50% { transform: scale(1.05); }
    100% { transform: scale(1); }
}

@media (prefers-reduced-motion: reduce) {
    * {
        animation-duration: 0.01ms !important;
        animation-iteration-count: 1 !important;
        transition-duration: 0.01ms !important;
    }
}
`;

// Añadir estilos al documento
const styleElement = document.createElement('style');
styleElement.textContent = mobileStyles;
document.head.appendChild(styleElement);

// Auto-inicializar
document.addEventListener('DOMContentLoaded', () => {
    window.simpleMobileEnhancer = new SimpleMobileEnhancer();
});

// Exportar para uso global
if (typeof window !== 'undefined') {
    window.SimpleMobileEnhancer = SimpleMobileEnhancer;
}