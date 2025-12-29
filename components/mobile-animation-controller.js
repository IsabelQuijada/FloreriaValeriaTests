/**
 * Mobile Animation Controller
 * Controlador de animaciones para dispositivos móviles
 */

class MobileAnimationController {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.init();
    }

    init() {
        if (!this.isMobile) return;
        
        this.setupIntersectionObserver();
        this.setupFilterAnimations();
        this.setupModalAnimations();
        this.setupLoadingAnimations();
        this.addUtilityMethods();
    }

    /**
     * Configurar animaciones de aparición basadas en scroll
     */
    setupIntersectionObserver() {
        if (this.prefersReducedMotion) return;

        const observerOptions = {
            root: null,
            rootMargin: '0px 0px -50px 0px',
            threshold: 0.1
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry, index) => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        entry.target.classList.add('mobile-animate-in');
                    }, index * 100); // Stagger animation
                    
                    observer.unobserve(entry.target);
                }
            });
        }, observerOptions);

        // Observar product cards
        document.querySelectorAll('.product-card').forEach(card => {
            card.style.opacity = '0';
            card.style.transform = 'translateY(30px)';
            observer.observe(card);
        });

        // Agregar estilos de animación
        this.addStyles(`
            .mobile-animate-in {
                opacity: 1 !important;
                transform: translateY(0) !important;
                transition: all 0.6s cubic-bezier(0.4, 0, 0.2, 1) !important;
            }
        `);
    }

    /**
     * Configurar animaciones para filtros
     */
    setupFilterAnimations() {
        const filterButtons = document.querySelectorAll('.filter-btn');
        
        filterButtons.forEach((button, index) => {
            // Animación de entrada
            if (!this.prefersReducedMotion) {
                button.style.opacity = '0';
                button.style.transform = 'scale(0.8)';
                
                setTimeout(() => {
                    button.style.opacity = '1';
                    button.style.transform = 'scale(1)';
                    button.style.transition = 'all 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55)';
                }, index * 50);
            }

            // Animación de tap
            button.addEventListener('touchstart', () => {
                if (!this.prefersReducedMotion) {
                    button.classList.add('mobile-press-feedback');
                }
                
                // Vibración sutil
                if (navigator.vibrate) {
                    navigator.vibrate(10);
                }
            });

            button.addEventListener('touchend', () => {
                setTimeout(() => {
                    button.classList.remove('mobile-press-feedback');
                }, 100);
            });

            // Animación de activación
            button.addEventListener('click', () => {
                if (!this.prefersReducedMotion) {
                    button.classList.add('mobile-bounce-attention');
                    setTimeout(() => {
                        button.classList.remove('mobile-bounce-attention');
                    }, 800);
                }
            });
        });
    }

    /**
     * Configurar animaciones para modales
     */
    setupModalAnimations() {
        const modal = document.querySelector('.quick-view-modal');
        if (!modal) return;

        const modalContent = modal.querySelector('.quick-view-content, .modal-content');
        if (!modalContent) return;

        // Override del método de apertura de modal
        this.originalModalOpen = modal.style.display;
        
        // Interceptar apertura de modal
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                if (mutation.type === 'attributes' && mutation.attributeName === 'class') {
                    if (modal.classList.contains('active')) {
                        this.animateModalOpen(modal, modalContent);
                    }
                }
            });
        });

        observer.observe(modal, { attributes: true });

        // Gesture para cerrar
        this.setupModalGestures(modal, modalContent);
    }

    animateModalOpen(modal, content) {
        if (this.prefersReducedMotion) return;

        content.style.transform = 'translateY(100vh)';
        content.style.transition = 'none';

        // Force reflow
        content.offsetHeight;

        content.style.transition = 'transform 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        content.style.transform = 'translateY(0)';

        // Añadir clase para efectos adicionales
        content.classList.add('mobile-modal-enter');
        setTimeout(() => {
            content.classList.remove('mobile-modal-enter');
        }, 400);
    }

    setupModalGestures(modal, content) {
        let startY = 0;
        let currentY = 0;
        let isDragging = false;

        content.addEventListener('touchstart', (e) => {
            startY = e.touches[0].clientY;
            isDragging = true;
            content.style.transition = 'none';
        });

        content.addEventListener('touchmove', (e) => {
            if (!isDragging) return;

            currentY = e.touches[0].clientY;
            const diffY = Math.max(0, currentY - startY);

            if (diffY > 0) {
                const opacity = Math.max(0.3, 1 - (diffY / 400));
                content.style.transform = `translateY(${diffY * 0.8}px)`;
                modal.style.backgroundColor = `rgba(0, 0, 0, ${0.8 * opacity})`;
            }
        });

        content.addEventListener('touchend', () => {
            if (!isDragging) return;
            
            const diffY = currentY - startY;
            isDragging = false;

            content.style.transition = 'transform 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

            if (diffY > 120) {
                // Cerrar modal
                content.style.transform = 'translateY(100vh)';
                setTimeout(() => {
                    modal.classList.remove('active');
                    document.body.classList.remove('modal-open');
                    content.style.transform = '';
                    modal.style.backgroundColor = '';
                }, 300);
            } else {
                // Volver a posición
                content.style.transform = 'translateY(0)';
                modal.style.backgroundColor = '';
            }
        });
    }

    /**
     * Configurar animaciones de loading
     */
    setupLoadingAnimations() {
        // Skeleton loading para nuevos elementos
        const observer = new MutationObserver((mutations) => {
            mutations.forEach((mutation) => {
                mutation.addedNodes.forEach((node) => {
                    if (node.nodeType === 1 && node.classList && node.classList.contains('product-card')) {
                        this.animateNewCard(node);
                    }
                });
            });
        });

        const galleryGrid = document.querySelector('.gallery-grid');
        if (galleryGrid) {
            observer.observe(galleryGrid, { childList: true });
        }
    }

    animateNewCard(card) {
        if (this.prefersReducedMotion) return;

        card.style.opacity = '0';
        card.style.transform = 'scale(0.8) translateY(20px)';
        
        // Force reflow
        card.offsetHeight;
        
        card.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
        card.style.opacity = '1';
        card.style.transform = 'scale(1) translateY(0)';
    }

    /**
     * Métodos utilitarios públicos
     */
    addUtilityMethods() {
        window.MobileAnimations = {
            bounce: (element) => {
                if (this.prefersReducedMotion) return;
                element.classList.add('mobile-bounce');
                setTimeout(() => element.classList.remove('mobile-bounce'), 600);
            },

            shake: (element) => {
                if (this.prefersReducedMotion) return;
                element.classList.add('mobile-shake-error');
                setTimeout(() => element.classList.remove('mobile-shake-error'), 500);
            },

            pulse: (element) => {
                if (this.prefersReducedMotion) return;
                element.classList.add('mobile-success-pulse');
                setTimeout(() => element.classList.remove('mobile-success-pulse'), 800);
            },

            ripple: (element, x, y) => {
                if (this.prefersReducedMotion) return;
                
                const ripple = document.createElement('span');
                const size = Math.max(element.offsetWidth, element.offsetHeight);
                
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(255, 255, 255, 0.3);
                    transform: scale(0);
                    animation: mobile-ripple 0.6s linear;
                    left: ${x - size/2}px;
                    top: ${y - size/2}px;
                    width: ${size}px;
                    height: ${size}px;
                    pointer-events: none;
                    z-index: 10;
                `;
                
                element.appendChild(ripple);
                
                setTimeout(() => ripple.remove(), 600);
            },

            staggerShow: (elements, delay = 100) => {
                if (this.prefersReducedMotion) return;
                
                elements.forEach((element, index) => {
                    element.style.opacity = '0';
                    element.style.transform = 'translateY(20px)';
                    
                    setTimeout(() => {
                        element.style.transition = 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)';
                        element.style.opacity = '1';
                        element.style.transform = 'translateY(0)';
                    }, index * delay);
                });
            }
        };
    }

    /**
     * Agregar estilos dinámicamente
     */
    addStyles(css) {
        const style = document.createElement('style');
        style.textContent = css;
        document.head.appendChild(style);
    }

    /**
     * Cleanup al cambiar de tamaño de ventana
     */
    handleResize() {
        const newIsMobile = window.innerWidth <= 768;
        if (newIsMobile !== this.isMobile) {
            this.isMobile = newIsMobile;
            if (!newIsMobile) {
                // Limpiar animaciones mobile
                document.querySelectorAll('.product-card').forEach(card => {
                    card.style.opacity = '';
                    card.style.transform = '';
                    card.style.transition = '';
                });
            }
        }
    }
}

// Agregar estilos de animación dinámicos
const dynamicStyles = `
@keyframes mobile-ripple {
    to {
        transform: scale(4);
        opacity: 0;
    }
}

.mobile-press-feedback {
    transform: scale(0.95) !important;
    filter: brightness(0.9);
    transition: all 0.1s cubic-bezier(0.4, 0, 0.2, 1) !important;
}
`;

const style = document.createElement('style');
style.textContent = dynamicStyles;
document.head.appendChild(style);

// Inicializar cuando el DOM esté listo
let animationController;

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        animationController = new MobileAnimationController();
    });
} else {
    animationController = new MobileAnimationController();
}

// Manejar cambios de tamaño
window.addEventListener('resize', () => {
    if (animationController) {
        animationController.handleResize();
    }
});

// Exportar para uso global
window.MobileAnimationController = MobileAnimationController;