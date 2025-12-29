/**
 * Enhanced ProductCard Component - Refactorizado con mejores prácticas
 * Versión mejorada con mejor rendimiento, accesibilidad y mantenibilidad
 */

class ProductCard {
    constructor(config) {
        this.config = this.validateAndMergeConfig(config);
        this.element = null;
        this.observers = [];
        this.eventListeners = [];
        this.isRendered = false;
        
        // Bind methods
        this.handleClick = this.handleClick.bind(this);
        this.handleKeyDown = this.handleKeyDown.bind(this);
        this.handleImageLoad = this.handleImageLoad.bind(this);
        this.handleImageError = this.handleImageError.bind(this);
        
        this.render();
    }
    
    /**
     * Valida y fusiona configuración con defaults
     * @private
     */
    validateAndMergeConfig(config) {
        const defaults = {
            id: `product-${Date.now()}`,
            name: 'Producto sin nombre',
            description: '',
            image: '',
            price: '',
            category: 'general',
            link: '#',
            lazy: true,
            showPrice: false,
            showCategory: true,
            animations: true,
            onQuickView: null,
            onAddToCart: null,
            onImageLoad: null,
            onImageError: null,
            customClasses: [],
            ariaLabel: null,
            fallbackImage: '/assets/placeholders/product-fallback.jpg'
        };
        
        const merged = { ...defaults, ...config };
        
        // Validaciones
        if (!merged.image) {
            console.warn(`ProductCard ${merged.id}: No image provided`);
        }
        
        if (!merged.name || merged.name.trim().length === 0) {
            console.warn(`ProductCard ${merged.id}: Name is empty`);
        }
        
        return merged;
    }
    
    /**
     * Renderiza el componente
     */
    render() {
        if (this.isRendered) {
            console.warn(`ProductCard ${this.config.id} is already rendered`);
            return this.element;
        }
        
        this.element = this.createElement();
        this.setupEventListeners();
        this.setupObservers();
        this.isRendered = true;
        
        return this.element;
    }
    
    /**
     * Crea el elemento DOM
     * @private
     */
    createElement() {
        const article = document.createElement('article');
        article.className = this.getCardClasses();
        article.setAttribute('data-product-id', this.config.id);
        article.setAttribute('role', 'button');
        article.setAttribute('tabindex', '0');
        article.setAttribute('aria-label', this.getAriaLabel());
        
        // Estructura del componente
        article.innerHTML = `
            <div class="product-card-media">
                ${this.createImageElement()}
                ${this.config.showCategory ? this.createCategoryBadge() : ''}
                <div class="product-card-overlay">
                    <button class="quick-view-btn" aria-label="Vista rápida de ${this.config.name}" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                            <circle cx="12" cy="12" r="3"/>
                        </svg>
                        Vista Rápida
                    </button>
                </div>
            </div>
            <div class="product-card-content">
                <h3 class="product-card-title">${this.escapeHtml(this.config.name)}</h3>
                ${this.config.description ? `<p class="product-card-description">${this.escapeHtml(this.config.description)}</p>` : ''}
                ${this.config.showPrice && this.config.price ? `<div class="product-card-price">${this.escapeHtml(this.config.price)}</div>` : ''}
                <div class="product-card-actions">
                    <button class="contact-btn" aria-label="Contactar sobre ${this.config.name}" type="button">
                        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                            <path d="M21 15a2 2 0 0 1-2 2l-7-4L4 16l-2-2 7-4 7-4 5 5z"/>
                        </svg>
                        Contactar
                    </button>
                </div>
            </div>
        `;
        
        return article;
    }
    
    /**
     * Crea elemento de imagen con lazy loading
     * @private
     */
    createImageElement() {
        const imgAttributes = {
            alt: this.config.name,
            loading: this.config.lazy ? 'lazy' : 'eager',
            decoding: 'async',
            class: 'product-card-image'
        };
        
        if (this.config.lazy) {
            imgAttributes['data-src'] = this.config.image;
            imgAttributes.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE2cHgiIGZpbGw9IiM5OTk5OTkiPkNhcmdhbmRvLi4uPC90ZXh0Pjwvc3ZnPg==';
        } else {
            imgAttributes.src = this.config.image;
        }
        
        const attributeString = Object.entries(imgAttributes)
            .map(([key, value]) => `${key}="${this.escapeHtml(value)}"`)
            .join(' ');
        
        return `<img ${attributeString}>`;
    }
    
    /**
     * Crea badge de categoría
     * @private
     */
    createCategoryBadge() {
        if (!this.config.category || this.config.category === 'general') {
            return '';
        }
        
        return `<span class="product-card-category">${this.escapeHtml(this.config.category)}</span>`;
    }
    
