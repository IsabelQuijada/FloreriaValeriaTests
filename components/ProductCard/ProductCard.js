/**
 * ProductCard - Componente reutilizable para tarjetas de producto
 * 
 * Este componente permite crear tarjetas de producto dinámicamente
 * con datos configurables y comportamientos personalizables.
 */

class ProductCard {
    /**
     * @param {Object} config - Configuración del producto
     * @param {string} config.id - ID único del producto
     * @param {string} config.name - Nombre del producto
     * @param {string} config.description - Descripción del producto
     * @param {string} config.image - URL de la imagen
     * @param {string} config.price - Precio del producto (opcional)
     * @param {string} config.category - Categoría del producto (opcional)
     * @param {Object} config.actions - Configuración de acciones
     * @param {Function} config.actions.onQuickView - Callback para vista rápida
     * @param {Function} config.actions.onAddToCart - Callback para agregar al carrito
     * @param {Function} config.actions.onContact - Callback para contacto
     * @param {Object} config.customStyles - Estilos CSS personalizados (opcional)
     */
    constructor(config) {
        this.config = {
            id: config.id || Math.random().toString(36).substr(2, 9),
            name: config.name || 'Producto sin nombre',
            description: config.description || '',
            image: config.image || 'https://via.placeholder.com/300x300?text=Sin+Imagen',
            category: config.category || null,
            actions: config.actions || {},
            customStyles: config.customStyles || {},
            altText: config.altText || config.name
        };
        
        this.element = null;
        this.isLoaded = false;
    }
    
    /**
     * Renderiza la tarjeta de producto
     * @returns {HTMLElement} Elemento DOM de la tarjeta
     */
    render() {
        const card = document.createElement('div');
        card.className = this.getCardClasses();
        card.setAttribute('data-product-id', this.config.id);
        
        // Aplicar estilos personalizados
        this.applyCustomStyles(card);
        
        card.innerHTML = this.getCardHTML();
        
        // Configurar event listeners
        this.setupEventListeners(card);
        
        // Configurar animación de carga
        this.setupLoadAnimation(card);
        
        this.element = card;
        return card;
    }
    
    /**
     * Obtiene las clases CSS para la tarjeta
     * @returns {string} String con las clases CSS
     */
    getCardClasses() {
        const baseClass = 'product-card';
        const categoryClass = this.config.category ? `product-card--${this.config.category}` : '';
        
        return [baseClass, categoryClass].filter(Boolean).join(' ');
    }
    
    /**
     * Genera el HTML interno de la tarjeta
     * @returns {string} HTML de la tarjeta
     */
    getCardHTML() {
        const categoryTag = this.config.category 
            ? `<div class="product-category-tag">${this.config.category.toUpperCase()}</div>` 
            : '';
        
        // Solo mostrar overlay si hay acción de vista rápida
        const overlay = this.config.actions.onQuickView 
            ? '<div class="product-overlay"></div>' 
            : '';
        
        const actionButton = this.getActionButton();
        
        // Generar placeholder optimizado basado en el tema
        const placeholderColor = '#f0f0f0';
        const placeholderSVG = `data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='${placeholderColor}'/%3E%3C/svg%3E`;
        
        return `
            <div class="product-image-wrapper">
                ${categoryTag}
                <img src="${placeholderSVG}" 
                     data-src="${this.config.image}" 
                     alt="${this.config.altText}" 
                     class="product-image lazy-load"
                     loading="lazy"
                     decoding="async">
                ${overlay}
            </div>
            <div class="product-content">
                <h3 class="product-name">${this.config.name}</h3>
                <p class="product-description">${this.config.description}</p>
                <div class="product-footer">
                    ${actionButton}
                </div>
            </div>
        `;
    }
    
    /**
     * Genera el botón de acción principal
     * @returns {string} HTML del botón
     */
    getActionButton() {
        // Para productos funerarios (categoria específica), mostrar botón de contacto
        if (this.config.category && ['coronas', 'cruces', 'cubre-caja', 'pie-caja-altar'].includes(this.config.category)) {
            return '<button class="contact-btn" type="button">CONTACTAR</button>';
        }
        if (this.config.actions.onAddToCart) {
            return '<button class="add-to-cart-btn" type="button">CONTACTANOS</button>';
        }
        if (this.config.actions.onContact) {
            return '<button class="contact-btn" type="button">CONSULTAR</button>';
        }
        return '';
    }
    
