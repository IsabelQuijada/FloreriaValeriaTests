/**
 * Base Gallery - Abstract class para galerías
 * Elimina duplicación entre diferentes galleries
 * 
 * @abstract
 */
class BaseGallery {
    constructor(categoryConfig) {
        if (this.constructor === BaseGallery) {
            throw new Error('BaseGallery is abstract and cannot be instantiated directly');
        }
        
        this.categoryConfig = categoryConfig;
        this.productManager = null;
        this.currentFilter = 'all';
        this.modal = null;
        this.currentProductIndex = 0;
        this.currentProducts = [];
        this.eventListeners = [];
        
        // Auto-registro global
        window[this.getGlobalInstanceName()] = this;
        
        this.init();
    }
    
    /**
     * Template method - debe ser implementado por subclases
     * @abstract
     */
    getGlobalInstanceName() {
        throw new Error('getGlobalInstanceName() must be implemented by subclass');
    }
    
    /**
     * Inicialización común
     */
    init() {
        this.initializeModal();
        this.setupProductManager();
        this.setupEventListeners();
        this.setupFilters();
        this.setupScrollToTop();
        
        // Hook para inicialización específica
        this.onInit();
    }
    
    /**
     * Hook para lógica específica de inicialización
     */
    onInit() {
        // Override en subclases si necesario
    }
    
    /**
     * Inicializa el modal
     */
    initializeModal() {
        this.modal = document.getElementById('quick-view-modal');
        if (!this.modal) {
            console.warn('Modal element not found');
            return;
        }
        
        this.setupModalEventListeners();
    }
    
    /**
     * Configura Product Manager
     */
    setupProductManager() {
        const productManagerMethod = `create${this.categoryConfig.name.replace(/\s+/g, '')}Gallery`;
        
        if (ProductManager[productManagerMethod]) {
            this.productManager = ProductManager[productManagerMethod](
                this.categoryConfig.containerId,
                this.getProducts()
            );
        } else {
            // Fallback genérico
            this.productManager = new ProductManager({
                containerId: this.categoryConfig.containerId,
                products: this.getProducts(),
                globalActions: this.getGlobalActions()
            });
        }
    }
    
    /**
     * Obtiene productos - debe ser implementado por subclases
     * @abstract
     */
    getProducts() {
        throw new Error('getProducts() must be implemented by subclass');
    }
    
    /**
     * Obtiene acciones globales para ProductManager
     */
    getGlobalActions() {
        return {
            onQuickView: (config, element, manager) => {
                this.openModal(config);
            },
            onAddToCart: (config, element, manager) => {
                this.handleContactProduct(config);
            }
        };
    }
    
    /**
     * Configura event listeners comunes
     */
    setupEventListeners() {
        // Mobile menu toggle
        this.addEventListenerSafe('menu-toggle', 'click', (e) => {
            this.toggleMobileMenu();
        });
        
        // Window resize
        this.addEventListenerSafe(window, 'resize', (e) => {
            this.handleResize();
        });
        
        // Cleanup on page unload
        this.addEventListenerSafe(window, 'beforeunload', () => {
            this.cleanup();
        });
    }
    
    /**
     * Añade event listener con tracking para cleanup
     */
    addEventListenerSafe(elementOrId, event, handler) {
        let element;
        
        if (typeof elementOrId === 'string') {
            element = document.getElementById(elementOrId);
            if (!element) {
                console.warn(`Element with id '${elementOrId}' not found`);
                return;
            }
        } else {
            element = elementOrId;
        }
        
        element.addEventListener(event, handler);
        this.eventListeners.push({ element, event, handler });
    }
    
    /**
     * Toggle del menú móvil
     */
    toggleMobileMenu() {
        const navMenu = document.getElementById('nav-menu');
        const menuToggle = document.getElementById('menu-toggle');
        
        if (navMenu && menuToggle) {
            navMenu.classList.toggle('active');
            menuToggle.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        }
    }
    
    /**
     * Manejo de resize
     */
    handleResize() {
        // Debounce resize events
        clearTimeout(this.resizeTimeout);
        this.resizeTimeout = setTimeout(() => {
            if (this.productManager && typeof this.productManager.handleResize === 'function') {
                this.productManager.handleResize();
            }
        }, 250);
    }
    
    /**
     * Configura filtros
     */
    setupFilters() {
        // Implementación específica en subclases
    }
    