    /**
     * Obtiene clases CSS del card
     * @private
     */
    getCardClasses() {
        const baseClasses = ['product-card', 'card-base'];
        
        if (this.config.animations) {
            baseClasses.push('product-card-animated');
        }
        
        if (this.config.customClasses && Array.isArray(this.config.customClasses)) {
            baseClasses.push(...this.config.customClasses);
        }
        
        return baseClasses.join(' ');
    }
    
    /**
     * Obtiene aria-label apropiado
     * @private
     */
    getAriaLabel() {
        if (this.config.ariaLabel) {
            return this.config.ariaLabel;
        }
        
        return `Ver detalles del producto ${this.config.name}${this.config.category ? ` de la categoría ${this.config.category}` : ''}`;
    }
    
    /**
     * Configura event listeners
     * @private
     */
    setupEventListeners() {
        if (!this.element) return;
        
        // Click principal del card
        this.addEventListenerSafe(this.element, 'click', this.handleClick);
        this.addEventListenerSafe(this.element, 'keydown', this.handleKeyDown);
        
        // Botón de vista rápida
        const quickViewBtn = this.element.querySelector('.quick-view-btn');
        if (quickViewBtn) {
            this.addEventListenerSafe(quickViewBtn, 'click', (e) => {
                e.stopPropagation();
                this.handleQuickView();
            });
        }
        
        // Botón de contacto
        const contactBtn = this.element.querySelector('.contact-btn');
        if (contactBtn) {
            this.addEventListenerSafe(contactBtn, 'click', (e) => {
                e.stopPropagation();
                this.handleContact();
            });
        }
        
        // Eventos de imagen
        const image = this.element.querySelector('.product-card-image');
        if (image) {
            this.addEventListenerSafe(image, 'load', this.handleImageLoad);
            this.addEventListenerSafe(image, 'error', this.handleImageError);
        }
    }
    
    /**
     * Añade event listener con tracking
     * @private
     */
    addEventListenerSafe(element, event, handler, options = {}) {
        element.addEventListener(event, handler, options);
        this.eventListeners.push({ element, event, handler, options });
    }
    
    /**
     * Configura observers (Intersection, ResizeObserver, etc.)
     * @private
     */
    setupObservers() {
        if (!this.element) return;
        
        // Intersection Observer para animaciones
        if (this.config.animations && 'IntersectionObserver' in window) {
            const intersectionObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.animateIn();
                        intersectionObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '50px'
            });
            