    /**
     * Configura los event listeners de la tarjeta
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    setupEventListeners(card) {
        // Click en toda la tarjeta para vista rápida
        if (this.config.actions.onQuickView) {
            card.addEventListener('click', (e) => {
                // Solo si no se hizo click en un botón específico
                if (!e.target.closest('.add-to-cart-btn, .contact-btn')) {
                    this.config.actions.onQuickView(this.config, this.element);
                }
            });
            
            // Agregar cursor pointer para indicar que es clickable
            card.style.cursor = 'pointer';
        }
        
        // Vista rápida (mantener por compatibilidad)
        const quickViewBtn = card.querySelector('.quick-view-btn');
        if (quickViewBtn && this.config.actions.onQuickView) {
            quickViewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onQuickView(this.config, this.element);
            });
        }
        // Agregar al carrito
        const addToCartBtn = card.querySelector('.add-to-cart-btn');
        if (addToCartBtn && this.config.actions.onAddToCart) {
            addToCartBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onAddToCart(this.config, this.element);
            });
        }
        
        // Contactar
        const contactBtn = card.querySelector('.contact-btn');
        if (contactBtn && this.config.actions.onContact) {
            contactBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.config.actions.onContact(this.config, this.element);
            });
        }
        
        // Hover effects
        card.addEventListener('mouseenter', () => {
            card.classList.add('product-card--hover');
        });
        
        card.addEventListener('mouseleave', () => {
            card.classList.remove('product-card--hover');
        });
    }
    
    /**
     * Aplica estilos personalizados a la tarjeta
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    applyCustomStyles(card) {
        if (this.config.customStyles && Object.keys(this.config.customStyles).length > 0) {
            Object.assign(card.style, this.config.customStyles);
        }
    }
    
    /**
     * Configura la animación de entrada
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    setupLoadAnimation(card) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        
        // Configurar lazy loading para imágenes
        this.setupLazyLoading(card);
        
        // Usar IntersectionObserver para animar cuando entre en viewport
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting && !this.isLoaded) {
                    this.animateIn();
                    this.isLoaded = true;
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '50px'
        });
        
        observer.observe(card);
    }
    
    /**
     * Configura el lazy loading para imágenes
     * @param {HTMLElement} card - Elemento de la tarjeta
     */
    setupLazyLoading(card) {
        const img = card.querySelector('.product-image.lazy-load');
        if (!img || !img.dataset.src) return;
        
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const image = entry.target;
                    const realSrc = image.dataset.src;
                    
                    // Crear nueva imagen para precargar
                    const tempImg = new Image();
                    tempImg.onload = () => {
                        // Aplicar transición suave
                        image.style.transition = 'opacity 0.3s ease';
                        image.style.opacity = '0.7';
                        
                        // Reemplazar src
                        image.src = realSrc;
                        image.classList.remove('lazy-load');
                        image.classList.add('lazy-loaded');
                        
                        // Restaurar opacidad
                        setTimeout(() => {
                            image.style.opacity = '1';
                        }, 50);
                    };
                    
                    tempImg.onerror = () => {
                        // En caso de error, mostrar placeholder de error
                        image.classList.add('lazy-error');
                        console.warn('Error cargando imagen:', realSrc);
                    };
                    
                    tempImg.src = realSrc;
                    imageObserver.unobserve(image);
                }
            });
        }, {
            threshold: 0.1,
            rootMargin: '100px'
        });
        
        imageObserver.observe(img);
    }
    
    /**
     * Anima la entrada de la tarjeta
     */
    animateIn() {
        if (!this.element) return;
        
        this.element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        this.element.style.opacity = '1';
        this.element.style.transform = 'translateY(0)';
    }
    
    /**
     * Actualiza los datos del producto
     * @param {Object} newConfig - Nueva configuración
     */
    update(newConfig) {
        this.config = { ...this.config, ...newConfig };
        if (this.element) {
            // Actualizar contenido específico sin re-renderizar completamente
            const nameElement = this.element.querySelector('.product-name');
            const descElement = this.element.querySelector('.product-description');
            const imageElement = this.element.querySelector('.product-image');
            if (nameElement && newConfig.name) {
                nameElement.textContent = newConfig.name;
            }
            if (descElement && newConfig.description) {
                descElement.textContent = newConfig.description;
            }
            if (imageElement && newConfig.image) {
                imageElement.src = newConfig.image;
                imageElement.alt = newConfig.altText || newConfig.name || this.config.altText;
            }
        }
    }
    
    /**
     * Remueve la tarjeta del DOM con animación
     */
    remove() {
        if (!this.element) return;
        
        this.element.style.transition = 'opacity 0.3s ease, transform 0.3s ease';
        this.element.style.opacity = '0';
        this.element.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            if (this.element && this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }, 300);
    }
    
    /**
     * Limpia los event listeners y elimina la tarjeta del DOM
     */
    destroy() {
        if (this.element) {
            // Limpiar todos los event listeners
            const buttons = this.element.querySelectorAll('button');
            buttons.forEach(button => {
                const newButton = button.cloneNode(true);
                button.parentNode.replaceChild(newButton, button);
            });
            
            // Remover el elemento del DOM si tiene padre
            if (this.element.parentNode) {
                this.element.parentNode.removeChild(this.element);
            }
        }
        
        // Limpiar referencias
        this.element = null;
        this.isLoaded = false;
    }
    
    /**
     * Obtiene el elemento DOM de la tarjeta
     * @returns {HTMLElement|null} Elemento de la tarjeta
     */
    getElement() {
        return this.element;
    }
    
    /**
     * Obtiene los datos de configuración del producto
     * @returns {Object} Configuración del producto
     */
    getConfig() {
        return { ...this.config };
    }
}

// Exportar para uso modular
if (typeof module !== 'undefined' && module.exports) {
    module.exports = ProductCard;
} else {
    window.ProductCard = ProductCard;
}