    /**
     * Configura scroll to top
     */
    setupScrollToTop() {
        // Implementación común de scroll to top
        const scrollToTopBtn = document.getElementById('scroll-to-top');
        if (scrollToTopBtn) {
            this.addEventListenerSafe(window, 'scroll', () => {
                if (window.pageYOffset > 300) {
                    scrollToTopBtn.classList.add('visible');
                } else {
                    scrollToTopBtn.classList.remove('visible');
                }
            });
            
            this.addEventListenerSafe(scrollToTopBtn, 'click', () => {
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
        }
    }
    
    /**
     * Configura event listeners del modal
     */
    setupModalEventListeners() {
        if (!this.modal) return;
        
        // Close modal
        this.addEventListenerSafe('quick-view-close', 'click', () => {
            this.closeModal();
        });
        
        // Navigation
        this.addEventListenerSafe('quick-view-prev', 'click', () => {
            this.navigatePrev();
        });
        
        this.addEventListenerSafe('quick-view-next', 'click', () => {
            this.navigateNext();
        });
        
        // Click outside to close
        this.addEventListenerSafe(this.modal, 'click', (e) => {
            if (e.target === this.modal) {
                this.closeModal();
            }
        });
        
        // Keyboard navigation
        this.addEventListenerSafe(document, 'keydown', (e) => {
            if (!this.modal.classList.contains('active')) return;
            
            switch (e.key) {
                case 'Escape':
                    this.closeModal();
                    break;
                case 'ArrowLeft':
                    this.navigatePrev();
                    break;
                case 'ArrowRight':
                    this.navigateNext();
                    break;
            }
        });
    }
    
    /**
     * Abre el modal con configuración específica
     */
    openModal(config) {
        if (!this.modal) return;
        
        this.currentProducts = this.getProducts();
        this.currentProductIndex = this.currentProducts.findIndex(p => p.id === config.id);
        
        this.updateModalContent(config);
        this.modal.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
    
    /**
     * Cierra el modal
     */
    closeModal() {
        if (!this.modal) return;
        
        this.modal.classList.remove('active');
        document.body.style.overflow = '';
    }
    
    /**
     * Actualiza contenido del modal
     */
    updateModalContent(config) {
        if (!this.modal) return;
        
        const elements = {
            image: this.modal.querySelector('.quick-view-image'),
            title: this.modal.querySelector('.quick-view-title'),
            description: this.modal.querySelector('.quick-view-description'),
            category: this.modal.querySelector('.quick-view-category')
        };
        
        if (elements.image) elements.image.src = config.image;
        if (elements.title) elements.title.textContent = config.name;
        if (elements.description) elements.description.textContent = config.description;
        if (elements.category) elements.category.textContent = config.category;
        
        this.updateModalNavigation();
    }
    
    /**
     * Actualiza navegación del modal
     */
    updateModalNavigation() {
        const prevBtn = document.getElementById('quick-view-prev');
        const nextBtn = document.getElementById('quick-view-next');
        
        if (prevBtn) prevBtn.style.display = this.currentProductIndex > 0 ? 'block' : 'none';
        if (nextBtn) nextBtn.style.display = this.currentProductIndex < this.currentProducts.length - 1 ? 'block' : 'none';
    }
    
    /**
     * Navegar a producto anterior
     */
    navigatePrev() {
        if (this.currentProductIndex > 0) {
            this.currentProductIndex--;
            this.updateModalContent(this.currentProducts[this.currentProductIndex]);
        }
    }
    
    /**
     * Navegar a producto siguiente
     */
    navigateNext() {
        if (this.currentProductIndex < this.currentProducts.length - 1) {
            this.currentProductIndex++;
            this.updateModalContent(this.currentProducts[this.currentProductIndex]);
        }
    }
    
    /**
     * Maneja contacto por producto
     */
    handleContactProduct(config) {
        const message = this.generateWhatsAppMessage(config);
        const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
        window.open(whatsappUrl, '_blank');
    }
    
    /**
     * Genera mensaje de WhatsApp
     */
    generateWhatsAppMessage(config) {
        return `¡Hola! Me interesa el producto: ${config.name} de la categoría ${config.category}. ¿Podrían darme más información?`;
    }
    
    /**
     * Limpia recursos para evitar memory leaks
     */
    cleanup() {
        // Remove event listeners
        this.eventListeners.forEach(({ element, event, handler }) => {
            element.removeEventListener(event, handler);
        });
        this.eventListeners = [];
        
        // Clear timeouts
        if (this.resizeTimeout) {
            clearTimeout(this.resizeTimeout);
        }
        
        // Clean product manager
        if (this.productManager && typeof this.productManager.cleanup === 'function') {
            this.productManager.cleanup();
        }
    }
}

// Export para uso global
if (typeof window !== 'undefined') {
    window.BaseGallery = BaseGallery;
}

if (typeof module !== 'undefined' && module.exports) {
    module.exports = BaseGallery;
}