            intersectionObserver.observe(this.element);
            this.observers.push(intersectionObserver);
        }
        
        // Lazy loading observer para imágenes
        if (this.config.lazy && 'IntersectionObserver' in window) {
            const lazyObserver = new IntersectionObserver((entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadImage(entry.target);
                        lazyObserver.unobserve(entry.target);
                    }
                });
            }, {
                threshold: 0.1,
                rootMargin: '100px'
            });
            
            const image = this.element.querySelector('.product-card-image');
            if (image && image.hasAttribute('data-src')) {
                lazyObserver.observe(image);
                this.observers.push(lazyObserver);
            }
        }
    }
    
    /**
     * Maneja click principal
     * @private
     */
    handleClick(event) {
        if (event.target.closest('button')) return; // Evitar conflictos con botones
        
        this.handleQuickView();
    }
    
    /**
     * Maneja navegación por teclado
     * @private
     */
    handleKeyDown(event) {
        if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            this.handleClick(event);
        }
    }
    
    /**
     * Maneja vista rápida
     * @private
     */
    handleQuickView() {
        if (typeof this.config.onQuickView === 'function') {
            this.config.onQuickView(this.config, this.element);
        } else {
            // Fallback para compatibilidad
            if (window.handleQuickView) {
                window.handleQuickView(this.config, this.element);
            }
        }
        
        // Analytics
        this.trackEvent('quick_view', {
            product_id: this.config.id,
            product_name: this.config.name,
            category: this.config.category
        });
    }
    
    /**
     * Maneja contacto
     * @private
     */
    handleContact() {
        if (typeof this.config.onAddToCart === 'function') {
            this.config.onAddToCart(this.config, this.element);
        } else {
            // Fallback - generar mensaje WhatsApp
            const message = `¡Hola! Me interesa el producto: ${this.config.name}. ¿Podrían darme más información?`;
            const whatsappUrl = `https://wa.me/523335558928?text=${encodeURIComponent(message)}`;
            window.open(whatsappUrl, '_blank');
        }
        
        // Analytics
        this.trackEvent('contact_product', {
            product_id: this.config.id,
            product_name: this.config.name,
            category: this.config.category
        });
    }
    
    /**
     * Carga imagen lazy
     * @private
     */
    loadImage(img) {
        const src = img.getAttribute('data-src');
        if (!src) return;
        
        img.classList.add('loading');
        img.src = src;
        img.removeAttribute('data-src');
    }
    
    /**
     * Maneja carga exitosa de imagen
     * @private
     */
    handleImageLoad(event) {
        const img = event.target;
        img.classList.remove('loading');
        img.classList.add('loaded');
        
        if (typeof this.config.onImageLoad === 'function') {
            this.config.onImageLoad(img, this.config);
        }
    }
    
    /**
     * Maneja error de carga de imagen
     * @private
     */
    handleImageError(event) {
        const img = event.target;
        img.classList.remove('loading');
        img.classList.add('error');
        
        // Usar imagen de fallback
        if (img.src !== this.config.fallbackImage) {
            img.src = this.config.fallbackImage;
        } else {
            // Si el fallback también falla, usar placeholder SVG
            img.src = 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMzAwIiBoZWlnaHQ9IjMwMCIgZmlsbD0iI2Y1ZjVmNSIvPjx0ZXh0IHg9IjUwJSIgeT0iNTAlIiBkb21pbmFudC1iYXNlbGluZT0ibWlkZGxlIiB0ZXh0LWFuY2hvcj0ibWlkZGxlIiBmb250LWZhbWlseT0ibW9ub3NwYWNlIiBmb250LXNpemU9IjE0cHgiIGZpbGw9IiM5OTk5OTkiPkltYWdlbiBubyBkaXNwb25pYmxlPC90ZXh0Pjwvc3ZnPg==';
        }
        
        if (typeof this.config.onImageError === 'function') {
            this.config.onImageError(img, this.config);
        }
        
        console.warn(`Failed to load image for product ${this.config.id}:`, this.config.image);
    }
    
    /**
     * Anima entrada del elemento
     * @private
     */
    animateIn() {
        if (!this.element || !this.config.animations) return;
        
        this.element.classList.add('animate-in');
        
        // Añadir delay progresivo si es parte de una lista
        const index = Array.from(this.element.parentElement?.children || []).indexOf(this.element);
        if (index >= 0) {
            this.element.style.animationDelay = `${index * 100}ms`;
        }
    }
    
    /**
     * Escapa HTML para prevenir XSS
     * @private
     */
    escapeHtml(text) {
        if (typeof text !== 'string') return text;
        
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#39;'
        };
        
        return text.replace(/[&<>"']/g, char => map[char]);
    }
    
    /**
     * Track de eventos para analytics
     * @private
     */
    trackEvent(eventName, data) {
        if (window.gtag) {
            window.gtag('event', eventName, data);
        } else if (window.analytics) {
            window.analytics.track(eventName, data);
        } else if (window.performanceMonitor) {
            window.performanceMonitor.trackInteraction(eventName, data);
        }
    }
    
    /**
     * Actualiza configuración del producto
     */
    updateConfig(newConfig) {
        const oldConfig = { ...this.config };
        this.config = this.validateAndMergeConfig({ ...this.config, ...newConfig });
        
        if (this.element) {
            this.updateDOM(oldConfig);
        }
    }
    
    /**
     * Actualiza DOM basado en nueva configuración
     * @private
     */
    updateDOM(oldConfig) {
        if (!this.element) return;
        
        // Actualizar título
        if (this.config.name !== oldConfig.name) {
            const titleElement = this.element.querySelector('.product-card-title');
            if (titleElement) {
                titleElement.textContent = this.config.name;
            }
        }
        
        // Actualizar descripción
        if (this.config.description !== oldConfig.description) {
            const descElement = this.element.querySelector('.product-card-description');
            if (descElement) {
                descElement.textContent = this.config.description;
            }
        }
        
        // Actualizar imagen
        if (this.config.image !== oldConfig.image) {
            const imgElement = this.element.querySelector('.product-card-image');
            if (imgElement) {
                if (this.config.lazy) {
                    imgElement.setAttribute('data-src', this.config.image);
                } else {
                    imgElement.src = this.config.image;
                }
            }
        }
        
        // Actualizar aria-label
        this.element.setAttribute('aria-label', this.getAriaLabel());
    }
    
    /**
     * Obtiene datos del producto
     */
    getProductData() {
        return { ...this.config };
    }
    
    /**
     * Obtiene elemento DOM
     */
    getElement() {
        return this.element;
    }
    
    /**
     * Verifica si está renderizado
     */
    isRendered() {
        return this.isRendered && this.element && this.element.isConnected;
    }
    
    /**
     * Limpia recursos y eventos
     */
    cleanup() {
        // Limpiar event listeners
        this.eventListeners.forEach(({ element, event, handler, options }) => {
            element.removeEventListener(event, handler, options);
        });
        this.eventListeners = [];
        
        // Limpiar observers
        this.observers.forEach(observer => {
            if (observer.disconnect) {
                observer.disconnect();
            }
        });
        this.observers = [];
        
        // Remover elemento del DOM
        if (this.element && this.element.parentNode) {
            this.element.parentNode.removeChild(this.element);
        }
        
        this.element = null;
        this.isRendered = false;
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductCard;
} else if (typeof window !== 'undefined') {
    window.ProductCard = ProductCard;
}